-- Update database schema for all roles
-- Run this in your Supabase SQL Editor

-- Add job_title column (stores the selected position)
ALTER TABLE public.telesales_applications
ADD COLUMN IF NOT EXISTS job_title TEXT;

-- Add position column (single value)
ALTER TABLE public.telesales_applications
ADD COLUMN IF NOT EXISTS position TEXT;

-- Add other_position column
ALTER TABLE public.telesales_applications
ADD COLUMN IF NOT EXISTS other_position TEXT;

-- Add currently_employed column
ALTER TABLE public.telesales_applications
ADD COLUMN IF NOT EXISTS currently_employed TEXT;

-- Receptionist columns
ALTER TABLE public.telesales_applications
ADD COLUMN IF NOT EXISTS receptionist_experience TEXT,
ADD COLUMN IF NOT EXISTS receptionist_years TEXT,
ADD COLUMN IF NOT EXISTS receptionist_tasks TEXT,
ADD COLUMN IF NOT EXISTS booking_systems TEXT,
ADD COLUMN IF NOT EXISTS handle_difficult_client TEXT,
ADD COLUMN IF NOT EXISTS receptionist_motivation TEXT,
ADD COLUMN IF NOT EXISTS handle_multiple_tasks TEXT;

-- Content Creator columns
ALTER TABLE public.telesales_applications
ADD COLUMN IF NOT EXISTS content_creator_experience TEXT,
ADD COLUMN IF NOT EXISTS content_creator_other_experience TEXT,
ADD COLUMN IF NOT EXISTS content_creator_years TEXT,
ADD COLUMN IF NOT EXISTS professional_experience TEXT,
ADD COLUMN IF NOT EXISTS active_platforms TEXT,
ADD COLUMN IF NOT EXISTS other_platform TEXT,
ADD COLUMN IF NOT EXISTS content_specialization TEXT,
ADD COLUMN IF NOT EXISTS tools_software TEXT,
ADD COLUMN IF NOT EXISTS other_tools TEXT,
ADD COLUMN IF NOT EXISTS portfolio_links TEXT;

-- Telesales columns (update existing)
ALTER TABLE public.telesales_applications
ADD COLUMN IF NOT EXISTS telesales_experience_new TEXT,
ADD COLUMN IF NOT EXISTS telesales_years TEXT,
ADD COLUMN IF NOT EXISTS telesales_experience_description TEXT,
ADD COLUMN IF NOT EXISTS other_language TEXT,
ADD COLUMN IF NOT EXISTS phone_communication_rating TEXT,
ADD COLUMN IF NOT EXISTS most_important_skill TEXT;

-- HR columns
ALTER TABLE public.telesales_applications
ADD COLUMN IF NOT EXISTS hr_experience TEXT,
ADD COLUMN IF NOT EXISTS hr_years TEXT,
ADD COLUMN IF NOT EXISTS hr_tasks TEXT,
ADD COLUMN IF NOT EXISTS handle_confidential TEXT;

-- Finance columns
ALTER TABLE public.telesales_applications
ADD COLUMN IF NOT EXISTS finance_experience TEXT,
ADD COLUMN IF NOT EXISTS finance_years TEXT,
ADD COLUMN IF NOT EXISTS finance_tasks TEXT;

-- Doctor columns
ALTER TABLE public.telesales_applications
ADD COLUMN IF NOT EXISTS licensed_to_practice TEXT,
ADD COLUMN IF NOT EXISTS medical_specialty TEXT,
ADD COLUMN IF NOT EXISTS clinical_experience TEXT,
ADD COLUMN IF NOT EXISTS work_experience_type TEXT,
ADD COLUMN IF NOT EXISTS procedures_performed TEXT,
ADD COLUMN IF NOT EXISTS certifications TEXT,
ADD COLUMN IF NOT EXISTS patient_safety TEXT;

-- Telesales & Operations columns
ALTER TABLE public.telesales_applications
ADD COLUMN IF NOT EXISTS telesales_ops_experience TEXT,
ADD COLUMN IF NOT EXISTS telesales_ops_years TEXT,
ADD COLUMN IF NOT EXISTS telesales_ops_tasks TEXT,
ADD COLUMN IF NOT EXISTS crm_experience TEXT,
ADD COLUMN IF NOT EXISTS handle_unhappy_customer TEXT,
ADD COLUMN IF NOT EXISTS comfortable_sales_ops TEXT;

-- Operations Manager columns
ALTER TABLE public.telesales_applications
ADD COLUMN IF NOT EXISTS ops_manager_experience TEXT,
ADD COLUMN IF NOT EXISTS ops_manager_years TEXT,
ADD COLUMN IF NOT EXISTS ops_manager_tasks TEXT,
ADD COLUMN IF NOT EXISTS operations_systems TEXT,
ADD COLUMN IF NOT EXISTS handle_conflicts TEXT,
ADD COLUMN IF NOT EXISTS ops_manager_motivation TEXT,
ADD COLUMN IF NOT EXISTS comfortable_decisions TEXT;

-- Other Role columns
ALTER TABLE public.telesales_applications
ADD COLUMN IF NOT EXISTS other_position_name TEXT,
ADD COLUMN IF NOT EXISTS other_field_experience TEXT,
ADD COLUMN IF NOT EXISTS other_years TEXT,
ADD COLUMN IF NOT EXISTS other_experience_description TEXT,
ADD COLUMN IF NOT EXISTS comfortable_multiple_tasks TEXT;

-- Common columns
ALTER TABLE public.telesales_applications
ADD COLUMN IF NOT EXISTS when_can_start TEXT,
ADD COLUMN IF NOT EXISTS when_can_start_short TEXT,
ADD COLUMN IF NOT EXISTS work_availability TEXT,
ADD COLUMN IF NOT EXISTS linkedin_portfolio TEXT,
ADD COLUMN IF NOT EXISTS agree_to_store TEXT,
ADD COLUMN IF NOT EXISTS sample_content_urls TEXT;

-- Note: Arrays will be stored as JSON strings in TEXT columns
