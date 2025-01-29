const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./db");
const User = require("./models/user");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

sequelize
  .sync()
  .then(() => {
    console.log("Syncronized db");
  })
  .catch((err) => {
    console.log("Syncronize Error", err);
  });

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Erro ao obter usuários", error: err });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Usuário não encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: "Erro ao obter usuário", error: err });
  }
});

app.post("/users", async (req, res) => {
  try {
    const { name, email, cpf } = req.body;
    const newUser = await User.create({ name, email, cpf });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar usuário", error: err });
  }
});
app.put("/users/:id", async (req, res) => {
  try {
    const { name, email, cpf } = req.body;
    const user = await Yser.findByPk(req.params.id);
    if (user) {
      user.name = name;
      user.email = email;
      user.cpf = cpf;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: "Usuário não encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: "Erro ao atualizar usuário", error: err });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Usuário não encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: "Erro ao excluir usuário", error: err });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
