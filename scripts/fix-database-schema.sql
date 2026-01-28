-- Fix database schema to match the application
-- Run this in your Supabase SQL Editor if you're getting type mismatch errors

-- First, check current schema (this won't modify anything)
-- SELECT column_name, data_type 
-- FROM information_schema.columns 
-- WHERE table_name = 'telesales_applications';

-- If any fields are INTEGER but should be TEXT, alter them:

-- Example: If communication_skills is INTEGER, change it to TEXT
-- ALTER TABLE public.telesales_applications 
-- ALTER COLUMN communication_skills TYPE TEXT USING communication_skills::TEXT;

-- Example: If years_of_experience is INTEGER, change it to TEXT  
-- ALTER TABLE public.telesales_applications 
-- ALTER COLUMN years_of_experience TYPE TEXT USING years_of_experience::TEXT;

-- Make sure all text fields are TEXT type:
ALTER TABLE public.telesales_applications 
  ALTER COLUMN full_name TYPE TEXT,
  ALTER COLUMN email TYPE TEXT,
  ALTER COLUMN phone TYPE TEXT,
  ALTER COLUMN city TYPE TEXT,
  ALTER COLUMN country TYPE TEXT,
  ALTER COLUMN telesales_experience TYPE TEXT,
  ALTER COLUMN years_of_experience TYPE TEXT,
  ALTER COLUMN previous_roles TYPE TEXT,
  ALTER COLUMN languages TYPE TEXT,
  ALTER COLUMN communication_skills TYPE TEXT,
  ALTER COLUMN important_skills TYPE TEXT,
  ALTER COLUMN full_time_availability TYPE TEXT,
  ALTER COLUMN start_date TYPE TEXT,
  ALTER COLUMN motivation TYPE TEXT,
  ALTER COLUMN sales_motivation TYPE TEXT,
  ALTER COLUMN cv_file_url TYPE TEXT,
  ALTER COLUMN additional_files_urls TYPE TEXT;
