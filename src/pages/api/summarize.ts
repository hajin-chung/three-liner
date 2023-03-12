import type { APIRoute } from "astro";

export const summarize:APIRoute = async ({request}) =>{
  const body = await request.json();
  const text = body.text;

  if (!text) return new Response() // error

  // TODO: fetch open api summarizer
  const summarized = "";
  return new Response(JSON.stringify({summarized}));
}