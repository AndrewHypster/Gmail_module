const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = 7700;

app.use(cors());
app.use(express.json());

app.post("/api/send", async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }
  if (req.headers.api_key !== env.API_KEY) {
    return res.status(405).send({
      message: "Невірний api key :("
    });
  }
  
  const { service, auth, from, to, subject, text } = req.body;
  
  const transporter = nodemailer.createTransport({
    service,
    auth,
  });
  
  const mailOptions = { from, to, subject, text };
  
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({
      message: "Лист успішно надіслано!"
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Помилка при відправці листа. Провірте дані що ви надіслали!"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер працює на http://localhost:${PORT}`);
});
