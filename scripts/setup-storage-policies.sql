-- Setup Storage Policies for Supabase Storage Bucket
-- Run this in your Supabase SQL Editor

-- Step 1: Check if storage bucket exists
-- SELECT * FROM storage.buckets WHERE name = 'applications';

-- Step 2: Create storage policies for the 'applications' bucket
-- These policies allow anonymous users to upload and read files

-- Policy 1: Allow INSERT (upload) for anonymous and authenticated users
CREATE POLICY "Allow public uploads to applications bucket"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'applications'
);

-- Policy 2: Allow SELECT (read) for anonymous and authenticated users
CREATE POLICY "Allow public reads from applications bucket"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (
  bucket_id = 'applications'
);

-- Policy 3: Allow UPDATE (if needed for file updates)
CREATE POLICY "Allow public updates to applications bucket"
ON storage.objects
FOR UPDATE
TO anon, authenticated
USING (
  bucket_id = 'applications'
)
WITH CHECK (
  bucket_id = 'applications'
);

-- Policy 4: Allow DELETE (if needed)
CREATE POLICY "Allow public deletes from applications bucket"
ON storage.objects
FOR DELETE
TO anon, authenticated
USING (
  bucket_id = 'applications'
);

-- Verify policies were created
SELECT * FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage';
