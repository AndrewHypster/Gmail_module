const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 7700;

app.use(cors());
app.use(express.json());

// C O N N E C T I O N
app.post("/api/auth", async (req, res) => {
  if (req.method !== "POST") {
    return res.status(500).send({
      status: "500",
      message: "Потрібен POST запит"
    });
  }
  if (req.headers.api_key !== process.env.API_KEY) {
    return res.status(500).send({
      status: "500",
      message: "Невірний api key :("
    });
  }

  const { service, auth } = req.headers

  fetch("https://gmail-module.vercel.app/api/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      service, auth,
      from: auth.user,
      to: auth.user,
      subject: "Make Gmail sender test",
      text: "Авторизація пройшла успішно!"
    }),
  })
    .then((req) => {
      if (req.status == 200) {
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
    })
    .catch((err) =>
      return res.status(500).send({
        status: "500",
        message: "Невірні дані пошти"
      });
}
});

app.listen(PORT, () => {
  console.log(`Сервер працює на http://localhost:${PORT}`);
});
