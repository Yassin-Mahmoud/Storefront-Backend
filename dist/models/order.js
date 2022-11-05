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
        const connect = await database_1.default.connect();
        const sql = "SELECT * FROM orders WHERE userId=($1) AND status='completed'";
        const result = await connect.query(sql, [userId]);
        connect.release();
        return result.rows[0];
    }
    async showOrder(orderId, userId) {
        try {
            const connect = await database_1.default.connect();
            const sql = "SELECT * FROM orders WHERE id=($1) AND userId=($2)";
            const result = await connect.query(sql, [orderId, userId]);
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
                const sqlOrderId = "SELECT id FROM orders WHERE userId=($1) AND status='active'";
                const sqlOrderIdResult = await connect.query(sqlOrderId, [userId]);
                const sql = "UPDATE orders SET status='completed' WHERE userId=($1) AND id=($2)";
                const result = await connect.query(sql, [userId, sqlOrderIdResult]);
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