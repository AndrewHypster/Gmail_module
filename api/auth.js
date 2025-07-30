const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 7700;

app.use(cors());
app.use(express.json());

// C O N N E C T I O N
app.post("/api/auth", async (req, res) => {
  if (req.method !== "POST") {
    return res.status(200).send({
      message: "Потрібен POST запит"
    });
  }
  if (req.headers.api_key !== process.env.API_KEY) {
    return res.status(200).send({
      message: "Невірний api key :("
    });
  }
  
  return res.status(200).send({
      message: "Успішно авторизовано!"
    });
});

app.listen(PORT, () => {
  console.log(`Сервер працює на http://localhost:${PORT}`);
});
