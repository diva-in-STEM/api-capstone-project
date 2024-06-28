// Import necessary dependencies
import express from "express";
import axios from "axios";

// Initialise express server 
const app = express();
const port = 3000;

// Use the public folder which contains css
app.use(express.static("public"))

// Listen to get requests at "/"
app.get("/", async (req, res) => {
    try {
        // Get generation mix from UK Grid API
        const result = await axios.get("https://api.carbonintensity.org.uk/generation");
        // Get just the mix data from the result
        const genMix = result.data.data.generationmix;
        // Get the time the data is valid to
        const time = JSON.stringify(result.data.data.to).split("T")[1].split("Z")[0];
        // Render page with data
        res.render("index.ejs", { genMix: genMix, time: time });
    } catch (error) {
        // Render page with error if needed
        res.render("index.ejs", { genMix: error, time: error });
    }
})

// Make express listen on chosen port
app.listen(port, () => {
    console.log(`Server started. Listening on port ${port}`)
})