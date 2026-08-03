FixItNow - Frontend Web App"Your Trusted Home Service Platform"A modern, responsive, and feature-rich client-side web application for the multi-vendor home service marketplace, built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.📌 Live Demo & ResourcesLive Application URL: fix-it-now-forntend.vercel.appConnected Backend API: fix-it-now-mocha.vercel.appGitHub Repository: shehabRabby/FixItNow-Frontend📖 Table of ContentsOverviewTech StackKey FeaturesUser Roles & ViewsProject Architecture & Directory StructureUI/UX & Animation HighlightsEnvironment SetupGetting Started (Local Development)Deployment Guide🚀 OverviewFixItNow (Frontend) is the user-facing web interface for the home service ecosystem. It communicates seamlessly with the RESTful backend API to offer an intuitive user experience. Customers can effortlessly search for local technicians, book repair services, handle secure online payments via Stripe, and track service lifecycles. Meanwhile, technicians and administrators get dedicated control panels to manage availability, incoming orders, and platform operations.💻 Tech StackDomainTechnology / LibraryFrameworkNext.js (App Router)Programming LanguageTypeScriptStyling & UI ComponentsTailwind CSS, Lucide React (Icons)Animations & EffectsFramer MotionState Management & Data FetchingReact Hooks, Context API / Server ActionsForm Handling & ValidationReact Hook Form, ZodPayment IntegrationStripe Elements / Checkout UIDeployment PlatformVercel✨ Key Features🌐 Public FeaturesDynamic Marketplace: Explore various home repair categories (Plumbing, Electrical, House Cleaning, Painting, etc.) and browse verified technicians.Advanced Filtering & Search: Filter service listings by price range, location, categories, and ratings in real-time.Detailed Profiles: View technician skill sets, pricing details, years of experience, and authenticated past-customer feedback.👤 Customer FeaturesSecure Authentication: Fast and secure login/registration workflows with protected route wrappers.Interactive Booking System: Select preferred time slots, specify location details, and confirm service requests.Stripe Checkout Integration: Complete seamless online payments for confirmed bookings.Booking Status Timeline: Track orders in real-time (REQUESTED → ACCEPTED → IN_PROGRESS → COMPLETED).Rating & Reviews: Submit star ratings and written reviews once a job is finalized.🛠️ Technician DashboardProfessional Profile Management: Showcase expertise, service types, and adjustable hourly or fixed pricing.Availability Schedule: Manage active working hours and time slots.Incoming Request Pipeline: Accept or decline client service requests directly from the dashboard.Job Progress Updates: Seamlessly update job statuses (ACCEPTED to IN_PROGRESS to COMPLETED).🛡️ Admin Control PanelUser Oversight: Moderate platform users, handle account statuses (Active/Banned), and monitor user rosters.Service & Category Management: Create and configure new home service categories and offerings.Global Booking Monitor: Oversee all platform transactions and active service contracts.👥 User Roles & ViewsThe frontend UI adapts dynamically based on authenticated user roles:RoleDashboard Experience & CapabilitiesCUSTOMERAccess to service catalog, cart/booking modals, payment gateway UI, order history, and review submission dialogs.TECHNICIANAccess to technician-specific workspace tabs: incoming bookings, schedule manager, and profile customization forms.ADMINAccess to high-level administrative views: platform statistics, user moderation tables, and category control panels.📁 Project Architecture & Directory StructureThe application is structured using the Next.js App Router convention for optimal performance and modularity:PlaintextFixItNow-Frontend/
├── src/
│   ├── app/                 # Next.js App Router pages and layouts
│   │   ├── (auth)/          # Login, Register pages
│   │   ├── dashboard/       # Role-based dashboards (Customer, Tech, Admin)
│   │   ├── services/        # Service listing and details pages
│   │   └── page.tsx         # Landing page
│   ├── components/          # Reusable UI components (Modals, Cards, Navbars)
│   ├── context/             # Context providers (Auth, Theme, etc.)
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility helpers, API clients (Axios/Fetch)
│   └── types/               # TypeScript interface and type definitions
├── public/                  # Static assets and images
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
✨ UI/UX & Animation HighlightsSmooth Transitions: Powered by Framer Motion for elegant page entries, modal popups, and interactive card hovering effects.Responsive Layout: Fully optimized for mobile, tablet, and desktop viewports using Tailwind CSS.Interactive Feedback: Toast notifications and loading skeletons provide instant feedback during network requests.⚙️ Environment SetupCreate a .env.local file in the root directory and configure the required environment variables:Code snippet# Backend API Integration URL
NEXT_PUBLIC_API_BASE_URL=https://fix-it-now-mocha.vercel.app/api/v1

# Stripe Publishable Key (if handling client-side elements)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
🏃 Getting Started (Local Development)Bash# Clone the repository
git clone https://github.com/shehabRabby/FixItNow.git
cd FixItNow-Frontend

# Install dependencies
npm install

# Run the development server
npm run dev
🌐 The frontend application will start running at http://localhost:3000.🛠️ Build & DeploymentTo build the production-ready bundle locally:Bashnpm run build
npm run start
For continuous deployment, connect your GitHub repository to Vercel with the correct environment variables set in your Vercel project dashboard.👨‍💻 AuthorMd. Shehab Al RabbyJunior Frontend & Full Stack Web Developer🐙 GitHub: @shehabRabby