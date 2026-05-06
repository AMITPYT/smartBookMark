# SmartBookmarks - Modern Bookmark Manager

A professional, full-featured bookmark manager built with Next.js 16 and Supabase, featuring Google OAuth authentication, real-time synchronization, and Row Level Security.

**Live Demo:** [smart-book-mark-8ioi.vercel.app/](https://smart-book-mark-8ioi.vercel.app/)

## ✨ Features

### Core Features
- **🔐 Google OAuth Authentication** - Seamless sign-up and login using Google accounts only
- **📌 Add Bookmarks** - Clean, validated input form for saving URLs with titles and descriptions
- **🔒 Private Bookmarks** - Complete data isolation using Supabase Row Level Security (RLS)
- **⚡ Real-Time Sync** - Instant updates across multiple tabs using Supabase Realtime subscriptions
- **🗑️ Delete with Confirmation** - Safe deletion with confirmation dialogs to prevent accidents
- **🚀 Deployed on Vercel** - Production-ready deployment with CI/CD

### Bonus Feature: Smart Search & Filter
- **🔍 Instant Search** - Real-time filtering by title, URL, or description
- **📊 Results Counter** - Shows matching results vs total bookmarks
- **💡 Empty State Handling** - Clear messaging when no results match
- **Why I Chose This:** A bookmark manager is only useful if you can find your bookmarks quickly. As users accumulate hundreds of bookmarks, search becomes critical. This feature dramatically improves the user experience by making it effortless to locate saved links, even in large collections.

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Authentication:** Supabase Auth (Google OAuth)
- **Database:** PostgreSQL with Supabase
- **Real-time:** Supabase Realtime Subscriptions
- **Styling:** Tailwind CSS 4
- **Deployment:** Vercel
- **Icons:** Lucide React
- **Type Safety:** TypeScript

## 📋 Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier is fine)
- A Vercel account (free tier is fine)
- Google Cloud Console account for OAuth credentials

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone <https://github.com/AMITPYT/smartBookMark.git>
cd smartBookmarkApp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your project URL and anon key

2. **Set Up Database Schema**
   - Go to SQL Editor in your Supabase dashboard
   - Copy the contents of `supabase-schema.sql`
   - Run the SQL script to create the bookmarks table with RLS policies

3. **Enable Google OAuth**
   - Go to Authentication → Providers in Supabase
   - Enable Google provider
   - You'll need OAuth credentials from Google Cloud Console (see next step)

### 4. Set Up Google OAuth

1. **Create Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select existing one
   - Enable Google+ API

2. **Create OAuth 2.0 Credentials**
   - Go to APIs & Services → Credentials
   - Create OAuth 2.0 Client ID
   - Application type: Web application
   - Add authorized redirect URI:
     ```
     https://<your-supabase-project-id>.supabase.co/auth/v1/callback
     ```
   - For local development, also add:
     ```
     http://localhost:3000/auth/callback
     ```

3. **Configure Supabase**
   - Copy the Client ID and Client Secret from Google
   - Paste them into Supabase's Google OAuth provider settings

### 5. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production on Vercel, update `NEXT_PUBLIC_SITE_URL` to your Vercel deployment URL.

### 6. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🌐 Deploy to Vercel

### Option 1: Vercel Dashboard (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (your Vercel deployment URL)
5. Click Deploy

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts to configure and deploy.

### Important: Update Supabase OAuth Redirect URI

After deployment, add your Vercel URL to Google OAuth authorized redirect URIs:
```
https://your-vercel-app.vercel.app/auth/callback
```

## 📁 Project Structure

```
smartBookmarkApp/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── callback/
│   │   │   │   └── route.ts          # OAuth callback handler
│   │   │   └── page.tsx              # Login page
│   │   ├── (dashboard)/
│   │   │   └── dashboard/
│   │   │       └── page.tsx          # Dashboard page
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home redirect
│   │   └── globals.css               # Global styles
│   ├── components/
│   │   ├── AddBookmarkForm.tsx       # Add bookmark modal
│   │   ├── BookmarkCard.tsx          # Bookmark display card
│   │   ├── DashboardContent.tsx      # Main dashboard with real-time
│   │   ├── DeleteBookmarkDialog.tsx  # Delete confirmation
│   │   └── SearchBar.tsx             # Search component (bonus)
│   ├── lib/
│   │   ├── actions/
│   │   │   ├── auth.ts               # Auth server actions
│   │   │   └── bookmarks.ts          # Bookmark CRUD actions
│   │   └── supabase/
│   │       ├── client.ts             # Browser client
│   │       └── server.ts             # Server client
│   └── types/
│       └── database.types.ts         # TypeScript types
├── middleware.ts                      # Auth middleware
├── supabase-schema.sql               # Database schema
├── .env.local.example                # Environment template
└── package.json
```

## 🔒 Security Features

### Row Level Security (RLS)
All database operations are protected by RLS policies:
- Users can only SELECT their own bookmarks
- Users can only INSERT bookmarks with their user_id
- Users can only UPDATE their own bookmarks
- Users can only DELETE their own bookmarks

This ensures complete data isolation at the database level, not just in the application layer.

### Authentication Flow
- Protected routes enforced via Next.js middleware
- Session management handled by Supabase SSR
- Secure cookie-based authentication

## 🎨 UI/UX Highlights

- **Professional Design** - Clean, modern interface with proper spacing and typography
- **Responsive Layout** - Works beautifully on mobile, tablet, and desktop
- **Loading States** - Clear feedback during async operations
- **Empty States** - Helpful messaging when no bookmarks exist
- **Smooth Animations** - Polished transitions and micro-interactions
- **Hover Effects** - Interactive elements with visual feedback
- **Form Validation** - Client and server-side validation with clear error messages

## 📝 API Routes

### Server Actions
- `signInWithGoogle()` - Initiates Google OAuth flow
- `signOut()` - Signs out current user
- `addBookmark(formData)` - Creates new bookmark
- `deleteBookmark(id)` - Deletes bookmark by ID

### Real-time Subscription
The dashboard subscribes to all changes on the bookmarks table and automatically refreshes when:
- A bookmark is added
- A bookmark is deleted
- A bookmark is updated

## 🧪 Testing

Test the real-time sync:
1. Open the app in two browser tabs
2. Log in with the same Google account in both
3. Add a bookmark in one tab
4. Watch it appear instantly in the other tab

Test RLS:
1. Log in with User A, add some bookmarks
2. Log in with User B in a different browser/incognito
3. Verify User B cannot see User A's bookmarks

## 🐛 Troubleshooting

**Google OAuth not working?**
- Check that redirect URIs match exactly in Google Cloud Console and Supabase
- Verify OAuth consent screen is configured in Google Cloud Console

**Real-time not syncing?**
- Ensure `supabase_realtime` publication includes the bookmarks table
- Check browser console for WebSocket connection errors

**RLS blocking queries?**
- Verify RLS policies are correctly set up in Supabase
- Check that user is authenticated before making queries

## 📄 License

MIT License - feel free to use this project for learning or production.

## 🤝 Credits

Built with:
- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

---

**Note:** This project was built as a technical assessment to demonstrate full-stack development skills, security best practices, and product sense.
