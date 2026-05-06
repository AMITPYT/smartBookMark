# Quick Setup Guide - Smart Bookmark App

## 🚀 Get Started in 5 Minutes

### Step 1: Set Up Supabase (2 minutes)

1. **Create Supabase Account**
   - Go to https://supabase.com
   - Sign up (free tier is perfect)
   - Click "New Project"
   - Choose a name and secure password
   - Select region closest to you
   - Wait 1-2 minutes for setup

2. **Get Your Credentials**
   - Go to Project Settings → API
   - Copy these two values:
     - `Project URL` (looks like: https://xxxxx.supabase.co)
     - `anon public` key (long string)

3. **Set Up Database**
   - Go to SQL Editor in Supabase dashboard
   - Click "New Query"
   - Open the file `supabase-schema.sql` from this project
   - Copy ALL the SQL code
   - Paste into SQL Editor
   - Click "Run" (or press Ctrl+Enter)
   - You should see "Success. No rows returned"

4. **Enable Realtime**
   - Go to Database → Replication
   - Find the `bookmarks` table
   - Toggle "Enable Realtime" to ON

### Step 2: Set Up Google OAuth (3 minutes)

1. **Create Google Cloud Project**
   - Go to https://console.cloud.google.com
   - Click "Select a Project" → "New Project"
   - Name it "SmartBookmarks" (or anything)
   - Click "Create"
   - Wait for it to be created

2. **Configure OAuth Consent Screen**
   - Search for "OAuth consent screen" in the top search bar
   - Select "External" user type
   - Click "Create"
   - Fill in:
     - App name: SmartBookmarks
     - User support email: Your email
     - Developer contact email: Your email
   - Click "Save and Continue"
   - Skip "Scopes" section (click "Save and Continue")
   - Skip "Test users" (click "Save and Continue")
   - Click "Back to Dashboard"

3. **Create OAuth Credentials**
   - Search for "Credentials" in the top search bar
   - Click "+ CREATE CREDENTIALS" → "OAuth client ID"
   - Application type: **Web application**
   - Name: SmartBookmarks Web
   - **Authorized JavaScript origins:**
     - `http://localhost:3000` (for local development)
   - **Authorized redirect URIs:**
     - `http://localhost:3000/auth/callback` (for local)
     - `https://YOUR-SUPABASE-PROJECT.supabase.co/auth/v1/callback` (replace with your Supabase URL)
   - Click "Create"
   - **Copy the Client ID and Client Secret** (you'll need these!)

4. **Configure Supabase Google OAuth**
   - Go back to Supabase dashboard
   - Go to Authentication → Providers
   - Find "Google" and click on it
   - Toggle "Enable Sign in with Google" to ON
   - Paste your Google **Client ID**
   - Paste your Google **Client Secret**
   - Click "Save"

### Step 3: Set Up Local Environment (1 minute)

1. **Create .env.local File**
   - In the project root, create a file named `.env.local`
   - Add these three lines:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

   - Replace the values with your actual Supabase credentials

2. **Install Dependencies**
```bash
npm install
```

3. **Run the App**
```bash
npm run dev
```

4. **Open Browser**
   - Go to http://localhost:3000
   - You should see the beautiful login page!

### Step 4: Test It! (1 minute)

1. **Login**
   - Click "Continue with Google"
   - Select your Google account
   - You'll be redirected to the dashboard

2. **Add a Bookmark**
   - Click "Add Bookmark" button
   - Fill in:
     - Title: "GitHub"
     - URL: "https://github.com"
     - Description: "Where developers hang out"
   - Click "Add Bookmark"
   - It should appear in your list!

3. **Test Real-time Sync**
   - Open another browser tab
   - Go to http://localhost:3000
   - You should see the same bookmark!
   - Add a bookmark in one tab
   - Watch it appear in the other tab instantly ✨

4. **Test Search**
   - Type in the search bar
   - Watch bookmarks filter in real-time

5. **Test Delete**
   - Hover over a bookmark
   - Click the trash icon
   - Confirm deletion
   - It's gone!

## 🌐 Deploy to Vercel

### Quick Deploy (2 minutes)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/smartbookmarkapp.git
git push -u origin main
```

2. **Deploy on Vercel**
   - Go to https://vercel.com/new
   - Click "Continue with GitHub"
   - Find and select your repository
   - Click "Import"

3. **Add Environment Variables**
   - In Vercel project settings, go to "Environment Variables"
   - Add these three:
     - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
     - `NEXT_PUBLIC_SITE_URL` = your Vercel deployment URL (e.g., https://your-app.vercel.app)

4. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes
   - Visit your live URL!

5. **Update Google OAuth**
   - Go back to Google Cloud Console
   - Edit your OAuth client
   - Add to **Authorized redirect URIs**:
     - `https://your-app.vercel.app/auth/callback`
   - Save

## ✅ Checklist

Before submitting your assignment:

- [ ] Can login with Google account
- [ ] Can add bookmarks with title and URL
- [ ] Bookmarks are private (can't see other users')
- [ ] Real-time sync works across tabs
- [ ] Can delete bookmarks with confirmation
- [ ] App is deployed on Vercel with live URL
- [ ] UI looks polished and professional
- [ ] Search/filter bonus feature works
- [ ] README explains the bonus feature

## 🐛 Common Issues

**Issue: "Invalid redirect_uri" error**
- Make sure the redirect URI in Google Cloud Console exactly matches:
  - `http://localhost:3000/auth/callback` (local)
  - `https://your-project.supabase.co/auth/v1/callback` (Supabase)

**Issue: Can't see bookmarks after login**
- Check that you ran the SQL schema in Supabase
- Verify RLS policies are enabled
- Check browser console for errors

**Issue: Real-time not working**
- Make sure you enabled Realtime for the bookmarks table in Supabase
- Check that `supabase_realtime` publication includes the table

**Issue: App works locally but not on Vercel**
- Verify all environment variables are set in Vercel
- Check that `NEXT_PUBLIC_SITE_URL` is your Vercel URL, not localhost
- Add Vercel URL to Google OAuth authorized redirect URIs

## 📞 Need Help?

- Check the main README.md for detailed documentation
- Review Supabase docs: https://supabase.com/docs
- Check Next.js docs: https://nextjs.org/docs

Good luck! 🚀
