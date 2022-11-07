"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
const database_1 = __importDefault(require("../database"));
class products {
    async index() {
        try {
            const connect = await database_1.default.connect();
            const sql = "SELECT * FROM products";
            const result = await connect.query(sql);
            connect.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`cannot get products: ${err}`);
        }
    }
    async showProduct(id) {
        try {
            const connect = await database_1.default.connect();
            const sql = "SELECT * FROM products WHERE id=($1)";
            const result = await connect.query(sql, [id]);
            connect.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`cannot get product details: ${err}`);
        }
    }
    async createProduct(p) {
        try {
            const connect = await database_1.default.connect();
            const sql = "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *";
            const result = await connect.query(sql, [p.name, p.price]);
            connect.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`failed to create new product ${err}`);
        }
    }
    async deleteProduct(id) {
        try {
            const connect = await database_1.default.connect();
            const sql = "DELETE FROM products WHERE id=($1)";
            const result = await connect.query(sql, [id]);
            connect.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`cannot delete product: ${err}`);
        }
    }
}
exports.products = products;
//# sourceMappingURL=products.js.map