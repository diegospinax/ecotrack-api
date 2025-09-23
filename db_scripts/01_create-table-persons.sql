create table persons (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  area VARCHAR(50) NOT NULL,
  profile_picture TEXT NOT NULL,
  is_active boolean NOT NULL
);

insert into persons (name, last_name, area, profile_picture, is_active) values
('DANNA', 'GARCIA', 'DIRECCION', 'https://avatars.githubusercontent.com/u/16887236?v=4', true);