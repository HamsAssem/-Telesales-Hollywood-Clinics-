'use client';

import React from "react"
import { useState, useEffect } from 'react';
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
  cvFile?: File;
  additionalFiles?: File[];
  sampleContent?: File[];
  
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
    currentlyEmployed: '',
    position: '',
    otherPosition: '',
    receptionistExperience: '',
    receptionistYears: '',
    receptionistTasks: [],
    bookingSystems: '',
    handleDifficultClient: '',
    receptionistMotivation: '',
    handleMultipleTasks: '',
    contentCreatorExperience: '',
    contentCreatorOtherExperience: '',
    contentCreatorYears: '',
    professionalExperience: '',
    activePlatforms: [],
    otherPlatform: '',
    contentSpecialization: [],
    toolsSoftware: [],
    otherTools: '',
    portfolioLinks: '',
    telesalesExperience: '',
    telesalesYears: '',
    telesalesExperienceDescription: '',
    languages: [],
    otherLanguage: '',
    phoneCommunicationRating: '',
    mostImportantSkill: '',
    hrExperience: '',
    hrYears: '',
    hrTasks: [],
    handleConfidential: '',
    financeExperience: '',
    financeYears: '',
    financeTasks: [],
    licensedToPractice: '',
    medicalSpecialty: '',
    clinicalExperience: '',
    workExperienceType: '',
    proceduresPerformed: [],
    certifications: '',
    patientSafety: '',
    telesalesOpsExperience: '',
    telesalesOpsYears: '',
    telesalesOpsTasks: [],
    crmExperience: '',
    handleUnhappyCustomer: '',
    comfortableSalesOps: '',
    opsManagerExperience: '',
    opsManagerYears: '',
    opsManagerTasks: [],
    operationsSystems: '',
    handleConflicts: '',
    opsManagerMotivation: '',
    comfortableDecisions: '',
    otherPositionName: '',
    otherFieldExperience: '',
    otherYears: '',
    otherExperienceDescription: '',
    comfortableMultipleTasks: '',
    whenCanStart: '',
    whenCanStartShort: '',
    workAvailability: '',
    linkedinPortfolio: '',
    agreeToStore: '',
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
    } else if (name === 'sampleContent') {
      setFormData(prev => ({ ...prev, sampleContent: files }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.confirmAccuracy) {
      setSubmitError(t.confirmRequiredError);
      return;
    }

    if (!formData.position) {
      setSubmitError('Please select a position');
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    try {
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

      const submitData: any = {
        ...formData,
        cvFile: formData.cvFile ? await fileToBase64(formData.cvFile) : undefined,
        additionalFiles: formData.additionalFiles && formData.additionalFiles.length > 0
          ? await Promise.all(formData.additionalFiles.map(fileToBase64))
          : undefined,
        sampleContent: formData.sampleContent && formData.sampleContent.length > 0
          ? await Promise.all(formData.sampleContent.map(fileToBase64))
          : undefined,
      };

      const result = await submitApplication(submitData as any);
      
      console.log('Submission result:', result);
      
      if (result.success) {
        setSubmitSuccess(true);
        // Reset form - would need to reset all fields
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Show the actual error message from the server
        const errorMessage = result.message || t.submitError;
        console.error('Submission failed:', errorMessage);
        setSubmitError(errorMessage);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Form submission error:', error);
      setSubmitError(`Error: ${errorMessage}. ${t.submitError}`);
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
              window.location.reload();
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {t.submitAnotherApplication}
          </Button>
        </CardContent>
      </Card>
    );
  }

  const hasPosition = (position: string) => formData.position === position;
  const showOtherLanguage = formData.languages.includes('other');
  const showOtherPlatform = formData.activePlatforms.includes('other-platform');
  const showOtherTools = formData.toolsSoftware.includes('other-tools');
  const showOtherExperience = formData.contentCreatorExperience === 'other';

  return (
    <form onSubmit={handleSubmit} className={isArabic ? 'rtl' : 'ltr'}>
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0 shadow-lg mb-6">
        <CardHeader>
          <CardTitle className="text-3xl">{t.formTitle}</CardTitle>
          <CardDescription className="text-blue-100">{t.formSubtitle}</CardDescription>
        </CardHeader>
      </Card>

      {/* Section 1: Basic Information */}
      <Card className="bg-white shadow-md border-0 mb-6">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">{t.basicInfoTitle}</CardTitle>
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
          </div>

          <div>
            <Label className="text-gray-700 font-medium mb-3 block">{t.currentlyEmployed}</Label>
            <RadioGroup value={formData.currentlyEmployed} onValueChange={(value) => handleSelectChange('currentlyEmployed', value)}>
              {t.currentlyEmployedOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value={option.value} id={`employed-${option.value}`} />
                  <Label htmlFor={`employed-${option.value}`} className="font-normal cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Position Selection (Single-select Dropdown) */}
      <Card className="bg-white shadow-md border-0 mb-6">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">{t.positionSelectionTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="position" className="text-gray-700 font-medium mb-2 block">
              {t.positionSelection}
            </Label>
            <Select
              value={formData.position}
              onValueChange={(value) => handleSelectChange('position', value)}
              required
            >
              <SelectTrigger id="position" className="border-gray-300">
                <SelectValue placeholder="Select a position" />
              </SelectTrigger>
              <SelectContent>
                {t.positionOptions.map((position) => (
                  <SelectItem key={position.value} value={position.value}>
                    {position.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formData.position === 'other' && (
              <div className="mt-3">
                <Input
                  name="otherPosition"
                  value={formData.otherPosition}
                  onChange={handleInputChange}
                  placeholder={t.otherPositionPlaceholder}
                  className="border-gray-300"
                  required
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Receptionist Role Questions */}
      {hasPosition('receptionist') && (
        <Card className="bg-white shadow-md border-0 mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">{t.receptionistTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-700 font-medium mb-3 block">{t.receptionistExperience}</Label>
              <RadioGroup value={formData.receptionistExperience} onValueChange={(value) => handleSelectChange('receptionistExperience', value)}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="yes" id="receptionist-exp-yes" />
                  <Label htmlFor="receptionist-exp-yes" className="font-normal cursor-pointer">{t.yes}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="receptionist-exp-no" />
                  <Label htmlFor="receptionist-exp-no" className="font-normal cursor-pointer">{t.no}</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-gray-700 font-medium mb-3 block">{t.receptionistYears}</Label>
              <RadioGroup value={formData.receptionistYears} onValueChange={(value) => handleSelectChange('receptionistYears', value)}>
                {t.receptionistYearsOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value={option.value} id={`receptionist-years-${option.value}`} />
                    <Label htmlFor={`receptionist-years-${option.value}`} className="font-normal cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-gray-700 font-medium mb-2 block">{t.receptionistTasks}</Label>
              <div className="space-y-2">
                {t.receptionistTaskOptions.map((task) => (
                  <div key={task.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`receptionist-task-${task.value}`}
                      checked={formData.receptionistTasks.includes(task.value)}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange('receptionistTasks', task.value, checked as boolean)
                      }
                    />
                    <Label htmlFor={`receptionist-task-${task.value}`} className="font-normal cursor-pointer">
                      {task.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="bookingSystems" className="text-gray-700 font-medium mb-2 block">
                {t.bookingSystems}
              </Label>
              <Input
                id="bookingSystems"
                name="bookingSystems"
                value={formData.bookingSystems}
                onChange={handleInputChange}
                placeholder={t.bookingSystemsPlaceholder}
                className="border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="handleDifficultClient" className="text-gray-700 font-medium mb-2 block">
                {t.handleDifficultClient}
              </Label>
              <Textarea
                id="handleDifficultClient"
                name="handleDifficultClient"
                value={formData.handleDifficultClient}
                onChange={handleInputChange}
                required
                placeholder={t.handleDifficultClientPlaceholder}
                rows={4}
                className="border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="receptionistMotivation" className="text-gray-700 font-medium mb-2 block">
                {t.receptionistMotivation}
              </Label>
              <Textarea
                id="receptionistMotivation"
                name="receptionistMotivation"
                value={formData.receptionistMotivation}
                onChange={handleInputChange}
                placeholder={t.receptionistMotivationPlaceholder}
                rows={4}
                className="border-gray-300"
              />
            </div>

            <div>
              <Label className="text-gray-700 font-medium mb-3 block">{t.handleMultipleTasks}</Label>
              <RadioGroup value={formData.handleMultipleTasks} onValueChange={(value) => handleSelectChange('handleMultipleTasks', value)}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="yes" id="multiple-tasks-yes" />
                  <Label htmlFor="multiple-tasks-yes" className="font-normal cursor-pointer">{t.yes}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="multiple-tasks-no" />
                  <Label htmlFor="multiple-tasks-no" className="font-normal cursor-pointer">{t.no}</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content Creator Role Questions */}
      {hasPosition('marketing-content-creator') && (
        <Card className="bg-white shadow-md border-0 mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">{t.contentCreatorTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-700 font-medium mb-3 block">{t.contentCreatorExperience}</Label>
              <RadioGroup value={formData.contentCreatorExperience} onValueChange={(value) => handleSelectChange('contentCreatorExperience', value)}>
                {t.contentCreatorExperienceOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value={option.value} id={`cc-exp-${option.value}`} />
                    <Label htmlFor={`cc-exp-${option.value}`} className="font-normal cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {showOtherExperience && (
                <Input
                  name="contentCreatorOtherExperience"
                  value={formData.contentCreatorOtherExperience}
                  onChange={handleInputChange}
                  placeholder={t.contentCreatorOtherExperiencePlaceholder}
                  className="border-gray-300 mt-2"
                />
              )}
            </div>

            <div>
              <Label className="text-gray-700 font-medium mb-3 block">{t.contentCreatorYears}</Label>
              <RadioGroup value={formData.contentCreatorYears} onValueChange={(value) => handleSelectChange('contentCreatorYears', value)}>
                {t.contentCreatorYearsOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value={option.value} id={`cc-years-${option.value}`} />
                    <Label htmlFor={`cc-years-${option.value}`} className="font-normal cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="professionalExperience" className="text-gray-700 font-medium mb-2 block">
                {t.professionalExperience}
              </Label>
              <Textarea
                id="professionalExperience"
                name="professionalExperience"
                value={formData.professionalExperience}
                onChange={handleInputChange}
                placeholder={t.professionalExperiencePlaceholder}
                rows={4}
                className="border-gray-300"
              />
            </div>

            <div>
              <Label className="text-gray-700 font-medium mb-2 block">{t.activePlatforms}</Label>
              <div className="space-y-2">
                {t.platformOptions.map((platform) => (
                  <div key={platform.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`platform-${platform.value}`}
                      checked={formData.activePlatforms.includes(platform.value)}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange('activePlatforms', platform.value, checked as boolean)
                      }
                    />
                    <Label htmlFor={`platform-${platform.value}`} className="font-normal cursor-pointer">
                      {platform.label}
                    </Label>
                  </div>
                ))}
              </div>
              {showOtherPlatform && (
                <Input
                  name="otherPlatform"
                  value={formData.otherPlatform}
                  onChange={handleInputChange}
                  placeholder={t.otherPlatformPlaceholder}
                  className="border-gray-300 mt-2"
                />
              )}
            </div>

            <div>
              <Label className="text-gray-700 font-medium mb-2 block">{t.contentSpecialization}</Label>
              <div className="space-y-2">
                {t.contentTypeOptions.map((type) => (
                  <div key={type.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`content-type-${type.value}`}
                      checked={formData.contentSpecialization.includes(type.value)}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange('contentSpecialization', type.value, checked as boolean)
                      }
                    />
                    <Label htmlFor={`content-type-${type.value}`} className="font-normal cursor-pointer">
                      {type.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-gray-700 font-medium mb-2 block">{t.toolsSoftware}</Label>
              <div className="space-y-2">
                {t.toolsOptions.map((tool) => (
                  <div key={tool.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tool-${tool.value}`}
                      checked={formData.toolsSoftware.includes(tool.value)}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange('toolsSoftware', tool.value, checked as boolean)
                      }
                    />
                    <Label htmlFor={`tool-${tool.value}`} className="font-normal cursor-pointer">
                      {tool.label}
                    </Label>
                  </div>
                ))}
              </div>
              {showOtherTools && (
                <Input
                  name="otherTools"
                  value={formData.otherTools}
                  onChange={handleInputChange}
                  placeholder={t.otherToolsPlaceholder}
                  className="border-gray-300 mt-2"
                />
              )}
            </div>

            <div>
              <Label htmlFor="portfolioLinks" className="text-gray-700 font-medium mb-2 block">
                {t.portfolioLinks}
              </Label>
              <Textarea
                id="portfolioLinks"
                name="portfolioLinks"
                value={formData.portfolioLinks}
                onChange={handleInputChange}
                placeholder={t.portfolioPlaceholder}
                rows={4}
                className="border-gray-300"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Telesales Role Questions */}
      {hasPosition('telesales') && (
        <Card className="bg-white shadow-md border-0 mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">{t.telesalesTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-700 font-medium mb-3 block">{t.telesalesExperience}</Label>
              <RadioGroup value={formData.telesalesExperience} onValueChange={(value) => handleSelectChange('telesalesExperience', value)}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="yes" id="telesales-exp-yes" />
                  <Label htmlFor="telesales-exp-yes" className="font-normal cursor-pointer">{t.yes}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="telesales-exp-no" />
                  <Label htmlFor="telesales-exp-no" className="font-normal cursor-pointer">{t.no}</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.telesalesExperience === 'yes' && (
              <div>
                <Label className="text-gray-700 font-medium mb-3 block">{t.telesalesYears}</Label>
                <RadioGroup value={formData.telesalesYears} onValueChange={(value) => handleSelectChange('telesalesYears', value)}>
                  {t.telesalesYearsOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value={option.value} id={`telesales-years-${option.value}`} />
                      <Label htmlFor={`telesales-years-${option.value}`} className="font-normal cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            <div>
              <Label htmlFor="telesalesExperienceDescription" className="text-gray-700 font-medium mb-2 block">
                {t.telesalesExperienceDescription}
              </Label>
              <Textarea
                id="telesalesExperienceDescription"
                name="telesalesExperienceDescription"
                value={formData.telesalesExperienceDescription}
                onChange={handleInputChange}
                placeholder={t.telesalesExperiencePlaceholder}
                rows={4}
                className="border-gray-300"
              />
            </div>

            <div>
              <Label className="text-gray-700 font-medium mb-2 block">{t.languages}</Label>
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
              {showOtherLanguage && (
                <Input
                  name="otherLanguage"
                  value={formData.otherLanguage}
                  onChange={handleInputChange}
                  placeholder={t.otherLanguagePlaceholder}
                  className="border-gray-300 mt-2"
                />
              )}
            </div>

            <div>
              <Label className="text-gray-700 font-medium mb-3 block">
                {t.phoneCommunicationRating}
              </Label>
              <p className="text-sm text-gray-500 mb-2">{t.phoneCommunicationScale}</p>
              <RadioGroup value={formData.phoneCommunicationRating} onValueChange={(value) => handleSelectChange('phoneCommunicationRating', value)}>
                {t.phoneRatingOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value={option.value} id={`phone-rating-${option.value}`} />
                    <Label htmlFor={`phone-rating-${option.value}`} className="font-normal cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="mostImportantSkill" className="text-gray-700 font-medium mb-2 block">
                {t.mostImportantSkill}
              </Label>
              <Textarea
                id="mostImportantSkill"
                name="mostImportantSkill"
                value={formData.mostImportantSkill}
                onChange={handleInputChange}
                placeholder={t.mostImportantSkillPlaceholder}
                rows={4}
                className="border-gray-300"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* HR Role Questions */}
      {hasPosition('human-resources') && (
        <Card className="bg-white shadow-md border-0 mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">{t.hrTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-700 font-medium mb-3 block">{t.hrExperience}</Label>
              <RadioGroup value={formData.hrExperience} onValueChange={(value) => handleSelectChange('hrExperience', value)}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="yes" id="hr-exp-yes" />
                  <Label htmlFor="hr-exp-yes" className="font-normal cursor-pointer">{t.yes}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="hr-exp-no" />
                  <Label htmlFor="hr-exp-no" className="font-normal cursor-pointer">{t.no}</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-gray-700 font-medium mb-3 block">{t.hrYears}</Label>
              <RadioGroup value={formData.hrYears} onValueChange={(value) => handleSelectChange('hrYears', value)}>
                {t.hrYearsOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value={option.value} id={`hr-years-${option.value}`} />
                    <Label htmlFor={`hr-years-${option.value}`} className="font-normal cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-gray-700 font-medium mb-2 block">{t.hrTasks}</Label>
              <div className="space-y-2">
                {t.hrTaskOptions.map((task) => (
                  <div key={task.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`hr-task-${task.value}`}
                      checked={formData.hrTasks.includes(task.value)}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange('hrTasks', task.value, checked as boolean)
                      }
                    />
                    <Label htmlFor={`hr-task-${task.value}`} className="font-normal cursor-pointer">
                      {task.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="handleConfidential" className="text-gray-700 font-medium mb-2 block">
                {t.handleConfidential}
              </Label>
              <Textarea
                id="handleConfidential"
                name="handleConfidential"
                value={formData.handleConfidential}
                onChange={handleInputChange}
                placeholder={t.handleConfidentialPlaceholder}
                rows={4}
                className="border-gray-300"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Finance/Accounting Role Questions */}
      {hasPosition('finance-accounting') && (
        <Card className="bg-white shadow-md border-0 mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">{t.financeTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-700 font-medium mb-3 block">{t.financeExperience}</Label>
              <RadioGroup value={formData.financeExperience} onValueChange={(value) => handleSelectChange('financeExperience', value)}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="yes" id="finance-exp-yes" />
                  <Label htmlFor="finance-exp-yes" className="font-normal cursor-pointer">{t.yes}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="finance-exp-no" />
                  <Label htmlFor="finance-exp-no" className="font-normal cursor-pointer">{t.no}</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-gray-700 font-medium mb-3 block">{t.financeYears}</Label>
              <RadioGroup value={formData.financeYears} onValueChange={(value) => handleSelectChange('financeYears', value)}>
                {t.financeYearsOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value={option.value} id={`finance-years-${option.value}`} />
                    <Label htmlFor={`finance-years-${option.value}`} className="font-normal cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-gray-700 font-medium mb-2 block">{t.financeTasks}</Label>
              <div className="space-y-2">
                {t.financeTaskOptions.map((task) => (
                  <div key={task.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`finance-task-${task.value}`}
                      checked={formData.financeTasks.includes(task.value)}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange('financeTasks', task.value, checked as boolean)
                      }
                    />
                    <Label htmlFor={`finance-task-${task.value}`} className="font-normal cursor-pointer">
                      {task.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Doctor Role Questions */}
      {hasPosition('doctor') && (
        <Card className="bg-white shadow-md border-0 mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">{t.doctorTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-700 font-medium mb-3 block">{t.licensedToPractice}</Label>
              <RadioGroup value={formData.licensedToPractice} onValueChange={(value) => handleSelectChange('licensedToPractice', value)}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="yes" id="licensed-yes" />
                  <Label htmlFor="licensed-yes" className="font-normal cursor-pointer">{t.yes}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="licensed-no" />
                  <Label htmlFor="licensed-no" className="font-normal cursor-pointer">{t.no}</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="medicalSpecialty" className="text-gray-700 font-medium mb-2 block">
                {t.medicalSpecialty}
              </Label>
              <Input
                id="medicalSpecialty"
                name="medicalSpecialty"
                value={formData.medicalSpecialty}
                onChange={handleInputChange}
                required
                placeholder={t.medicalSpecialtyPlaceholder}
                className="border-gray-300"
              />
            </div>

            <div>
              <Label className="text-gray-700 font-medium mb-3 block">{t.clinicalExperience}</Label>
              <RadioGroup value={formData.clinicalExperience} onValueChange={(value) => handleSelectChange('clinicalExperience', value)}>
                {t.clinicalExperienceOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value={option.value} id={`clinical-${option.value}`} />
                    <Label htmlFor={`clinical-${option.value}`} className="font-normal cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-gray-700 font-medium mb-3 block">{t.workExperienceType}</Label>
              <RadioGroup value={formData.workExperienceType} onValueChange={(value) => handleSelectChange('workExperienceType', value)}>
                {t.workExperienceTypeOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value={option.value} id={`work-type-${option.value}`} />
                    <Label htmlFor={`work-type-${option.value}`} className="font-normal cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-gray-700 font-medium mb-2 block">{t.proceduresPerformed}</Label>
              <div className="space-y-2">
                {t.procedureOptions.map((procedure) => (
                  <div key={procedure.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`procedure-${procedure.value}`}
                      checked={formData.proceduresPerformed.includes(procedure.value)}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange('proceduresPerformed', procedure.value, checked as boolean)
                      }
                    />
                    <Label htmlFor={`procedure-${procedure.value}`} className="font-normal cursor-pointer">
                      {procedure.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="certifications" className="text-gray-700 font-medium mb-2 block">
                {t.certifications}
              </Label>
              <Input
                id="certifications"
                name="certifications"
                value={formData.certifications}
                onChange={handleInputChange}
                placeholder={t.certificationsPlaceholder}
                className="border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="patientSafety" className="text-gray-700 font-medium mb-2 block">
                {t.patientSafety}
              </Label>
              <Textarea
                id="patientSafety"
                name="patientSafety"
                value={formData.patientSafety}
                onChange={handleInputChange}
                required
                placeholder={t.patientSafetyPlaceholder}
                rows={4}
                className="border-gray-300"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Telesales & Operations Role Questions */}
      {hasPosition('telesales-operations') && (
        <Card className="bg-white shadow-md border-0 mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">{t.telesalesOpsTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-700 font-medium mb-3 block">{t.telesalesOpsExperience}</Label>
              <RadioGroup value={formData.telesalesOpsExperience} onValueChange={(value) => handleSelectChange('telesalesOpsExperience', value)}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="yes" id="telesales-ops-exp-yes" />
                  <Label htmlFor="telesales-ops-exp-yes" className="font-normal cursor-pointer">{t.yes}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="telesales-ops-exp-no" />
                  <Label htmlFor="telesales-ops-exp-no" className="font-normal cursor-pointer">{t.no}</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-gray-700 font-medium mb-3 block">{t.telesalesOpsYears}</Label>
              <RadioGroup value={formData.telesalesOpsYears} onValueChange={(value) => handleSelectChange('telesalesOpsYears', value)}>
                {t.telesalesOpsYearsOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value={option.value} id={`telesales-ops-years-${option.value}`} />
                    <Label htmlFor={`telesales-ops-years-${option.value}`} className="font-normal cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-gray-700 font-medium mb-2 block">{t.telesalesOpsTasks}</Label>
              <div className="space-y-2">
                {t.telesalesOpsTaskOptions.map((task) => (
                  <div key={task.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`telesales-ops-task-${task.value}`}
                      checked={formData.telesalesOpsTasks.includes(task.value)}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange('telesalesOpsTasks', task.value, checked as boolean)
                      }
                    />
                    <Label htmlFor={`telesales-ops-task-${task.value}`} className="font-normal cursor-pointer">
                      {task.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-gray-700 font-medium mb-3 block">{t.crmExperience}</Label>
              <RadioGroup value={formData.crmExperience} onValueChange={(value) => handleSelectChange('crmExperience', value)}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="yes" id="crm-yes" />
                  <Label htmlFor="crm-yes" className="font-normal cursor-pointer">{t.yes}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="crm-no" />
                  <Label htmlFor="crm-no" className="font-normal cursor-pointer">{t.no}</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="handleUnhappyCustomer" className="text-gray-700 font-medium mb-2 block">
                {t.handleUnhappyCustomer}
              </Label>
              <Textarea
                id="handleUnhappyCustomer"
                name="handleUnhappyCustomer"
                value={formData.handleUnhappyCustomer}
                onChange={handleInputChange}
                required
                placeholder={t.handleUnhappyCustomerPlaceholder}
                rows={4}
                className="border-gray-300"
              />
            </div>

            <div>
              <Label className="text-gray-700 font-medium mb-3 block">{t.comfortableSalesOps}</Label>
              <RadioGroup value={formData.comfortableSalesOps} onValueChange={(value) => handleSelectChange('comfortableSalesOps', value)}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="yes" id="sales-ops-yes" />
                  <Label htmlFor="sales-ops-yes" className="font-normal cursor-pointer">{t.yes}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="sales-ops-no" />
                  <Label htmlFor="sales-ops-no" className="font-normal cursor-pointer">{t.no}</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Operations Manager Role Questions */}
      {hasPosition('operations-manager') && (
        <Card className="bg-white shadow-md border-0 mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">{t.opsManagerTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-700 font-medium mb-3 block">{t.opsManagerExperience}</Label>
              <RadioGroup value={formData.opsManagerExperience} onValueChange={(value) => handleSelectChange('opsManagerExperience', value)}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="yes" id="ops-mgr-exp-yes" />
                  <Label htmlFor="ops-mgr-exp-yes" className="font-normal cursor-pointer">{t.yes}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="ops-mgr-exp-no" />
                  <Label htmlFor="ops-mgr-exp-no" className="font-normal cursor-pointer">{t.no}</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-gray-700 font-medium mb-3 block">{t.opsManagerYears}</Label>
              <RadioGroup value={formData.opsManagerYears} onValueChange={(value) => handleSelectChange('opsManagerYears', value)}>
                {t.opsManagerYearsOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value={option.value} id={`ops-mgr-years-${option.value}`} />
                    <Label htmlFor={`ops-mgr-years-${option.value}`} className="font-normal cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-gray-700 font-medium mb-2 block">{t.opsManagerTasks}</Label>
              <div className="space-y-2">
                {t.opsManagerTaskOptions.map((task) => (
                  <div key={task.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`ops-mgr-task-${task.value}`}
                      checked={formData.opsManagerTasks.includes(task.value)}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange('opsManagerTasks', task.value, checked as boolean)
                      }
                    />
                    <Label htmlFor={`ops-mgr-task-${task.value}`} className="font-normal cursor-pointer">
                      {task.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="operationsSystems" className="text-gray-700 font-medium mb-2 block">
                {t.operationsSystems}
              </Label>
              <Input
                id="operationsSystems"
                name="operationsSystems"
                value={formData.operationsSystems}
                onChange={handleInputChange}
                placeholder={t.operationsSystemsPlaceholder}
                className="border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="handleConflicts" className="text-gray-700 font-medium mb-2 block">
                {t.handleConflicts}
              </Label>
              <Textarea
                id="handleConflicts"
                name="handleConflicts"
                value={formData.handleConflicts}
                onChange={handleInputChange}
                required
                placeholder={t.handleConflictsPlaceholder}
                rows={4}
                className="border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="opsManagerMotivation" className="text-gray-700 font-medium mb-2 block">
                {t.opsManagerMotivation}
              </Label>
              <Textarea
                id="opsManagerMotivation"
                name="opsManagerMotivation"
                value={formData.opsManagerMotivation}
                onChange={handleInputChange}
                placeholder={t.opsManagerMotivationPlaceholder}
                rows={4}
                className="border-gray-300"
              />
            </div>

            <div>
              <Label className="text-gray-700 font-medium mb-3 block">{t.comfortableDecisions}</Label>
              <RadioGroup value={formData.comfortableDecisions} onValueChange={(value) => handleSelectChange('comfortableDecisions', value)}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="yes" id="decisions-yes" />
                  <Label htmlFor="decisions-yes" className="font-normal cursor-pointer">{t.yes}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="decisions-no" />
                  <Label htmlFor="decisions-no" className="font-normal cursor-pointer">{t.no}</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Other Role Questions */}
      {hasPosition('other') && (
        <Card className="bg-white shadow-md border-0 mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">{t.otherRoleTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="otherPositionName" className="text-gray-700 font-medium mb-2 block">
                {t.otherPositionName}
              </Label>
              <Input
                id="otherPositionName"
                name="otherPositionName"
                value={formData.otherPositionName}
                onChange={handleInputChange}
                required
                placeholder={t.otherPositionNamePlaceholder}
                className="border-gray-300"
              />
            </div>

            <div>
              <Label className="text-gray-700 font-medium mb-3 block">{t.otherFieldExperience}</Label>
              <RadioGroup value={formData.otherFieldExperience} onValueChange={(value) => handleSelectChange('otherFieldExperience', value)}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="yes" id="other-exp-yes" />
                  <Label htmlFor="other-exp-yes" className="font-normal cursor-pointer">{t.yes}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="other-exp-no" />
                  <Label htmlFor="other-exp-no" className="font-normal cursor-pointer">{t.no}</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-gray-700 font-medium mb-3 block">{t.otherYears}</Label>
              <RadioGroup value={formData.otherYears} onValueChange={(value) => handleSelectChange('otherYears', value)}>
                {t.otherYearsOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value={option.value} id={`other-years-${option.value}`} />
                    <Label htmlFor={`other-years-${option.value}`} className="font-normal cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="otherExperienceDescription" className="text-gray-700 font-medium mb-2 block">
                {t.otherExperienceDescription}
              </Label>
              <Textarea
                id="otherExperienceDescription"
                name="otherExperienceDescription"
                value={formData.otherExperienceDescription}
                onChange={handleInputChange}
                placeholder={t.otherExperienceDescriptionPlaceholder}
                rows={4}
                className="border-gray-300"
              />
            </div>

            <div>
              <Label className="text-gray-700 font-medium mb-3 block">{t.comfortableMultipleTasks}</Label>
              <RadioGroup value={formData.comfortableMultipleTasks} onValueChange={(value) => handleSelectChange('comfortableMultipleTasks', value)}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="yes" id="other-tasks-yes" />
                  <Label htmlFor="other-tasks-yes" className="font-normal cursor-pointer">{t.yes}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="other-tasks-no" />
                  <Label htmlFor="other-tasks-no" className="font-normal cursor-pointer">{t.no}</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Section 4: Availability & Attachments */}
      <Card className="bg-white shadow-md border-0 mb-6">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">{t.availabilityTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="whenCanStartShort" className="text-gray-700 font-medium mb-2 block">
              {t.whenCanStartShort}
            </Label>
            <Input
              id="whenCanStartShort"
              name="whenCanStartShort"
              value={formData.whenCanStartShort}
              onChange={handleInputChange}
              required
              placeholder={t.whenCanStartPlaceholder}
              className="border-gray-300"
            />
          </div>

          <div>
            <Label className="text-gray-700 font-medium mb-3 block">{t.workAvailability}</Label>
            <RadioGroup value={formData.workAvailability} onValueChange={(value) => handleSelectChange('workAvailability', value)}>
              {t.workAvailabilityOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value={option.value} id={`availability-${option.value}`} />
                  <Label htmlFor={`availability-${option.value}`} className="font-normal cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="linkedinPortfolio" className="text-gray-700 font-medium mb-2 block">
              {t.linkedinPortfolio}
            </Label>
            <Input
              id="linkedinPortfolio"
              name="linkedinPortfolio"
              value={formData.linkedinPortfolio}
              onChange={handleInputChange}
              placeholder={t.linkedinPortfolioPlaceholder}
              className="border-gray-300"
            />
          </div>

          <div>
            <Label className="text-gray-700 font-medium mb-3 block">{t.agreeToStore}</Label>
            <RadioGroup value={formData.agreeToStore} onValueChange={(value) => handleSelectChange('agreeToStore', value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="agree-yes" />
                <Label htmlFor="agree-yes" className="font-normal cursor-pointer">{t.yes}</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* File Upload */}
      <Card className="bg-white shadow-md border-0 mb-6">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">{t.attachmentsTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <FileUpload
              name="cvFile"
              label={t.uploadCV}
              accept=".pdf"
              onFilesSelected={(files) => handleFileUpload('cvFile', files)}
              required
            />
            <p className="text-sm text-gray-500 mt-1">{t.uploadCVNote}</p>
          </div>
          
          {hasPosition('marketing-content-creator') && (
            <div>
              <FileUpload
                name="sampleContent"
                label={t.uploadAdditional}
                accept=".pdf,.jpg,.jpeg,.png,.mp4,.mov"
                multiple
                onFilesSelected={(files) => handleFileUpload('sampleContent', files)}
              />
              <p className="text-sm text-gray-500 mt-1">{t.uploadAdditionalNote}</p>
            </div>
          )}
          
          <div>
            <FileUpload
              name="additionalFiles"
              label={t.uploadAdditional}
              accept=".pdf,.doc,.docx,.mp3,.wav,.m4a"
              multiple
              onFilesSelected={(files) => handleFileUpload('additionalFiles', files)}
            />
            <p className="text-sm text-gray-500 mt-1">{t.uploadAdditionalNote}</p>
          </div>
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
          disabled={submitting || !formData.position}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors"
        >
          {submitting ? t.submitting : t.submitButton}
        </Button>
      </div>
    </form>
  );
}
