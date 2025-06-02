import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Initialize chat as a Promise
const chatPromise = (async () => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  return model.startChat({ history: [] });
})();

export async function sendToGemini(message) {
  const chat = await chatPromise;

  const MAX_RETRIES = 5;
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      const result = await chat.sendMessage(message);
      return result.response.text();
    } catch (error) {
      // If Gemini is overloaded, retry
      if (error.status === 503) {
        console.warn(`Gemini is overloaded. Retrying... (Attempt ${attempt + 1})`);
        await new Promise(res => setTimeout(res, Math.pow(2, attempt) * 1000)); // Exponential backoff
        attempt++;
      } else {
        throw error; // Rethrow any other error
      }
    }
  }

  throw new Error("Gemini is currently unavailable. Please try again later.");
}
