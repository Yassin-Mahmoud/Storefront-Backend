import db from "../database";
import { order } from "./order";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export type user = {
	id?: String;
	firstName: String;
	lastName: String;
	userName: String;
	password: String;
};

// hashing function
const passwordHashing = (password: string) => {
	const salt = parseInt(process.env.SALT_ROUNDS as string);
	return bcrypt.hashSync(`${password}${process.env.PEPPER}`, salt);
};
export class users {
	// get all users
	async index(): Promise<user[]> {
		try {
			const connect = await db.connect();
			const sql = "SELECT id, firstName, lastName, userName FROM users";
			const result = await connect.query(sql);
			connect.release();
			return result.rows;
		} catch (err) {
			throw new Error(`cannot get user information: ${err}`);
		}
	}

	// get specific user
	async showUser(id: string): Promise<user> {
		try {
			const connect = await db.connect();
			const sql =
				"SELECT id, firstName, lastName, userName FROM users WHERE id=($1)";
			const result = await connect.query(sql, [id]);
			connect.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`cannot get single user information ${err}`);
		}
	}

	// create new user
	async createUser(u: user): Promise<user> {
		try {
			const connect = await db.connect();
			const sql =
				"INSERT INTO users (firstName, lastName, userName, password) VALUES($1, $2, $3, $4) RETURNING id, firstName, lastName, userName";
			const result = await connect.query(sql, [
				u.firstName as string,
				u.lastName as string,
				u.userName as string,
				passwordHashing(u.password as string),
			]);
			connect.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`failed to create new user ${err}`);
		}
	}

	//delete specific user
	async deleteUser(id: string): Promise<user> {
		try {
			const connect = await db.connect();
			const sql = "DELETE FROM users WHERE id=($1)";
			const result = await connect.query(sql, [id]);
			connect.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`cannot delete user ${err}`);
		}
	}

	// add product to order
	async addProduct(
		userId: string,
		productId: string,
		quantity: number
	): Promise<order> {
		try {
			const connect = await db.connect();
			const sqlActiveOrder =
				"SELECT * FROM orders WHERE userId=($1) AND status='active'";
			const sqlActiveOrderResult = await connect.query(sqlActiveOrder, [
				userId,
			]);

			// check if there is an active order
			if (sqlActiveOrderResult.rows[0]) {
				// getting active order id
				const orderIdSql =
					"SELECT id FROM orders WHERE userId=($1) AND status='active'";
				const orderIdSqlResult = await connect.query(orderIdSql, [userId]);
				const orderId = orderIdSqlResult.rows[0].id;

				// add product to the order
				try {
					const orderProduct =
						"INSERT INTO orderProducts (orderId, productId, quantity) VALUES($1, $2, $3) RETURNING *";
					const orderProductResult = await connect.query(orderProduct, [
						orderId,
						productId,
						quantity,
					]);
					connect.release();
					return orderProductResult.rows[0];
				} catch (err) {
					throw new Error(`failed to add product : ${err}`);
				}
			} else {
				// create active order
				const sql =
					"INSERT INTO orders (userId,  status) VALUES($1, $2) RETURNING *";
				await connect.query(sql, [userId, "active"]);
				// getting active order id
				const orderIdSql =
					"SELECT id FROM orders WHERE userId=($1) AND status='active'";
				const orderIdSqlResult = await connect.query(orderIdSql, [userId]);
				const orderId = orderIdSqlResult.rows[0].id;
				// add product to the order
				try {
					const sqlProduct =
						"INSERT INTO orderProducts (orderId, productId, quantity) VALUES($1, $2, $3) RETURNING *";
					const sqlProductResult = await connect.query(sqlProduct, [
						orderId,
						productId,
						quantity,
					]);
					connect.release();
					return sqlProductResult.rows[0];
				} catch (err) {
					throw new Error(`failed to add product : ${err}`);
				}
			}
		} catch (err) {
			throw new Error(`failed to add the product  : ${err}`);
		}
	}

	// authentication
	async authentication(userName: string, password: string): Promise<user> {
		try {
			const connect = await db.connect();
			const sql = "SELECT password FROM users WHERE userName=($1)";
			const result = await connect.query(sql, [userName]);
			// checking if the user exists
			if (result.rows.length) {
				const { password: passwordHashing } = result.rows[0];
				const passIsValid = bcrypt.compareSync(
					`${password}${process.env.PEPPER}`,
					passwordHashing
				);
				// checking if the password is correct
				if (passIsValid) {
					const userSql =
						"SELECT id, firstName, lastName, userName FROM users WHERE userName=($1)";
					const result = await connect.query(userSql, [userName]);
					connect.release();
					return result.rows[0];
				} else {
					connect.release();
					throw new Error("incorrect password");
				}
			} else {
				connect.release();
				throw new Error("user not found");
			}
		} catch (err) {
			throw new Error(`authentication error : ${err}`);
		}
	}
}
