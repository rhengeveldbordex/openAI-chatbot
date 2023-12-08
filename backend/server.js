require('dotenv').config(); // laad dotenv

const express = require('express');
const openai = require('openai');

const app = express();
const port = 3000;

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // gebruik de omgevingsvariabele

const openaiClient = new openai.OpenAIAPI(OPENAI_API_KEY);

const express = require('express');
const openai = require('openai');

const app = express();
const port = 3000;

const OPENAI_API_KEY = 'YOUR_API_KEY';
const openaiClient = new openai.OpenAIAPI(OPENAI_API_KEY);

app.use(express.json());

app.post('/ask', async (req, res) => {
    const { question } = req.body;

    try {
        const response = await openaiClient.chat.create({
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: question },
            ],
            model: 'gpt-3.5-turbo',
        });

        res.json({ answer: response.data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
