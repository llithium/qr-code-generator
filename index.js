import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

const apiURL = "https://api.qrserver.com/v1/create-qr-code/?data=";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/generate", (req, res) => {
  res.redirect("/");
});

app.post("/generate", async (req, res) => {
  try {
    const qrCodeURL = req.body.qrCodeURL;

    const response = await axios.get(apiURL + `/${qrCodeURL}/&size=1000x1000`);
    const result = response.config.url;
    res.render("index.ejs", {
      qrCode: result,
      qrCodeContent: qrCodeURL,
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});