"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const passwordHashing = (password) => {
    const salt = parseInt(process.env.SALT_ROUNDS);
    return bcrypt_1.default.hashSync(`${password}${process.env.PEPPER}`, salt);
};
class users {
    async index() {
        try {
            const connect = await database_1.default.connect();
            const sql = "SELECT id, firstName, lastName, userName FROM users";
            const result = await connect.query(sql);
            connect.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`cannot get user information: ${err}`);
        }
    }
    async showUser(id) {
        try {
            const connect = await database_1.default.connect();
            const sql = "SELECT id, firstName, lastName, userName FROM users WHERE id=($1)";
            const result = await connect.query(sql, [id]);
            connect.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`cannot get single user information ${err}`);
        }
    }
    async createUser(u) {
        try {
            const connect = await database_1.default.connect();
            const sql = "INSERT INTO users (firstName, lastName, userName, password) VALUES($1, $2, $3, $4) RETURNING id, firstName, lastName, userName";
            const result = await connect.query(sql, [
                u.firstName,
                u.lastName,
                u.userName,
                passwordHashing(u.password),
            ]);
            connect.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`failed to create new user ${err}`);
        }
    }
    async deleteUser(id) {
        try {
            const connect = await database_1.default.connect();
            const sql = "DELETE FROM users WHERE id=($1)";
            const result = await connect.query(sql, [id]);
            connect.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`cannot delete user ${err}`);
        }
    }
    async addProduct(userId, productId, quantity) {
        try {
            const connect = await database_1.default.connect();
            const sqlActiveOrder = "SELECT * FROM orders WHERE userId=($1) AND status='active'";
            const sqlActiveOrderResult = await connect.query(sqlActiveOrder, [
                userId,
            ]);
            if (sqlActiveOrderResult.rows[0]) {
                const orderIdSql = "SELECT id FROM orders WHERE userId=($1) AND status='active'";
                const orderIdSqlResult = await connect.query(orderIdSql, [userId]);
                const orderId = orderIdSqlResult.rows[0].id;
                try {
                    const orderProduct = "INSERT INTO orderProducts (orderId, productId, quantity) VALUES($1, $2, $3) RETURNING *";
                    const orderProductResult = await connect.query(orderProduct, [
                        orderId,
                        productId,
                        quantity,
                    ]);
                    connect.release();
                    return orderProductResult.rows[0];
                }
                catch (err) {
                    throw new Error(`failed to add product : ${err}`);
                }
            }
            else {
                const sql = "INSERT INTO orders (userId,  status) VALUES($1, $2) RETURNING *";
                await connect.query(sql, [userId, "active"]);
                const orderIdSql = "SELECT id FROM orders WHERE userId=($1) AND status='active'";
                const orderIdSqlResult = await connect.query(orderIdSql, [userId]);
                const orderId = orderIdSqlResult.rows[0].id;
                try {
                    const sqlProduct = "INSERT INTO orderProducts (orderId, productId, quantity) VALUES($1, $2, $3) RETURNING *";
                    const sqlProductResult = await connect.query(sqlProduct, [
                        orderId,
                        productId,
                        quantity,
                    ]);
                    connect.release();
                    return sqlProductResult.rows[0];
                }
                catch (err) {
                    throw new Error(`failed to add product : ${err}`);
                }
            }
        }
        catch (err) {
            throw new Error(`failed to add the product  : ${err}`);
        }
    }
    async authentication(userName, password) {
        try {
            const connect = await database_1.default.connect();
            const sql = "SELECT password FROM users WHERE userName=($1)";
            const result = await connect.query(sql, [userName]);
            if (result.rows.length) {
                const { password: passwordHashing } = result.rows[0];
                const passIsValid = bcrypt_1.default.compareSync(`${password}${process.env.PEPPER}`, passwordHashing);
                if (passIsValid) {
                    const userSql = "SELECT id, firstName, lastName, userName FROM users WHERE userName=($1)";
                    const result = await connect.query(userSql, [userName]);
                    connect.release();
                    return result.rows[0];
                }
                else {
                    connect.release();
                    throw new Error("incorrect password");
                }
            }
            else {
                connect.release();
                throw new Error("user not found");
            }
        }
        catch (err) {
            throw new Error(`authentication error : ${err}`);
        }
    }
}
exports.users = users;
//# sourceMappingURL=user.js.map