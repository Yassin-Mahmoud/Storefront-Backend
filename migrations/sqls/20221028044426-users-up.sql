CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users(
  id        VARCHAR(50)  DEFAULT uuid_generate_v4() PRIMARY KEY,
  firstName VARCHAR(50)  NOT NULL,
  lastName  VARCHAR(50)  NOT NULL,
  userName  VARCHAR(50)  NOT NULL UNIQUE,
  password  VARCHAR(100) NOT NULL
);