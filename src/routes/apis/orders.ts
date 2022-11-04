import { Router } from "express";
import * as handlers from "../../handlers/orders";
import verifyToken from "../../middleware/authentication";

const orderRoutes = Router();

orderRoutes.get("/", handlers.index);
orderRoutes.get("/user/:userid/", verifyToken, handlers.showUserOrders);
orderRoutes.get("/:orderid/user/userid", verifyToken, handlers.showOrder);
orderRoutes.get(
    "/user/:userid/activeorder",
    verifyToken,
    handlers.showActiveOrder
);
orderRoutes.put("/user/:userid/activeorder/completed", handlers.changeStatus);

export default orderRoutes;
