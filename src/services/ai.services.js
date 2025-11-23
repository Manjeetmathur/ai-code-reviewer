import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv'
dotenv.config({
       path:'./.env'
})
const genAI = new GoogleGenerativeAI(`${process.env.GOOGLE_GEMINI_KEY}`);

const getSystemInstruction = (reviewMode) => {
  const baseInstruction = `Your role is to meticulously analyze code submissions to ensure they meet the highest standards of quality, security, and maintainability. Your responsibilities include identifying potential bugs, suggesting optimal solutions, and providing actionable recommendations to enhance the codebase.`;
  
  const modeInstructions = {
    general: `${baseInstruction} Provide a comprehensive review covering all aspects: code quality, security, performance, best practices, and maintainability.`,
    security: `${baseInstruction} Focus specifically on security vulnerabilities, potential exploits, authentication/authorization issues, input validation, SQL injection, XSS attacks, and other security concerns. Prioritize security-related findings.`,
    performance: `${baseInstruction} Focus specifically on performance optimization: algorithm efficiency, time/space complexity, database queries, caching strategies, memory leaks, and scalability concerns.`,
    bestPractices: `${baseInstruction} Focus specifically on code quality, design patterns, SOLID principles, DRY (Don't Repeat Yourself), naming conventions, code organization, readability, and maintainability.`
  };
  
  return modeInstructions[reviewMode] || modeInstructions.general;
};

export const generateContent = async(prompt, reviewMode = 'general', language = 'javascript') => {
       const systemInstruction = getSystemInstruction(reviewMode);
       const model = genAI.getGenerativeModel({ 
         model: "gemini-2.0-flash",
         systemInstruction: systemInstruction
       });
       
       const enhancedPrompt = `Review the following ${language} code:\n\n${prompt}\n\nProvide a detailed code review with specific recommendations.`;
       const result = await model.generateContent(enhancedPrompt);
       return result.response.text();
}
