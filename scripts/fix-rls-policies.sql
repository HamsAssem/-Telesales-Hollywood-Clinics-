-- Fix Row Level Security (RLS) policies for telesales_applications table
-- Run this in your Supabase SQL Editor

-- First, check if RLS is enabled
-- SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'telesales_applications';

-- Enable RLS if not already enabled
ALTER TABLE public.telesales_applications ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow inserts on telesales_applications" ON public.telesales_applications;
DROP POLICY IF EXISTS "Allow selects on telesales_applications" ON public.telesales_applications;
DROP POLICY IF EXISTS "Allow public inserts" ON public.telesales_applications;
DROP POLICY IF EXISTS "Allow public selects" ON public.telesales_applications;

-- Create policy to allow anyone to INSERT (submit applications)
CREATE POLICY "Allow public inserts on telesales_applications" 
ON public.telesales_applications
FOR INSERT
TO public
WITH CHECK (true);

-- Create policy to allow anyone to SELECT (view applications)
-- You might want to restrict this later for security
CREATE POLICY "Allow public selects on telesales_applications" 
ON public.telesales_applications
FOR SELECT
TO public
USING (true);

-- Optional: Create policy to allow updates (if needed)
-- CREATE POLICY "Allow public updates on telesales_applications" 
-- ON public.telesales_applications
-- FOR UPDATE
-- TO public
-- USING (true)
-- WITH CHECK (true);
