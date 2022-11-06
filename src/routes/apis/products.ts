import { Router } from "express";
import * as handlers from "../../handlers/product";
import verifyToken from "../../middleware/authentication";

const productsRoutes = Router();

productsRoutes.get("/", handlers.index);
productsRoutes.get("/:id", handlers.showProduct);
productsRoutes.post("/createproduct", verifyToken, handlers.createProduct);
productsRoutes.delete("/delete/:id", verifyToken, handlers.deleteProduct);

export default productsRoutes;
