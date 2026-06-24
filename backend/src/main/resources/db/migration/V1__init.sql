CREATE TABLE repository_entity (
                                   id SERIAL PRIMARY KEY,
                                   name VARCHAR(255),
                                   external_id VARCHAR(255)
);

CREATE TABLE pipeline_run (
                              id SERIAL PRIMARY KEY,
                              commit_id VARCHAR(255),
                              branch VARCHAR(255),
                              status VARCHAR(50),
                              start_time TIMESTAMP,
                              end_time TIMESTAMP,
                              repository_id BIGINT
);

CREATE TABLE pipeline_step (
                               id SERIAL PRIMARY KEY,
                               name VARCHAR(255),
                               duration_ms BIGINT,
                               status VARCHAR(50),
                               start_time TIMESTAMP,
                               end_time TIMESTAMP,
                               pipeline_run_id BIGINT
);