-- Complete RLS Policy Fix for telesales_applications
-- Run this in your Supabase SQL Editor

-- Step 1: Disable RLS temporarily to check if that's the issue
-- (We'll re-enable it after creating proper policies)
ALTER TABLE public.telesales_applications DISABLE ROW LEVEL SECURITY;

-- Step 2: Drop ALL existing policies to start fresh
DROP POLICY IF EXISTS "Allow inserts on telesales_applications" ON public.telesales_applications;
DROP POLICY IF EXISTS "Allow selects on telesales_applications" ON public.telesales_applications;
DROP POLICY IF EXISTS "Allow public inserts" ON public.telesales_applications;
DROP POLICY IF EXISTS "Allow public selects" ON public.telesales_applications;
DROP POLICY IF EXISTS "Allow public inserts on telesales_applications" ON public.telesales_applications;

-- Step 3: Re-enable RLS
ALTER TABLE public.telesales_applications ENABLE ROW LEVEL SECURITY;

-- Step 4: Create a permissive INSERT policy for anonymous users
-- This allows anyone (including unauthenticated users) to insert
CREATE POLICY "Enable insert for all users" 
ON public.telesales_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Step 5: Create a permissive SELECT policy (optional, for viewing data)
CREATE POLICY "Enable select for all users" 
ON public.telesales_applications
FOR SELECT
TO anon, authenticated
USING (true);

-- Verify the policies were created
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies 
WHERE tablename = 'telesales_applications';
