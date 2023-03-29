import type { APIRoute } from "astro";

export const post: APIRoute = async ({ request }) => {
  const body = await request.json();
  const text = body.text;

  console.log(text);
  if (!text) return new Response(); // error

  console.log("api key: ", import.meta.env.API_KEY);
  const res = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.API_KEY}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: `${text}\nsummary in 3 sentences and put line numbers in front of each sentences:\n`,
      max_tokens: 2048,
      temperature: 0,
    }),
  });
  const data = await res.json();
  console.log(data);
  const summarized = data.choices[0].text;
  return new Response(JSON.stringify({ summarized }));
};
