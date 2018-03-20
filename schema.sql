DROP DATABASE dreamycloset;
CREATE DATABASE dreamycloset;
USE dreamycloset;

CREATE TABLE substyles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE users (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE item_types (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE brands (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL
);


CREATE TABLE items (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    item_type INTEGER,
    name VARCHAR(255) NOT NULL,
    brand INTEGER, 
    substyle INTEGER,
    user_id INTEGER,
    FOREIGN KEY(item_type) REFERENCES item_types(id)
    ON DELETE CASCADE,
    FOREIGN KEY(brand) REFERENCES brands(id)
    ON DELETE CASCADE,
    FOREIGN KEY(user_id) REFERENCES users(id)
    ON DELETE CASCADE,
    FOREIGN KEY(substyle) REFERENCES substyles(id)
    ON DELETE CASCADE
);

CREATE TABLE items_substyles (
    item_id INTEGER NOT NULL,
    style_id INTEGER NOT NULL,
    FOREIGN KEY(item_id) REFERENCES items(id)
    ON DELETE CASCADE,
    FOREIGN KEY(style_id) REFERENCES substyles(id)
    ON DELETE CASCADE,
    PRIMARY KEY(item_id, style_id)
);


INSERT INTO substyles(name, description) VALUES
("sweet", "Cute, innocent look inspired by fairy tales. Often features light colors, motifs such as candy or small animals"),
("classic", "Mature elegant look inspired by history. Features muted colors and simple prints or solid fabrics"),
("gothic", "Much like Western goth, but with the lolita silhouette. Often includes bat or cross motifs, and dark colors");


INSERT INTO users(name) VALUES
("strawberry_fawn"),
("moonlight_witch"),
("crinkled_cookie"),
("winemom"),
("shyflame"),
("royal_owl");

INSERT INTO brands(name) VALUES
("Angelic Pretty"),
("Alice and the Pirates"),
("Baby the Stars Shine Bright"),
("Innocent World"),
("Juliette et Justine"),
("Mary Magdalene"),
("Meta"),
("Victorian Maiden");

INSERT INTO item_types(name) VALUES
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

INSERT INTO items(item_type, name, brand, substyle, user_id) VALUES
(1, "Black Chiffon JSK", 8, 3, 1),
(2, "Polka Dot OP", 1, 1, 1),
(4, "Pear skin blouse", 4, 2, 1);

INSERT INTO items_substyles(item_id, style_id) VALUES
(1,3),
(2,1),
(3,2);
-- (4,3),
-- (5,2),
-- (6,1);


-- select * from items inner join brands on brands.id = items.brand inner join users on users.id = items.user_id

-- SELECT items.id, item_types.name AS item_type, items.name, brands.name AS brand, users.name AS user FROM items INNER JOIN item_types ON item_type = item_types.id INNER JOIN brands ON brand = brands.id INNER JOIN users on users.id = items.user_id;

-- SELECT items.id, item_types.name AS item_type, items.name, brands.name AS brand, substyles.name AS substyle, users.name AS user FROM items INNER JOIN item_types ON item_type = item_types.id INNER JOIN brands ON brand = brands.id JOIN items_substyles ON(items.substyle = items_substyles.item_id) JOIN substyles ON (items_substyles.style_id = substyles.id) INNER JOIN users on users.id = items.user_id;