CREATE TABLE users (
    id INTEGER NOT NULL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE tasks (
    id INTEGER NOT NULL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    task TEXT NOT NULL,
    label TEXT,
    done INTEGER NOT NULL DEFAULT 0, -- 0 NOT DONE 1 FOR DONE
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_user_id ON tasks(user_id);
CREATE INDEX idx_done ON tasks(done);