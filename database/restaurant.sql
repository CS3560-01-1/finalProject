use restaurant;

create table menu(
	itemNumber int,
    itemName varchar(25),
    price double,
    primary key (ItemNumber)
);

insert into menu(itemNumber, itemName, price) values
 (0, "Cheese Burger", 4.49), (1, "Hamburger", 5.49), (2, "Double Cheeseburger", 6.79),
 (3, "Double Hamburger", 7.79), (4, "Crispy Chicken Sandwich", 6.99), (5, "Fish Burger", 6.99),
 (6, "Double Double", 7.99), (7, "BBQ Burger", 8.99), (8, "Coke", 2.99),
 (9, "French Fries", 3.49);


create table orderInformation(
	orderNumber int,
    subtotal double,
    tax double,
    orderTotal double,
    dateAndTime varchar(13),

    primary key (orderNumber)
);

create table orderItem(
	orderNumber int,
    itemNumber int,
    quantity int,

    foreign key (orderNumber) references orderInformation(orderNumber),
    foreign key (itemNumber) references menu(itemNumber)
);

create table customerInformation(
    orderNumber int,
    customerEmail varchar(50),
    customerName varchar(50),
    phone varchar(11),
    address varchar(150),

    foreign key (orderNumber) references orderInformation(orderNumber)
);

 create table cardInformation(
	orderNumber int,
	cardNumber varchar(16),
    cardExpiration varchar(4),
    cvv varchar(3),

    foreign key (orderNumber) references orderInformation(orderNumber)
 );