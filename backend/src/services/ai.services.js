import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv'
dotenv.config({
       path:'./.env'
})
const genAI = new GoogleGenerativeAI(`${process.env.GOOGLE_GEMINI_KEY}`);
const model = genAI.getGenerativeModel({ 
       model: "gemini-2.0-flash" ,
       systemInstruction: `your role is to meticulously analyze code submissions to ensure they meet the highest standards of quality, security, and maintainability. Your responsibilities include identifying potential bugs, suggesting optimal solutions, and providing actionable recommendations to enhance the codebase. Emphasize best practices, performance optimization, and adherence to project-specific guidelines in your evaluations.`
});

export const generateContent = async(prompt) => {
       const result = await model.generateContent(prompt);
       return result.response.text();
}
