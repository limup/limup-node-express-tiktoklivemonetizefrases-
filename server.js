// server.js

const express = require("express");
const mysql = require("mysql");
const cors = require("cors"); 

const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "teste",
  password: "teste",
  database: "tiktokmonetizedb",
  insecureAuth: true,
});

app.use(cors());

app.get("/frases-motivacionais", (req, res) => {
  connection.query(
    "SELECT frase FROM frasesmotivacionais ORDER BY RAND() LIMIT 1",
    function (error, results, fields) {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar frase motivacional" });
        return;
      }

      res.json(results[0]);
    }
  );
});

app.get("/frases-signos", (req, res) => {
  // Recupera o valor do parâmetro de consulta "mes"
  const { mes } = req.query;

  console.log("mes: ", mes);

  // Verifica se o parâmetro "mes" foi fornecido
  if (!mes) {
    res.status(400).json({ error: "O parâmetro 'mes' é obrigatório" });
    return;
  }

  // Aqui você pode usar o valor de "mes" em sua consulta SQL
  connection.query(
    "SELECT frase FROM frasessignos WHERE mes = ? ORDER BY RAND() LIMIT 1",
    [mes],
    function (error, results, fields) {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar frase do signo" });
        return;
      }

      res.json(results[0]);
    }
  );
});

app.get("/frases-depressao", (req, res) => {
  connection.query(
    "SELECT frase FROM frasesdepressao ORDER BY RAND() LIMIT 1",
    function (error, results, fields) {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar frase motivacional" });
        return;
      }

      res.json(results[0]);
    }
  );
});

app.get("/frases-amor", (req, res) => {
  connection.query(
    "SELECT frase FROM frasesamor ORDER BY RAND() LIMIT 1",
    function (error, results, fields) {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar frase motivacional" });
        return;
      }

      res.json(results[0]);
    }
  );
});


app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
