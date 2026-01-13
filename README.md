# GigFlow - Mini Freelance Marketplace Platform

A modern freelance marketplace platform built with React, TypeScript, and Vite. GigFlow connects clients with freelancers through a streamlined gig posting and bidding system with real-time notifications.

## ✨ Features

### Core Functionality

- **User Authentication**: Secure signup and login with JWT-based authentication
- **Gig Management**: Post, browse, and manage freelance gigs
- **Bidding System**: Freelancers can bid on available gigs
- **Dashboard**: Comprehensive dashboard for managing your gigs
- **Real-time Notifications**: WebSocket-powered instant notifications for bid updates
- **Status Management**: Track gig status (Open, Assigned, Completed, Cancelled)
- **Hire Freelancers**: Review and accept bids from freelancers

### User Experience

- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Modern UI**: Beautiful components using shadcn/ui and Radix UI
- **Real-time Updates**: Socket.IO integration for instant notifications
- **Smooth Navigation**: React Router v7 for seamless page transitions
- **Success Feedback**: Visual confirmation for all user actions

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.0
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4.1.18
- **UI Components**: shadcn/ui + Radix UI
- **State Management**: Zustand with persist middleware
- **HTTP Client**: Axios
- **Real-time Communication**: Socket.IO Client 4.8.3
- **Routing**: React Router 7.12.0
- **Icons**: Lucide React
- **Form Validation**: Zod 4.3.5

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (comes with Node.js)
- **Backend API**: GigFlow backend server running (refer to backend repository)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/gitpritam/gigflow-web.git
cd gigflow-web
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000
```

**Environment Variables:**

- `VITE_API_URL`: Backend API URL (default: http://localhost:5000)

### 4. Start Development Server

```bash
npm run dev
```

The application will open at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

Build output will be in the `dist/` folder.

### 6. Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
gigflow-web/
├── src/
│   ├── @types/           # TypeScript type definitions
│   │   ├── bid.types.ts
│   │   ├── notification.types.ts
│   │   └── interface/
│   ├── assets/           # Static assets
│   ├── components/       # React components
│   │   ├── home/         # Homepage components (Navbar, Footer, etc.)
│   │   └── ui/           # shadcn/ui components
│   ├── config/           # Configuration files
│   │   ├── Axios.config.tsx
│   │   └── config.ts
│   ├── constants/        # App constants
│   ├── hook/             # Custom React hooks
│   │   ├── getGigBids.hook.tsx
│   │   └── useNotifications.hook.tsx
│   ├── layouts/          # Layout components
│   ├── lib/              # Utility libraries
│   │   └── utils.ts
│   ├── pages/            # Page components
│   │   ├── auth/         # Authentication pages
│   │   │   ├── signin/
│   │   │   └── signup/
│   │   ├── dashboard/    # Dashboard page
│   │   ├── gig/          # Gig-related pages
│   │   │   └── showBids.page.tsx
│   │   └── home/
│   ├── routes/           # Route configuration
│   │   └── router.tsx
│   ├── store/            # Zustand state management
│   │   ├── authStore.ts
│   │   └── index.ts
│   ├── utils/            # Utility functions
│   │   └── apiRequest.ts
│   ├── App.tsx           # Main App component
│   └── main.tsx          # Application entry point
├── public/               # Public static files
├── .env                  # Environment variables (create this)
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## 🎯 Key Features Explained

### Authentication System

- Cookie-based JWT authentication
- Persistent login state with Zustand
- Automatic session validation
- Secure logout functionality

### Dashboard

- View all your posted gigs
- Change gig status (Open/Assigned/Completed/Cancelled)
- View bids on each gig
- Real-time status updates

### Bidding System

- Freelancers can submit bids with custom pricing
- Bid status tracking (Pending/Accepted/Rejected)
- Hire freelancers directly from bid view
- Automatic bid acceptance workflow

### Real-time Notifications

- WebSocket connection with Socket.IO
- Instant notification delivery
- Unread badge counter
- Notification dropdown with history
- Click to navigate to relevant gig/bid
- Mark as read functionality

## 🔧 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 🌐 API Integration

The frontend communicates with the backend API using Axios. All requests include credentials for authentication.

**Base URL**: Set in `.env` as `VITE_API_URL`

**Key Endpoints:**

- `POST /auth/signup` - User registration
- `POST /auth/signin` - User login
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user
- `GET /gigs` - Fetch all gigs
- `POST /gigs` - Create new gig
- `PATCH /gigs/:id/status` - Update gig status
- `GET /gigs/:id/bids` - Get all bids for a gig
- `PATCH /bids/:id/hire` - Hire a freelancer
- `GET /notifications` - Fetch notifications
- `PATCH /notifications/:id/read` - Mark notification as read
- `PATCH /notifications/read-all` - Mark all as read

## 🔌 WebSocket Events

**Connection:**

- Authenticates using JWT token from cookie
- Auto-joins user-specific room on connection

**Events:**

- `notification` - Receives real-time notifications with structure:
  ```typescript
  {
    type: string;
    message: string;
    data: { gigId, bidId, etc. };
    timestamp: Date;
  }
  ```

## 🎨 UI Components

Built with **shadcn/ui** components:

- Badge
- Button
- Card
- Dropdown Menu
- Select
- Sheet (Mobile Menu)
- Table
- Alert

All components are customizable and follow Tailwind CSS conventions.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- **Pritam** - [@gitpritam](https://github.com/gitpritam)

## 🐛 Issues & Support

If you encounter any issues or have questions:

- Open an issue on [GitHub Issues](https://github.com/gitpritam/gigflow-web/issues)
- Check existing issues before creating new ones

## 🔮 Future Enhancements

- Payment integration
- Advanced search and filtering
- User profiles and ratings
- Message system between clients and freelancers
- File upload for gig requirements
- Email notifications
- Mobile app (React Native)

## 🙏 Acknowledgments

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Socket.IO](https://socket.io/)
- [Zustand](https://zustand-demo.pmnd.rs/)

---

**Happy Coding! 🚀**

import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
globalIgnores(['dist']),
{
files: ['**/*.{ts,tsx}'],
extends: [
// Other configs...
// Enable lint rules for React
reactX.configs['recommended-typescript'],
// Enable lint rules for React DOM
reactDom.configs.recommended,
],
languageOptions: {
parserOptions: {
project: ['./tsconfig.node.json', './tsconfig.app.json'],
tsconfigRootDir: import.meta.dirname,
},
// other options...
},
},
])

```

```
