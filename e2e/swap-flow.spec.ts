import { test, expect, Page } from '@playwright/test';

const mockTokens = [
  {
    id: 'usdc-1',
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0xA0b86a33E6441f8bA77C53D08b0e5577D3E5ECb4',
    chainId: 1,
    decimals: 6,
  },
  {
    id: 'usdt-137',
    symbol: 'USDT',
    name: 'Tether',
    address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    chainId: 137,
    decimals: 6,
  },
  {
    id: 'eth-8453',
    symbol: 'ETH',
    name: 'Ethereum',
    address: '0x4200000000000000000000000000000000000006',
    chainId: 8453,
    decimals: 18,
  },
  {
    id: 'wbtc-1',
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    chainId: 1,
    decimals: 8,
  },
];

const mockPrices = {
  'usdc': { price: 1.00, timestamp: Date.now(), currency: 'USD' },
  'usdt': { price: 1.00, timestamp: Date.now(), currency: 'USD' },
  'eth': { price: 2500.00, timestamp: Date.now(), currency: 'USD' },
  'wbtc': { price: 45000.00, timestamp: Date.now(), currency: 'USD' },
};

test.describe('Token Swap Interface - E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/tokens/list', async route => {
      await route.fulfill({
        json: {
          success: true,
          data: mockTokens
        }
      });
    });

    await page.route('**/api/tokens/price*', async route => {
      const url = new URL(route.request().url());
      const address = url.searchParams.get('address');

      let tokenSymbol = 'usdc';
      if (address?.includes('c2132')) tokenSymbol = 'usdt';
      else if (address?.includes('4200000')) tokenSymbol = 'eth';
      else if (address?.includes('2260FAC')) tokenSymbol = 'wbtc';

      await route.fulfill({
        json: {
          success: true,
          data: mockPrices[tokenSymbol]
        }
      });
    });

    await page.goto('/');
  });

  test('should load the application and display main interface', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Token Swap');
    await expect(page.locator('p').filter({ hasText: 'Select tokens and enter USD amount' })).toBeVisible();
    await expect(page.locator('label').filter({ hasText: 'USD Amount' })).toBeVisible();
    await expect(page.locator('label').filter({ hasText: 'From Token' })).toBeVisible();
    await expect(page.locator('label').filter({ hasText: 'To Token' })).toBeVisible();
  });

  test('should display available tokens', async ({ page }) => {
    await expect(page.locator('[data-testid="token-card-usdc-1"]').first()).toBeVisible();
    await expect(page.locator('[data-testid="token-card-usdt-137"]').first()).toBeVisible();
    await expect(page.locator('[data-testid="token-card-eth-8453"]').first()).toBeVisible();
    await expect(page.locator('[data-testid="token-card-wbtc-1"]').first()).toBeVisible();
  });

  test('should complete full swap flow calculation', async ({ page }) => {
    await expect(page.locator('[data-testid="token-card-usdc-1"]').first()).toBeVisible();

    // Select USDC as source token (first instance)
    await page.locator('[data-testid="token-card-usdc-1"]').first().click();

    // Select ETH as target token (second instance)
    await page.locator('[data-testid="token-card-eth-8453"]').nth(1).click();

    const amountInput = page.locator('[data-testid="usd-amount-input"]');
    await amountInput.fill('1000');

    await expect(page.locator('[data-testid="swap-summary"]')).toBeVisible();
    await expect(page.locator('text=Swap Summary')).toBeVisible();

    await expect(page.locator('[data-testid="source-amount"]')).toBeVisible();
    await expect(page.locator('[data-testid="target-amount"]')).toBeVisible();

    await expect(page.locator('text=USD Amount:')).toBeVisible();
    await expect(page.locator('text=$1000.00')).toBeVisible();
    await expect(page.locator('text=Exchange Rate:')).toBeVisible();
  });

  test('should validate USD amount input', async ({ page }) => {
    const amountInput = page.locator('[data-testid="usd-amount-input"]');

    // Test empty input - no error should show
    await amountInput.fill('');
    await amountInput.blur();
    await expect(page.locator('[data-testid="amount-error"]')).not.toBeVisible();

    // Test amount too large
    await amountInput.fill('2000000');
    await amountInput.blur();
    await expect(page.locator('[data-testid="amount-error"]')).toBeVisible();
    await expect(page.locator('text=Amount too large')).toBeVisible();

    // Test valid amount - error should disappear
    await amountInput.clear();
    await amountInput.fill('100');
    await amountInput.blur();
    await page.waitForTimeout(100); // Wait for validation to process
    await expect(page.locator('[data-testid="amount-error"]')).not.toBeVisible();
  });

  test('should show guidance when tokens are not selected', async ({ page }) => {
    await expect(page.locator('text=Select both tokens to enable swap calculations')).toBeVisible();
  });

  test('should handle token selection state correctly', async ({ page }) => {
    await expect(page.locator('[data-testid="token-card-usdc-1"]').first()).toBeVisible();

    const usdcButton = page.locator('[data-testid="token-card-usdc-1"]').first();
    await usdcButton.click();

    await expect(usdcButton).toHaveClass(/border-blue-500/);
    await expect(usdcButton).toHaveClass(/bg-blue-50/);
  });

  test('should format currency input correctly', async ({ page }) => {
    const amountInput = page.locator('[data-testid="usd-amount-input"]');

    await amountInput.fill('1000');
    await amountInput.blur();
    
    await expect(amountInput).toHaveValue('1,000');

    await amountInput.focus();
    await expect(amountInput).toHaveValue('1000');
  });

  test('should handle different token combinations', async ({ page }) => {
    await expect(page.locator('[data-testid="token-card-usdc-1"]').first()).toBeVisible();

    await page.locator('[data-testid="token-card-usdt-137"]').first().click();
    await page.locator('[data-testid="token-card-wbtc-1"]').nth(1).click();
    
    const amountInput = page.locator('[data-testid="usd-amount-input"]');
    await amountInput.fill('100');

    await expect(page.locator('[data-testid="swap-summary"]')).toBeVisible();
    await expect(page.locator('[data-testid="source-amount"]')).toContainText('USDT Amount:');
    await expect(page.locator('[data-testid="target-amount"]')).toContainText('WBTC Amount:');
  });

  test('should be responsive on different screen sizes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('h1')).toContainText('Token Swap');
    await expect(page.locator('.max-w-md')).toBeVisible();

    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('h1')).toContainText('Token Swap');
    await expect(page.locator('.max-w-md')).toBeVisible();

    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('h1')).toContainText('Token Swap');
    await expect(page.locator('.max-w-md')).toBeVisible();
  });

  test('should handle decimal precision correctly', async ({ page }) => {
    await expect(page.locator('[data-testid="token-card-usdc-1"]').first()).toBeVisible();

    await page.locator('[data-testid="token-card-usdc-1"]').first().click();
    await page.locator('[data-testid="token-card-eth-8453"]').nth(1).click();
    
    const amountInput = page.locator('[data-testid="usd-amount-input"]');
    await amountInput.fill('2500');

    await expect(page.locator('[data-testid="swap-summary"]')).toBeVisible();
    
    await expect(page.locator('[data-testid="source-amount"]')).toContainText('2500.00');
    await expect(page.locator('[data-testid="target-amount"]')).toContainText('1.000000');
  });
});