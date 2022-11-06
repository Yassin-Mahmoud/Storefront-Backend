"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeStatus = exports.showActiveOrder = exports.showUserCompletedOrders = void 0;
const order_1 = require("../models/order");
const ORDERS = new order_1.orders();
const showUserCompletedOrders = (req, res) => {
    const userOrders = ORDERS.showCompletedOrders(req.params.userId);
    res.json(userOrders);
};
exports.showUserCompletedOrders = showUserCompletedOrders;
const showActiveOrder = (req, res) => {
    const activeOrder = ORDERS.showActiveOrder(req.params.userId);
    res.json(activeOrder);
};
exports.showActiveOrder = showActiveOrder;
const changeStatus = async (req, res) => {
    try {
        const status = await ORDERS.changeStatus(req.params.userId);
        res.status(200).json(status);
    }
    catch (err) {
        throw new Error(`order still in progress : ${err}`);
    }
};
exports.changeStatus = changeStatus;
//# sourceMappingURL=orders.js.map