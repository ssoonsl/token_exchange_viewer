import { VercelRequest, VercelResponse } from "@vercel/node";
import { sendSuccess, sendError, sendMethodNotAllowed } from "../utils/response";
import { logger } from "../utils/logger";
import { SUPPORTED_TOKENS, API_CONFIG } from "../../src/utils/constants";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "GET") {
    return sendMethodNotAllowed(res);
  }

  try {
    return sendSuccess(res, SUPPORTED_TOKENS, API_CONFIG.CACHE_TTL);
  } catch (error) {
    logger.error("Token list error:", error);
    return sendError(res, "Failed to fetch token list");
  }
}