# FraudWallAuto - Vehicle Fraud Detection System

A comprehensive React TypeScript application for vehicle fraud detection and management across Ghana government agencies (DVLA, EOCO, Customs, Police).

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- Yarn >= 1.22.0

### Installation

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview
```

## 📦 Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix ESLint errors
- `yarn format` - Format code with Prettier
- `yarn format:check` - Check code formatting
- `yarn type-check` - Run TypeScript type checking
- `yarn test` - Run unit tests
- `yarn test:ui` - Run tests with UI
- `yarn test:coverage` - Generate test coverage report
- `yarn e2e` - Run E2E tests
- `yarn e2e:ui` - Run E2E tests with UI

## 🏗️ Tech Stack

- **Framework**: React 18.2
- **Language**: TypeScript 5.3
- **Build Tool**: Vite 5.0
- **Routing**: React Router 6
- **State Management**: Zustand 4.x
- **Data Fetching**: TanStack Query 5.x
- **UI Components**: Shadcn UI + Radix UI
- **Styling**: Tailwind CSS 3.x
- **Forms**: React Hook Form 7.x
- **Validation**: Zod 3.x
- **HTTP Client**: Axios 1.6
- **Testing**: Vitest + Playwright

## 📁 Project Structure

```
src/
├── app/              # App configuration (router, providers)
├── features/         # Feature modules (auth, vin-lookup, dashboards, etc.)
├── components/       # Reusable UI components
├── layouts/          # Page layouts
├── lib/              # Core utilities (api-client, query-client)
├── hooks/            # Custom React hooks
├── stores/           # Zustand stores
├── types/            # Global TypeScript types
├── config/           # Configuration files
├── utils/            # Utility functions
└── styles/           # Global styles
```

## 🔑 Environment Variables

Create `.env.development` and `.env.production` files:

```bash
VITE_API_BASE_URL=
VITE_APP_NAME=FraudWallAuto
VITE_APP_VERSION=1.0.0
VITE_ENABLE_DEVTOOLS=true
```

## 🎯 Key Features

- **VIN Decoding** - Comprehensive vehicle information lookup
- **Vehicle History** - Theft check, accident records, auction history
- **Role-Based Dashboards** - DVLA, EOCO, Customs, Police portals
- **User Management** - Multi-role access control
- **Reports & Analytics** - Fraud detection and insights

## 📚 Documentation

See [PROJECT_GUIDE.md](./PROJECT_GUIDE.md) for comprehensive documentation.

## 🧪 Testing

```bash
# Unit tests
yarn test

# E2E tests
yarn e2e
```

## 📄 License

Proprietary - Ghana Government Agencies

## 👥 Team

Maintained by FraudWallAuto Development Team
