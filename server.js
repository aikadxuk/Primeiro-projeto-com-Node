const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const basePath = path.join(__dirname, "caminhos");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(basePath));

app.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

app.get("/login.html", (req, res) => {
  res.sendFile(`${basePath}/login.html`);
});

app.get("/cadastro.html", (req, res) => {
  res.sendFile(`${basePath}/cadastro.html`);
});

app.post("/process-cadastro", (req, res) => {
  const { nome, email } = req.body;
  const userId = uuidv4();
  const user = {
    id: userId,
    nome,
    email,
  };

  const filePath = path.join(basePath, "usersData", `${userId}.json`);
  if (!fs.existsSync(path.join(basePath, "usersData"))) {
    fs.mkdir(path.join(basePath, "usersData"));
  }

  fs.writeFile(filePath, JSON.stringify(user, null, 2), (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro ao salvar os dados");
    } else {
      console.log("Arquivo JSON criado com sucesso!");
      res.send("Dados salvos com sucesso!");
    }
  });
});

app.listen(port, () => {
  console.log("Servidor aberto");
});
