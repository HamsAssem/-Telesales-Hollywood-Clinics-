'use server';

import { createClient } from '@supabase/supabase-js';

interface FormData {
  // Section 1: Basic Info
  fullName: string;
  email: string;
  phone: string;
  city: string;
  currentlyEmployed: string;
  
  // Section 2: Position (single-select)
  position: string;
  otherPosition: string;
  
  // Receptionist
  receptionistExperience: string;
  receptionistYears: string;
  receptionistTasks: string[];
  bookingSystems: string;
  handleDifficultClient: string;
  receptionistMotivation: string;
  handleMultipleTasks: string;
  
  // Content Creator
  contentCreatorExperience: string;
  contentCreatorOtherExperience: string;
  contentCreatorYears: string;
  professionalExperience: string;
  activePlatforms: string[];
  otherPlatform: string;
  contentSpecialization: string[];
  toolsSoftware: string[];
  otherTools: string;
  portfolioLinks: string;
  
  // Telesales
  telesalesExperience: string;
  telesalesYears: string;
  telesalesExperienceDescription: string;
  languages: string[];
  otherLanguage: string;
  phoneCommunicationRating: string;
  mostImportantSkill: string;
  
  // HR
  hrExperience: string;
  hrYears: string;
  hrTasks: string[];
  handleConfidential: string;
  
  // Finance
  financeExperience: string;
  financeYears: string;
  financeTasks: string[];
  
  // Doctor
  licensedToPractice: string;
  medicalSpecialty: string;
  clinicalExperience: string;
  workExperienceType: string;
  proceduresPerformed: string[];
  certifications: string;
  patientSafety: string;
  
  // Telesales & Operations
  telesalesOpsExperience: string;
  telesalesOpsYears: string;
  telesalesOpsTasks: string[];
  crmExperience: string;
  handleUnhappyCustomer: string;
  comfortableSalesOps: string;
  
  // Operations Manager
  opsManagerExperience: string;
  opsManagerYears: string;
  opsManagerTasks: string[];
  operationsSystems: string;
  handleConflicts: string;
  opsManagerMotivation: string;
  comfortableDecisions: string;
  
  // Other Role
  otherPositionName: string;
  otherFieldExperience: string;
  otherYears: string;
  otherExperienceDescription: string;
  comfortableMultipleTasks: string;
  
  // Common Availability
  whenCanStart: string;
  whenCanStartShort: string;
  workAvailability: string;
  linkedinPortfolio: string;
  agreeToStore: string;
  
  // Files
  cvFile?: { data: string; name: string; type: string };
  additionalFiles?: Array<{ data: string; name: string; type: string }>;
  sampleContent?: Array<{ data: string; name: string; type: string }>;
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
      console.error('[ERROR] Supabase environment variables are missing or not configured!');
      console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'Set (but may be placeholder)' : 'NOT SET');
      console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? 'Set (but may be placeholder)' : 'NOT SET');
      console.log('[DEMO MODE] Application submission (NOT SAVED TO DATABASE):', {
        ...formData,
        cvFile: formData.cvFile ? 'File uploaded' : 'No file',
        additionalFiles: formData.additionalFiles?.length || 0,
        sampleContent: formData.sampleContent?.length || 0,
        submittedAt: new Date().toISOString(),
      });
      return {
        success: false,
        message: 'Application submission failed: Supabase environment variables are not configured. Please contact the administrator.',
      };
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Verify storage bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
    const applicationsBucket = buckets?.find(b => b.name === 'applications');
    if (!applicationsBucket) {
      console.warn('Storage bucket "applications" not found. File uploads will fail.');
    }

    // Helper function to upload a file
    const uploadFile = async (fileInfo: { data: string; name: string; type: string }, folder: string): Promise<string | null> => {
      try {
        const base64Data = fileInfo.data.split(',')[1] || fileInfo.data;
        const buffer = Buffer.from(base64Data, 'base64');
        const safeFileName = fileInfo.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const fileName = `${folder}_${Date.now()}_${Math.random().toString(36).substring(7)}_${safeFileName}`;
        const fileData = new Uint8Array(buffer);
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('applications')
          .upload(fileName, fileData, {
            contentType: fileInfo.type || 'application/pdf',
            upsert: false,
          });

        if (uploadError) {
          console.error(`${folder} upload error:`, uploadError);
          return null;
        }
        
        if (uploadData) {
          const { data: urlData } = supabase.storage
            .from('applications')
            .getPublicUrl(uploadData.path);
          return urlData.publicUrl;
        }
        return null;
      } catch (error) {
        console.error(`${folder} upload error:`, error);
        return null;
      }
    };

    // Upload files
    let cvUrl: string | null = null;
    if (formData.cvFile) {
      cvUrl = await uploadFile(formData.cvFile, 'cv');
    }

    const additionalFileUrls: string[] = [];
    if (formData.additionalFiles && formData.additionalFiles.length > 0) {
      for (const fileInfo of formData.additionalFiles) {
        const url = await uploadFile(fileInfo, 'additional');
        if (url) additionalFileUrls.push(url);
      }
    }

    const sampleContentUrls: string[] = [];
    if (formData.sampleContent && formData.sampleContent.length > 0) {
      for (const fileInfo of formData.sampleContent) {
        const url = await uploadFile(fileInfo, 'sample');
        if (url) sampleContentUrls.push(url);
      }
    }

    // Convert years of experience to integer (for roles that need it)
    const yearsOfExpMap: Record<string, number> = {
      'less-than-1': 0,
      '1-2': 1,
      '2-5': 3,
      '3-5': 4,
      'more-than-5': 5,
      '1-3': 2,
    };

    // Build the insert object with all fields
    const insertData: any = {
      job_title: formData.position, // Save position to job_title column (primary)
      other_position: formData.otherPosition || null,
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      country: formData.city || '', // Combined field
      currently_employed: formData.currentlyEmployed,
      when_can_start: formData.whenCanStart || formData.whenCanStartShort,
      when_can_start_short: formData.whenCanStartShort,
      work_availability: formData.workAvailability,
      linkedin_portfolio: formData.linkedinPortfolio || null,
      agree_to_store: formData.agreeToStore,
      cv_file_url: cvUrl,
      additional_files_urls: JSON.stringify(additionalFileUrls),
      sample_content_urls: JSON.stringify(sampleContentUrls),
      submitted_at: new Date().toISOString(),
    };

    // Receptionist fields
    if (formData.position === 'receptionist') {
      insertData.receptionist_experience = formData.receptionistExperience;
      insertData.receptionist_years = formData.receptionistYears;
      insertData.receptionist_tasks = JSON.stringify(formData.receptionistTasks);
      insertData.booking_systems = formData.bookingSystems || null;
      insertData.handle_difficult_client = formData.handleDifficultClient || null;
      insertData.receptionist_motivation = formData.receptionistMotivation || null;
      insertData.handle_multiple_tasks = formData.handleMultipleTasks;
    }

    // Content Creator fields
    if (formData.position === 'marketing-content-creator') {
      insertData.content_creator_experience = formData.contentCreatorExperience;
      insertData.content_creator_other_experience = formData.contentCreatorOtherExperience || null;
      insertData.content_creator_years = formData.contentCreatorYears;
      insertData.professional_experience = formData.professionalExperience || null;
      insertData.active_platforms = JSON.stringify(formData.activePlatforms);
      insertData.other_platform = formData.otherPlatform || null;
      insertData.content_specialization = JSON.stringify(formData.contentSpecialization);
      insertData.tools_software = JSON.stringify(formData.toolsSoftware);
      insertData.other_tools = formData.otherTools || null;
      insertData.portfolio_links = formData.portfolioLinks || null;
    }

    // Telesales fields
    if (formData.position === 'telesales') {
      insertData.telesales_experience_new = formData.telesalesExperience;
      insertData.telesales_years = formData.telesalesYears;
      insertData.telesales_experience_description = formData.telesalesExperienceDescription || null;
      insertData.languages = JSON.stringify(formData.languages);
      insertData.other_language = formData.otherLanguage || null;
      insertData.phone_communication_rating = formData.phoneCommunicationRating;
      insertData.most_important_skill = formData.mostImportantSkill || null;
    }

    // HR fields
    if (formData.position === 'human-resources') {
      insertData.hr_experience = formData.hrExperience;
      insertData.hr_years = formData.hrYears;
      insertData.hr_tasks = JSON.stringify(formData.hrTasks);
      insertData.handle_confidential = formData.handleConfidential || null;
    }

    // Finance fields
    if (formData.position === 'finance-accounting') {
      insertData.finance_experience = formData.financeExperience;
      insertData.finance_years = formData.financeYears;
      insertData.finance_tasks = JSON.stringify(formData.financeTasks);
    }

    // Doctor fields
    if (formData.position === 'doctor') {
      insertData.licensed_to_practice = formData.licensedToPractice;
      insertData.medical_specialty = formData.medicalSpecialty;
      insertData.clinical_experience = formData.clinicalExperience;
      insertData.work_experience_type = formData.workExperienceType;
      insertData.procedures_performed = JSON.stringify(formData.proceduresPerformed);
      insertData.certifications = formData.certifications || null;
      insertData.patient_safety = formData.patientSafety || null;
    }

    // Telesales & Operations fields
    if (formData.position === 'telesales-operations') {
      insertData.telesales_ops_experience = formData.telesalesOpsExperience;
      insertData.telesales_ops_years = formData.telesalesOpsYears;
      insertData.telesales_ops_tasks = JSON.stringify(formData.telesalesOpsTasks);
      insertData.crm_experience = formData.crmExperience;
      insertData.handle_unhappy_customer = formData.handleUnhappyCustomer || null;
      insertData.comfortable_sales_ops = formData.comfortableSalesOps;
    }

    // Operations Manager fields
    if (formData.position === 'operations-manager') {
      insertData.ops_manager_experience = formData.opsManagerExperience;
      insertData.ops_manager_years = formData.opsManagerYears;
      insertData.ops_manager_tasks = JSON.stringify(formData.opsManagerTasks);
      insertData.operations_systems = formData.operationsSystems || null;
      insertData.handle_conflicts = formData.handleConflicts || null;
      insertData.ops_manager_motivation = formData.opsManagerMotivation || null;
      insertData.comfortable_decisions = formData.comfortableDecisions;
    }

    // Other Role fields
    if (formData.position === 'other') {
      insertData.other_position_name = formData.otherPositionName;
      insertData.other_field_experience = formData.otherFieldExperience;
      insertData.other_years = formData.otherYears;
      insertData.other_experience_description = formData.otherExperienceDescription || null;
      insertData.comfortable_multiple_tasks = formData.comfortableMultipleTasks;
    }

    // Insert form data into database
    console.log('Attempting to insert data into database...', {
      table: 'telesales_applications',
      hasJobTitle: !!insertData.job_title,
      jobTitle: insertData.job_title,
      hasFullName: !!insertData.full_name,
      insertDataKeys: Object.keys(insertData),
      insertDataSample: {
        job_title: insertData.job_title,
        full_name: insertData.full_name,
        email: insertData.email,
        phone: insertData.phone,
        city: insertData.city,
      },
    });

    // Log the full insert data (excluding file data for readability)
    const logData = { ...insertData };
    delete logData.cv_file_url;
    delete logData.additional_files_urls;
    delete logData.sample_content_urls;
    console.log('Full insert data (excluding files):', JSON.stringify(logData, null, 2));

    const { data: insertedData, error: insertError } = await supabase
      .from('telesales_applications')
      .insert([insertData])
      .select('id');

    if (insertError) {
      console.error('Database insert error:', {
        message: insertError.message,
        details: insertError,
        hint: insertError.hint,
        code: insertError.code,
        insertDataKeys: Object.keys(insertData),
      });
      return {
        success: false,
        message: `Failed to submit application to database: ${insertError.message || JSON.stringify(insertError)}`,
      };
    }

    if (!insertedData || insertedData.length === 0) {
      console.error('No data returned from insert operation');
      return {
        success: false,
        message: 'Failed to submit application: No data returned from database',
      };
    }

    const submissionId = insertedData[0]?.id;
    console.log('Successfully inserted data with ID:', submissionId);

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
