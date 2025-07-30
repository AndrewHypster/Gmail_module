const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 7700;

app.use(cors());
app.use(express.json());

app.post("/api/auth", async (req, res) => {
  const apiKey = req.headers.api_key;
  if (apiKey !== process.env.API_KEY) {
    return res.status(403).send({
      status: "403",
      message: "Невірний API key :("
    });
  }

  const service = req.headers.service;
  const auth = {
    user: req.headers.user,
    pass: req.headers.pass
};

  // створюємо транспорт
  const transporter = nodemailer.createTransport({
    service,
    auth
  });

  const mailOptions = {
    from: auth.user,
    to: auth.user,
    subject: "Make Gmail sender test",
    text: "Авторизація пройшла успішно!"
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).send({
      status: "200",
      message: "Авторизація пройшла успішно!"
    });
  } catch (error) {
    return res.status(500).send({
      status: "500",
      message: "Помилка при надсиланні листа",
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер працює на http://localhost:${PORT}`);
});
