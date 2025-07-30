const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch"); // додай якщо Node <18

const app = express();
const PORT = 7700;

app.use(cors());
app.use(express.json());

// C O N N E C T I O N
app.post("/api/auth", async (req, res) => {
  const apiKey = req.headers.api_key;
  if (apiKey !== process.env.API_KEY) {
    return res.status(403).send({
      status: "403",
      message: "Невірний API key :("
    });
  }

  const service = req.headers.service;
  const auth = req.headers.auth;
  try {
    const response = await fetch("https://gmail-module.vercel.app/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service,
        auth,
        from: auth.user,
        to: auth.user,
        subject: "Make Gmail sender test",
        text: "Авторизація пройшла успішно!"
      }),
    });

    if (response.status === 200) {
      return res.status(200).send({
        status: "200",
        message: "Авторизація пройшла успішно!"
      });
    } else {
      return res.status(500).send({
        status: "500",
        message: "Невірні дані пошти"
      });
    }
  } catch (err) {
    return res.status(500).send({
      status: "500",
      message: "Помилка при відправці запиту"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер працює на http://localhost:${PORT}`);
});
