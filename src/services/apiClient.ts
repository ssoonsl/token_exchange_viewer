import axios from 'axios';
import { Token, TokenPrice, ApiResponse } from '@types/index';

class ApiClient {
  private baseUrl: string;

  constructor() {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    
    if (!baseUrl) {
      throw new Error('VITE_API_BASE_URL environment variable is not configured');
    }
    
    this.baseUrl = baseUrl;
  }

  async getTokenList(): Promise<Token[]> {
    try {
      const response = await axios.get<ApiResponse<Token[]>>(`${this.baseUrl}/tokens/list`);
      
      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to fetch token list');
      }
      
      return response.data.data || [];
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async getTokenPrice(address: string, chainId: number): Promise<TokenPrice> {
    try {
      const response = await axios.get<ApiResponse<TokenPrice>>(
        `${this.baseUrl}/tokens/price`,
        {
          params: { address, chainId }
        }
      );
      
      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to fetch token price');
      }
      
      if (!response.data.data) {
        throw new Error('No price data received');
      }
      
      return response.data.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
}

export const apiClient = new ApiClient();