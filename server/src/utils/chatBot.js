import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
let chat;

(async () => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  chat = await model.startChat({ history: [] });
})();

export async function sendToGemini(message) {
  if (!chat) {
    throw new Error("Chat model not initialized yet.");
  }
  const result = await chat.sendMessage(message);
  return result.response.text();
}