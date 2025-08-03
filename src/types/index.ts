export interface Token {
  id: string;
  symbol: string;
  name: string;
  address: string;
  chainId: number;
  decimals: number;
  price?: number;
}

export interface TokenPrice {
  price: number;
  timestamp: number;
  currency: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export type TokenListResponse = ApiResponse<Token[]>;
export type PriceResponse = ApiResponse<TokenPrice>;