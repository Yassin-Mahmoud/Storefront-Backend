CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE products(
  id    VARCHAR(50)  DEFAULT uuid_generate_v4() PRIMARY KEY, 
  name  VARCHAR(150) NOT NULL, 
  price FLOAT        NOT NULL
);