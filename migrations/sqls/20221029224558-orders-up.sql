CREATE TYPE orderStatus AS ENUM ('completed', 'active');
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE orders (
  id      VARCHAR(50) DEFAULT uuid_generate_v4() PRIMARY KEY, 
  userId  VARCHAR(50) NOT NULL,
  status  orderStatus NOT NULL,
  FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
);