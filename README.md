QuickServe

Your problem. Our professionals. One simple solution.

QuickServe is a modern service-booking and complaint-management MVP built for Hackathon Task – C: Beginner to Intermediate Modern Web & App Development Hackathon.

Core workflow: Customer → Browse → Book → Provider Accepts → In Progress → Completed → Review

1. Problem Statement

Customers often find local service providers through scattered WhatsApp messages, social media, or phone calls. QuickServe provides one focused platform where customers can discover professionals, submit service requests, receive a ticket ID, track progress, and review completed services.

Providers can view assigned requests, prioritize them, accept/reject requests, start work, complete jobs, and view customer reviews.

The MVP prioritizes a complete working workflow over unnecessary features.

2. Users

Customer

Register and log in

Browse/search/filter providers

View provider details

Submit complaints/service requests

Select service and provider

Choose date, time, location, description, and priority

Receive a unique ticket ID

Track request status

View request history

Review completed services with 1–5 stars and written feedback

Service Provider

Register and log in

Access provider dashboard

View incoming assigned requests

View priority and request details

Accept or reject pending requests

Start accepted work

Mark work as completed

View active jobs

View completed jobs

View ratings and reviews

3. Mandatory Features

Requirement

QuickServe Implementation

Responsive home/services page

Modern responsive landing page

At least 6 services/providers

Plumbing, Electrical, AC Repair, Cleaning, Carpentry, Appliance Repair

Search/filter providers

Provider search and category filtering

Provider details

Name, service, location, experience, price, rating

Authentication

Supabase Auth

Customer dashboard

Statistics, service-request form, request history

Booking form

Service, provider, date, time, location, description, priority

Unique booking ID

IDs such as QS-2026-847291

Customer status tracking

Request cards + status timeline

Provider dashboard

Incoming, Active Jobs, Completed Jobs, Reviews

Accept/Reject

Pending provider requests

In Progress

Accepted request can be started

Completed

Provider can complete active work

Reviews

1–5 star rating + written review

Persistence

Supabase PostgreSQL

Validation/business rules

Frontend validation + database constraints/RLS

Responsive UI

Desktop, tablet, mobile

GSAP animations

Lightweight entrance, card, hover, and modal animations

4. Required Booking Workflow

Customer Login
      ↓
Customer Dashboard
      ↓
Report a Problem
      ↓
Choose Service
      ↓
Choose Provider
      ↓
Set Priority
      ↓
Enter Date / Time / Location / Description
      ↓
Create Service Request
      ↓
Unique Ticket ID
      ↓
PENDING
      ↓
Provider Dashboard
      ↓
ACCEPT
      ↓
ACCEPTED
      ↓
START WORK
      ↓
IN PROGRESS
      ↓
MARK COMPLETED
      ↓
COMPLETED
      ↓
Customer Dashboard
      ↓
★★★★★ Review

Rejected requests follow:

PENDING → REJECTED

5. Business Rules

Every booking has a unique ticket ID.

Required booking fields must be validated.

Customers cannot review a booking before it is completed.

A customer cannot submit more than one review for the same booking.

A rejected booking cannot become In Progress.

A completed booking cannot be edited through the normal workflow.

Only the assigned provider can update provider-side booking status.

Customers can access their own bookings.

Providers can access their assigned bookings.

Booking and review data persist in Supabase after refreshing the browser.

6. Technology Stack

Frontend

HTML5

CSS3

Vanilla JavaScript ES6+

Bootstrap 5 via CDN

GSAP

Inter font

Backend / Database

Supabase Authentication

Supabase PostgreSQL

Supabase Row Level Security (RLS)

Not Used

React

Next.js

Vue

Angular

TypeScript

Node.js

Express

Firebase

Tailwind CSS

7. Project Structure

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

8. Pages

index.html

Landing page containing:

Navbar

Hero

Statistics

Popular services

How It Works

CTA

Footer

auth.html

Authentication page containing:

Login

Registration

Customer/provider role selection

Provider-specific registration fields

dashboard.html

Customer dashboard containing:

Request statistics

Report Problem form

My Requests

Ticket details

Status timeline

Review section

providers.html

Provider discovery page containing:

Search

Category filter

Provider cards

Ratings

Experience

Location

Starting price

provider-details.html

Provider profile page using:

provider-details.html?id=123

Contains:

Provider information

Service

Location

Experience

Rating

Price

Reviews

Book This Professional button

provider-dashboard.html

Provider management dashboard containing:

Incoming Requests

Active Jobs

Completed Jobs

Reviews

Statistics

Accept

Reject

Start Work

Mark Completed

9. Provider Dashboard

The provider dashboard has four important working sections.

Incoming Requests

Shows pending requests assigned to the logged-in provider.

Actions:

Accept

Reject

Active Jobs

Shows accepted and in-progress jobs.

Actions:

Start Work

Mark Completed

Completed Jobs

Shows jobs whose status is completed.

Reviews

Shows customer ratings and written reviews belonging to the logged-in provider.

Troubleshooting Active Jobs / Reviews

If these sections appear empty during testing:

Confirm the logged-in account has role = provider in profiles.

Confirm a matching row exists in providers.

Confirm providers.user_id matches the authenticated user's ID.

Confirm bookings use that provider's id in bookings.provider_id.

Confirm the booking has reached accepted, in_progress, or completed.

Confirm reviews use the same provider_id.

Check the browser console for Supabase errors.

Check Supabase Table Editor to confirm the records exist.

Confirm RLS policies allow the provider to read their assigned bookings/reviews.

The dashboard should query the logged-in provider's identity, not display arbitrary bookings or reviews.

10. Supabase Database

QuickServe uses four primary tables.

profiles

id
full_name
email
role
avatar_url
created_at

Roles:

customer
provider

providers

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

bookings

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

Statuses:

pending
accepted
in_progress
completed
rejected

Priorities:

urgent
important
normal
low

reviews

id
booking_id
customer_id
provider_id
rating
review_text
created_at

11. Database Relationships

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

Relationships:

providers.user_id    → profiles.id
bookings.customer_id → profiles.id
bookings.provider_id → providers.id
reviews.booking_id   → bookings.id
reviews.customer_id  → profiles.id
reviews.provider_id  → providers.id

12. Supabase Setup

Step 1 — Create Project

Create a Supabase project at:

https://supabase.com/

Step 2 — Open SQL Editor

Supabase Dashboard
    ↓
SQL Editor
    ↓
New Query

Step 3 — Run supabase.sql

Open the project's supabase.sql, copy the complete SQL, paste it into Supabase SQL Editor, and click Run.

This creates the tables, constraints, RLS policies, and demo provider data.

Step 4 — Check Tables

Open:

Table Editor

Verify:

profiles
providers
bookings
reviews

13. Supabase Credentials

Open:

js/supabase.js

Find:

const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

Replace them with your Supabase project URL and client-side publishable/anon key.

Do not put a service_role or secret key in frontend JavaScript.

14. Authentication

QuickServe uses Supabase Auth.

Registration:

supabase.auth.signUp()

Login:

supabase.auth.signInWithPassword()

Logout:

supabase.auth.signOut()

Current user:

supabase.auth.getUser()

Role-based redirect:

customer → dashboard.html

provider → provider-dashboard.html

For a hackathon demo, configure email confirmation according to your testing needs so you do not get blocked waiting for confirmation emails.

15. Sample Providers

The project includes fictional demo providers:

Provider

Service

Location

Experience

Rating

Ali Khan

Plumbing

Karachi

8 years

4.8

Ahmed Raza

Electrical

Karachi

6 years

4.7

Usman Malik

AC Repair

Karachi

7 years

4.9

Hamza Sheikh

Cleaning

Karachi

5 years

4.6

Bilal Ahmed

Carpentry

Karachi

9 years

4.8

Saad Hussain

Appliance Repair

Karachi

6 years

4.7

All provider information is fictional demo data.

16. Running Locally

Recommended:

Open the project in VS Code.

Install the Live Server extension.

Right-click index.html.

Select Open with Live Server.

Example:

http://127.0.0.1:5500/

Using an HTTP server is recommended instead of opening HTML files directly with file:///.

17. Customer Test

Create a customer account.

Example:

Role: Customer
Email: demo.customer@example.com
Password: Customer123!

Test:

Login
→ Dashboard
→ Report Problem
→ Plumbing
→ Ali Khan
→ Urgent
→ Date / Time
→ Location
→ Description
→ Create Service Request

Expected result:

QS-2026-XXXXXX
Status: Pending

The ticket should also appear in the customer's My Requests section.

18. Provider Test

Create a provider account.

Example:

Role: Provider
Email: demo.provider@example.com
Password: Provider123!
Service: Plumbing
Experience: 8
Location: Karachi
Price: 1500

Then:

Provider Login
→ Provider Dashboard
→ Incoming Requests
→ Accept
→ Start Work
→ Mark Completed

Expected status progression:

pending
   ↓
accepted
   ↓
in_progress
   ↓
completed

19. Review Test

Return to the customer account.

Open the completed ticket.

The review interface should now appear:

☆ ☆ ☆ ☆ ☆

Select a rating from 1–5 stars and enter written feedback.

Example:

Excellent service. The issue was resolved quickly.

Submit the review.

The review should be stored in the reviews table and displayed in the provider's Reviews section.

A second review for the same booking must be blocked.

20. Priority System

Urgent

Requires immediate attention.

Important

Needs relatively quick attention.

Normal

Standard service request.

Low Priority

Non-urgent request.

Provider requests should visually communicate priority.

21. Status System

Normal workflow:

PENDING
   ↓
ACCEPTED
   ↓
IN PROGRESS
   ↓
COMPLETED

Rejected workflow:

PENDING
   ↓
REJECTED

22. UI/UX

QuickServe uses a modern SaaS visual style.

Color Palette

Primary:     #2563EB
Dark:        #0F172A
Background:  #F8FAFC
White:       #FFFFFF
Success:     #16A34A
Warning:     #F59E0B
Danger:      #EF4444
Accent:      #7C3AED

Design characteristics:

Rounded cards

Subtle shadows

Clean borders

Spacious layouts

Modern buttons

Responsive dashboards

Status badges

Toast notifications

Loading states

Lightweight GSAP animations

23. Responsive Design

QuickServe is designed for:

Desktop

Tablet

Mobile

Mobile behavior:

Sidebar becomes mobile navigation

Cards become single-column

Forms stack vertically

Tables can become horizontally scrollable/responsive

24. Persistence

Main application data is stored in Supabase instead of browser localStorage.

Customer
   ↓
Create Request
   ↓
Supabase
   ↓
Refresh Browser
   ↓
Request Still Exists

Stored data includes:

Profiles

Providers

Bookings

Reviews

25. RLS / Security

Row Level Security should remain enabled.

Intended access model:

Customer

Can:

Read/update their own profile

Create bookings

Read their own bookings

Create eligible reviews

Read provider information

Provider

Can:

Read assigned bookings

Update status of assigned bookings

Read their own reviews

Manage permitted provider information

Frontend JavaScript should not be treated as the security layer. Database RLS is required to enforce access.

26. Optional Features

Not prioritized in this MVP:

AI service assistant

Payments

Live chat

Maps

Image upload

Advanced notifications

Admin panel

PWA

The mandatory workflow has priority.

27. Hackathon Evaluation Mapping

Evaluation Area

Marks

QuickServe

Core booking workflow

30

Customer → Provider → Completion → Review

React/JavaScript functionality

15

Vanilla JavaScript ES6+

Database & persistence

15

Supabase PostgreSQL

Authentication & role-based features

10

Supabase Auth + roles

UI/UX & responsive design

15

Responsive modern SaaS UI

Validation, search/filtering & business rules

10

Forms, filters, validation, workflow rules

Deployment & code quality

5

Static deployment-ready project

Total

100

MVP-focused implementation

28. Submission Checklist

GitHub repository created

Application deployed

Supabase configured

SQL executed

RLS enabled

6+ providers available

Customer registration tested

Customer login tested

Provider registration tested

Provider login tested

Booking creation tested

Unique ticket ID generated

Provider receives booking

Accept tested

Reject tested

Start Work tested

Complete tested

Customer sees Completed

1–5 star review tested

Duplicate review prevented

Browser refresh persistence tested

Mobile layout tested

Demo credentials prepared

AI tools used during development declared

29. Recommended Live Demo

Customer

Login
→ Dashboard
→ Report Problem
→ Plumbing
→ Ali Khan
→ Urgent
→ Submit
→ Ticket ID

Provider

Provider Login
→ Incoming Request
→ Accept
→ Start Work
→ Mark Completed

Customer

Customer Dashboard
→ Completed Ticket
→ 5 Stars
→ Written Review
→ Submit

This demonstrates the complete mandatory workflow in a short live demo.

30. Deployment

QuickServe is a static frontend application and can be deployed to:

Netlify

Vercel

GitHub Pages

Similar static hosting services

Before deployment:

Configure Supabase credentials.

Run the SQL schema.

Verify RLS.

Test customer authentication.

Test provider authentication.

Test the complete booking lifecycle.

Push the project to GitHub.

Connect the repository to your hosting provider.

Deploy.

Test the deployed URL.

31. Demo Credentials

Create dedicated demo accounts in Supabase.

Recommended format:

CUSTOMER
Email: insharahamin1250@gmail.com
Password: 123456

PROVIDER
Email: provider@gmail.com
Password: 123456

Do not publish personal account credentials.

32. AI Disclosure

chatgpt

Example:

AI Assistance:
ChatGPT was used for development assistance, UI planning,
debugging, code generation, and documentation.

33. Final Project Goal

QuickServe demonstrates a complete real-world service-request lifecycle:

CUSTOMER
   ↓
BOOK
   ↓
TICKET CREATED
   ↓
PROVIDER RECEIVES
   ↓
ACCEPT
   ↓
IN PROGRESS
   ↓
COMPLETED
   ↓
CUSTOMER REVIEWS

QuickServe — Your problem. Our professionals. One simple solution.
