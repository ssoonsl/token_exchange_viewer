import { VercelRequest, VercelResponse } from "@vercel/node";
import { Token } from "../../src/types/index.js";
import { sendSuccess, sendError, sendMethodNotAllowed } from "../utils/response.js";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "GET") {
    return sendMethodNotAllowed(res);
  }

  try {
    const tokens: Token[] = [
      {
        id: "usdc-1",
        symbol: "USDC",
        name: "USD Coin",
        address: "0xA0b86a33E6441f8bA77C53D08b0e5577D3E5ECb4",
        chainId: 1,
        decimals: 6,
      },
      {
        id: "usdt-137",
        symbol: "USDT",
        name: "Tether USD",
        address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        chainId: 137,
        decimals: 6,
      },
      {
        id: "eth-8453",
        symbol: "ETH",
        name: "Ethereum",
        address: "0x4200000000000000000000000000000000000006",
        chainId: 8453,
        decimals: 18,
      },
      {
        id: "wbtc-1",
        symbol: "WBTC",
        name: "Wrapped Bitcoin",
        address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
        chainId: 1,
        decimals: 8,
      },
    ];

    return sendSuccess(res, tokens, 300);
  } catch (error) {
    console.error("Token list error:", error);
    return sendError(res, "Failed to fetch token list");
  }
}