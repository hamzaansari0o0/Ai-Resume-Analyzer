// backend/services/aiService.js
import extractPDF from './pdfHelper.js';

export const extractTextFromPDF = async (buffer) => {
    return await extractPDF(buffer);
};

export const analyzeResumeWithAI = async (resumeText, jobDescription, jobType, expLevel) => {
    // 🛠️ 1. INPUT OPTIMIZATION
    const cleanText = resumeText
        .replace(/[^a-zA-Z0-9\s.,@:()/-]/g, '') 
        .replace(/\s+/g, ' ')                   
        .trim()
        .substring(0, 15000); 

    // Agar user JD na dale, toh fallback de do
    const jdText = jobDescription ? jobDescription : "Evaluate generally based on standard industry requirements for this role.";

    // 🛠️ 2. PROMPT OPTIMIZATION (UPGRADED FOR JD MATCH)
    const prompt = `Act as an expert ATS. Analyze this resume STRICTLY against the provided Job Description (JD).
    - Job Description: ${jdText}
    - Type: ${jobType}
    - Level: ${expLevel}

    RULES:
    1. Return ONLY a pure JSON object.
    2. NO greetings, NO explanations.
    3. Be extremely concise.
    4. Base the "ATS_score" on how well the resume matches the specific JD.
    5. Find skills from the JD that are present in the resume (skills_detected).
    6. Find skills from the JD that are MISSING in the resume (missing_skills).
    7. Analyze the use of Action Verbs. Identify strong verbs used (e.g., Developed, Optimized) and weak verbs used (e.g., Helped, Worked on).
    
    EXPECTED JSON FORMAT:
    {
      "ATS_score": 85, 
      "jd_match_feedback": "Short feedback on why the candidate is a good or bad fit for this specific JD.",
      "skills_detected": ["skill1"], 
      "missing_skills": ["skill2"],
      "action_verbs": {
        "strong_used": ["Developed", "Optimized"],
        "weak_used": ["Helped", "Worked on"],
        "feedback": "Short feedback on verb usage."
      },
      "suggestions": ["Short advice on how to tailor the resume for this JD."]
    }
    
    RESUME DATA:
    ${cleanText}`;

    // 🔐 3. .env se API Key fetch karna
    const API_KEY = process.env.GEMINI_API_KEY;

    if (!API_KEY) {
        throw new Error("❌ GEMINI_API_KEY is missing in .env file! Please add it.");
    }

    console.log(`🚀 Sending OPTIMIZED data to Google Gemini 2.5 Flash... (Length: ${cleanText.length} chars)`);

    try {
        // 🚀 4. Direct Call to Google Gemini Official API
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    temperature: 0.1, // Low temperature for factual, ATS-like analysis
                    responseMimeType: "application/json" // 🔥 MAGIC FIX
                }
            })
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(`Google API Error: ${JSON.stringify(errData)}`);
        }

        const aiData = await response.json();
        
        // 🔥 Exact Token Count Fetch Karna
        if (aiData.usageMetadata) {
            const usage = aiData.usageMetadata;
            console.log(`📊 TOKENS USED: Input=${usage.promptTokenCount} | Output=${usage.candidatesTokenCount} | Total=${usage.totalTokenCount}`);
        }
        
        // Gemini ke JSON structure se text nikalna
        const resultString = aiData.candidates[0].content.parts[0].text;
        
        console.log(`✅ Success with Gemini 2.5 Flash! Returning JSON.`);
        
        return JSON.parse(resultString);

    } catch (error) {
        console.error(`❌ Parse/Logic Error with Gemini:`, error.message);
        throw new Error("AI engine failed to analyze the resume. Please check your API key or try again.");
    }
};