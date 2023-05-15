import { Router } from "express";
import {
  getCustomers,
  getIdCustomers,
  postCustomer,
  putCustomers,
} from "../controllers/customers.controlles.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { customesSchema } from "../schemas/customes.schema.js";

const customersRouter = Router();

customersRouter.post("/customers", validateSchema(customesSchema), postCustomer);
customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getIdCustomers);
customersRouter.put("/customers/:id", validateSchema(customesSchema), putCustomers);

export default customersRouter;