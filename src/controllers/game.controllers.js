import { db } from "../database/database.connection,js";

export async function postGame(req, res) {
  const { name, image, stockTotal, pricePerDay } = req.body;

  try {
    const existGame = await db.query(`SELECT name FROM games WHERE name = $1`, [name]);

    if(existGame.rowCount > 0){
      return res.status(409).send("JOGO já registrado!!");
    }

    await db.query(`
      INSERT INTO games (name. image, "stockTotal", "pricePerDay")
      VALUES ($1, $2, $3, $4)
    `,
      [name, image, stockTotal, pricePerDay]
    );

    res.status(201).send("JOGO registrado");
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getGames(req, res) {
  try {
    const game = await db.query(`SELECT * FROM games;`);
    res.status(200).send(game.rows);
  } catch (error) {
    res.status(500).send(error);
  }
}
