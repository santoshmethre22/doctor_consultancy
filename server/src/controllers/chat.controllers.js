import { sendToGemini } from "../utils/chatBot.js";


 export const chatmodel=async(req,res)=>{
try {
        const userMessage = req.body.messages;
        if (!userMessage) return res.status(400).json({ error: 'No message sent' });
         const reply = await sendToGemini(userMessage);
       // res.json({ reply });
        return res.status(200).json({
            success:true,
            data:reply,
            message: "the reply from the model"
        })
} catch (error) {
    console.error("Gemini Error:", error); // 🔍 ADD THIS
    res.status(500).json({ success:false,
        message:"the server error"
     });
}
}