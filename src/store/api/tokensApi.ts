import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Token, TokenPrice, ApiResponse } from '@/types';

export const tokensApi = createApi({
  reducerPath: 'tokensApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NODE_ENV === 'test' ? 'http://localhost:3000/api/tokens' : '/api/tokens',
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
      providesTags: (_, __, { address, chainId }) => [
        { type: 'TokenPrice', id: `${address}-${chainId}` },
      ],
    }),
  }),
});

export const { useGetTokenListQuery, useGetTokenPriceQuery } = tokensApi;