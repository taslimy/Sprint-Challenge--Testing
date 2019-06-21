const request = require("supertest");
const db = require("../data/dbConfig.js");
const server = require("./server.js");

describe("server.js file", () => {
  afterEach(async () => {
    await db("games").truncate();
  });
  it("should set to testing env", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("GET '/games'", () => {
    it("should return 200 ok", async () => {
      const res = await request(server).get("/games");
      expect(res.status).toEqual(200);
    });

    it("should give me empty arrays", async () => {
      const res = await request(server).get("/games");
      expect(res.body).toEqual([]);
    });

    it("should be JSON", async () => {
      const res = await request(server).get("/games");
      expect(res.type).toBe("application/json");
    });
  });

  describe("POST '/games'", () => {
    it("should return 200 ok", async () => {
      const game = {
        title: "Dota 2",
        genre: "MOBA",
        releaseYear: 2013
      };
      const res = await request(server)
        .post("/games")
        .send(game);
      expect(res.status).toEqual(201);
    });

    it("should be JSON", async () => {
      const game = {
        title: "Dota 2",
        genre: "MOBA",
        releaseYear: 2013
      };
      const res = await request(server)
        .post("/games")
        .send(game);
      expect(res.type).toBe("application/json");
    });

    it("should return add game", async () => {
      const game = { title: "Dota 2", genre: "MOBA", releaseYear: 2013 };
      const res = await request(server)
        .post("/games")
        .send(game);
      expect(res.body.game).toEqual({
        title: "Dota 2",
        genre: "MOBA",
        id: 1,
        releaseYear: 2013
      });
    });

    it("should return status code 422", async () => {
      const game = { title: "Dota 2" };
      const res = await request(server)
        .post("/games")
        .send(game);
      expect(res.status).toEqual(422);
    });
  });
});
