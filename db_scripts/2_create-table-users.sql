CREATE TYPE user_role AS ENUM ('ADMIN','USER');
create table users (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role user_role NOT NULL,
  is_active boolean NOT NULL
);