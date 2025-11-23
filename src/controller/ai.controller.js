import { generateContent } from "../services/ai.services.js";

export const generateReview = async(req,res) => {
       const { code, reviewMode = 'general', language = 'javascript' } = req.body;
       console.log("Review request received", { reviewMode, language });
       try {
              if(!code){
                     return res.status(400).json({ message: "code is required" });
              }

              const result = await generateContent(code, reviewMode, language);

              res.json({result})

       } catch (error) {
              console.error("Error generating review:", error);
              res.status(500).json({
                     message: error.message || "An error occurred while generating the review"
              })
       }
}