create table persons (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  area VARCHAR(50) NOT NULL,
  profile_picture VARCHAR(255) NOT NULL,

  CONSTRAINT fk_persons_user
    FOREIGN KEY (user_id) 
    REFERENCES users(id)
);