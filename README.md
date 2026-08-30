# QuickServe

QuickServe is a vanilla HTML/CSS/JavaScript + GSAP + Supabase service-booking hackathon MVP.

## Stack

- HTML5 / CSS3
- Vanilla JavaScript ES Modules
- GSAP
- Bootstrap 5 CDN
- Supabase Auth + PostgreSQL

No React, Node, Firebase, TypeScript or frontend framework.

## 1. Create Supabase project

Create a Supabase project, open **SQL Editor**, paste `supabase.sql`, and run it.

Then open **Project Settings → API** and copy:
- Project URL
- Publishable/Anon key

## 2. Add Supabase credentials

Open:

`js/supabase.js`

Replace:

```js
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
```

with your values.

Never put a Supabase service-role key in frontend code.

## 3. Email confirmation

For the fastest hackathon demo, you can turn off email confirmation in Supabase Auth settings, or keep it enabled and confirm registered demo accounts through email.

## 4. Run locally

Because the project uses ES modules, open it through a local HTTP server rather than `file://`.

Easy option in VS Code:
- Install Live Server
- Right-click `index.html`
- Open with Live Server

No npm install is required.

## 5. Demo flow

Create two accounts:

### Customer
Register as Customer.

### Provider
Register as Service Provider and select a service.

Then:

Customer login
→ Dashboard
→ Select service
→ Select provider
→ Enter complaint
→ Select priority
→ Create Request
→ Copy ticket ID

Provider login
→ Provider Dashboard
→ Accept
→ Start Work
→ Mark Completed

Customer login
→ My Requests
→ Leave Review
→ Select 1–5 stars
→ Submit Review

## 6. Deployment

Netlify:
1. Drag the `quickserve` folder into Netlify Drop, or connect the GitHub repository.
2. No build command is needed.
3. Publish directory is the project root.

Vercel:
1. Import the repository.
2. Framework preset: Other.
3. Build command: leave blank.
4. Output directory: `.`

## 7. Hackathon checklist

- [x] Responsive landing page
- [x] 6 service categories
- [x] Provider discovery/search/filter
- [x] Provider details
- [x] Supabase authentication
- [x] Customer/provider roles
- [x] Complaint/service form
- [x] Unique ticket IDs
- [x] Persistent bookings
- [x] Customer status tracking
- [x] Provider accept/reject
- [x] In Progress
- [x] Completed
- [x] 1–5 star review
- [x] One review per booking enforced by unique booking_id
- [x] RLS policies
- [x] GSAP animation
- [x] Mobile responsive UI

## AI disclosure

AI assistance was used during development for scaffolding, debugging assistance, UI ideas and code generation. Review and test the generated code before submission.
