create table menu(
	ItemNumber int,
    ItemName varchar(25),
    Price double,
    primary key (ItemNumber)
);

insert into menu(ItemNumber, ItemName, Price) values
 (0, "Cheese Burger", 4.49), (1, "Hamburger", 5.49), (2, "Double Cheeseburger", 6.79),
 (3, "Double Hamburger", 7.79), (4, "Crispy Chicken Sandwich", 6.99), (5, "Fish Burger", 6.99),
 (6, "Double Double", 7.99), (7, "BBQ Burger", 8.99), (8, "Coke", 2.99),
 (9, "French Fries", 3.49);
 
 create table cardInformation(
	cardNumber varchar(16),
    cardExpiration varchar(4),
    CVV varchar(3),
    primary key (cardNumber)
 );

create table customerInformation(
	customerName varchar(25),
    email varchar(50),
    phone varchar(11),
    address varchar(100),
    cardNumber varchar(16),
    
    primary key (customerName),
    foreign key (cardNumber) references cardInformation(cardNumber)
);

create table orderInformation(
	orderNumber varchar(20),
    subtotal double,
    tax double,
    orderTotal double,
    customerName varchar(25),
    dateAndTime varchar(100),
    
    primary key (orderNumber),
    foreign key (customerName) references customerInformation(customerName)
);

create table orderItem(
	orderNumber varchar(20),
    itemNumber int,
    quantity int,
    totalPrice double,
    
    foreign key (orderNumber) references orderInformation(orderNumber),
    foreign key (itemNumber) references menu(itemNumber)
);