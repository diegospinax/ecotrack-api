create table answers (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  question_id BIGINT NOT NULL,
  answer TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT FALSE,


  CONSTRAINT fk_answers_question
    FOREIGN KEY (question_id)
    REFERENCES questions(id)
);