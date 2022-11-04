import db from "../database";

export type orderProducts = {
    id: string;
    productId: string;
    quantity: number;
    orderId: string;
};

export type order = {
    id: string;
    userId: string;
    status: string;
};

export class orders {
    // show all orders
    async index(): Promise<order[]> {
        try {
            const connect = await db.connect();
            const sql = "SELECT * FROM orders";
            const result = await connect.query(sql);
            connect.release();
            return result.rows;
        } catch (err) {
            throw new Error(`cannot show orders`);
        }
    }

    // show all user orders
    async showUserOrders(userId: string): Promise<order> {
        const connect = await db.connect();
        const sql = `SELECT * FROM orders WHERE userId=${userId}`;
        const result = await connect.query(sql);
        connect.release();
        return result.rows[0];
    }

    // show a specific order belongs to a specific user
    async showOrder(orderId: string, userId: string): Promise<order> {
        try {
            const connect = await db.connect();

            const sql = `SELECT * FROM orders WHERE id=${orderId} AND userId=${userId}`;
            const result = await connect.query(sql);
            connect.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`cannot show order : ${err}`);
        }
    }

    // show active order
    async showActiveOrder(userId: string): Promise<order> {
        try {
            const connect = await db.connect();
            const sql = `SELECT * FROM order WHERE userId=${userId} AND status='active'`;
            const result = await connect.query(sql);
            connect.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`there is no active order : ${err}`);
        }
    }

    //  change 'active' status
    async changeStatus(userId: string): Promise<order> {
        try {
            const connect = await db.connect();
            const activeOrder = `SELECT * FROM orders WHERE userId=${userId} AND status='active'`;
            const activeOrderQuery = await connect.query(activeOrder);
            if (activeOrderQuery.rows[0]) {
                // getting order id
                const sqlOrderId = `SELECT id FROM orders WHERE userId=${userId} AND status='active'`;
                const sqlOrderIdResult = await connect.query(sqlOrderId);
                const sql = `UPDATE orders SET status='completed' WHERE userId=${userId} AND orderId=${sqlOrderIdResult}`;
                const result = await connect.query(sql);
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
