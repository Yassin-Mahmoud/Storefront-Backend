"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeStatus = exports.showActiveOrder = exports.showOrder = exports.showUserOrders = exports.index = void 0;
const order_1 = require("../models/order");
const ORDERS = new order_1.orders();
const index = (req, res) => {
    const theOrders = ORDERS.index();
    res.json(theOrders);
};
exports.index = index;
const showUserOrders = (req, res) => {
    const userOrders = ORDERS.showUserOrders(req.params.userId);
    res.json(userOrders);
};
exports.showUserOrders = showUserOrders;
const showOrder = (req, res) => {
    const theOrder = ORDERS.showOrder(req.params.orderid, req.params.userid);
    res.json(theOrder);
};
exports.showOrder = showOrder;
const showActiveOrder = (req, res) => {
    const activeOrder = ORDERS.showActiveOrder(req.params.userId);
    res.json(activeOrder);
};
exports.showActiveOrder = showActiveOrder;
const changeStatus = async (req, res) => {
    const status = await ORDERS.changeStatus(req.params.userName);
    res.json(status);
};
exports.changeStatus = changeStatus;
//# sourceMappingURL=orders.js.map