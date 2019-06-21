const express = require("express");

const server = express();

server.use(express.json());

const Games = require("../games/gamesModel");

server.get("/", (req, res) => {
  res.send("<h1>Hello, from the game server!<h1/>");
});

server.get("/games", async (req, res) => {
  const games = await Games.getAll();
  res.status(200).json(games);
});

server.post("/games", (req, res) => {
  const game = req.body;
  if (!game.title || !game.genre) {
    res.status(422).json({ message: "Need a Title & genre" });
  } else {
    Games.insert(game).then(game => {
      res.status(201).json({ game });
    });
  }
});

module.exports = server;
