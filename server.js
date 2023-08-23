
const PORT = 3000;
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// const axios = require("axios");
// const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors())

const APIKEY = process.env.REACT_APP_CHAT_GPT_API_KEY




app.post("/completions", async (req,res) => {
    const option = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${APIKEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role:"user", content:req.body.messages}],
            max_tokens: 100,
        })

    }
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", option)
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error(error)
    }
    
})


app.listen(PORT, () => {
    console.log(`Server is running on port ` + PORT);
  });

