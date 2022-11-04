import { Router } from "express";
import productsRoutes from "./apis/products";
import usersRoutes from "./apis/users";
import orderRoutes from "./apis/orders";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/products", productsRoutes);
routes.use("/orders", orderRoutes);

export default routes;
