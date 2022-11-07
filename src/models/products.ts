import db from "../database";

export type product = {
	id?: String;
	name: String;
	price: String;
};

export class products {
	// show all products
	async index(): Promise<product[]> {
		try {
			const connect = await db.connect();
			const sql = "SELECT * FROM products";
			const result = await connect.query(sql);
			connect.release();
			return result.rows;
		} catch (err) {
			throw new Error(`cannot get products: ${err}`);
		}
	}

	// show specific product
	async showProduct(id: string): Promise<product> {
		try {
			const connect = await db.connect();
			const sql = "SELECT * FROM products WHERE id=($1)";
			const result = await connect.query(sql, [id]);
			connect.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`cannot get product details: ${err}`);
		}
	}

	// create new product
	async createProduct(p: product): Promise<product> {
		try {
			const connect = await db.connect();
			const sql =
				"INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *";
			const result = await connect.query(sql, [p.name, p.price]);
			connect.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`failed to create new product ${err}`);
		}
	}

	// delete specific product
	async deleteProduct(id: string): Promise<product> {
		try {
			const connect = await db.connect();
			const sql = "DELETE FROM products WHERE id=($1)";
			const result = await connect.query(sql, [id]);
			connect.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`cannot delete product: ${err}`);
		}
	}
}
