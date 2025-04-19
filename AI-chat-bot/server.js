const express = require('express');
const cors = require('cors');
const app = express();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { OpenAI } = require('openai');
const dotenv = require('dotenv');

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.send('Hello World!');
});




// OPENAI CHATGPT xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// Create OpenAI client only after validating the key
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// console.log(openai);


// app.post('/api/openai/chat', async (req, res) => {
//     const { message } = req.body;


//     try {
//         const response = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo-instruct",
//             prompt: message,
//             temperature: 0.6,
//             max_tokens: 256,
//         });

//         const reply = response.choices[0].message.content;
//         res.json({ reply });

//     } catch (error) {
//         if (error.status === 429) {
//             return res.status(429).json({
//                 error: 'Rate limit exceeded or quota reached. Please check your OpenAI billing settings.',
//             });
//         }

//         console.error('Error:', error?.response?.data || error.message);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


//OPENAI END xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


// GEMINI START xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


app.post('/api/gemini/chat', async (req, res) => {
    const { message } = req.body;
    // console.log("User message:", message);

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const API_KEY = process.env.GEMINI_API_KEY;

    const googleAI = new GoogleGenerativeAI(API_KEY);

    


    try {
        // 1. Load the Gemini model correctly
        const geminiModel = googleAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        });
        const generate = async () => {
            try {
                const prompt = message;
                const result = await geminiModel.generateContent(prompt);
                const response = result.response;
                // console.log("Gemini response:", response.text());
                // 2. in rsponse.text() if new line come \n the go new line
                // 3. if response.text() is empty then return "No response"
                

                const replyText = await response.text();
                 if (!replyText || replyText.trim() === '') {
                    return res.json({ reply: 'No response' });
                }

                const paragraphs = replyText.split('\n\n');
                return res.json({ reply: paragraphs });
            } catch (error) {
                console.log("response error", error);
            }
        };
        generate();
    } catch (error) {
        console.error('Gemini Error:', error?.message || error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GEMINI END xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
