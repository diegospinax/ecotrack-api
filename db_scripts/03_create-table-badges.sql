create table badges (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  type varchar(50) NOT NULL,
  is_active boolean NOT NULL
);