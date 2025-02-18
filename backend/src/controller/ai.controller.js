import { generateContent } from "../services/ai.services.js";

export const generateReview = async(req,res) => {
       const prompt = req.body.code;
       console.log("hii")
       try {
              if(!prompt){
                     return res.status(400).send("prompt is required");
              }

              const result = await generateContent(prompt)

              res.json({result})

       } catch (error) {
              res.json({
                     message:error.message
              })
       }
}