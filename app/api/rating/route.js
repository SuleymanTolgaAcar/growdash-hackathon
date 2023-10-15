import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(req) {
  const data = await req.json();
  const prompt = data.prompt;
  let res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.1,
    messages: [
      {
        role: "user",
        content:
          "I want you to classify the comments that i will give you according to these categories: Delivery speed, Taste, Price, Ambience, Service. I want you to give ONLY the ratings out of 5 for each category. Only output the rating numbers sequentially, separated by spaces. For example, if the ratings are 4, 3, 0, 0, 1 then the output should be 4 3 0 0 1.",
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
