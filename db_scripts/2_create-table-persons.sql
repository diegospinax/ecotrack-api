create table persons (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  area VARCHAR(50) NOT NULL,
  profile_picture TEXT NOT NULL,
  is_active boolean NOT NULL
);