# Tenant Insights

A modern, smart property management platform designed for landlords and property managers. Automate lease renewals, assess tenant risks with AI, and streamline maintenance tracking.

## 🚀 Features

### Core Functionality
- **Lease Renewal Alerts**: Never miss important lease renewal dates with automated notifications
- **AI Tenant Risk Scoring**: Predictive insights to identify potential tenant risks early
- **Maintenance Tracking**: Streamline maintenance requests and track completion status
- **Dashboard Analytics**: Comprehensive overview of property performance and tenant data
- **Tenant Management**: Complete tenant profiles with lease history and contact information
- **Property Portfolio**: Manage multiple properties and units efficiently

### User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Glassmorphism design with smooth animations and transitions
- **Dark Mode Support**: Automatic theme switching based on user preferences
- **Intuitive Navigation**: Clean sidebar navigation with active state indicators

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form with Zod validation
- **Date Handling**: date-fns
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tenant-insights
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Add your environment variables here
   NEXT_PUBLIC_API_URL=your_api_url
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Usage

### For Property Managers
1. **Sign Up**: Create your account on the landing page
2. **Add Properties**: Set up your property portfolio in the dashboard
3. **Manage Tenants**: Add tenant information and lease details
4. **Track Maintenance**: Log and monitor maintenance requests
5. **Monitor Analytics**: View performance metrics and insights

### Key Pages
- **/** - Landing page with feature overview
- **/login** - User authentication
- **/signup** - Account creation
- **/dashboard** - Main dashboard with stats and recent activity
- **/tenants** - Tenant management interface
- **/leases** - Lease document and renewal tracking
- **/maintenance** - Maintenance request system
- **/analytics** - Data visualization and reporting
- **/profile** - User profile and settings

## 📁 Project Structure

```
tenant-insights/
├── app/                    # Next.js app directory
│   ├── analytics/         # Analytics page
│   ├── dashboard/         # Dashboard page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── leases/            # Leases page
│   ├── login/             # Login page
│   ├── maintenance/       # Maintenance page
│   ├── page.tsx           # Landing page
│   ├── profile/           # Profile page
│   ├── signup/            # Signup page
│   └── tenants/           # Tenants page
├── components/            # Reusable components
│   ├── ui/               # UI component library
│   ├── dashboard-nav.tsx # Dashboard navigation
│   ├── dashboard-sidebar.tsx # Dashboard sidebar
│   ├── dashboard-stats.tsx # Dashboard statistics
│   ├── dashboard-recent-activity.tsx # Recent activity component
│   ├── sign-in-page.tsx  # Login page component
│   └── sign-up-page.tsx  # Signup page component
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
│   └── utils.ts          # Class name utility
├── public/               # Static assets
├── styles/               # Additional styles
├── components.json       # Component configuration
├── next.config.mjs       # Next.js configuration
├── package.json          # Dependencies and scripts
├── postcss.config.mjs    # PostCSS configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🎨 Design System

### Colors
- **Primary**: Blue tones for main actions and branding
- **Secondary**: Muted colors for secondary elements
- **Accent**: Purple highlights for interactive elements
- **Neutral**: Grays for text and backgrounds

### Typography
- **Font Family**: Geist Sans (primary), Geist Mono (monospace)
- **Scale**: Responsive text sizing with proper hierarchy

### Components
- **Glassmorphism**: Backdrop blur effects with transparency
- **Hover Effects**: Smooth transitions and gradient overlays
- **Animations**: Staggered entrance animations for better UX

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Use TypeScript for all new code
- Follow the existing component patterns
- Ensure responsive design for all new features
- Write clear, concise commit messages
- Test components across different screen sizes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Email**: contact@tenantinsights.com
- **Website**: [tenantinsights.com](https://tenantinsights.com)

---

Built with ❤️ for property managers who want to focus on what matters most - their properties and tenants.
