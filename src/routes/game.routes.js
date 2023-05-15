import { Router } from "express";
import { getGames, postGame } from "../controllers/game.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { gameSchema } from "../schemas/game.schema.js";

const gamesRouter = Router();

gamesRouter.post("/games", validateSchema(gameSchema), postGame);
gamesRouter.get("/games"), getGames;

export default gamesRouter;