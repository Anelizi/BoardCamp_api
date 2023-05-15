import { Router } from "express";
import { deleteResnt, getRents, postIdRent, postRent } from "../controllers/rents.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { rentsSchema } from "../schemas/rents.schema.js";

const rentsRouter = Router();

rentsRouter.post("/rentals", validateSchema(rentsSchema), postRent);
rentsRouter.post("/rentals/:id/return", postIdRent);
rentsRouter.get("/rentals", getRents);
rentsRouter.delete("/rentals/:id", deleteResnt);

export default rentsRouter;
