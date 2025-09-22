create table tasks (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  type varchar(50) NOT NULL,
  required_repetitions INT CHECK (required_repetitions > 0) NOT NULL,
  is_active boolean NOT NULL
);