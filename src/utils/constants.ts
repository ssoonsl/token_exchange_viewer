import { Token } from "../types/index";

export const CHAIN_INFO = {
  Ethereum: { id: 1, rpc: "https://ethereum.publicnode.com" },
  Polygon: { id: 137, rpc: "https://polygon.publicnode.com" },
  Base: { id: 8453, rpc: "https://base.publicnode.com" },
};

// TechDebt: Fetch this from external token registry instead
export const SUPPORTED_TOKENS: Token[] = [
  {
    id: "usdc-1",
    symbol: "USDC",
    name: "USD Coin",
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    chainId: CHAIN_INFO.Ethereum.id,
    decimals: 6,
  },
  {
    id: "usdt-137",
    symbol: "USDT",
    name: "Tether USD",
    address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    chainId: CHAIN_INFO.Polygon.id,
    decimals: 6,
  },
  {
    id: "eth-8453",
    symbol: "ETH",
    name: "Ethereum",
    address: "0x4200000000000000000000000000000000000006",
    chainId: CHAIN_INFO.Base.id,
    decimals: 18,
  },
  {
    id: "wbtc-1",
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    chainId: CHAIN_INFO.Ethereum.id,
    decimals: 8,
  },
];

export const API_CONFIG = {
  CACHE_TTL: 300, // 5 minutes
  PRICE_CACHE_TTL: 60, // 1 minute
} as const;
