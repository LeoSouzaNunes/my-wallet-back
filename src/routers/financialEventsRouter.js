import { Router } from "express";
import * as financialEventsController from "../controllers/financialEventsController.js";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

const financialEventsRouter = Router();

financialEventsRouter.use(validateTokenMiddleware);
financialEventsRouter.post(
    "/financial-events",
    financialEventsController.postFinancialEvent
);

financialEventsRouter.get(
    "/financial-events",
    financialEventsController.getFinancialEvents
);

financialEventsRouter.get(
    "/financial-events/sum",
    financialEventsController.getSum
);

export default financialEventsRouter;
