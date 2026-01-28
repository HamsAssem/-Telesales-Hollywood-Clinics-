# Supabase Storage Setup Guide

## Step 1: Create Storage Bucket

1. Go to your Supabase project: https://app.supabase.com
2. Navigate to **Storage** in the left sidebar
3. Click **"New bucket"** or **"Create bucket"**
4. Name it: `applications`
5. Make it **Public** (or set up proper RLS policies)
6. Click **"Create bucket"**

## Step 2: Set Up Storage Policies (if bucket is private)

If you made the bucket private, you need to add policies:

1. Go to **Storage** → **Policies** → Select `applications` bucket
2. Click **"New Policy"**
3. Create an **INSERT** policy:
   - Policy name: `Allow public uploads`
   - Allowed operation: `INSERT`
   - Policy definition: `true` (or use RLS for more security)
4. Create a **SELECT** policy:
   - Policy name: `Allow public reads`
   - Allowed operation: `SELECT`
   - Policy definition: `true`

## Step 3: Verify Your Environment Variables

Make sure your `.env.local` file has:
```
NEXT_PUBLIC_SUPABASE_URL=https://rozfhpredxzylgiifcbn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

## Step 4: Restart Your Dev Server

After setting up the storage bucket, restart your Next.js dev server:
```bash
npm run dev -- -p 3002
```

## Troubleshooting

- **"Bucket not found"**: Make sure the bucket is named exactly `applications`
- **"Permission denied"**: Check your storage policies
- **"Invalid URL"**: Verify your Supabase URL in `.env.local`

Note: The application will still save form data to the database even if file uploads fail. File uploads are optional.
