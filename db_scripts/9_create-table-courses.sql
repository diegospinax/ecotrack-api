create table courses (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  person_id BIGINT NOT NULL,
  lesson_id BIGINT NOT NULL,
  is_finished BOOLEAN NOT NULL DEFAULT FALSE,

  CONSTRAINT fk_courses_person
    FOREIGN KEY (person_id)
    REFERENCES persons(id),

  CONSTRAINT fk_courses_lesson
    FOREIGN KEY (lesson_id)
    REFERENCES lessons(id)
);