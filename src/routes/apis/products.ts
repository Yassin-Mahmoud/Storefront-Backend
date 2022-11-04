import { Router } from "express";
import * as handlers from "../../handlers/product";

const productsRoutes = Router();

productsRoutes.get("/", handlers.index);
productsRoutes.get("/showproduct/:id", handlers.showProduct);
productsRoutes.post("/createproduct", handlers.createProduct);
productsRoutes.delete("/deleteproduct/:id", handlers.deleteProduct);

export default productsRoutes;
