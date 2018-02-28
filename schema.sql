DROP DATABASE dreamycloset;
CREATE DATABASE dreamycloset;
USE dreamycloset;

CREATE TABLE users (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    fav_substyle INTEGER,
    home_comm INTEGER
    -- FOREIGN KEY(fav_substyle) REFERENCES substyles(id),
    -- FOREIGN KEY(home_comm) REFERENCES comms(id)
);


CREATE TABLE items (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    item_type VARCHAR(255) NOT NULL,
    wishlist_wardrobe INTEGER NOT NULL,
    date_added DATE,
    user_id INTEGER NOT NULL,
    active BOOL NOT NULL,
    date_inactivated DATE,
    FOREIGN KEY(user_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE substyles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE comms(
    id INTEGER NOT NULL PRIMARY KEY,
    comm_name VARCHAR(255) NOT NULL
);

CREATE TABLE users_comms (
    user_id INTEGER NOT NULL,
    comm_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(comm_id) REFERENCES comms(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY(user_id, comm_id)
);

CREATE TABLE users_substyles (
    user_id INTEGER NOT NULL,
    style_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(style_id) REFERENCES substyles(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY(user_id, style_id)
    
);