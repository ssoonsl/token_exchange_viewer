import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import { TokenPrice } from "../../src/types/index.js";
import { sendSuccess, sendError, sendMethodNotAllowed, sendBadRequest } from "../utils/response.js";

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

    // Use axios to call FunKit API
    const response = await axios.post('https://api.funkit.io/v1/assets/price', {
      address: address as string,
      chainId: parseInt(chainId as string)
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const tokenPrice: TokenPrice = {
      price: response.data.price,
      timestamp: Date.now(),
      currency: "USD"
    };

    return sendSuccess(res, tokenPrice, 60);

  } catch (error) {
    console.error("Price fetch error:", error);
    return sendError(res, "Failed to fetch token price");
  }
}