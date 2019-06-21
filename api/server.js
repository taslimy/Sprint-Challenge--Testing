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

module.exports = server;
