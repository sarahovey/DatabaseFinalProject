DROP DATABASE dreamycloset;
CREATE DATABASE dreamycloset;
USE dreamycloset;

CREATE TABLE substyles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE comms(
    id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    comm_name VARCHAR(255) NOT NULL
);

CREATE TABLE users (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    fav_substyle INTEGER,
    home_comm INTEGER,
    FOREIGN KEY(fav_substyle) REFERENCES substyles(id)
    ON DELETE CASCADE,
    FOREIGN KEY(home_comm) REFERENCES comms(id)
    ON DELETE CASCADE
);

CREATE TABLE item_types (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    type_name VARCHAR(255) NOT NULL
);

CREATE TABLE brands (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    brand_name VARCHAR(255) NOT NULL
);

CREATE TABLE items (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    item_type INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    brand INTEGER NOT NULL,
    wishlist_wardrobe INTEGER NOT NULL,
    date_added DATE,
    user_id INTEGER NOT NULL,
    active BOOL NOT NULL,
    -- date_inactivated DATE,
    FOREIGN KEY(user_id) REFERENCES users(id)
    ON DELETE CASCADE
);


CREATE TABLE users_comms (
    user_id INTEGER NOT NULL,
    comm_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
    ON DELETE CASCADE,
    FOREIGN KEY(comm_id) REFERENCES comms(id)
    ON DELETE CASCADE,
    PRIMARY KEY(user_id, comm_id)
);

CREATE TABLE users_substyles (
    user_id INTEGER NOT NULL,
    style_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
    ON DELETE CASCADE,
    FOREIGN KEY(style_id) REFERENCES substyles(id)
    ON DELETE CASCADE,
    PRIMARY KEY(user_id, style_id)
    
);


INSERT INTO substyles(name) VALUES
("sweet"),
("classic"),
("gothic");

INSERT INTO comms(comm_name) VALUES
("San Francisco"),
("Portland"),
("London"),
("Paris"),
("Osaka"),
("Brisbane");

INSERT INTO users(username, fav_substyle, home_comm) VALUES
("strawberry_fawn", 1, 2),
("moonlight_witch", 3, 4),
("crinkled_cookie", 2, 3),
("winemom", 3, 1),
("shyflame",2, 5),
("royal_owl", 1, 6);

INSERT INTO users_comms(user_id, comm_id) VALUES
(1,2),
(2,4),
(3,3),
(4,1),
(5,5),
(6,6);

INSERT INTO users_substyles(user_id, style_id) VALUES
(1,1),
(2,3),
(3,2),
(4,3),
(5,2),
(6,1);

INSERT INTO brands(brand_name) VALUES
("Angelic Pretty"),
("Alice and the Pirates"),
("Baby the Stars Shine Bright"),
("Innocent World"),
("Juliette et Justine"),
("Mary Magdalene"),
("Meta"),
("Victorian Maiden");

INSERT INTO item_types(type_name) VALUES
("JSK"),
("OP"),
("Skirt"),
("Blouse"),
("Shoes"),
("Head accessory"),
("Jewelry"),
("Other accessory"),
("Shoes"),
("Outerwear"),
("Other");

INSERT INTO items(item_type, name, brand, wishlist_wardrobe, date_added, user_id, active) VALUES
(1, "Black Chiffon JSK", 8, 1, '2018-01-20', 1, TRUE),
(2, "Polka Dot OP", 1, 1, '2018-01-18', 1, TRUE),
(4, "Pear skin blouse", 4, 1, '2018-01-19', 1, TRUE);