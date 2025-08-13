create table lessons (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL
);