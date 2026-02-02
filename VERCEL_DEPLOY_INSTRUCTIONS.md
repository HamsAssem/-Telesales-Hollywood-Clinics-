# Deploy "Telesales Hollywood Clinics" to Vercel

## Step 1: Push to GitHub (if not already done)

```bash
# Create a new repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy via Vercel Dashboard

1. **Go to**: https://vercel.com/new
2. **Import your GitHub repository**
3. **Configure Project**:
   - **Project Name**: `Telesales Hollywood Clinics` (or `telesales-hollywood-clinics`)
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)

4. **Environment Variables** (IMPORTANT - Click "Add" for each):
   - Variable: `NEXT_PUBLIC_SUPABASE_URL`
     Value: `https://rozfhpredxzylgiifcbn.supabase.co`
     Environments: ☑ Production ☑ Preview ☑ Development
   
   - Variable: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     Value: `YOUR_SUPABASE_ANON_KEY_HERE`
     Environments: ☑ Production ☑ Preview ☑ Development

5. **Click "Deploy"**

## Step 3: Get Your Live URL

After deployment completes (usually 1-2 minutes), you'll get:
- **Production URL**: `https://telesales-hollywood-clinics.vercel.app` (or similar)
- You can also set a custom domain later in project settings

## Step 4: Verify Deployment

1. Visit your live URL
2. Test the form submission
3. Check your Supabase database to confirm data is being saved

---

**Note**: If you prefer CLI deployment, you'll need to complete the login process first, then run:
```bash
vercel --prod
```
And enter "Telesales Hollywood Clinics" when prompted for the project name.
