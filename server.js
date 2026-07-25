const express = require("express");

const app = express();

app.use(express.json());

app.use(express.static("public"));

app.post("/ask", (req, res) => {

const question = req.body.question.toLowerCase();

let answer = "माफ कीजिए, मैं अभी इस सवाल का जवाब नहीं दे पाया।";


if(question.includes("hello") || question.includes("hi") || question.includes("namaste")){
answer = "नमस्ते! मैं Anup AI हूँ। आपका स्वागत है। मैं आपकी मदद के लिए तैयार हूँ।";
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