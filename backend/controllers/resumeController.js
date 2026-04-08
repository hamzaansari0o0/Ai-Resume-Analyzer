import { extractTextFromPDF, analyzeResumeWithAI } from '../services/aiService.js';

export const analyzeResume = async (req, res) => {
    try {
        console.log("\n========================================");
        console.log("🚦 STEP 1: Request aayi backend pe");
        
        if (!req.file) {
            console.log("❌ ERROR: File nahi mili!");
            return res.status(400).json({ error: "No file uploaded" });
        }
        
        // Frontend se bheje gaye naye fields fetch kar rahe hain
        const { jobDescription, jobType, expLevel } = req.body;
        
        console.log("✅ STEP 2: File mil gayi! Size:", req.file.size);
        console.log(`🎯 JD Provided: ${jobDescription ? 'Yes' : 'No'} | Type: ${jobType} | Level: ${expLevel}`);

        console.log("🚦 STEP 3: PDF se text nikal rahe hain...");
        const text = await extractTextFromPDF(req.file.buffer);
        console.log("✅ STEP 4: Text nikal aaya! Total characters:", text.length);

        console.log("🚦 STEP 5: Gemini AI ko data bhej rahe hain...");
        // Ab parameters ko function mein pass kar rahe hain
        const aiResult = await analyzeResumeWithAI(text, jobDescription, jobType, expLevel);
        console.log("✅ STEP 6: AI ne successfully result de diya!");
        console.log("========================================\n");

        res.status(200).json(aiResult);
    } catch (error) {
        console.error("\n❌❌❌ ASAL BACKEND ERROR YAHAN HAI ❌❌❌");
        console.error(error);
        console.error("❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌\n");
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};