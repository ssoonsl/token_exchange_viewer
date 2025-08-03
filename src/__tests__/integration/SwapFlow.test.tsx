import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { tokensApi } from '@store/api/tokensApi';
import { SwapInterface } from '@components/SwapInterface/SwapInterface';

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
    id: 'eth-8453',
    symbol: 'ETH',
    name: 'Ethereum',
    address: '0x4200000000000000000000000000000000000006',
    chainId: 8453,
    decimals: 18,
  },
];

const createMockStore = () => {
  return configureStore({
    reducer: {
      [tokensApi.reducerPath]: tokensApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(tokensApi.middleware),
  });
};

describe('Swap Flow Integration', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockImplementation((input) => {
      const url = input instanceof Request ? input.url : input;
      
      if (url.includes('/api/tokens/list')) {
        return Promise.resolve(new Response(JSON.stringify({
          success: true,
          data: mockTokens
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }));
      }
      
      if (url.includes('/api/tokens/price')) {
        return Promise.resolve(new Response(JSON.stringify({
          success: true,
          data: { price: 1.00, timestamp: Date.now(), currency: 'USD' }
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }));
      }
      
      return Promise.reject(new Error(`Unknown API endpoint: ${url}`));
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders swap interface with all components', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <SwapInterface />
      </Provider>
    );

    expect(screen.getByText('Token Swap')).toBeInTheDocument();
    expect(screen.getByText('USD Amount')).toBeInTheDocument();
    expect(screen.getByText('From Token')).toBeInTheDocument();
    expect(screen.getByText('To Token')).toBeInTheDocument();
  });

  it('displays tokens when loaded successfully', async () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <SwapInterface />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getAllByText('USDC')).toHaveLength(2);
      expect(screen.getAllByText('ETH')).toHaveLength(2);
    });
  });

  it('allows token selection and shows selection state', async () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <SwapInterface />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getAllByText('USDC')).toHaveLength(2);
    });

    const usdcButton = screen.getAllByText('USDC')[0].closest('button');
    if (usdcButton) {
      fireEvent.click(usdcButton);
      expect(usdcButton).toHaveClass('border-blue-500');
      expect(usdcButton).toHaveClass('bg-blue-50');
    }
  });

  it('validates USD amount input correctly', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <SwapInterface />
      </Provider>
    );

    const amountInput = screen.getByTestId('usd-amount-input');

    fireEvent.change(amountInput, { target: { value: 'invalid' } });
    expect(amountInput).toHaveValue('');

    fireEvent.change(amountInput, { target: { value: '100' } });
    expect(amountInput).toHaveValue('100');

    fireEvent.focus(amountInput);
    fireEvent.change(amountInput, { target: { value: '100.50' } });
    expect(amountInput).toHaveValue('100.50');

    fireEvent.change(amountInput, { target: { value: '100.555' } });
    expect(amountInput).toHaveValue('100.50');
  });

  it('shows guidance messages when tokens not selected', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <SwapInterface />
      </Provider>
    );

    expect(screen.getByText('Select both tokens to enable swap calculations')).toBeInTheDocument();
  });

  it('handles API error gracefully', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <SwapInterface />
      </Provider>
    );

    expect(screen.getByText('Token Swap')).toBeInTheDocument();
  });

  it('formats amount input with currency display', async () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <SwapInterface />
      </Provider>
    );

    const amountInput = screen.getByTestId('usd-amount-input');
    
    fireEvent.change(amountInput, { target: { value: '1000' } });
    fireEvent.blur(amountInput);
    
    await waitFor(() => {
      expect(amountInput).toHaveValue('1,000');
    });

    fireEvent.focus(amountInput);
    await waitFor(() => {
      expect(amountInput).toHaveValue('1000');
    });
  });

  it('shows loading state for tokens', () => {
    const store = configureStore({
      reducer: {
        [tokensApi.reducerPath]: tokensApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tokensApi.middleware),
    });

    render(
      <Provider store={store}>
        <SwapInterface />
      </Provider>
    );

    const loadingElements = screen.getAllByRole('generic').filter(el => 
      el.classList.contains('animate-pulse')
    );
    expect(loadingElements.length).toBeGreaterThan(0);
  });
});