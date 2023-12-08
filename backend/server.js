require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');

const app = express();
const port = 3000;

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// CORS-instellingen
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost'); // Hier kun je meerdere domeinen specificeren als je dat nodig hebt (bijv. http://localhost:8080)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use(express.json());

app.post('/ask', async (req, res) => {
  const { question } = req.body;

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: question }],
      model: 'gpt-3.5-turbo',
    });

    res.json({ answer: chatCompletion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
