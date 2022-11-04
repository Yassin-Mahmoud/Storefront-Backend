"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = __importDefault(require("./apis/products"));
const users_1 = __importDefault(require("./apis/users"));
const orders_1 = __importDefault(require("./apis/orders"));
const routes = (0, express_1.Router)();
routes.use("/users", users_1.default);
routes.use("/products", products_1.default);
routes.use("/orders", orders_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map