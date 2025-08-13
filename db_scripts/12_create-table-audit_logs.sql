create table audit_logs (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  table_name VARCHAR(50) NOT NULL,
  row_id BIGINT NOT NULL,
  field VARCHAR(50),
  operation_type VARCHAR(10) NOT NULL,
  modifier_user VARCHAR(255) NOT NULL,
  previous_value TEXT NOT NULL DEFAULT '',
  new_value TEXT NOT NULL DEFAULT '',
  log_date TIMESTAMP DEFAULT NOW() NOT NULL
);