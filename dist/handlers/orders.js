"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeStatus = exports.showActiveOrder = exports.showUserCompletedOrders = void 0;
const order_1 = require("../models/order");
const ORDERS = new order_1.orders();
const showUserCompletedOrders = async (req, res) => {
    try {
        const userOrders = await ORDERS.showCompletedOrders(req.params.userId);
        res.status(200).json({ ...userOrders });
    }
    catch (err) {
        res.status(500).send(err);
    }
};
exports.showUserCompletedOrders = showUserCompletedOrders;
const showActiveOrder = async (req, res) => {
    try {
        const activeOrder = await ORDERS.showActiveOrder(req.params.userId);
        res.status(200).json({ ...activeOrder });
    }
    catch (err) {
        res.status(500).send(err);
    }
};
exports.showActiveOrder = showActiveOrder;
const changeStatus = async (req, res) => {
    try {
        const status = await ORDERS.changeStatus(req.params.userId);
        res.status(200).json({ ...status });
    }
    catch (err) {
        res.status(500).send(err);
    }
};
exports.changeStatus = changeStatus;
//# sourceMappingURL=orders.js.map