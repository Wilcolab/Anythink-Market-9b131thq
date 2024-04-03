import "./custom.scss";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import React from "react";
import { store } from "./store";

import App from "./components/App";
import { BrowserRouter } from "react-router-dom";

const axios = require('axios');
const fs = require('fs');

const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const openaiApiKey = process.env.OPENAI_API_KEY;
const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

async function generateDALLEImage(prompt) {
    try {
        const response = await axios.post(apiUrl, {
            prompt: prompt,
            max_tokens: 50 // Number of tokens to generate
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiApiKey}`
            }
        });

        const generatedImageText = response.data.choices[0].text;
        console.log('Generated Image:', generatedImageText);

        // Save generated image text to a file
        fs.writeFileSync('generated_image.txt', generatedImageText);
    } catch (error) {
        console.error('Error:', error.response.data.error.message);
    }
}

// Prompt for generating the image
const dallePrompt = 'A cat sitting on a chair';
generateDALLEImage(dallePrompt);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);
