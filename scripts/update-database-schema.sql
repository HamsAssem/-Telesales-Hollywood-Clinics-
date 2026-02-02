-- Update database schema for new form structure
-- Run this in your Supabase SQL Editor

-- Add job_title column
ALTER TABLE public.telesales_applications
ADD COLUMN IF NOT EXISTS job_title TEXT;

-- Add Content Creator specific columns
ALTER TABLE public.telesales_applications
ADD COLUMN IF NOT EXISTS other_language TEXT,
ADD COLUMN IF NOT EXISTS experience_type TEXT,
ADD COLUMN IF NOT EXISTS content_creator_years TEXT,
ADD COLUMN IF NOT EXISTS content_experience_description TEXT,
ADD COLUMN IF NOT EXISTS active_platforms TEXT,
ADD COLUMN IF NOT EXISTS other_platform TEXT,
ADD COLUMN IF NOT EXISTS content_specialization TEXT,
ADD COLUMN IF NOT EXISTS tools_software TEXT,
ADD COLUMN IF NOT EXISTS other_tools TEXT,
ADD COLUMN IF NOT EXISTS portfolio_links TEXT,
ADD COLUMN IF NOT EXISTS clinic_experience TEXT,
ADD COLUMN IF NOT EXISTS clinic_experience_description TEXT,
ADD COLUMN IF NOT EXISTS content_style TEXT,
ADD COLUMN IF NOT EXISTS what_makes_you_unique TEXT,
ADD COLUMN IF NOT EXISTS on_site_filming TEXT,
ADD COLUMN IF NOT EXISTS start_date_content_creator TEXT,
ADD COLUMN IF NOT EXISTS sample_content_urls TEXT;

-- Note: Arrays will be stored as JSON strings in TEXT columns
-- The application code will handle JSON.stringify/parse
