create table questions (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  lesson_id BIGINT NOT NULL,
  question TEXT NOT NULL,


  CONSTRAINT fk_questions_lesson
    FOREIGN KEY (lesson_id)
    REFERENCES lessons(id)
);