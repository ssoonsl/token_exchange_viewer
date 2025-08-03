import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Token, TokenPrice, ApiResponse } from '@types/index';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
if (!baseUrl) {
  throw new Error('VITE_API_BASE_URL environment variable is not configured');
}

export const tokensApi = createApi({
  reducerPath: 'tokensApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/tokens`,
  }),
  tagTypes: ['Token', 'TokenPrice'],
  endpoints: (builder) => ({
    getTokenList: builder.query<Token[], void>({
      query: () => '/list',
      transformResponse: (response: ApiResponse<Token[]>) => {
        if (!response.success) {
          throw new Error(response.error || 'Failed to fetch token list');
        }
        return response.data || [];
      },
      providesTags: ['Token'],
    }),
    getTokenPrice: builder.query<TokenPrice, { address: string; chainId: number }>({
      query: ({ address, chainId }) => ({
        url: '/price',
        params: { address, chainId },
      }),
      transformResponse: (response: ApiResponse<TokenPrice>) => {
        if (!response.success) {
          throw new Error(response.error || 'Failed to fetch token price');
        }
        if (!response.data) {
          throw new Error('No price data received');
        }
        return response.data;
      },
      providesTags: (result, error, { address, chainId }) => [
        { type: 'TokenPrice', id: `${address}-${chainId}` },
      ],
    }),
  }),
});

export const { useGetTokenListQuery, useGetTokenPriceQuery } = tokensApi;