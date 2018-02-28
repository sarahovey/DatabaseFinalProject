DROP DATABASE dreamycloset;
CREATE DATABASE dreamycloset;
USE dreamycloset;

CREATE TABLE users (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    fav_substyle INTEGER,
    home_comm INTEGER
    -- FOREIGN KEY(fav_substyle) REFERENCES substyles(id),
    -- FOREIGN KEY(home_comm) REFERENCES comms(id)
);


CREATE TABLE items (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    item_type VARCHAR(255) NOT NULL,
    wishlist_wardrobe INTEGER NOT NULL,
    date_added DATE,
    user_id INTEGER NOT NULL,
    active BOOL NOT NULL,
    date_inactivated DATE,
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE substyles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE comms(
    id INTEGER NOT NULL,
    comm_name VARCHAR(255) NOT NULL
);

CREATE TABLE users_comms (
    user_id INTEGER NOT NULL,
    comm_id INTEGER NOT NULL
    -- FOREIGN KEY(user_id) REFERENCES users(id),
    -- FOREIGN KEY(comm_id) REFERENCES comms(id),
    -- PRIMARY KEY(user_id, comm_id)
);

CREATE TABLE users_substyles (
    user_id INTEGER NOT NULL,
    style_id INTEGER NOT NULL,
    -- FOREIGN KEY(user_id) REFERENCES users(id),
    -- FOREIGN KEY(style_id) REFERENCES substyles(id),
    PRIMARY KEY(user_id, style_id)
);