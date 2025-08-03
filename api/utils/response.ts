import { VercelResponse } from "@vercel/node";

export function sendSuccess<T>(res: VercelResponse, data: T, cacheMaxAge = 60) {
  res.setHeader("Cache-Control", `s-maxage=${cacheMaxAge}, stale-while-revalidate`);
  return res.status(200).json({
    success: true,
    data
  });
}

export function sendError(res: VercelResponse, error: string, status = 500) {
  return res.status(status).json({
    success: false,
    error
  });
}

export function sendMethodNotAllowed(res: VercelResponse) {
  return sendError(res, "Method not allowed", 405);
}

export function sendBadRequest(res: VercelResponse, error: string) {
  return sendError(res, error, 400);
}