import { VercelRequest, VercelResponse } from "@vercel/node";
import { Token } from "../../src/types/index";
import { sendSuccess, sendError, sendMethodNotAllowed } from "../utils/response";
import { logger } from "../utils/logger";

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
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
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
    logger.error("Token list error:", error);
    return sendError(res, "Failed to fetch token list");
  }
}