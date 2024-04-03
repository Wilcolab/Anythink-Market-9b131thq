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

    const response = await openai.createImageEdit(
      fs.createReadStream("../imgs/dog256.png"),
      "dall-e-2",
      "dog",
      1,
      "256x200"
    );
    

    try {
        imageurl = response.data.data[0].url;
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
