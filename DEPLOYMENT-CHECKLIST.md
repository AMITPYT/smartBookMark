# 🚀 DEPLOYMENT CHECKLIST

Use this checklist to ensure everything is ready before submitting your assignment.

## Pre-Deployment (Local Testing)

### Setup
- [ ] Supabase project created
- [ ] Database schema executed (supabase-schema.sql)
- [ ] Realtime enabled for bookmarks table
- [ ] Google OAuth configured in Supabase
- [ ] `.env.local` file created with correct values
- [ ] `npm install` completed successfully
- [ ] `npm run dev` runs without errors

### Functionality Testing
- [ ] Login with Google works
- [ ] Can add bookmark with title and URL
- [ ] URL validation rejects invalid URLs
- [ ] Can add optional description
- [ ] Bookmarks appear immediately after adding
- [ ] Can search bookmarks by title
- [ ] Can search bookmarks by URL
- [ ] Can search bookmarks by description
- [ ] Search results counter works
- [ ] Empty state shows when no bookmarks exist
- [ ] Empty state shows when search has no results
- [ ] Delete button appears on hover
- [ ] Delete confirmation dialog shows
- [ ] Delete actually removes bookmark
- [ ] Can cancel delete operation

### Real-Time Testing
- [ ] Open app in two browser tabs
- [ ] Login with same account in both
- [ ] Add bookmark in Tab 1
- [ ] Bookmark appears in Tab 2 automatically (within 2 seconds)
- [ ] Delete bookmark in Tab 1
- [ ] Bookmark disappears in Tab 2 automatically
- [ ] Loading spinner shows during sync

### Security Testing
- [ ] Create User A account
- [ ] Add bookmarks as User A
- [ ] Logout and create User B account (different Google)
- [ ] Verify User B CANNOT see User A's bookmarks
- [ ] Add bookmarks as User B
- [ ] Verify User A CANNOT see User B's bookmarks (login again)
- [ ] Try to access /dashboard without login (should redirect to /)

### UI/UX Testing
- [ ] Page loads without console errors
- [ ] All animations work smoothly
- [ ] Loading states show during operations
- [ ] Error messages display correctly
- [ ] Mobile responsive (test on phone or DevTools)
- [ ] Tablet responsive (test on DevTools)
- [ ] Desktop layout looks good (1920px)
- [ ] Google button has correct colors
- [ ] User avatar shows in header (if available)
- [ ] User name/email shows in header
- [ ] Sign out button works
- [ ] Scrollbar is custom styled
- [ ] Typography looks professional
- [ ] Spacing is consistent

### Build Testing
- [ ] `npm run build` completes successfully
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Build output shows all routes

## Deployment to Vercel

### GitHub Setup
- [ ] Code pushed to GitHub repository
- [ ] Repository is accessible (public or Vercel has access)
- [ ] `.env.local` is in `.gitignore` (NOT committed!)
- [ ] `.env.local.example` is committed (template only)

### Vercel Deployment
- [ ] Vercel account created
- [ ] GitHub connected to Vercel
- [ ] Project imported from GitHub
- [ ] Environment variables added to Vercel:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `NEXT_PUBLIC_SITE_URL` (set to Vercel deployment URL)
- [ ] Deploy button clicked
- [ ] Deployment successful (no errors)
- [ ] Live URL accessible

### Post-Deployment Configuration
- [ ] Vercel URL added to Google OAuth authorized redirect URIs:
  - Format: `https://your-app.vercel.app/auth/callback`
- [ ] Wait 5 minutes for OAuth changes to propagate
- [ ] Test login on live URL
- [ ] Test adding bookmark on live URL
- [ ] Test real-time sync on live URL (two tabs)
- [ ] Test search on live URL
- [ ] Test delete on live URL

## Final Checks

### Assignment Requirements
- [ ] ✅ Google OAuth Login - Working
- [ ] ✅ Add Bookmarks - Working with validation
- [ ] ✅ Private Bookmarks - RLS enforced
- [ ] ✅ Real-Time Sync - Working across tabs
- [ ] ✅ Delete Bookmarks - With confirmation
- [ ] ✅ Deployed on Vercel - Live URL working
- [ ] ✅ Polished UI - Professional design
- [ ] ✅ Bonus Feature - Search & filter implemented

### Documentation
- [ ] README.md explains the project
- [ ] README.md explains bonus feature choice
- [ ] SETUP-GUIDE.md provides clear instructions
- [ ] Environment variables documented
- [ ] Tech stack listed

### Submission Ready
- [ ] Live Vercel URL obtained
- [ ] GitHub repository URL obtained
- [ ] Can login with any Google account
- [ ] No console errors in browser
- [ ] App works in Chrome
- [ ] App works in Firefox (optional)
- [ ] App works on mobile browser (optional)

## Common Issues & Solutions

### Issue: Build fails on Vercel
**Solution:** Check environment variables are set correctly in Vercel dashboard

### Issue: Google OAuth doesn't work on live site
**Solution:** Add Vercel URL to Google Cloud Console authorized redirect URIs

### Issue: Real-time not working
**Solution:** Enable Realtime for bookmarks table in Supabase dashboard

### Issue: Can't see bookmarks
**Solution:** Verify RLS policies are created and enabled

### Issue: App redirects to login after deployment
**Solution:** Check `NEXT_PUBLIC_SITE_URL` matches your Vercel URL exactly

## Live URL Testing Template

When testing your live deployment, use this template:

```
Live URL: https://your-app.vercel.app
Test Google Account: your-email@gmail.com

Test Results:
- Login: ✅/❌
- Add Bookmark: ✅/❌
- Real-Time Sync: ✅/❌
- Search: ✅/❌
- Delete: ✅/❌
- Mobile Responsive: ✅/❌

Notes: [Any issues or observations]
```

## Submission Package

Prepare these for your assignment submission:

1. **GitHub Repository URL**
2. **Live Vercel URL**
3. **README.md** (already in repo)
4. **Bonus Feature Explanation** (in README.md)
5. **Test Account** (reviewers can use their own Google account)

---

✅ **When all checkboxes are complete, your assignment is ready for submission!**

Good luck! 🎉
