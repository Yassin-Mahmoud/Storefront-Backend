"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orders = void 0;
const database_1 = __importDefault(require("../database"));
class orders {
    async index() {
        try {
            const connect = await database_1.default.connect();
            const sql = "SELECT * FROM orders";
            const result = await connect.query(sql);
            connect.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`cannot show orders`);
        }
    }
    async showUserOrders(userId) {
        const connect = await database_1.default.connect();
        const sql = "SELECT * FROM orders WHERE userId=($1)";
        const result = await connect.query(sql, [userId]);
        connect.release();
        return result.rows[0];
    }
    async showOrder(orderId, userId) {
        try {
            const connect = await database_1.default.connect();
            const sql = `SELECT * FROM orders WHERE id=${orderId} AND userId=${userId}`;
            const result = await connect.query(sql);
            connect.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`cannot show order : ${err}`);
        }
    }
    async showActiveOrder(userId) {
        try {
            const connect = await database_1.default.connect();
            const sql = `SELECT * FROM order WHERE userId=${userId} AND status='active'`;
            const result = await connect.query(sql);
            connect.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`there is no active order : ${err}`);
        }
    }
    async changeStatus(userId) {
        try {
            const connect = await database_1.default.connect();
            const activeOrder = `SELECT * FROM orders WHERE userId=${userId} AND status='active'`;
            const activeOrderQuery = await connect.query(activeOrder);
            if (activeOrderQuery.rows[0]) {
                const sqlOrderId = `SELECT id FROM orders WHERE userId=${userId} AND status='active'`;
                const sqlOrderIdResult = await connect.query(sqlOrderId);
                const sql = `UPDATE orders SET status='completed' WHERE userId=${userId} AND orderId=${sqlOrderIdResult}`;
                const result = await connect.query(sql);
                connect.release();
                return result.rows[0];
            }
            else {
                connect.release();
                throw new Error("no active orders");
            }
        }
        catch (err) {
            throw new Error(`no active orders : ${err}`);
        }
    }
    async createOrder(userId) {
        try {
            const connect = await database_1.default.connect();
            const sql = "INSERT INTO orders (userId, status) VALUES ($1, $2) RETURNING *";
            const result = await connect.query(sql, [userId, "active"]);
            connect.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`failed to create order ${err}`);
        }
    }
}
exports.orders = orders;
//# sourceMappingURL=order.js.map