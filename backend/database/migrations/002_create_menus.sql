
DROP TABLE IF EXISTS MENUS;

CREATE TABLE IF NOT EXISTS MENUS (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) UNIQUE NOT NULL,
    image VARCHAR(1024) UNIQUE NOT NULL
);

INSERT INTO MENUS (name, image) VALUES
('salad', 'menu_1.png'),
('rolls', 'menu_2.png'),
('desserts', 'menu_3.png'),
('sandwich', 'menu_4.png'),
('cake', 'menu_5.png'),
('pure veg', 'menu_6.png'),
('pasta', 'menu_7.png'),
('noodles', 'menu_8.png');

SELECT *
FROM MENUS;