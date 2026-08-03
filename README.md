FixItNow - Frontend Web App

"Your Trusted Home Service Platform"
A modern, responsive, and feature-rich client-side web application for the multi-vendor home service marketplace, built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

📌 Live Demo & Resources
Live Application URL: fix-it-now-forntend.vercel.app
Connected Backend API: fix-it-now-mocha.vercel.app
GitHub Repository: shehabRabby/FixItNow-Frontend
📖 Table of Contents
Overview
Tech Stack
Key Features
User Roles & Dashboard Experience
Project Architecture & Directory Structure
UI/UX & Animation Highlights
Application Flow Diagrams
Core Frontend Modules
Environment Setup
Getting Started (Local Development)
Build & Deployment
🚀 Overview

FixItNow (Frontend) is the user-facing web interface of the FixItNow ecosystem. The application communicates seamlessly with the RESTful backend API to provide a smooth, responsive, and intuitive user experience.

Customers can discover trusted local technicians, schedule home services, complete secure online payments through Stripe, and track service progress in real time. Technicians receive dedicated management dashboards for handling availability and bookings, while administrators gain full platform oversight through role-based control panels.

The frontend is designed with performance, scalability, accessibility, and responsive design as core priorities, ensuring a consistent experience across desktop, tablet, and mobile devices.

💻 Tech Stack
Domain	Technology / Library
Framework	Next.js (App Router)
Programming Language	TypeScript
Styling & UI	Tailwind CSS
Icons	Lucide React
Animations & Interactions	Framer Motion
State Management	React Hooks, Context API
Form Handling	React Hook Form
Validation	Zod
HTTP Client	Fetch API / Axios
Payment Integration	Stripe Elements / Checkout
Deployment Platform	Vercel
✨ Key Features
🌐 Public Features
Explore home service categories including plumbing, electrical repair, painting, AC servicing, and house cleaning.
Advanced search and filtering by category, location, pricing, and customer ratings.
View detailed technician profiles with experience, skills, pricing, and verified customer reviews.
Responsive landing pages with modern UI components and optimized performance.
👤 Customer Features
Secure registration and login with protected authentication flows.
Interactive service booking with preferred time-slot selection.
Secure online payment through Stripe Checkout.
Real-time booking status timeline.
Booking history and order management.
Submit ratings and reviews for completed services.
Personal profile management.
🛠️ Technician Dashboard
Create and update professional technician profiles.
Manage working schedules and availability.
Accept or decline incoming booking requests.
Track active jobs.
Update booking progress from ACCEPTED → IN_PROGRESS → COMPLETED.
Manage service pricing and offered service categories.
🛡️ Admin Control Panel
Monitor all users across the platform.
Moderate customer and technician accounts.
Manage service categories and listings.
View all bookings and payment activities.
Access platform-wide operational controls.
👥 User Roles & Dashboard Experience

The frontend interface dynamically adapts based on the authenticated user role.

Role	Dashboard Experience & Capabilities
CUSTOMER	Browse services, create bookings, make payments, track orders, and submit reviews.
TECHNICIAN	Manage profile, availability schedule, booking requests, and service progress.
ADMIN	Access administrative dashboards, user moderation, category management, and booking oversight.

Role-based routing and protected layouts ensure that each user only accesses authorized pages and features.

📁 Project Architecture & Directory Structure

The application follows the Next.js App Router architecture for modular development, server rendering, and optimized routing.

FixItNow-Frontend/
├── src/
│   ├── app/
│   │   ├── (auth)/              # Authentication pages
│   │   ├── dashboard/           # Role-based dashboards
│   │   ├── services/            # Service listing and details
│   │   ├── profile/             # User profile pages
│   │   └── page.tsx             # Landing page
│   │
│   ├── components/              # Reusable UI components
│   │   ├── ui/
│   │   ├── cards/
│   │   ├── forms/
│   │   └── layouts/
│   │
│   ├── context/                 # Authentication & global state
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # API clients & utilities
│   ├── services/                # Backend API integration
│   ├── types/                   # TypeScript definitions
│   └── utils/                   # Helper functions
│
├── public/                      # Static assets
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
🎨 UI/UX & Animation Highlights

The frontend focuses heavily on creating a modern and polished user experience.

✨ Motion & Interaction
Smooth page transitions using Framer Motion.
Animated service cards and hover interactions.
Modal and dialog animations.
Booking confirmation transitions.
Interactive dashboard components.
📱 Responsive Design
Mobile-first responsive layouts.
Tablet and desktop optimization.
Flexible grid systems.
Adaptive navigation.
Accessible component spacing and typography.
⚡ Performance Optimizations
Next.js App Router rendering.
Optimized image loading.
Lazy-loaded components.
Efficient API fetching strategies.
Reduced client-side bundle size.
🔄 Application Flow Diagrams
👤 Customer Journey
flowchart LR
    A[Visit Homepage] --> B[Browse Services]
    B --> C[View Technician Profile]
    C --> D[Book Service]
    D --> E[Stripe Payment]
    E --> F[Track Booking Status]
    F --> G[Submit Review]
🛠️ Technician Journey
flowchart LR
    A[Login Dashboard] --> B[Manage Profile]
    B --> C[Set Availability]
    C --> D[Receive Booking Request]
    D -->|Accept| E[Update Job Status]
    D -->|Decline| F[Booking Declined]
    E --> G[Complete Service]
👑 Admin Journey
flowchart LR
    A[Admin Dashboard] --> B[Monitor Users]
    B --> C[Manage Categories]
    C --> D[Review Bookings]
    D --> E[Platform Oversight]
🧩 Core Frontend Modules
Authentication Module
Login and registration forms
Protected route handling
JWT session management
Role-based navigation
Marketplace Module
Service listing page
Search functionality
Category filtering
Service detail pages
Booking Module
Booking creation form
Time-slot selection
Booking confirmation
Status tracking timeline
Dashboard Module
Customer booking history
Technician booking management
Admin analytics and moderation panels
Payment Module
Stripe Checkout integration
Payment confirmation UI
Transaction success/failure handling
⚙️ Environment Setup

Create a .env.local file in the root directory and configure the following variables.

Backend API Configuration
NEXT_PUBLIC_API_BASE_URL=https://fix-it-now-mocha.vercel.app/api/v1
Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
🏃 Getting Started (Local Development)

Clone the repository:

git clone https://github.com/shehabRabby/FixItNow-Frontend.git
cd FixItNow-Frontend
Install dependencies
npm install
Start the development server
npm run dev

🌐 The frontend application will start running at:

http://localhost:3000

Ensure the backend server is running or the deployed API is configured in .env.local.

🛠️ Build & Deployment

Generate the production build locally:

npm run build
npm run start
Deploy to Vercel
vercel --prod

For continuous deployment:

Connect the GitHub repository to Vercel
Configure the required environment variables
Enable automatic deployments from the main branch
👨‍💻 Author

Md. Shehab Al Rabby
Junior Frontend & Full Stack Web Developer

🐙 GitHub: @shehabRabby

⭐ If you find this project helpful, consider giving the repository a star on GitHub!