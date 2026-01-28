'use client';

import React from "react"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formTexts } from '@/lib/form-texts';
import { submitApplication } from '@/app/actions/submit-application';
import { FileUpload } from './file-upload';

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
  cvFile?: File;
  additionalFiles?: File[];
  confirmAccuracy: boolean;
}

export function TelesalesForm({ language }: { language: 'en' | 'ar' }) {
  const t = formTexts[language];
  const isArabic = language === 'ar';
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    telesalesExperience: '',
    yearsOfExperience: '',
    previousRoles: '',
    languages: [],
    communicationSkills: '',
    importantSkills: [],
    fullTimeAvailability: '',
    startDate: '',
    motivation: '',
    salesMotivation: '',
    confirmAccuracy: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
    setFormData(prev => {
      const arrayName = name as keyof FormData;
      const currentArray = (prev[arrayName] as string[]) || [];
      
      if (checked) {
        return { ...prev, [name]: [...currentArray, value] };
      } else {
        return { ...prev, [name]: currentArray.filter(item => item !== value) };
      }
    });
  };

  const handleConfirmChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, confirmAccuracy: checked }));
  };

  const handleFileUpload = (name: string, files: File[]) => {
    if (name === 'cvFile') {
      setFormData(prev => ({ ...prev, cvFile: files[0] }));
    } else if (name === 'additionalFiles') {
      setFormData(prev => ({ ...prev, additionalFiles: files }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.confirmAccuracy) {
      setSubmitError(t.confirmRequiredError);
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    try {
      // Convert File objects to base64 strings with metadata for serialization
      const fileToBase64 = (file: File): Promise<{ data: string; name: string; type: string }> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve({
            data: reader.result as string,
            name: file.name,
            type: file.type
          });
          reader.onerror = error => reject(error);
        });
      };

      const submitData = {
        ...formData,
        cvFile: formData.cvFile ? await fileToBase64(formData.cvFile) : undefined,
        additionalFiles: formData.additionalFiles && formData.additionalFiles.length > 0
          ? await Promise.all(formData.additionalFiles.map(fileToBase64))
          : undefined,
      };

      const result = await submitApplication(submitData);
      
      if (result.success) {
        setSubmitSuccess(true);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          city: '',
          country: '',
          telesalesExperience: '',
          yearsOfExperience: '',
          previousRoles: '',
          languages: [],
          communicationSkills: '',
          importantSkills: [],
          fullTimeAvailability: '',
          startDate: '',
          motivation: '',
          salesMotivation: '',
          confirmAccuracy: false,
        });
      } else {
        setSubmitError(result.message || t.submitError);
      }
    } catch (error) {
      setSubmitError(t.submitError);
      console.error('Form submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <Card className="bg-white shadow-lg border-0">
        <CardContent className="pt-12 pb-12 text-center">
          <div className="mb-4">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-2xl">✓</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.successMessage}</h2>
          <p className="text-gray-600 mb-6">{t.successDescription}</p>
          <Button
            onClick={() => {
              setSubmitSuccess(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {t.submitAnotherApplication}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={isArabic ? 'rtl' : 'ltr'}>
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0 shadow-lg mb-6">
        <CardHeader>
          <CardTitle className="text-3xl">{t.formTitle}</CardTitle>
          <CardDescription className="text-blue-100">{t.formSubtitle}</CardDescription>
        </CardHeader>
      </Card>

      {/* Personal Information */}
      <Card className="bg-white shadow-md border-0 mb-6">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">{t.personalInfoTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName" className="text-gray-700 font-medium mb-2 block">
                {t.fullName}
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                placeholder={t.fullNamePlaceholder}
                className="border-gray-300"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium mb-2 block">
                {t.email}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder={t.emailPlaceholder}
                className="border-gray-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone" className="text-gray-700 font-medium mb-2 block">
                {t.phone}
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder={t.phonePlaceholder}
                className="border-gray-300"
              />
            </div>
            <div>
              <Label htmlFor="country" className="text-gray-700 font-medium mb-2 block">
                {t.country}
              </Label>
              <Input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
                placeholder={t.countryPlaceholder}
                className="border-gray-300"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="city" className="text-gray-700 font-medium mb-2 block">
              {t.city}
            </Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
              placeholder={t.cityPlaceholder}
              className="border-gray-300"
            />
          </div>
        </CardContent>
      </Card>

      {/* Work Experience */}
      <Card className="bg-white shadow-md border-0 mb-6">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">{t.workExperienceTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-700 font-medium mb-3 block">{t.telesalesExperience}</Label>
            <RadioGroup value={formData.telesalesExperience} onValueChange={(value) => handleSelectChange('telesalesExperience', value)}>
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="yes" id="exp-yes" />
                <Label htmlFor="exp-yes" className="font-normal cursor-pointer">{t.yes}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="exp-no" />
                <Label htmlFor="exp-no" className="font-normal cursor-pointer">{t.no}</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="yearsOfExperience" className="text-gray-700 font-medium mb-2 block">
              {t.yearsOfExperience}
            </Label>
            <Select value={formData.yearsOfExperience} onValueChange={(value) => handleSelectChange('yearsOfExperience', value)}>
              <SelectTrigger className="border-gray-300">
                <SelectValue placeholder={t.selectYears} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">{t.noExperience}</SelectItem>
                <SelectItem value="0-1">{t.lessThanOne}</SelectItem>
                <SelectItem value="1-3">{t.oneToThree}</SelectItem>
                <SelectItem value="3-5">{t.threeToFive}</SelectItem>
                <SelectItem value="5+">{t.fiveOrMore}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="previousRoles" className="text-gray-700 font-medium mb-2 block">
              {t.previousRoles}
            </Label>
            <Textarea
              id="previousRoles"
              name="previousRoles"
              value={formData.previousRoles}
              onChange={handleInputChange}
              placeholder={t.previousRolesPlaceholder}
              rows={4}
              className="border-gray-300"
            />
          </div>
        </CardContent>
      </Card>

      {/* Communication & Skills */}
      <Card className="bg-white shadow-md border-0 mb-6">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">{t.communicationTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="languages" className="text-gray-700 font-medium mb-2 block">
              {t.languages}
            </Label>
            <div className="space-y-2">
              {t.languageOptions.map((lang) => (
                <div key={lang.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`lang-${lang.value}`}
                    checked={formData.languages.includes(lang.value)}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('languages', lang.value, checked as boolean)
                    }
                  />
                  <Label htmlFor={`lang-${lang.value}`} className="font-normal cursor-pointer">
                    {lang.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-gray-700 font-medium mb-3 block">{t.communicationSkills}</Label>
            <RadioGroup value={formData.communicationSkills} onValueChange={(value) => handleSelectChange('communicationSkills', value)}>
              {[
                { value: 'excellent', label: t.excellent },
                { value: 'good', label: t.good },
                { value: 'fair', label: t.fair },
                { value: 'needsImprovement', label: t.needsImprovement },
              ].map(option => (
                <div key={option.value} className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value={option.value} id={`comm-${option.value}`} />
                  <Label htmlFor={`comm-${option.value}`} className="font-normal cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Label className="text-gray-700 font-medium mb-3 block">{t.importantSkills}</Label>
            <div className="space-y-2">
              {t.skillsOptions.map((skill) => (
                <div key={skill.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`skill-${skill.value}`}
                    checked={formData.importantSkills.includes(skill.value)}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('importantSkills', skill.value, checked as boolean)
                    }
                  />
                  <Label htmlFor={`skill-${skill.value}`} className="font-normal cursor-pointer">
                    {skill.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Availability */}
      <Card className="bg-white shadow-md border-0 mb-6">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">{t.availabilityTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-700 font-medium mb-3 block">{t.fullTimeAvailability}</Label>
            <RadioGroup value={formData.fullTimeAvailability} onValueChange={(value) => handleSelectChange('fullTimeAvailability', value)}>
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="yes" id="avail-yes" />
                <Label htmlFor="avail-yes" className="font-normal cursor-pointer">{t.yes}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="avail-no" />
                <Label htmlFor="avail-no" className="font-normal cursor-pointer">{t.no}</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="startDate" className="text-gray-700 font-medium mb-2 block">
              {t.startDate}
            </Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleInputChange}
              required
              className="border-gray-300"
            />
          </div>
        </CardContent>
      </Card>

      {/* Motivation */}
      <Card className="bg-white shadow-md border-0 mb-6">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">{t.motivationTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="motivation" className="text-gray-700 font-medium mb-2 block">
              {t.whyApply}
            </Label>
            <Textarea
              id="motivation"
              name="motivation"
              value={formData.motivation}
              onChange={handleInputChange}
              placeholder={t.motivationPlaceholder}
              rows={4}
              className="border-gray-300"
            />
          </div>

          <div>
            <Label htmlFor="salesMotivation" className="text-gray-700 font-medium mb-2 block">
              {t.salesMotivation}
            </Label>
            <Textarea
              id="salesMotivation"
              name="salesMotivation"
              value={formData.salesMotivation}
              onChange={handleInputChange}
              placeholder={t.salesMotivationPlaceholder}
              rows={4}
              className="border-gray-300"
            />
          </div>
        </CardContent>
      </Card>

      {/* File Upload */}
      <Card className="bg-white shadow-md border-0 mb-6">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">{t.attachmentsTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FileUpload
            name="cvFile"
            label={t.uploadCV}
            accept=".pdf,.doc,.docx"
            onFilesSelected={(files) => handleFileUpload('cvFile', files)}
            required
          />
          <FileUpload
            name="additionalFiles"
            label={t.additionalDocuments}
            accept=".pdf,.doc,.docx,.mp3,.wav,.m4a"
            multiple
            onFilesSelected={(files) => handleFileUpload('additionalFiles', files)}
          />
        </CardContent>
      </Card>

      {/* Confirmation */}
      <Card className="bg-blue-50 shadow-md border-0 mb-6">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="confirm"
              checked={formData.confirmAccuracy}
              onCheckedChange={handleConfirmChange}
            />
            <Label htmlFor="confirm" className="font-normal cursor-pointer text-gray-700">
              {t.confirmInfo}
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Error Message */}
      {submitError && (
        <Card className="bg-red-50 border-red-200 mb-6">
          <CardContent className="pt-4">
            <p className="text-red-700">{submitError}</p>
          </CardContent>
        </Card>
      )}

      {/* Submit Button */}
      <div className="flex justify-center gap-4">
        <Button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors"
        >
          {submitting ? t.submitting : t.submitButton}
        </Button>
      </div>
    </form>
  );
}
