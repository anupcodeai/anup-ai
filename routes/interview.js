const express = require("express");

const router = express.Router();
const OpenAI = require("openai");
const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});
console.log("OPENROUTER_API_KEY =", process.env.OPENROUTER_API_KEY);
router.post("/", async (req, res) => {

    const { job, level, language, answer } = req.body;

    try {

        const prompt = `
You are a professional ${language} interviewer.

Job Role: ${job}
Experience: ${level}

Candidate's Previous Answer:
${answer || "This is the first question."}

If this is the first question, ask the first interview question.

Otherwise ask the next interview question based on the candidate's previous answer.

Reply with ONLY the interview question.
`;

        const result = await client.chat.completions.create({
            model: "openai/gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        });

        res.json({
            question: result.choices[0].message.content
        });

    } catch (error) {

        console.log(error);

        res.json({
            question: "AI is unavailable right now."
        });

    }

});
module.exports = router;