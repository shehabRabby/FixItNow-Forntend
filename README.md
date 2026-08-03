# 🎨 FixItNow - Frontend Web App

> **"Your Trusted Home Service Platform"**  
> A modern, responsive, and feature-rich client-side web application for the multi-vendor home service marketplace, built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

---

## 📌 Live Demo & Resources

- **Live Application URL:** [fix-it-now-forntend.vercel.app](https://fix-it-now-forntend.vercel.app/)
- **Connected Backend API:** [fix-it-now-mocha.vercel.app](https://fix-it-now-mocha.vercel.app/)
- **GitHub Repository:** [shehabRabby/FixItNow-Frontend](https://github.com/shehabRabby/FixItNow-Frontend)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Key Features](#-key-features)
- [User Roles & Dashboard Experience](#-user-roles--dashboard-experience)
- [Project Architecture & Directory Structure](#-project-architecture--directory-structure)
- [UI/UX & Animation Highlights](#-uiux--animation-highlights)
- [Application Flow Diagrams](#-application-flow-diagrams)
- [Core Frontend Modules](#-core-frontend-modules)
- [Environment Setup](#-environment-setup)
- [Getting Started (Local Development)](#-getting-started-local-development)
- [Build & Deployment](#-build--deployment)

---

## 🚀 Overview

**FixItNow (Frontend)** is the user-facing web interface of the FixItNow ecosystem. The application communicates seamlessly with the RESTful backend API to provide a smooth, responsive, and intuitive user experience.

Customers can discover trusted local technicians, schedule home services, complete secure online payments through Stripe, and track service progress in real time. Technicians receive dedicated management dashboards for handling availability and bookings, while administrators gain full platform oversight through role-based control panels.

The frontend is designed with performance, scalability, accessibility, and responsive design as core priorities, ensuring a consistent experience across desktop, tablet, and mobile devices.

---

## 💻 Tech Stack

| Domain | Technology / Library |
| :--- | :--- |
| **Framework** | Next.js (App Router) |
| **Programming Language** | TypeScript |
| **Styling & UI** | Tailwind CSS |
| **Icons** | Lucide React |
| **Animations & Interactions** | Framer Motion |
| **State Management** | React Hooks, Context API |
| **Form Handling** | React Hook Form |
| **Validation** | Zod |
| **HTTP Client** | Fetch API / Axios |
| **Payment Integration** | Stripe Elements / Checkout |
| **Deployment Platform** | Vercel |

---

## ✨ Key Features

### 🌐 Public Features

- Explore home service categories including plumbing, electrical repair, painting, AC servicing, and house cleaning.
- Advanced search and filtering by category, location, pricing, and customer ratings.
- View detailed technician profiles with experience, skills, pricing, and verified customer reviews.
- Responsive landing pages with modern UI components and optimized performance.

### 👤 Customer Features

- Secure registration and login with protected authentication flows.
- Interactive service booking with preferred time-slot selection.
- Secure online payment through Stripe Checkout.
- Real-time booking status timeline.
- Booking history and order management.
- Submit ratings and reviews for completed services.
- Personal profile management.

### 🛠️ Technician Dashboard

- Create and update professional technician profiles.
- Manage working schedules and availability.
- Accept or decline incoming booking requests.
- Track active jobs.
- Update booking progress from `ACCEPTED` → `IN_PROGRESS` → `COMPLETED`.
- Manage service pricing and offered service categories.

### 🛡️ Admin Control Panel

- Monitor all users across the platform.
- Moderate customer and technician accounts.
- Manage service categories and listings.
- View all bookings and payment activities.
- Access platform-wide operational controls.

---

## 👥 User Roles & Dashboard Experience

The frontend interface dynamically adapts based on the authenticated user role.

| Role | Dashboard Experience & Capabilities |
| :--- | :--- |
| **`CUSTOMER`** | Browse services, create bookings, make payments, track orders, and submit reviews. |
| **`TECHNICIAN`** | Manage profile, availability schedule, booking requests, and service progress. |
| **`ADMIN`** | Access administrative dashboards, user moderation, category management, and booking oversight. |

Role-based routing and protected layouts ensure that each user only accesses authorized pages and features.

---

## 📁 Project Architecture & Directory Structure

The application follows the Next.js App Router architecture for modular development, server rendering, and optimized routing.

```text
FixItNow-Frontend/
├── src/
│   ├── app/
│   │   ├── (auth)/             # Authentication pages
│   │   ├── dashboard/          # Role-based dashboards
│   │   ├── services/           # Service listing and details
│   │   ├── profile/            # User profile pages
│   │   └── page.tsx            # Landing page
│   │
│   ├── components/             # Reusable UI components
│   │   ├── ui/
│   │   ├── cards/
│   │   ├── forms/
│   │   └── layouts/
│   │
│   ├── context/                # Authentication & global state
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # API clients & utilities
│   ├── services/               # Backend API integration
│   ├── types/                  # TypeScript definitions
│   └── utils/                  # Helper functions
│
├── public/                     # Static assets
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json