"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orders = void 0;
const database_1 = __importDefault(require("../database"));
class orders {
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
    async showCompletedOrders(userId) {
        try {
            const connect = await database_1.default.connect();
            const sql = "SELECT id, userId, status FROM orders WHERE userId=($1) AND status='completed'";
            const result = await connect.query(sql, [userId]);
            const ordersList = result.rows;
            connect.release();
            return ordersList;
        }
        catch (err) {
            throw new Error(`no completed orders : ${err}`);
        }
    }
    async showActiveOrder(userId) {
        try {
            const connect = await database_1.default.connect();
            const sql = "SELECT * FROM orders WHERE userId=($1) AND status='active'";
            const result = await connect.query(sql, [userId]);
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
            const activeOrder = "SELECT * FROM orders WHERE userId=($1) AND status='active'";
            const activeOrderQuery = await connect.query(activeOrder, [userId]);
            if (activeOrderQuery.rows[0]) {
                const orderId = activeOrderQuery.rows[0].id;
                const sql = "UPDATE orders SET status='completed' WHERE userId=($1) AND id=($2) RETURNING *";
                const result = await connect.query(sql, [userId, orderId]);
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
}
exports.orders = orders;
//# sourceMappingURL=order.js.map