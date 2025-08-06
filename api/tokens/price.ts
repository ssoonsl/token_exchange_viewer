import { VercelRequest, VercelResponse } from "@vercel/node";
import { getAssetPriceInfo } from "@funkit/api-base";
import { TokenPrice } from "../../src/types/index";
import { sendSuccess, sendError, sendMethodNotAllowed, sendBadRequest } from "../utils/response";
import { logger } from "../utils/logger";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "GET") {
    return sendMethodNotAllowed(res);
  }

  const { address, chainId } = req.query;

  if (!address || !chainId) {
    return sendBadRequest(res, "Missing required parameters: address and chainId");
  }

  try {
    const apiKey = process.env.FUNKIT_API_KEY;
    if (!apiKey) {
      throw new Error("API key not configured");
    }

    // Use @funkit/api-base to call FunKit API
    const response = await getAssetPriceInfo({
      chainId: chainId as string,
      assetTokenAddress: address as string,
      apiKey,
      logger: {
        debug: (title: string, data?: object) => logger.debug(title, data),
        error: (title: string, data?: object) => logger.error(title, data),
        info: (title: string, data?: object) => logger.info(title, data),
        warn: (title: string, data?: object) => logger.warn(title, data),
      }
    });

    const tokenPrice: TokenPrice = {
      price: response.unitPrice,
      timestamp: Date.now(),
      currency: "USD"
    };

    return sendSuccess(res, tokenPrice, 60);

  } catch (error) {
    logger.error("Price fetch error:", error);
    return sendError(res, "Failed to fetch token price");
  }
}