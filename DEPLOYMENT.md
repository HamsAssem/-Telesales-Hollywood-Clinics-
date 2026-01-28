# Deployment Guide for Vercel

## Prerequisites

1. **GitHub Account** - Your code needs to be in a Git repository
2. **Vercel Account** - Sign up at https://vercel.com
3. **Supabase Project** - Already set up ✅

## Step 1: Initialize Git Repository (if not already done)

```bash
git init
git add .
git commit -m "Initial commit - Telesales application form"
```

## Step 2: Push to GitHub

1. Create a new repository on GitHub
2. Push your code:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Vercel will auto-detect Next.js
4. **Important**: Add your environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://rozfhpredxzylgiifcbn.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your Supabase anon key
5. Click "Deploy"

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts and add environment variables when asked
```

## Step 4: Configure Environment Variables in Vercel

After deployment, go to your project settings:

1. Go to **Settings** → **Environment Variables**
2. Add these variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://rozfhpredxzylgiifcbn.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your Supabase anon key
3. Make sure to add them for **Production**, **Preview**, and **Development** environments
4. Click **Save**
5. **Redeploy** your application for changes to take effect

## Step 5: Verify Deployment

1. Visit your deployed URL (provided by Vercel)
2. Test the form submission
3. Check your Supabase database to confirm data is being saved

## Important Notes

- ✅ Your Supabase RLS policies are already configured
- ✅ Your database schema is set up correctly
- ✅ File uploads will work if your storage bucket is configured
- ⚠️ Make sure your `.env.local` file is NOT committed to Git (it's in .gitignore)
- ⚠️ Always add environment variables through Vercel's dashboard, not in code

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Run `npm run build` locally to test

### Environment Variables Not Working
- Make sure variables are prefixed with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding environment variables
- Check Vercel logs for errors

### Database Connection Issues
- Verify your Supabase URL and anon key in Vercel environment variables
- Check Supabase project is active
- Verify RLS policies allow inserts

## Your Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables added in Vercel
- [ ] Deployment successful
- [ ] Form tested on live site
- [ ] Database verified to receive submissions
