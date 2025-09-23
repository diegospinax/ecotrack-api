create table achievements (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  person_id BIGINT NOT NULL,
  badge_id BIGINT NOT NULL,
  date_received TIMESTAMP NOT NULL,

  CONSTRAINT fk_achievement_person
    FOREIGN KEY (person_id)
    REFERENCES persons(id),

  CONSTRAINT fk_achievement_badge
    FOREIGN KEY (badge_id)
    REFERENCES badges(id)
);