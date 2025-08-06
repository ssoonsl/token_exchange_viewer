# Token Swap Interface - Deployment Guide

## 📋 Pre-Deployment Checklist

✅ **Build Status**: TypeScript compilation successful  
✅ **Test Status**: 38 tests passing (8 integration + 30 E2E)  
✅ **Lint Status**: No ESLint errors  
✅ **Dependencies**: All production dependencies installed  
✅ **API Endpoints**: `/api/tokens/list` and `/api/tokens/price` implemented  
✅ **Vercel Config**: Properly configured in `vercel.json`  

## 🚀 Deployment Instructions

### 1. Vercel CLI Setup

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to your Vercel account
vercel login
```

### 2. Environment Variables Configuration

**Required Environment Variable:**
- `FUNKIT_API_KEY` - Your FunKit API key for token price data

**Set up environment variables in Vercel:**

```bash
# Set production environment variable
vercel env add FUNKIT_API_KEY production

# When prompted, enter your FunKit API key value
```

**Alternative: Via Vercel Dashboard**
1. Go to your project in Vercel Dashboard
2. Navigate to Settings → Environment Variables
3. Add `FUNKIT_API_KEY` with your API key value
4. Set Environment to "Production"

### 3. Deploy to Production

```bash
# Deploy to production
vercel --prod

# Follow the prompts:
# - Link to existing project or create new one
# - Confirm project settings
# - Wait for deployment to complete
```

### 4. Verify Deployment

After deployment, test the following endpoints:

**Production API Endpoints:**
- `https://your-app.vercel.app/api/tokens/list` - Available tokens
- `https://your-app.vercel.app/api/tokens/price?address=0xA0b86a33E6441f8bA77C53D08b0e5577D3E5ECb4&chainId=1` - Token price

**UI Testing:**
- Visit `https://your-app.vercel.app`
- Select tokens (USDC, USDT, ETH, WBTC)
- Enter USD amount
- Verify calculations appear

## 🔧 Configuration Details

### Vercel Configuration (`vercel.json`)

```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "functions": {
    "api/**/*.ts": {
      "runtime": "@vercel/node@3.2.21"
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

### Build Process

The deployment uses the following build process:
1. `npm install` - Install dependencies
2. `tsc -b` - TypeScript compilation
3. `vite build` - Vite production build
4. Deploy `dist/` folder as static assets
5. Deploy `api/` folder as serverless functions

## 🌐 Architecture Overview

### Client-Server Architecture
- **Frontend**: Static React app served from CDN
- **API**: Serverless functions in `/api` folder  
- **External API**: @funkit/api-base integration (server-side only)

### API Proxy Pattern
```
Client → /api/* (Vercel Functions) → FunKit API
```

### Security Features
- API keys stored server-side only
- Security headers configured
- No sensitive data exposed to client
- CORS protection enabled

## 📊 Performance Monitoring

### Key Metrics to Monitor
- **API Response Times**: `/api/tokens/*` endpoints
- **Build Times**: Should be under 2 minutes
- **Bundle Size**: Currently ~267KB (main bundle)
- **Test Execution**: All 38 tests passing

### Error Monitoring
- Check Vercel Function logs for API errors
- Monitor client-side console for UI errors
- Watch for rate limiting from FunKit API

## 🔍 Troubleshooting

### Common Issues

**Build Failures:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript compilation
npm run build
```

**API Errors:**
- Verify `FUNKIT_API_KEY` is set correctly
- Check function logs in Vercel dashboard
- Test API endpoints directly

**Test Failures:**
```bash
# Run tests locally
npm run test
npm run test:e2e

# Check for environment-specific issues
```

### Environment-Specific Issues

**Local Development:**
```bash
# Use Vercel dev for full-stack development
vercel dev

# Or separate client/server development
npm run dev  # Client only (port 5173)
```

**Production Issues:**
- Check Vercel function logs
- Verify environment variables
- Test API endpoints directly

## 📁 Project Structure

```
├── api/                      # Vercel serverless functions
│   ├── tokens/list.ts       # GET /api/tokens/list
│   ├── tokens/price.ts      # GET /api/tokens/price  
│   └── utils/               # Server-side utilities
├── src/                     # React application
│   ├── components/          # UI components
│   ├── store/              # Redux store
│   ├── services/           # API client
│   └── types/              # TypeScript types
├── dist/                   # Build output (generated)
├── vercel.json            # Vercel configuration
└── package.json           # Dependencies and scripts
```

## ✅ Post-Deployment Validation

### 1. Automated Testing
```bash
# Run against production environment
PLAYWRIGHT_BASE_URL=https://your-app.vercel.app npm run test:e2e
```

### 2. Manual Testing Checklist
- [ ] Application loads successfully
- [ ] All 4 tokens display correctly
- [ ] Token selection works
- [ ] USD amount input accepts values
- [ ] Calculations appear in real-time
- [ ] Error handling displays properly
- [ ] Responsive design works on mobile

### 3. Performance Validation
- [ ] Page loads under 3 seconds
- [ ] API responses under 2 seconds
- [ ] No console errors
- [ ] Lighthouse score > 90

## 🚨 Rollback Plan

If issues occur post-deployment:

```bash
# Rollback to previous deployment
vercel --prod --force

# Or promote a previous deployment via dashboard
```

## 🎯 Next Steps (Post-MVP)

Once deployed and validated, consider these enhancements:
- Rate limiting implementation
- Caching layer optimization  
- Performance monitoring setup
- Error tracking integration
- Advanced security headers
- CDN configuration
- Custom domain setup

---

**Deployment completed successfully!** 🎉

Your Token Swap Interface is now live and ready for users.