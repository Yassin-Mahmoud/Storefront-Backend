import { Router } from "express";
import * as handlers from "../../handlers/product";
import verifyToken from "../../middleware/authentication";

const productsRoutes = Router();

productsRoutes.get("/", handlers.index);
productsRoutes.get("/:productId", handlers.showProduct);
productsRoutes.post("/createproduct", verifyToken, handlers.createProduct);
productsRoutes.delete(
	"/:productId/delete",
	verifyToken,
	handlers.deleteProduct
);

export default productsRoutes;
