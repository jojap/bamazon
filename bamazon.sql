DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price decimal(10,4) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products(product_name,department_name,price,stock_quantity)
Values("TV","Appliances",500,5);
INSERT INTO products(product_name,department_name,price,stock_quantity)
Values("Bananas","Food",2,100);
INSERT INTO products(product_name,department_name,price,stock_quantity)
Values("Mini Grill","Tailgaiting",200,20);
INSERT INTO products(product_name,department_name,price,stock_quantity)
Values("Couch","Furniture",500,5);
INSERT INTO products(product_name,department_name,price,stock_quantity)
Values("Lawn Chair","Tailgaiting",30,50);
INSERT INTO products(product_name,department_name,price,stock_quantity)
Values("Keurig","Appliances",50,30);
INSERT INTO products(product_name,department_name,price,stock_quantity)
Values("Football","Tailgaiting",20,100);
INSERT INTO products(product_name,department_name,price,stock_quantity)
Values("Pork Chops","Food",5,100);
INSERT INTO products(product_name,department_name,price,stock_quantity)
Values("Lay Z Boy","Furniture",30,12);
INSERT INTO products(product_name,department_name,price,stock_quantity)
Values("Candy","Food",2,300);

SELECT * FROM products;