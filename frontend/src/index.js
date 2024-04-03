import "./custom.scss";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import React from "react";
import { store } from "./store";

import App from "./components/App";
import { BrowserRouter } from "react-router-dom";

const axios = require('axios');
const fs = require('fs');




// Function to download image from URL
async function downloadImage(url, path) {
    const writer = fs.createWriteStream(path);

    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

// Function to call DALL-E API
async function generateDALLEImage() {
    //const apiUrl = 'YOUR_DALLE_API_URL'; // Replace with your DALL-E API endpoint

    //const imageUrl = 'URL_TO_YOUR_IMAGE'; // Replace with the URL of the image you want to use

    const response = await openai.createImage({
      model: "dall-e-3",
      prompt: "a white siamese cat",
      n: 1,
      size: "256x256",
    });

    const imageurl = response.data.data[0].url;

    try {
        // Download the image
        await downloadImage(imageUrl, 'inputimage.jpg');

        // Make request to DALL-E API
        const response = await axios.post(apiUrl, {
            image: fs.readFileSync('inputimage.jpg', { encoding: 'base64' })
        });

        // Save the generated image
        fs.writeFileSync('outputimage.jpg', response.data.image, 'base64');

        console.log('Image generated successfully!');
    } catch (error) {
        console.error('Error:', error);
    }
}


// Call the function to generate DALL-E image
generateDALLEImage();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);
