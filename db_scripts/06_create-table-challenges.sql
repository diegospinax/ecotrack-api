create table challenges (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  person_id BIGINT NOT NULL,
  task_id BIGINT NOT NULL,
  is_finished BOOLEAN NOT NULL DEFAULT FALSE,
  times_done INT CHECK (times_done >= 0) NOT NULL DEFAULT 0,

  CONSTRAINT fk_challenges_person
    FOREIGN KEY (person_id)
    REFERENCES persons(id),

  CONSTRAINT fk_challenges_task
    FOREIGN KEY (task_id)
    REFERENCES tasks(id)
);