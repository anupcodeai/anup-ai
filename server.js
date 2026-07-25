const express = require("express");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
const app = express();

app.use(express.json());

app.use(express.static("public"));

app.post("/ask", async (req, res) => {

const question = req.body.question.toLowerCase();
const mode = req.body.mode || "student";
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
}
else if(mode === "rozgar"){
    answer = "🧑‍💼 नमस्ते! मैं Rozgar Mode में हूँ। नौकरी, सरकारी भर्ती, Resume, Interview और Skill सीखने में आपकी मदद कर सकता हूँ।";
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

const result = await model.generateContent(question);

const response = result.response;

answer = response.text();

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


app.listen(3000,()=>{
console.log("Anup AI is running on port 3000");
});