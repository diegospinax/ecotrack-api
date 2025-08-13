create table tasks (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  type varchar(50) NOT NULL,
  times INT CHECK (times > 0) NOT NULL
);