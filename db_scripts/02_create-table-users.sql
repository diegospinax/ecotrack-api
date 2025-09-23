CREATE TYPE user_role AS ENUM ('ADMIN','USER');

create table users (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role user_role NOT NULL,
  person_id bigint NOT NULL,

  CONSTRAINT fk_user_person_id 
    FOREIGN KEY (person_id)
    REFERENCES persons(id)
);

--password is: danna123
insert into users (email, password, role, person_id) values ('danna@mail.com', '$2a$12$RDCmQZymq4g7K7wWqjweuOJ0kR404pVX9nfvOwqF.bkIFIYZ3vDU6', 'ADMIN', 1);