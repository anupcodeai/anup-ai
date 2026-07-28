const express = require("express");
require("dotenv").config();
const OpenAI = require("openai");

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});

const app = express();

app.use(express.json());

app.use(express.static("public"));

app.post("/ask", async (req, res) => {

const question = req.body.question.toLowerCase();
const mode = req.body.mode || "student";
if (
    question.includes("तुम्हें किसने बनाया") ||
    question.includes("तुम्हें कौन बनाया") ||
    question.includes("किसने बनाया") ||
    question.includes("तुम्हारा नाम") ||
    question.includes("आपका नाम") ||
    question.includes("tumhe kisne banaya") ||
    question.includes("tumhe kon banaya") ||
    question.includes("kisne banaya") ||
    question.includes("tumhara naam") ||
    question.includes("aapka naam") ||
    question.includes("who made you") ||
    question.includes("who created you") ||
    question.includes("who build you") ||
    question.includes("who built you") ||
    question.includes("who developed you") ||
    question.includes("who is your creator") ||
    question.includes("who designed you") ||
    question.includes("who invented you") ||
    question.includes("who owns you") ||
    question.includes("what is your name") ||
    question.includes("what's your name") ||
    question.includes("your name") ||
    question.includes("who are you") ||
    question.includes("tell me your name") ||
    question.includes("who made u") ||
    question.includes("who created u")
) {
    return res.json({
        answer: "मेरा नाम Anup AI है। मुझे Anup Kumar Tiwari ने बनाया है।"
    });
}
const GNEWS_API_KEY = process.env.GNEWS_API_KEY;

if (mode === "news") {
  const newsResponse = await fetch(
    `https://gnews.io/api/v4/top-headlines?country=IN&lang=en&apikey=${GNEWS_API_KEY}`
  );
  
  const newsData = await newsResponse.json();
console.log(newsData);
  return res.json({
    answer: newsData.articles
      .slice(0, 5)
      .map(item => "📰 " + item.title)
      .join("\n\n")
  });
}
const apiKey = process.env.GEMINI_API_KEY;

let answer = "माफ कीजिए, मैं अभी इस सवाल का जवाब नहीं दे पाया।";


if(question.includes("hello") || question.includes("hi")){

    if(mode === "student"){
        answer = "📚 नमस्ते! मैं Student Mode में हूँ। पढ़ाई, Exam, Notes और Questions में आपकी मदद कर सकता हूँ।";
    }

    else if(mode === "career"){
        answer = "💼 नमस्ते! मैं Career Mode में हूँ। नौकरी, Resume, Interview और Government Jobs में आपकी मदद कर सकता हूँ।";
    }

    else if(mode === "creator"){
        answer = "🎬 नमस्ते! मैं Creator Mode में हूँ। YouTube, Instagram, Script, Thumbnail और Viral Content में आपकी मदद कर सकता हूँ।";
    }
    else if(mode === "rozgar"){
    answer = "🧑‍💼 नमस्ते! मैं Rozgar Mode में हूँ। नौकरी, सरकारी भर्ती, Resume, Interview और Skill सीखने में आपकी मदद कर सकता हूँ।";
}
}


else if(question.includes("who are you") || question.includes("tum kaun")){
answer = "मैं Anup AI हूँ, आपका अपना AI assistant।";
}


else if(question.includes("name")){
answer = "मेरा नाम Anup AI है।";
}


else if(question.includes("help")){
answer = "मैं आपके सवालों का जवाब देने में आपकी मदद कर सकता हूँ।";
}
else {

try {
console.log("Calling Gemini API...");
const result = await client.chat.completions.create({
  model: "openai/gpt-4o-mini",
  messages: [
    {
      role: "user",
      content: question
    }
  ]
});

answer = result.choices[0].message.content;

}
catch(error){
console.log(error);
answer = "माफ कीजिए, AI से जवाब लेने में समस्या आ रही है।";

}

}

res.json({
answer: answer
});

});


app.get("/", (req,res)=>{
res.send("Anup AI is running");
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Anup AI is running on port " + PORT);
});