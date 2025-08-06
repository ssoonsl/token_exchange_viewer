# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Token Swap Interface - a React-based single-page application that allows users to select crypto tokens, input USD amounts, and view equivalent token amounts in real-time. The project is currently in the planning phase with comprehensive documentation but no implementation yet.

## Technology Stack

### Client-Side Architecture
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit + RTK Query
- **Styling**: Chakra UI (migrating from Tailwind CSS)
- **Testing**: Vitest + React Testing Library + Playwright
- **Code Quality**: ESLint + Prettier + Husky

### Server-Side Architecture
- **API Layer**: Vercel Serverless Functions (Node.js)
- **External API Integration**: @funkit/api-base package (server-side only)
- **Security Pattern**: API Proxy to hide third-party credentials
- **Deployment**: Vercel (full-stack deployment)

### Environment Variables Strategy
- **Server-Side**: Standard environment variables for API keys and secrets
- **Client-Side**: Public configuration variables with `VITE_` prefix (non-sensitive only)
- **Security**: All sensitive data (API keys) handled server-side only

## Project Structure (Planned)

```
├── api/                      # Vercel serverless functions (server-side)
│   ├── tokens/
│   │   ├── list.ts          # GET /api/tokens/list - Available tokens
│   │   └── price.ts         # GET /api/tokens/price - Token price data
│   └── utils/               # Server-side utilities and FunKit integration
├── src/                     # Client-side React application
│   ├── components/
│   │   ├── TokenSelector/   # Token selection interface
│   │   ├── AmountInput/     # USD amount input with validation
│   │   ├── SwapInterface/   # Main swap interface component
│   │   └── common/          # Shared components
│   ├── hooks/               # Custom React hooks
│   ├── services/            # Client-side API service layer (calls internal APIs)
│   ├── store/               # Redux store and slices
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Client-side utility functions and constants
├── public/                  # Static assets
└── vercel.json             # Vercel deployment configuration
```

### API Proxy Pattern
- **Client** → **Internal API** (`/api/*`) → **FunKit API**
- All sensitive operations and third-party API calls handled server-side
- Client only communicates with internal Vercel API routes
- Server-side caching and rate limiting implementation

## Key Features to Implement

1. **Token Selection**: Support for USDC (chain 1), USDT (chain 137), ETH (chain 8453), WBTC (chain 1)
2. **USD Amount Input**: Currency formatting and validation
3. **Real-time Calculations**: Live price fetching and amount calculations
4. **Responsive Design**: Mobile and desktop compatibility
5. **Error Handling**: Graceful API error handling with user feedback

## Current Phase

**PHASE 10: PROJECT FINALIZATION**

**🎯 FOCUS: Final testing, performance validation, and project completion**

Phase 9 completed successfully with comprehensive project documentation.

### Current Status

**✅ COMPLETED (PHASE 9 - PROJECT README DOCUMENTATION):**
- ☑ **Comprehensive README**: Created detailed project documentation with architectural overview
- ☑ **Security Architecture Documentation**: Documented serverless function rationale vs client-side integration
- ☑ **API Integration Documentation**: Documented FunKit integration patterns and debugging discoveries
- ☑ **Development Workflow Documentation**: Documented improved development commands and environment setup
- ☑ **Production URL Update**: Updated deployment URL to https://token-exchange-viewer.vercel.app/
- ☑ **Further Enhancements Section**: Added planned post-MVP features and improvements

### 🎉 DOCUMENTATION ACHIEVEMENTS

**Successfully Documented:**
- ✅ **Architecture Overview**: Security-first design with serverless API proxy pattern
- ✅ **Technology Stack**: Complete frontend/backend technology documentation
- ✅ **Quick Start Guide**: Step-by-step setup instructions with correct git clone URL
- ✅ **Security Implementation**: API key management and request security patterns
- ✅ **Supported Tokens**: Complete table with verified contract addresses across chains
- ✅ **API Integration**: Internal endpoint documentation and FunKit integration patterns
- ✅ **Performance Considerations**: Current optimizations and caching strategies
- ✅ **Further Enhancements**: Post-MVP roadmap including Framer Motion, accessibility, and testing

**Technical Documentation:**
- ✅ **Development Commands**: Clear separation of client-side vs full-stack development
- ✅ **Environment Setup**: Proper .env configuration and security practices
- ✅ **Testing Strategy**: Integration and E2E test command documentation
- ✅ **Deployment Process**: Automated deployment and manual deployment options

### 📋 CURRENT TASKS

**UI Enhancement Focus:**
1. **Chakra UI Migration**: Replace Tailwind CSS with Chakra UI component library for improved developer experience and consistent design system
2. **Component Refactoring**: Update all components to use Chakra UI components and theming system
3. **Performance Optimization**: Optimize bundle size and implement tree-shaking for Chakra UI
4. **Final Performance Validation**: Verify production deployment performance after UI changes

### 📊 PROJECT STATUS

**Production Deployment: ✅ FULLY OPERATIONAL**
- **Frontend**: Successfully deployed with clean URL (token-exchange-viewer.vercel.app)
- **API Integration**: Fully functional with verified token addresses
- **Documentation**: Comprehensive README with architectural decisions and setup guide
- **Build Process**: Optimized production build with zero errors

**Documentation: ✅ COMPREHENSIVE**
- **README**: Complete project overview, setup, and architectural documentation
- **Security Patterns**: Documented API key protection and serverless architecture rationale
- **Development Guide**: Clear instructions for local development and deployment
- **Enhancement Roadmap**: Detailed post-MVP feature planning

**Next Steps: 🎨 CHAKRA UI MIGRATION**
- **UI Library Migration**: Transition from Tailwind CSS to Chakra UI
- **Component Updates**: Refactor all components to use Chakra UI patterns
- **Performance Testing**: Validate bundle size and runtime performance
- **Final Deployment**: Update production build with new UI framework

**Overall Status: 🔄 UI ENHANCEMENT IN PROGRESS**

---

## Next Phase

**PHASE 11: CHAKRA UI MIGRATION**

**🎯 FOCUS: Migrate from Tailwind CSS to Chakra UI for improved developer experience**

### Implementation Considerations to Document

**Security & Architecture:**
- Vercel serverless functions chosen to prevent API key exposure (vs client-side integration)
- Token contract address verification process for multi-chain support
- FunKit API integration patterns and error handling strategies

**Technical Achievements:**
- Successful debugging of production API issues through systematic testing
- Multi-chain token support with verified contract addresses
- Full-stack development workflow optimization

**Documentation Guidelines:** Be succinct - focus on architectural decisions and rationale.

### MVP Implementation Priorities

**✅ IMPLEMENT NOW (MVP):**
- Basic Vite + React + TypeScript setup ✓
- Simple Vercel API functions (no middleware) - In Progress
- Redux Toolkit + RTK Query for state - In Progress
- Basic Tailwind styling (no animations)
- Core components: TokenSelector, AmountInput, SwapInterface - In Progress
- Essential error handling
- Basic integration tests

**🚀 IMPLEMENT LATER (POST-MVP ENHANCEMENTS):**
- React performance optimizations (memo, useMemo, useCallback)
- Code splitting and lazy loading
- Multi-layer caching strategies
- Advanced error boundaries
- Comprehensive test suites (E2E, >90% coverage)
- Framer Motion animations
- Accessibility features
- Rate limiting and security middleware
- Advanced monitoring and performance tracking

## Development Commands

**Initial Setup** (when implementing):

```bash
# MVP Setup (minimal dependencies)
npm create vite@latest token-swap-interface -- --template react-ts
cd token-swap-interface
npm install @reduxjs/toolkit react-redux @funkit/api-base
npm install -D @testing-library/react vitest eslint prettier @vercel/node

# 🚀 POST-MVP: Additional packages to install later
# npm install framer-motion react-hook-form
# npm install -D playwright
```

**Development**:

```bash
# Client-side development
npm run dev          # Start Vite development server (port 5173)
npm run build        # Build client for production
npm run preview      # Preview production build

# Full-stack development (with API routes)
vercel dev           # Start local development with API routes (port 3000)

# MVP Testing
npm run test         # Run integration tests only
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run type-check   # TypeScript checking

# 🚀 POST-MVP: Additional commands to add later
# npm run test:e2e     # Run e2e tests with Playwright
# npm run test:unit    # Comprehensive unit tests
# npm run test:api     # API endpoint tests
```

**Environment Setup**:

```bash
# Create environment files
cp .env.example .env.local        # Local development
cp .env.example .env.production   # Production (Vercel)

# Required environment variables
FUNKIT_API_KEY=your_funkit_api_key_here
VITE_API_BASE_URL=http://localhost:3000  # Local development only
```

**Deployment**:

```bash
# Deploy to Vercel
vercel --prod

# Environment variables setup on Vercel
vercel env add FUNKIT_API_KEY production
```

## Architecture Patterns

### State Management

- **Redux Toolkit** for global state (tokens, amounts, UI state)
- **RTK Query** for API state management and caching
- **Custom hooks** for component-specific logic (useCalculations, useDebounce)
- **Service layer** for client-side API abstraction

### Security Patterns

- **API Key Protection**: All sensitive credentials stored server-side only
- **Request Validation**: Input sanitization and validation on both client and server
- **Rate Limiting**: Server-side rate limiting to prevent API abuse
- **CORS Configuration**: Restrictive CORS policies for API endpoints
- **Environment Separation**: Clear separation of client vs server environment variables

### API Integration Architecture

- **Client-Side Service Layer**: Calls internal API routes (`/api/*`)
- **Server-Side API Layer**: Handles FunKit integration and credential management
- **Caching Strategy**: 
  - Server-side: Redis/Memory cache for FunKit responses (1-minute TTL)
  - Client-side: RTK Query cache for UI responsiveness
- **Error Handling**: Layered error handling with user-friendly client messages
- **Request Optimization**: Debounced client requests + server-side request deduplication

### Component Architecture

**🚀 POST-MVP ENHANCEMENTS (IMPLEMENT LATER):**
- **Container/Presentation** pattern separation
- **Compound components** for TokenSelector
- **Advanced custom hooks** for reusable business logic
- **Error Boundaries** for graceful error handling
- **Framer Motion** for animations and transitions

**✅ MVP APPROACH:**
- Simple functional components
- Basic custom hooks (useCalculations, useDebounce)
- Standard React error handling
- CSS transitions only (no animation library)

### Performance & Caching Strategies

**🚀 POST-MVP ENHANCEMENTS (IMPLEMENT LATER):**
- **Multi-Layer Caching**:
  - Browser cache for static assets
  - RTK Query cache for API responses
  - Server-side cache for external API calls
- **Request Optimization**:
  - Debounced user inputs (300ms)
  - Request deduplication on server
  - Batch API calls where possible
- **Code Splitting**: Route-based and component-based lazy loading
- **Memoization**: Strategic use of React.memo and useMemo for expensive calculations

**✅ MVP APPROACH:**
- Single caching layer (RTK Query only)
- Basic debounced inputs (simple setTimeout)
- No code splitting initially
- Standard React components without memoization

## Environment Variables

### Server-Side Environment Variables (Vercel)

```bash
# Required for API functionality
FUNKIT_API_KEY=your_funkit_api_key_here

# Optional configuration
NODE_ENV=production
API_RATE_LIMIT_WINDOW=60000  # 1 minute in ms
API_RATE_LIMIT_MAX=100       # Max requests per window
```

### Client-Side Environment Variables (Vite)

```bash
# Development only - API base URL for local development
VITE_API_BASE_URL=http://localhost:3000

# Optional - Enable debug logging in development
VITE_DEBUG_MODE=true
```

### Security Notes

- **NEVER** expose FunKit API keys to the client side
- All `VITE_` variables are publicly accessible in the browser
- Production client builds should not include sensitive configuration

## Testing Strategy

**🚀 POST-MVP ENHANCEMENTS (IMPLEMENT LATER):**
- **Comprehensive Unit Tests**: All components and utility functions
- **E2E Tests**: Browser automation with Playwright
- **API Testing**: Full serverless function test suites
- **Target Coverage**: >90%
- **Performance Testing**: Load testing and optimization

**✅ MVP APPROACH:**
- **Integration Tests**: Core user flows only
- **Basic Unit Tests**: Critical components
- **Target Coverage**: 70%
- **Manual Testing**: UI and API functionality

## Supported Tokens Configuration

Tokens are configured in `src/utils/constants.ts`:

- **USDC**: Chain 1 (Ethereum)
- **USDT**: Chain 137 (Polygon)
- **ETH**: Chain 8453 (Base)
- **WBTC**: Chain 1 (Ethereum)

## Performance Considerations

**🚀 POST-MVP ENHANCEMENTS (IMPLEMENT LATER):**
- **Code splitting** with React.lazy()
- **Advanced memoization** for expensive calculations
- **Bundle optimization** with manual chunks
- **Server-side caching** with Redis/Memory
- **Request deduplication** and batching

**✅ MVP APPROACH:**
- **Basic debounced inputs** to reduce API calls
- **RTK Query caching** for API responses
- **Default Vite optimization** (no custom config)
- **Simple state management** without over-optimization

## Security Guidelines

- Store API keys in environment variables only
- Discuss how to manage these keys when we need to deploy
- Never commit sensitive data to git
- Validate all user inputs
- Implement proper error boundaries
- Use secure headers in deployment

## Accessibility Requirements

- WCAG 2.1 AA compliance
- Semantic HTML structure
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility

## Implementation Roadmap

### ✅ MVP IMPLEMENTATION (CURRENT FOCUS)

**Phase 1: MVP Foundation**
1. **Basic Project Setup**
   - Initialize Vite + React + TypeScript
   - Set up basic Vercel serverless functions
   - Configure environment variables
   - Basic ESLint and Prettier setup

2. **Core API Layer**
   - Simple token list endpoint (`/api/tokens/list`)
   - Simple token price endpoint (`/api/tokens/price`)
   - Basic error handling (no middleware)
   - Environment variable security only

**Phase 2: MVP Components**
1. **Basic UI Components**
   - TokenSelector (simple grid, no search)
   - AmountInput (basic validation)
   - SwapInterface (main layout)
   - Basic Tailwind styling

2. **State Management**
   - Redux Toolkit store setup
   - RTK Query for API calls
   - Basic token and amount state
   - Simple error state

**Phase 3: MVP Integration**
1. **Core Functionality**
   - Token selection logic
   - USD amount input and validation
   - Real-time price calculations
   - Basic currency formatting

2. **Essential Testing**
   - Integration test for main swap flow
   - Basic component tests for critical functionality
   - Manual testing for edge cases

---

### 🚀 POST-MVP ENHANCEMENTS (IMPLEMENT AFTER MVP)

**Phase 4: Security & Performance Hardening**
1. **Advanced Security**
   - Rate limiting middleware
   - CORS policies
   - Request/response validation schemas
   - Advanced error handling

2. **Performance Optimization**
   - Server-side caching layer
   - Request deduplication
   - Code splitting implementation
   - Bundle optimization

**Phase 5: Enhanced User Experience**
1. **Advanced Components**
   - TokenSelector with search/filter
   - Compound component patterns
   - Framer Motion animations
   - Loading states and transitions

2. **React Optimizations**
   - React.memo for components
   - useMemo for expensive calculations
   - useCallback for event handlers
   - Error boundaries

**Phase 6: Comprehensive Testing & Accessibility**
1. **Testing Suite**
   - Comprehensive unit tests (>90% coverage)
   - E2E tests with Playwright
   - API endpoint testing
   - Performance testing

2. **Accessibility & Polish**
   - WCAG 2.1 AA compliance
   - Keyboard navigation
   - Screen reader support
   - Advanced responsive design

### Testing Strategy with API Mocking
- **Development**: Mock API responses for consistent testing
- **Staging**: Use test API keys with rate limiting
- **Production**: Monitor API usage and error rates
- **CI/CD**: Automated testing with mocked external dependencies

### Progressive Enhancement Approach
1. **Core Functionality First**: Basic token selection and amount calculation
2. **Enhanced Features**: Real-time updates, animations, advanced validation
3. **Performance Optimizations**: Caching, code splitting, lazy loading
4. **Accessibility & Polish**: Screen reader support, keyboard navigation, error handling

## Known Challenges

### Security Concerns & Solutions
- **API Key Exposure**: Solved by server-side proxy pattern
- **Rate Limiting**: Implemented server-side with configurable limits
- **Input Validation**: Dual-layer validation (client + server)
- **CORS Attacks**: Restrictive CORS policies and origin validation

### Performance Considerations & Mitigation
- **API Response Time**: Multi-layer caching (browser, RTK Query, server)
- **Bundle Size**: Code splitting and lazy loading
- **Rendering Performance**: Strategic memoization and React optimization
- **Network Requests**: Request debouncing and deduplication

### Deployment Complexity & Solutions
- **Environment Management**: Clear separation of client/server variables
- **API Route Configuration**: Vercel-specific serverless function setup
- **Caching Strategy**: Vercel Edge Cache + application-level caching
- **Monitoring**: Error tracking and performance monitoring setup

### Development Challenges
- **Local API Development**: Vercel CLI for local serverless function testing
- **Environment Consistency**: Docker-based development environment option
- **Testing External APIs**: Comprehensive mocking strategy
- **Type Safety**: Shared TypeScript types between client and API

## Deployment

**Updated Vercel Configuration**:

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- API: Vercel Serverless Functions
- Environment: Server-side secrets (no client-side API keys)

**Deployment Checklist**:
1. Configure environment variables in Vercel dashboard
2. Set up domain and SSL certificates
3. Configure caching headers for static assets
4. Set up monitoring and error tracking
5. Test API endpoints in production environment

This project demonstrates advanced full-stack engineering patterns including secure API design, real-time data handling, comprehensive testing, and production-ready deployment practices.

## Configuration Templates

### Vite Configuration

**vite.config.ts**

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@types": path.resolve(__dirname, "./src/types"),
    },
  },
  server: {
    port: 5173,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/__tests__/setup.ts"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          redux: ["@reduxjs/toolkit", "react-redux"],
          animations: ["framer-motion"],
        },
      },
    },
    sourcemap: true,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
```

### TypeScript Configuration

**tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@services/*": ["./src/services/*"],
      "@utils/*": ["./src/utils/*"],
      "@types/*": ["./src/types/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Vercel Configuration

**vercel.json**

```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "functions": {
    "api/**/*.ts": {
      "runtime": "nodejs18.x"
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

## Testing Implementation

### Unit Testing Strategy

**Component Testing Example:**

```typescript
// src/components/TokenSelector/TokenSelector.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { TokenSelector } from "./TokenSelector";
import tokenSlice from "@store/slices/tokenSlice";

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      tokens: tokenSlice,
    },
    preloadedState: initialState,
  });
};

describe("TokenSelector", () => {
  it("renders all supported tokens", () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <TokenSelector type="source" selectedToken={null} />
      </Provider>,
    );

    expect(screen.getByText("USDC")).toBeInTheDocument();
    expect(screen.getByText("USDT")).toBeInTheDocument();
    expect(screen.getByText("ETH")).toBeInTheDocument();
    expect(screen.getByText("WBTC")).toBeInTheDocument();
  });

  it("handles token selection", () => {
    const store = createMockStore();
    const onTokenSelect = vi.fn();

    render(
      <Provider store={store}>
        <TokenSelector type="source" selectedToken={null} onTokenSelect={onTokenSelect} />
      </Provider>,
    );

    fireEvent.click(screen.getByText("USDC"));
    expect(onTokenSelect).toHaveBeenCalledWith("usdc-1");
  });
});
```

### Integration Testing

**API Integration Testing:**

```typescript
// src/__tests__/integration/SwapFlow.test.tsx
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@store/store";
import { SwapInterface } from "@components/SwapInterface";

describe("Swap Flow Integration", () => {
  beforeEach(() => {
    // Reset store state
    store.dispatch({ type: "RESET" });
  });

  it("completes full swap flow", async () => {
    render(
      <Provider store={store}>
        <SwapInterface />
      </Provider>,
    );

    // Select source token
    fireEvent.click(screen.getByText("USDC"));

    // Select target token
    fireEvent.click(screen.getByText("ETH"));

    // Enter amount
    const amountInput = screen.getByLabelText("USD Amount");
    fireEvent.change(amountInput, { target: { value: "100" } });

    // Wait for calculations
    await waitFor(() => {
      expect(screen.getByText("Swap Summary")).toBeInTheDocument();
    });

    // Verify calculations are displayed
    expect(screen.getByText(/USDC Amount:/)).toBeInTheDocument();
    expect(screen.getByText(/ETH Amount:/)).toBeInTheDocument();
  });
});
```

### E2E Testing with Playwright

**End-to-End Testing:**

```typescript
// src/__tests__/e2e/swap.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Token Swap Interface", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should complete token swap flow", async ({ page }) => {
    // Select source token
    await page.click('[data-testid="token-card-usdc-1"]');
    await expect(page.locator('[data-testid="selected-source-token"]')).toContainText("USDC");

    // Select target token
    await page.click('[data-testid="token-card-eth-8453"]');
    await expect(page.locator('[data-testid="selected-target-token"]')).toContainText("ETH");

    // Enter USD amount
    await page.fill('[data-testid="usd-amount-input"]', "100");

    // Wait for calculations
    await expect(page.locator('[data-testid="swap-summary"]')).toBeVisible();

    // Verify amounts are calculated
    await expect(page.locator('[data-testid="source-amount"]')).not.toBeEmpty();
    await expect(page.locator('[data-testid="target-amount"]')).not.toBeEmpty();
  });

  test("should handle API errors gracefully", async ({ page }) => {
    // Mock API to return error
    await page.route("**/api/**", (route) => route.abort());

    await page.click('[data-testid="token-card-usdc-1"]');

    // Should show error message
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
  });
});
```

### API Testing Strategy

**Server-Side API Testing:**

```typescript
// api/__tests__/tokens.test.ts
import { describe, it, expect, vi } from "vitest";
import { createRequest, createResponse } from "node-mocks-http";
import handler from "../tokens/price";

// Mock the FunKit API
vi.mock("@funkit/api-base", () => ({
  getAssetPrice: vi.fn().mockResolvedValue({
    price: 2000,
    timestamp: Date.now(),
    currency: "USD"
  })
}));

describe("/api/tokens/price", () => {
  it("returns token price successfully", async () => {
    const req = createRequest({
      method: "GET",
      query: {
        address: "0x1234",
        chainId: "1"
      }
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.success).toBe(true);
    expect(data.data.price).toBe(2000);
  });

  it("handles missing parameters", async () => {
    const req = createRequest({
      method: "GET",
      query: {}
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
    const data = JSON.parse(res._getData());
    expect(data.success).toBe(false);
  });
});
```

## Code Examples & Implementation Patterns

### Server-Side API Implementation

**Token Price API Endpoint:**

```typescript
// api/tokens/price.ts
import { VercelRequest, VercelResponse } from "@vercel/node";
import { getAssetPrice } from "@funkit/api-base";

interface PriceResponse {
  success: boolean;
  data?: {
    price: number;
    timestamp: number;
    currency: string;
  };
  error?: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  // Only allow GET requests
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const { address, chainId } = req.query;

  // Validate required parameters
  if (!address || !chainId) {
    return res.status(400).json({
      success: false,
      error: "Missing required parameters: address and chainId"
    });
  }

  try {
    // Use server-side API key from environment
    const apiKey = process.env.FUNKIT_API_KEY;
    if (!apiKey) {
      throw new Error("API key not configured");
    }

    const priceData = await getAssetPrice({
      address: address as string,
      chainId: chainId as string,
      apiKey
    });

    const response: PriceResponse = {
      success: true,
      data: {
        price: priceData.price,
        timestamp: Date.now(),
        currency: "USD"
      }
    };

    // Cache for 1 minute
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");
    res.status(200).json(response);

  } catch (error) {
    console.error("Price fetch error:", error);
    
    const response: PriceResponse = {
      success: false,
      error: "Failed to fetch token price"
    };
    
    res.status(500).json(response);
  }
}
```

### Client-Side Service Layer

**API Service Implementation:**

```typescript
// src/services/apiClient.ts
class ApiClient {
  private baseUrl: string;

  constructor() {
    // Use internal API routes, not external FunKit API
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || '/api';
  }

  async getTokenPrice(address: string, chainId: number): Promise<TokenPrice> {
    try {
      const response = await fetch(
        `${this.baseUrl}/tokens/price?address=${address}&chainId=${chainId}`
      );
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch token price');
      }
      
      return data.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async getTokenList(): Promise<Token[]> {
    try {
      const response = await fetch(`${this.baseUrl}/tokens/list`);
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch token list');
      }
      
      return data.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
}

export const apiClient = new ApiClient();
```

### Component Implementation Patterns

**Custom Hook for Calculations:**

```typescript
// src/hooks/useCalculations.ts
import { useMemo } from "react";
import { useAppSelector } from "./redux";

export const useCalculations = () => {
  const { selectedPair } = useAppSelector((state) => state.tokens);
  const { usdAmount } = useAppSelector((state) => state.amounts);

  const calculations = useMemo(() => {
    if (!selectedPair.source?.price || !selectedPair.target?.price || !usdAmount) {
      return null;
    }

    const sourceAmount = usdAmount / selectedPair.source.price;
    const targetAmount = usdAmount / selectedPair.target.price;
    const exchangeRate = selectedPair.source.price / selectedPair.target.price;

    return {
      usdAmount,
      sourceAmount,
      targetAmount,
      exchangeRate,
    };
  }, [selectedPair.source?.price, selectedPair.target?.price, usdAmount]);

  const isCalculating = !calculations && usdAmount > 0;

  return { calculations, isCalculating };
};
```

**Error Handling Utility:**

```typescript
// src/utils/errorHandler.ts
export class ApiErrorHandler {
  static handle(error: unknown, context: string): never {
    console.error(`API Error in ${context}:`, error);

    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error("Network connection failed. Please check your internet connection.");
    }

    if (error && typeof error === "object" && "status" in error) {
      const status = (error as { status: number }).status;
      switch (status) {
        case 401:
          throw new Error("API authentication failed. Please check your API key.");
        case 429:
          throw new Error("Rate limit exceeded. Please try again later.");
        case 500:
          throw new Error("Server error. Please try again later.");
        default:
          throw new Error(`API request failed with status ${status}`);
      }
    }

    throw new Error("An unexpected error occurred. Please try again.");
  }
}
```

### Performance Optimization Patterns

**Memoized Components:**

```typescript
// src/components/TokenCard/TokenCard.tsx
import React, { memo } from "react";
import { motion } from "framer-motion";

interface TokenCardProps {
  token: Token;
  isSelected: boolean;
  onSelect: () => void;
}

export const TokenCard = memo<TokenCardProps>(({ token, isSelected, onSelect }) => {
  return (
    <motion.div
      className={`token-card ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      data-testid={`token-card-${token.id}`}
    >
      <div className="token-info">
        <h4>{token.symbol}</h4>
        <p>{token.name}</p>
      </div>
      <div className="price-info">
        {token.price ? `$${token.price.toFixed(2)}` : 'Loading...'}
      </div>
    </motion.div>
  );
});

TokenCard.displayName = 'TokenCard';
```

**Debounced Input Hook:**

```typescript
// src/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```
