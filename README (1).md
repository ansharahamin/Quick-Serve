# 🚀 QuickServe

> **Your problem. Our professionals. One simple solution.**

QuickServe is a **modern service-booking and complaint-management web application** built for:

## 🏆 Hackathon Task – C
### Beginner to Intermediate — Modern Web & App Development Hackathon

QuickServe connects **customers** with **local service providers** and manages the complete service-request lifecycle.

**Core Flow:**

**Customer → Browse → Book → Provider Accepts → In Progress → Completed → Review ⭐**

---

## 💡 1. Problem Statement

Customers often find local service providers through scattered **WhatsApp messages, social media, or phone calls**.

QuickServe provides one focused platform where customers can:

- 🔎 Discover service providers
- 📝 Submit service requests
- 🎫 Receive a unique booking/ticket ID
- 📍 Provide service location and details
- ⏱️ Select date, time, and priority
- 📊 Track request status
- ⭐ Review the provider after completion

Service providers can manage incoming requests, update job status, complete work, and view customer feedback.

---

# 👥 2. Users

## 👤 Customer

Customers can:

- ✅ Register and log in
- ✅ Browse service providers
- ✅ Search and filter providers
- ✅ View provider details
- ✅ Submit complaints/service requests
- ✅ Select a service provider
- ✅ Choose date and time
- ✅ Enter location and problem description
- ✅ Set request priority
- ✅ Generate a unique ticket ID
- ✅ Track booking status
- ✅ View booking history
- ✅ Submit a **1–5 star review** after completion

## 🧑‍🔧 Service Provider

Providers can:

- ✅ Register and log in
- ✅ Access the provider dashboard
- ✅ View incoming requests
- ✅ View request priority and details
- ✅ Accept pending bookings
- ✅ Reject pending bookings
- ✅ Start accepted work
- ✅ Mark work as completed
- ✅ View **Active Jobs**
- ✅ View **Completed Jobs**
- ✅ View customer ratings and reviews

---

# ✨ 3. Mandatory Features

| Requirement | QuickServe Implementation |
|---|---|
| 🏠 Responsive home/services page | Modern responsive landing page |
| 🧰 At least 6 services/providers | Plumbing, Electrical, AC Repair, Cleaning, Carpentry, Appliance Repair |
| 🔎 Search/filter providers | Search + service-category filtering |
| 👨‍🔧 Provider details | Name, service, location, experience, price, rating |
| 🔐 Authentication | Supabase Authentication |
| 📋 Customer dashboard | Statistics + request form + booking history |
| 📝 Booking form | Service, provider, date, time, location, description, priority |
| 🎫 Unique booking ID | Example: `QS-2026-847291` |
| 📊 Customer tracking | Status badges + status timeline |
| 🧑‍🔧 Provider dashboard | Incoming Requests + Active Jobs + Completed Jobs + Reviews |
| ✅ Accept/Reject | Available for pending requests |
| ⚙️ In Progress | Accepted job can be started |
| 🏁 Completed | Provider can complete active work |
| ⭐ Reviews | 1–5 star rating + written feedback |
| 💾 Persistence | Supabase PostgreSQL |
| 🛡️ Security | Supabase RLS |
| 📱 Responsive UI | Desktop, tablet, and mobile |
| 🎬 Animations | GSAP |

---

# 🔄 4. Required Booking Workflow

```text
👤 Customer Login
        ↓
📊 Customer Dashboard
        ↓
📝 Report a Problem
        ↓
🧰 Choose Service
        ↓
🧑‍🔧 Choose Provider
        ↓
🚨 Set Priority
        ↓
📅 Date + Time
        ↓
📍 Location
        ↓
📝 Problem Description
        ↓
🎫 Create Service Request
        ↓
🆔 Unique Ticket ID
        ↓
🟡 PENDING
        ↓
🧑‍🔧 Provider Dashboard
        ↓
✅ ACCEPT
        ↓
🔵 ACCEPTED
        ↓
▶️ START WORK
        ↓
🟣 IN PROGRESS
        ↓
🏁 MARK COMPLETED
        ↓
🟢 COMPLETED
        ↓
⭐ CUSTOMER REVIEW
```

### Rejected Request Flow

```text
🟡 PENDING
    ↓
❌ REJECTED
```

---

# 📏 5. Business Rules

QuickServe follows these rules:

1. 🎫 Every booking must have a **unique booking ID**.
2. ✅ Required fields must be validated before submission.
3. ⭐ A customer **cannot review before completion**.
4. 🚫 A customer can submit **only one review per booking**.
5. ❌ A rejected booking cannot move to **In Progress**.
6. 🔒 A completed booking cannot be edited through the normal workflow.
7. 🧑‍🔧 Only the assigned provider can update the provider-side booking status.
8. 👤 Customers can access their own bookings.
9. 🧑‍🔧 Providers can access their assigned bookings.
10. 💾 Booking data persists after refreshing because it is stored in Supabase.

---

# 🛠️ 6. Technology Stack

## Frontend

- 🌐 **HTML5**
- 🎨 **CSS3**
- ⚡ **Vanilla JavaScript (ES6+)**
- 🧩 **Bootstrap 5 via CDN**
- 🎬 **GSAP**
- 🔤 **Inter Font**

## Backend & Database

- 🔐 **Supabase Authentication**
- 🗄️ **Supabase PostgreSQL**
- 🛡️ **Row Level Security (RLS)**

## 🚫 Not Used

- React
- Next.js
- Vue
- Angular
- TypeScript
- Node.js
- Express
- Firebase
- Tailwind CSS

---

# 📁 7. Project Structure

```text
quickserve/
│
├── index.html
├── auth.html
├── dashboard.html
├── providers.html
├── provider-details.html
├── provider-dashboard.html
│
├── css/
│   ├── style.css
│   ├── auth.css
│   ├── dashboard.css
│   └── provider.css
│
├── js/
│   ├── supabase.js
│   ├── auth.js
│   ├── dashboard.js
│   ├── providers.js
│   ├── provider-details.js
│   ├── provider-dashboard.js
│   └── utils.js
│
├── supabase.sql
└── README.md
```

---

# 📄 8. Application Pages

## 🏠 `index.html`

Landing page containing:

- Navigation
- Hero section
- Statistics
- Popular service cards
- How It Works
- Call-to-action
- Footer

## 🔐 `auth.html`

Authentication page containing:

- Login
- Registration
- Customer / Provider role selection
- Provider registration details

## 📊 `dashboard.html`

Customer dashboard containing:

- Request statistics
- Report Problem form
- My Requests
- Ticket status timeline
- Review section

## 👨‍🔧 `providers.html`

Provider discovery page containing:

- Search
- Category filter
- Provider cards
- Ratings
- Experience
- Location
- Starting price

## 👤 `provider-details.html`

Provider profile page using:

```text
provider-details.html?id=123
```

Shows:

- Provider name
- Service
- Location
- Experience
- Rating
- Starting price
- Reviews
- Book This Professional

## 🧑‍🔧 `provider-dashboard.html`

Provider management dashboard containing:

- 📥 Incoming Requests
- ⚡ Active Jobs
- ✅ Completed Jobs
- ⭐ Reviews
- 📊 Provider statistics
- Accept
- Reject
- Start Work
- Mark Completed

---

# 📥 9. Provider Dashboard

The Provider Dashboard is divided into four main sections.

## 📥 Incoming Requests

Shows **pending requests assigned to the logged-in provider**.

Available actions:

- ✅ Accept
- ❌ Reject

## ⚡ Active Jobs

Shows:

- Accepted jobs
- In-progress jobs

Available actions:

- ▶️ Start Work
- ✅ Mark Completed

## ✅ Completed Jobs

Shows all bookings whose status is:

```text
completed
```

## ⭐ Reviews

Shows customer reviews and ratings belonging to the logged-in provider.

### 🔧 If Active Jobs or Reviews Are Empty

Check:

1. The account has `role = provider` in `profiles`.
2. The provider exists in the `providers` table.
3. `providers.user_id` matches the authenticated user's ID.
4. Booking `provider_id` matches the provider's ID.
5. The booking status is `accepted`, `in_progress`, or `completed`.
6. Reviews use the correct `provider_id`.
7. Supabase RLS policies allow the provider to read assigned records.
8. The browser console has no Supabase errors.

---

# 🗄️ 10. Supabase Database

QuickServe uses four main tables.

## `profiles`

```text
id
full_name
email
role
avatar_url
created_at
```

Roles:

```text
customer
provider
```

## `providers`

```text
id
user_id
name
service_category
location
experience
price
rating
description
created_at
```

## `bookings`

```text
id
ticket_id
customer_id
provider_id
service_category
date
time
location
description
priority
status
created_at
updated_at
```

### Status Values

```text
pending
accepted
in_progress
completed
rejected
```

### Priority Values

```text
urgent
important
normal
low
```

## `reviews`

```text
id
booking_id
customer_id
provider_id
rating
review_text
created_at
```

---

# 🔗 11. Database Relationships

```text
Supabase Auth User
        │
        ▼
    profiles
        │
        │ provider
        ▼
    providers
        │
        ▼
    bookings
        │
        ▼
     reviews
```

Relationships:

```text
providers.user_id     → profiles.id
bookings.customer_id  → profiles.id
bookings.provider_id  → providers.id
reviews.booking_id    → bookings.id
reviews.customer_id   → profiles.id
reviews.provider_id   → providers.id
```

---

# 🔐 12. Supabase Setup

## Step 1 — Create Supabase Project

Create your project at:

**https://supabase.com/**

## Step 2 — Open SQL Editor

```text
Supabase Dashboard
        ↓
SQL Editor
        ↓
New Query
```

## Step 3 — Run `supabase.sql`

Open:

```text
supabase.sql
```

Copy the complete SQL into Supabase SQL Editor and click **Run**.

## Step 4 — Check Tables

Open:

```text
Table Editor
```

Verify:

```text
profiles
providers
bookings
reviews
```

---

# 🔑 13. Supabase Credentials

Open:

```text
js/supabase.js
```

Find:

```javascript
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
```

Replace these with your Supabase project credentials.

### ⚠️ Security Warning

Do **NOT** put a `service_role` or secret key in frontend JavaScript.

Use the client-side **publishable/anon key**.

---

# 🔐 14. Authentication

QuickServe uses Supabase Auth.

### Registration

```javascript
supabase.auth.signUp()
```

### Login

```javascript
supabase.auth.signInWithPassword()
```

### Logout

```javascript
supabase.auth.signOut()
```

### Get Current User

```javascript
supabase.auth.getUser()
```

### Role-Based Redirect

```text
Customer
   ↓
dashboard.html
```

```text
Provider
   ↓
provider-dashboard.html
```

---

# 🧑‍🔧 15. Sample Providers

QuickServe supports at least six service categories.

| 👨‍🔧 Provider | 🧰 Service | 📍 Location | ⏳ Experience | ⭐ Rating |
|---|---|---|---:|---:|
| Ali Khan | Plumbing | Karachi | 8 years | 4.8 |
| Ahmed Raza | Electrical | Karachi | 6 years | 4.7 |
| Usman Malik | AC Repair | Karachi | 7 years | 4.9 |
| Hamza Sheikh | Cleaning | Karachi | 5 years | 4.6 |
| Bilal Ahmed | Carpentry | Karachi | 9 years | 4.8 |
| Saad Hussain | Appliance Repair | Karachi | 6 years | 4.7 |

> **Note:** Provider information is fictional demo data.

---

# ▶️ 16. Running Locally

The application uses JavaScript ES modules, so it should be served through an HTTP server.

### Recommended: VS Code Live Server

1. Open the QuickServe folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html`.
4. Select **Open with Live Server**.

Example:

```text
http://127.0.0.1:5500/
```

---

# 👤 17. Customer Demo

Create a customer account.

Example:

```text
Role: Customer
Email: demo.customer@example.com
Password: Customer123!
```

Test:

```text
Login
  ↓
Dashboard
  ↓
Report Problem
  ↓
Plumbing
  ↓
Ali Khan
  ↓
Urgent
  ↓
Date / Time
  ↓
Location
  ↓
Description
  ↓
Create Service Request
```

Expected result:

```text
🎫 QS-2026-XXXXXX

Status: Pending
```

---

# 🧑‍🔧 18. Provider Demo

Create a provider account.

Example:

```text
Role: Provider
Email: demo.provider@example.com
Password: Provider123!
Service: Plumbing
Experience: 8
Location: Karachi
Price: 1500
```

Then:

```text
Provider Login
       ↓
Provider Dashboard
       ↓
Incoming Request
       ↓
Accept
       ↓
Start Work
       ↓
Mark Completed
```

Expected progression:

```text
🟡 pending
     ↓
🔵 accepted
     ↓
🟣 in_progress
     ↓
🟢 completed
```

---

# ⭐ 19. Review Test

After the provider completes the service:

```text
Customer Dashboard
        ↓
Completed Request
        ↓
⭐ Leave a Review
        ↓
☆☆☆☆☆
```

Customer chooses **1–5 stars** and enters written feedback.

Example:

> **Excellent service. The issue was resolved quickly and professionally.**

Then click:

**Submit Review**

The review is stored in the `reviews` table.

A second review for the same booking must not be allowed.

---

# 🚨 20. Priority System

QuickServe supports four priorities.

### 🔴 Urgent

Immediate attention required.

### 🟡 Important

Needs relatively quick attention.

### 🔵 Normal

Standard service request.

### ⚪ Low Priority

Non-urgent request.

---

# 📊 21. Status System

Normal workflow:

```text
🟡 PENDING
      ↓
🔵 ACCEPTED
      ↓
🟣 IN PROGRESS
      ↓
🟢 COMPLETED
```

Rejected workflow:

```text
🟡 PENDING
      ↓
🔴 REJECTED
```

---

# 🎨 22. UI/UX

QuickServe follows a **modern SaaS design**.

## 🎨 Color Palette

| Color | Hex |
|---|---|
| 🔵 Primary | `#2563EB` |
| 🌑 Dark | `#0F172A` |
| 🩶 Background | `#F8FAFC` |
| ⚪ White | `#FFFFFF` |
| 🟢 Success | `#16A34A` |
| 🟡 Warning | `#F59E0B` |
| 🔴 Danger | `#EF4444` |
| 🟣 Accent | `#7C3AED` |

### Design Characteristics

- ✨ Rounded cards
- 🌫️ Subtle shadows
- 📏 Clean borders
- 📐 Spacious layouts
- 🔘 Modern buttons
- 📱 Responsive dashboards
- 🏷️ Status badges
- 🔔 Toast notifications
- ⏳ Loading states
- 🎬 GSAP animations

---

# 📱 23. Responsive Design

QuickServe supports:

- 🖥️ Desktop
- 💻 Tablet
- 📱 Mobile

On mobile:

- Sidebar becomes a mobile menu
- Cards become single-column
- Forms stack vertically
- Tables become responsive/scrollable

---

# 💾 24. Data Persistence

QuickServe stores the main application data in Supabase rather than relying on browser localStorage.

```text
Customer creates booking
        ↓
Supabase Database
        ↓
Browser Refresh
        ↓
Booking still exists ✅
```

Persistent data includes:

- 👤 Profiles
- 🧑‍🔧 Providers
- 🎫 Bookings
- ⭐ Reviews

---

# 🛡️ 25. Security / RLS

Row Level Security should remain enabled.

## Customer

Can:

- Read/update own profile
- Create bookings
- Read own bookings
- Create eligible reviews
- Read provider information

## Provider

Can:

- Read assigned bookings
- Update assigned booking status
- Read their reviews
- Manage permitted provider information

> **Frontend JavaScript is not the security boundary. Supabase RLS provides database-level access control.**

---

# 🎁 26. Optional Bonus Features

The following are **not required for the MVP**:

- 🤖 AI Service Assistant
- 📷 Image upload
- ❤️ Favorite providers
- 📧 Email/notifications
- 🟢 Provider availability indicator
- 🌙 Dark mode
- 📲 PWA support
- 💬 Live chat
- 💳 Payments
- 🗺️ Maps

The mandatory workflow should be completed before adding bonus features.

---

# 🏆 27. Hackathon Evaluation Mapping

| Evaluation Area | Marks | QuickServe |
|---|---:|---|
| 🔄 Core booking workflow | **30** | Customer → Provider → Completion → Review |
| ⚡ JavaScript functionality | **15** | Vanilla JavaScript ES6+ |
| 💾 Database & persistence | **15** | Supabase PostgreSQL |
| 🔐 Authentication & roles | **10** | Supabase Auth + Customer/Provider roles |
| 🎨 UI/UX & responsiveness | **15** | Modern responsive SaaS UI |
| ✅ Validation/search/business rules | **10** | Forms, search, filters, workflow validation |
| 🚀 Deployment & code quality | **5** | Static deployment-ready project |
| **TOTAL** | **100** | **Complete MVP workflow** |

---

# ✅ 28. Submission Checklist

Before submitting:

- [ ] GitHub repository created
- [ ] Application deployed
- [ ] Supabase configured
- [ ] SQL executed successfully
- [ ] RLS enabled
- [ ] 6+ providers available
- [ ] Customer registration tested
- [ ] Customer login tested
- [ ] Provider registration tested
- [ ] Provider login tested
- [ ] Booking creation tested
- [ ] Unique ticket ID generated
- [ ] Provider receives booking
- [ ] Accept tested
- [ ] Reject tested
- [ ] Start Work tested
- [ ] Mark Completed tested
- [ ] Active Jobs visible
- [ ] Completed Jobs visible
- [ ] Reviews visible
- [ ] Customer sees completed booking
- [ ] 1–5 star review tested
- [ ] Duplicate review prevented
- [ ] Browser refresh persistence tested
- [ ] Mobile layout tested
- [ ] Demo credentials prepared
- [ ] AI tools declared

---

# 🎥 29. Recommended Live Demo

Keep the live demo simple and focused.

## 👤 Customer

```text
Login
   ↓
Dashboard
   ↓
Report Problem
   ↓
Plumbing
   ↓
Ali Khan
   ↓
Urgent
   ↓
Submit
   ↓
Ticket ID
```

## 🧑‍🔧 Provider

```text
Provider Login
   ↓
Incoming Request
   ↓
Accept
   ↓
Start Work
   ↓
Mark Completed
```

## ⭐ Customer

```text
Customer Dashboard
   ↓
Completed Ticket
   ↓
★★★★★
   ↓
Written Review
   ↓
Submit
```

This demonstrates the complete mandatory workflow in a short live demo.

---

# 🚀 30. Deployment

QuickServe is a static frontend application.

It can be deployed to:

- 🌐 Netlify
- ▲ Vercel
- 🐙 GitHub Pages
- ☁️ Other static hosting platforms

### Before Deployment

1. Add Supabase URL.
2. Add Supabase public/publishable key.
3. Run the SQL schema.
4. Verify RLS.
5. Test authentication.
6. Test customer booking.
7. Test provider workflow.
8. Test review submission.
9. Push code to GitHub.
10. Deploy.
11. Test the production URL.

---

# 🔑 31. Demo Credentials

Create dedicated demo accounts in Supabase.

### 👤 Customer

```text
Email: demo.customer@example.com
Password: [your demo password]
```

### 🧑‍🔧 Provider

```text
Email: demo.provider@example.com
Password: [your demo password]
```

> **Do not publish personal passwords or private credentials.**

---

# 🤖 32. AI Disclosure

If AI tools were used during development, declare them honestly.

Example:

```text
AI Assistance:
ChatGPT was used for development assistance, UI planning,
debugging, code generation, and documentation.
```

---

# 🎯 33. Project Goal

QuickServe demonstrates a complete real-world service-request lifecycle:

```text
👤 CUSTOMER
     ↓
📝 BOOK
     ↓
🎫 TICKET CREATED
     ↓
🧑‍🔧 PROVIDER RECEIVES
     ↓
✅ ACCEPT
     ↓
🟣 IN PROGRESS
     ↓
🟢 COMPLETED
     ↓
⭐ CUSTOMER REVIEWS
```

## 💙 QuickServe

**Your problem. Our professionals. One simple solution.**
