import { Router } from "express";
import * as handlers from "../../handlers/user";

import verifyToken from "../../middleware/authentication";

const usersRoutes = Router();

usersRoutes.get("/", verifyToken, handlers.index);
usersRoutes.get("/:userId/account", verifyToken, handlers.showUser);
usersRoutes.post("/register", handlers.createUser);
usersRoutes.delete("/:userId/delete", verifyToken, handlers.deleteUser);
usersRoutes.post("/:userId/addproduct", verifyToken, handlers.addProducts);
usersRoutes.post("/authentication", handlers.authenticate);

export default usersRoutes;
