import db from "../database";

export type order = {
	id: string;
	userId: string;
	status: string;
};

export class orders {
	// create order
	async createOrder(userId: string): Promise<order> {
		try {
			const connect = await db.connect();
			const sql =
				"INSERT INTO orders (userId, status) VALUES ($1, $2) RETURNING *";
			const result = await connect.query(sql, [userId, "active"]);
			connect.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`failed to create order ${err}`);
		}
	}

	// show completed user orders
	async showCompletedOrders(userId: string): Promise<order[]> {
		try {
			const connect = await db.connect();
			const sql =
				"SELECT id, userId, status FROM orders WHERE userId=($1) AND status='completed'";
			const result = await connect.query(sql, [userId]);
			const ordersList = result.rows;
			connect.release();
			return ordersList;
		} catch (err) {
			throw new Error(`no completed orders : ${err}`);
		}
	}

	// show active order
	async showActiveOrder(userId: string): Promise<order> {
		try {
			const connect = await db.connect();
			const sql = "SELECT * FROM orders WHERE userId=($1) AND status='active'";
			const result = await connect.query(sql, [userId]);
			connect.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`there is no active order : ${err}`);
		}
	}

	//  change 'active' status
	async changeStatus(userId: string): Promise<order> {
		try {
			// getting the active order
			const connect = await db.connect();
			const activeOrder =
				"SELECT * FROM orders WHERE userId=($1) AND status='active'";
			const activeOrderQuery = await connect.query(activeOrder, [userId]);
			// checking if the active order exists
			if (activeOrderQuery.rows[0]) {
				const orderId = activeOrderQuery.rows[0].id;
				// updating 'active' status
				const sql =
					"UPDATE orders SET status='completed' WHERE userId=($1) AND id=($2) RETURNING *";
				const result = await connect.query(sql, [userId, orderId]);
				connect.release();
				return result.rows[0];
			} else {
				connect.release();
				throw new Error("no active orders");
			}
		} catch (err) {
			throw new Error(`no active orders : ${err}`);
		}
	}
}
