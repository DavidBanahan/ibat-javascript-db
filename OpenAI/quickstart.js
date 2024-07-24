import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What are in these images? Is there any difference between them?" },
          {
            type: "image_url",
            image_url: {
              "url": "https://cdn.europosters.eu/image/750webp/90218.webp",
              "detail": "low"
            },
          },
          {
            type: "image_url",
            image_url: {
              "url": "https://cdn.europosters.eu/image/750webp/182368.webp",
              "detail": "low"
            },
          },
          {
            type: "image_url",
            image_url: {
              "url": "https://cdn.europosters.eu/image/750webp/76972.webp",
              "detail": "low"
            },
          }
        ],
      },
    ],
  });
  console.log(response.choices[0]);
}
main();