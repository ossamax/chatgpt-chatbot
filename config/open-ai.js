import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
// add api key by passing object { apiKey: "add api key here" } inside OpenAI
const openai = new OpenAI();
export default openai;
