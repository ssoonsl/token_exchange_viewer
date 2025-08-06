# Token Exchange Viewer

A secure, full-stack React application for real-time cryptocurrency token swapping with multi-chain support.

## 🎯 Project Overview

This is a production-ready Token Swap Interface built with React 18 and TypeScript that allows users to:

- Select cryptocurrency tokens from multiple blockchains
- Input USD amounts with real-time validation
- View equivalent token amounts with live price calculations
- Experience responsive design across mobile and desktop

**Live Demo**: [https://token-exchange-viewer.vercel.app/](https://token-exchange-viewer.vercel.app/)

## 🏗️ Architecture Overview

### Security-First Design

This project implements a **serverless API proxy pattern** to ensure complete security of third-party API credentials:

```
Client → Internal API (/api/*) → FunKit API
```

**Why Serverless Functions?**

- **API Key Protection**: Sensitive credentials never exposed to client-side code
- **Rate Limiting**: Server-side request throttling and deduplication
- **CORS Security**: Restrictive origin policies and request validation
- **Scalability**: Auto-scaling Vercel serverless functions

### Technology Stack

**Frontend**

- **React 18** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **Redux Toolkit + RTK Query** for state management and API caching
- **Tailwind CSS** for responsive styling

**Backend**

- **Vercel Serverless Functions** for API endpoints
- **@funkit/api-base** for blockchain data integration
- **Node.js 18.x** runtime environment

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- FunKit API key (for price data)

### Development Setup

1. **Clone and install dependencies**

```bash
git clone https://github.com/ssoonsl/token_exchange_viewer
cd token_exchange_viewer
npm install
```

2. **Configure environment variables**

```bash
# Copy environment template
cp .env.example .env.local

# Add your FunKit API key
FUNKIT_API_KEY=your_funkit_api_key_here
VITE_API_BASE_URL=http://localhost:3000  # For local development
```

3. **Start development server**

```bash
# For full-stack development (recommended)
vercel dev

# Or for frontend-only development
npm run dev
```

4. **Access the application**

- Full-stack: http://localhost:3000
- Frontend-only: http://localhost:5173

5. **Testing & Quality**

```bash
npm run test         # Run integration tests
npm run test:e2e     # Run end-to-end tests with Playwright
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run type-check   # TypeScript type checking
```

### Deployment

Merging to main will automatically deploy to prod. Alternatively, vercel allows manual deployment through:

```bash
vercel --prod                           # Deploy to production
vercel env add <env_var> production     # Set environment variables
```

## 🔐 Security Implementation

### API Key Management

- **Server-side only**: FunKit API keys stored as Vercel environment variables

### Request Security

- **Input validation**: Dual-layer validation (client + server)
- **Rate limiting**: Server-side request throttling
- **CORS protection**: Restrictive origin policies
- **Secure headers**: XSS protection, content type sniffing prevention

## 💰 Supported Tokens

The application supports four major cryptocurrencies across multiple blockchains:

| Token | Chain | Network  | Contract Address                             |
| ----- | ----- | -------- | -------------------------------------------- |
| USDC  | 1     | Ethereum | `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48` |
| USDT  | 137   | Polygon  | `0xc2132D05D31c914a87C6611C10748AEb04B58e8F` |
| ETH   | 8453  | Base     | `0x4200000000000000000000000000000000000006` |
| WBTC  | 1     | Ethereum | `0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599` |

## 🔧 Serverless API Integration

**GET /api/tokens/list**

- Returns supported token configuration
- Includes contract addresses and chain information

**GET /api/tokens/price**

- Fetches real-time token prices
- Parameters: `address`, `chainId`
- Returns: USD price with timestamp

## 📈 Performance Considerations

- RTK Query caching for API responses
- Vite optimization with tree shaking and minification
- Serverless edge caching with 60-second TTL

## 🚀 Further Enhancements

- Framer Motion animations for smooth UI transitions
- Fetch list of available tokens from a token registry API like CoinGecko instead of hardcoding in `src/utils/constants.ts`
- Code splitting with React.lazy() for improved loading
- WCAG 2.1 AA accessibility compliance
