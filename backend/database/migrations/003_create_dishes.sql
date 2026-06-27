
DROP TABLE IF EXISTS DISHES;

CREATE TABLE IF NOT EXISTS DISHES (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL UNIQUE,
    description VARCHAR(1024) NOT NULL,
    price REAL NOT NULL,
    stars REAL NOT NULL,
    image VARCHAR(1024) NOT NULL,
    menu_id INT NOT NULL REFERENCES menus(id)
);

INSERT INTO DISHES (name, description, price, stars, image, menu_id) VALUES
('Greek salad', 'A fresh Mediterranean salad with crisp cucumber, juicy tomatoes, olives, red onion and creamy feta cheese.', 12, 4.7, 'food_1.png', 1),
('Veg salad', 'A colorful mix of seasonal vegetables served with a light house dressing for a healthy and refreshing meal.', 18, 4.5, 'food_2.png', 1),
('Clover Salad', 'A vibrant green salad made with tender leaves, crunchy vegetables and a mild herb vinaigrette.', 16, 4.4, 'food_3.png', 1),
('Chicken Salad', 'Grilled chicken breast served over fresh greens with vegetables and a savory dressing.', 24, 4.8, 'food_4.png', 1),

('Lasagna Rolls', 'Soft pasta rolls filled with rich cheese and tomato sauce, baked until warm and comforting.', 14, 4.6, 'food_5.png', 2),
('Peri Peri Rolls', 'Spicy peri peri rolls packed with bold seasoning, fresh vegetables and a flavorful sauce.', 12, 4.5, 'food_6.png', 2),
('Chicken Rolls', 'Tender chicken wrapped in a soft roll with fresh vegetables and a creamy house sauce.', 20, 4.7, 'food_7.png', 2),
('Veg Rolls', 'A light vegetarian roll filled with crunchy vegetables, herbs and a tasty savory sauce.', 15, 4.3, 'food_8.png', 2),

('Ripple Ice Cream', 'Creamy ice cream with smooth ripples of sweet sauce for a rich and refreshing dessert.', 14, 4.6, 'food_9.png', 3),
('Fruit Ice Cream', 'A refreshing ice cream dessert blended with fruity flavors and a smooth creamy texture.', 22, 4.7, 'food_10.png', 3),
('Jar Ice Cream', 'Layered ice cream served in a jar with sweet toppings and a creamy finish.', 10, 4.4, 'food_11.png', 3),
('Vanilla Ice Cream', 'Classic vanilla ice cream with a smooth texture and a rich, comforting flavor.', 12, 4.5, 'food_12.png', 3),

('Chicken Sandwich', 'A hearty sandwich with tender chicken, crisp lettuce, tomato and a creamy sauce.', 12, 4.6, 'food_13.png', 4),
('Vegan Sandwich', 'A plant-based sandwich filled with fresh vegetables, herbs and a flavorful vegan spread.', 18, 4.4, 'food_14.png', 4),
('Grilled Sandwich', 'A warm grilled sandwich with melted cheese, vegetables and a golden crispy crust.', 16, 4.7, 'food_15.png', 4),
('Bread Sandwich', 'A simple and satisfying sandwich made with soft bread, fresh fillings and a light sauce.', 24, 4.2, 'food_16.png', 4),

('Cup Cake', 'A soft and fluffy cupcake topped with sweet frosting, perfect for a small dessert treat.', 14, 4.5, 'food_17.png', 5),
('Vegan Cake', 'A moist plant-based cake made without dairy, offering a light texture and rich flavor.', 12, 4.4, 'food_18.png', 5),
('Butterscotch Cake', 'A rich cake layered with creamy butterscotch frosting and a sweet caramel-like flavor.', 20, 4.8, 'food_19.png', 5),
('Sliced Cake', 'A generous slice of soft cake with smooth cream layers and a balanced sweetness.', 15, 4.6, 'food_20.png', 5),

('Garlic Mushroom', 'Tender mushrooms sautéed with garlic, herbs and a touch of butter for a rich savory taste.', 14, 4.7, 'food_21.png', 6),
('Fried Cauliflower', 'Crispy cauliflower florets fried until golden and seasoned with aromatic spices.', 22, 4.5, 'food_22.png', 6),
('Mix Veg Pulao', 'Fragrant rice cooked with mixed vegetables and mild spices for a comforting vegetarian dish.', 10, 4.4, 'food_23.png', 6),
('Rice Zucchini', 'A light rice dish with tender zucchini, herbs and gentle seasoning for a fresh veggie meal.', 12, 4.3, 'food_24.png', 6),

('Cheese Pasta', 'Pasta tossed in a creamy cheese sauce with a smooth texture and rich comforting flavor.', 12, 4.6, 'food_25.png', 7),
('Tomato Pasta', 'Pasta served with a bright tomato sauce, herbs and a touch of garlic for a classic taste.', 18, 4.5, 'food_26.png', 7),
('Creamy Pasta', 'A rich and silky pasta dish coated in creamy sauce with herbs and savory seasoning.', 16, 4.7, 'food_27.png', 7),
('Chicken Pasta', 'Pasta with tender chicken pieces in a flavorful sauce, finished with herbs and spices.', 24, 4.8, 'food_28.png', 7),

('Buttter Noodles', 'Soft noodles tossed with butter, mild spices and herbs for a simple yet comforting dish.', 14, 4.3, 'food_29.png', 8),
('Veg Noodles', 'Stir-fried noodles mixed with fresh vegetables, soy seasoning and aromatic spices.', 12, 4.5, 'food_30.png', 8),
('Somen Noodles', 'Delicate somen noodles served with light seasoning for a smooth and refreshing noodle dish.', 20, 4.4, 'food_31.png', 8),
('Cooked Noodles', 'Classic cooked noodles tossed with vegetables and savory sauce for a satisfying meal.', 15, 4.6, 'food_32.png', 8);

SELECT *
FROM DISHES d
INNER JOIN MENUS m ON m.id = d.menu_id;