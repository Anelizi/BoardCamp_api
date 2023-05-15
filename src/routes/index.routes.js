import { Router } from "express";
import customersRouter from "./customers.routes.js";
import gamesRouter from "./game.routes.js";
import rentsRouter from "./rents.routes.js";

const router = Router();

router.use(gamesRouter);
router.use(customersRouter);
router.use(rentsRouter);

export default router;
