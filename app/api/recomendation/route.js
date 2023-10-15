import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(req) {
  const data = await req.json();
  const prompt = data.prompt;
  let res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content:
          "I will give you the ratings of a restaurant in the following categories: Delivery speed, Taste, Price, Ambience, Service. The ratings will be out of 5. I want you to give recomendations to improve that restaurants sales and customer satisfaction. If the rating on the criteria is 5 don't give a suggestion on that topic. But you can give a compliment on that. The recomendation should be about 3 to 4 sentences long. Make the output like a paragraph, not like a list. Give me only the recomendation.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  console.log(res.usage.total_tokens);

  return Response.json(res.choices[0].message.content);
}
