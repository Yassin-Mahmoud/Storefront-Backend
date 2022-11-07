import { Router } from "express";
import * as handlers from "../../handlers/orders";
import verifyToken from "../../middleware/authentication";

const orderRoutes = Router();

orderRoutes.get(
	"/completed/user/:userId",
	verifyToken,
	handlers.showUserCompletedOrders
);
orderRoutes.get("/active/user/:userId", verifyToken, handlers.showActiveOrder);
orderRoutes.put(
	"/user/:userId/ordercompleted",
	verifyToken,
	handlers.changeStatus
);

export default orderRoutes;
