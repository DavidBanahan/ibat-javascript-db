import OpenAI from "openai";
import readline from "readline";

const openai = new OpenAI();

// Function to ask a question and wait for the user's response using readline.js
function askQuestion(query) {
    const input = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  
    return new Promise(resolve => input.question(query, answer => {
      input.close();
      resolve(answer);
    }));
  }
  
  // Main function to prompt the user for a prompt and generate an image
  async function main() {
    const prompt = await askQuestion("Please enter a prompt for the image: ");
  
    try {
      const image = await openai.images.generate({ model: "dall-e-3", prompt: prompt });
      console.log(image.data);
    } catch (error) {
      console.error("Error generating image:", error);
    }
  }
main();