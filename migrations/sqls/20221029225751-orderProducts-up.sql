CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE orderProducts (
  id        VARCHAR(50) DEFAULT uuid_generate_v4()  PRIMARY KEY,
  orderId   VARCHAR(50) NOT NULL,
  productId VARCHAR(50) NOT NULL,
  quantity  INTEGER     DEFAULT (1),
  FOREIGN KEY(orderId)   REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY(productId) REFERENCES products(id) ON DELETE CASCADE
);
