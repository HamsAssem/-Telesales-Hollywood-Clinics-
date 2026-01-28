'use server';

import { createClient } from '@supabase/supabase-js';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  telesalesExperience: string;
  yearsOfExperience: string;
  previousRoles: string;
  languages: string[];
  communicationSkills: string;
  importantSkills: string[];
  fullTimeAvailability: string;
  startDate: string;
  motivation: string;
  salesMotivation: string;
  cvFile?: { data: string; name: string; type: string }; // base64 string with metadata
  additionalFiles?: Array<{ data: string; name: string; type: string }>; // base64 strings with metadata
}

interface SubmitResult {
  success: boolean;
  message: string;
  submissionId?: string;
}

export async function submitApplication(formData: FormData): Promise<SubmitResult> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

    if (!supabaseUrl || !supabaseKey || supabaseUrl === 'your_supabase_project_url_here' || supabaseKey === 'your_supabase_anon_key_here') {
      console.log('[DEMO MODE] Application submission:', {
        ...formData,
        cvFile: formData.cvFile ? 'File uploaded' : 'No file',
        additionalFiles: formData.additionalFiles?.length || 0,
        submittedAt: new Date().toISOString(),
      });
      return {
        success: true,
        message: 'Application submitted successfully (Demo Mode)',
        submissionId: `demo-${Date.now()}`,
      };
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Upload CV file if present
    let cvUrl: string | null = null;
    if (formData.cvFile) {
      try {
        // Convert base64 string back to buffer
        const base64Data = formData.cvFile.data.split(',')[1] || formData.cvFile.data;
        const buffer = Buffer.from(base64Data, 'base64');
        const safeFileName = formData.cvFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const fileName = `cv_${Date.now()}_${safeFileName}`;
        
        // Convert buffer to Uint8Array for Supabase
        const fileData = new Uint8Array(buffer);
        
        const { data: cvData, error: cvError } = await supabase.storage
          .from('applications')
          .upload(fileName, fileData, {
            contentType: formData.cvFile.type || 'application/pdf',
            upsert: false,
          });

        if (cvError) {
          console.error('CV upload error details:', {
            message: cvError.message,
            statusCode: cvError.statusCode,
            error: cvError,
          });
          // Don't fail the entire submission if file upload fails
          // Just log the error and continue without the CV URL
          console.warn('Continuing without CV file upload. Error:', cvError.message);
        } else {
          cvUrl = cvData.path;
          console.log('CV uploaded successfully:', cvUrl);
        }
      } catch (error) {
        console.error('CV upload error:', error);
        // Don't fail the entire submission if file upload fails
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.warn('Continuing without CV file upload. Error:', errorMessage);
      }
    }

    // Upload additional files if present
    const additionalFileUrls: string[] = [];
    if (formData.additionalFiles && formData.additionalFiles.length > 0) {
      for (const fileInfo of formData.additionalFiles) {
        try {
          // Convert base64 string back to buffer
          const base64Data = fileInfo.data.split(',')[1] || fileInfo.data;
          const buffer = Buffer.from(base64Data, 'base64');
          const safeFileName = fileInfo.name.replace(/[^a-zA-Z0-9.-]/g, '_');
          const fileName = `additional_${Date.now()}_${Math.random().toString(36).substring(7)}_${safeFileName}`;
          
          // Convert buffer to Uint8Array for Supabase
          const fileData = new Uint8Array(buffer);
          
          const { data: uploadData, error: fileError } = await supabase.storage
            .from('applications')
            .upload(fileName, fileData, {
              contentType: fileInfo.type || 'application/pdf',
              upsert: false,
            });

          if (fileError) {
            console.error('Additional file upload error:', {
              message: fileError.message,
              statusCode: fileError.statusCode,
              error: fileError,
            });
            // Continue without this file
            continue;
          }
          additionalFileUrls.push(uploadData.path);
        } catch (error) {
          console.error('Additional file upload error:', error);
          // Continue without this file
          continue;
        }
      }
    }

    // Convert form values to match database schema types
    // years_of_experience: INTEGER (convert string to number)
    // Form sends: "0", "0-1", "1-3", "3-5", "5+"
    const yearsOfExpMap: Record<string, number> = {
      '0': 0,
      '0-1': 0,
      '1-3': 2,
      '3-5': 4,
      '5+': 5,
    };
    const yearsOfExperience = yearsOfExpMap[formData.yearsOfExperience] ?? 0;

    // communication_skills: INTEGER (convert string to number)
    const commSkillsMap: Record<string, number> = {
      'excellent': 4,
      'good': 3,
      'fair': 2,
      'needsImprovement': 1,
    };
    const communicationSkills = commSkillsMap[formData.communicationSkills] ?? 2;

    // full_time_availability: BOOLEAN (convert "yes"/"no" to boolean)
    const fullTimeAvailability = formData.fullTimeAvailability === 'yes';

    // start_date: DATE (already in YYYY-MM-DD format from date input, should work as-is)

    // Insert form data into database
    // Convert arrays to JSON strings for database storage
    const { data: insertedData, error: insertError } = await supabase
      .from('telesales_applications')
      .insert([
        {
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          country: formData.country,
          telesales_experience: formData.telesalesExperience,
          years_of_experience: yearsOfExperience,
          previous_roles: formData.previousRoles,
          languages: JSON.stringify(formData.languages),
          communication_skills: communicationSkills,
          important_skills: JSON.stringify(formData.importantSkills),
          full_time_availability: fullTimeAvailability,
          start_date: formData.startDate,
          motivation: formData.motivation,
          sales_motivation: formData.salesMotivation,
          cv_file_url: cvUrl,
          additional_files_urls: JSON.stringify(additionalFileUrls),
          submitted_at: new Date().toISOString(),
        },
      ])
      .select('id');

    if (insertError) {
      console.error('Database insert error:', {
        message: insertError.message,
        details: insertError,
        hint: insertError.hint,
        code: insertError.code,
      });
      return {
        success: false,
        message: `Failed to submit application to database: ${insertError.message || JSON.stringify(insertError)}`,
      };
    }

    const submissionId = insertedData?.[0]?.id;

    return {
      success: true,
      message: 'Application submitted successfully',
      submissionId: String(submissionId),
    };
  } catch (error) {
    console.error('Application submission error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      message: `An unexpected error occurred: ${errorMessage}`,
    };
  }
}
