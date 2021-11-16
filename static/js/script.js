let menuList;

/**
 * Data type: String
 * Generated automatically using data+time+Email name before @ (optional)
 * For example -- A costumer abc@gmail.com made an order on 11/21/2021 at 14:31,
   orderNumber = '112120211431abc'
 */
let orderNumber;

/**
 * Data type: itemNumber -- String[]
 * Data type: quantity -- int[]
 * For example -- A costumer made an order including: two cheeseburger(item #0) and one coke(item #8),
   itemNumber = {'0','8'},  quantity = {2,1}
 */
let itemNumber = [];
let quantity = [];

/**
 * Data type: Double
 * The order total price before tax
 * The price can be calculated by using itemNumber and quantity array with menuList(JSON)
 */
let subTotal;

/**
 * Data type: Double
 * The total tax paid by costumer in one order, round up to two decimal places if needed
 * For example -- if subtotal = 8.99,then tax = 0.9 (based on taxRate = 0.1, 8.99*0.1=0.899 --> 0.9)
 */
let tax;

/**
 * Data type: Double
 * orderTotal = subTotal + tax
 */
let orderTotal;

/**
 * Data type: Double
 */
let taxRate = 0.1

/**
 * Data type: String
 * The full email address
 * For example -- abc@gmail.com
 */
let customerEmail;

/**
 * Data type: String
 * Date following by time
 * For example -- A costumer made an order on 11/21/2021 at 09:31,
   dateAndTime = '112120210931'
 */
let dateAndTime;

/**
 * Data type: String
 * Customer credit card name
 */
 let cardName;

/**
 * Data type: String
 * Customer credit card number, no space in between
 */
let cardNumber;

/**
 * Data type: String
 * Customer credit card number Exp date, formatting in MMYY
 * For example -- cardExpiration = '0823'
 */
let cardExpiration;

/**
 * Data type: String
 * Customer credit card number cvv number, 3 digits
 */
let cvv;

/**
 * Data type: String
 * Customer name
 */
let customerName;

/**
 * Data type: String
 * Customer phone number
 */
let phone;

/**
 * Data type: String
 * Customer address:   Address + City + State + Zip
 * Example: address = '3801 W Temple Ave,Pomona,CA,91768'
 */
let address;
let address2;

/**
 * Data type: String
 * Customer city
 * For example -- Pomona
 */
 let city;

 /**
 * Data type: String
 * Customer state
 * For example -- CA
 */
  let state;

  /**
 * Data type: String
 * Customer ZIP code
 * For example -- 91768
 */
 let zipCode;

/**
 * addItemToCart() adds items to the cart to display to
 * 'cart.html'
 */
function addItemToCart(item) {
	if(itemNumber.includes(item)) {
		let index = itemNumber.indexOf(item);
		quantity[index]++;
  }
	else {
		itemNumber.push(item);
		quantity.push(1);
	}	

  sessionStorage.setItem("itemNumber", JSON.stringify(itemNumber));
  sessionStorage.setItem("quantity", JSON.stringify(quantity));

  console.log(itemNumber);
  console.log(quantity);
}

/**
 * getInfo() gathers the user inputs from 'checkout.html' 
 * and stores them to varibales
*/
function getInfo() {
  customerName = document.getElementById("firstName").value;
  customerEmail = document.getElementById("email").value;
  address = document.getElementById("address").value;
  address2 = document.getElementById("address2").value;
  city = document.getElementById("city").value;
  state = document.getElementById("state").value;
  zipCode = document.getElementById("zip").value;
  cardName = document.getElementById("cc-name").value;
  cardNumber = document.getElementById("cc-number").value;
  cardExpiration = document.getElementById("cc-expiration").value;
  cvv = document.getElementById("cc-cvv").value;

   /* Test that values are actually assigned to the variables
   
  console.log(customerName);
  console.log(customerEmail);
  console.log(address);
  console.log(address2);
  console.log(city);
  console.log(state);
  console.log(zipCode);
  console.log(cardName);
  console.log(cardNumber);
  console.log(cardExpiration);
  console.log(cvv);

  */
}

/**
 * displayCart() helps with printing the details in 
 * 'receipt.html'
*/
function displayCart() {
  // Test with premade arrays.
  //itemNumber = [1,5,9]
  //quantity = [2,3,1]

  itemNumber = JSON.parse(sessionStorage.getItem("itemNumber"));
  quantity = JSON.parse(sessionStorage.getItem("quantity"));

  console.log(itemNumber);
  console.log(quantity);

  menuList = JSON.parse(m);

  let node = document.getElementById('cartList');
  subTotal = 0.0;

  for(let i = 0; i < itemNumber.length; i++) {
    subTotal += menuList['menu'][itemNumber[i]]['price'] * quantity[i];

    let childNode = document.createElement('li');
    childNode.setAttribute('class','list-group-item');
    childNode.innerHTML = menuList['menu'][itemNumber[i]]['itemName'] + ' x ' + quantity [i] + ' - $' + (menuList['menu'][itemNumber[i]]['price'] * quantity[i]);

    node.appendChild(childNode);
  }

  let totalNode = document.getElementById('cartTotal');
  tax = taxRate * subTotal;
  orderTotal = subTotal + tax;
  totalNode.innerHTML = "Subtotal: $" + subTotal.toFixed(2) + "<br />" +
                        "Tax: $" + tax.toFixed(2) + "\n" + "<br />" +
                        "Total: $" + orderTotal.toFixed(2);
}

/**
 * displayReceipt() helps with printing the details in 
 * 'receipt.html'
*/
function displayReceipt() {
    // Test with premade arrays.
    //itemNumber = [1,5,9]
    //quantity = [2,3,1]
    
    itemNumber = JSON.parse(sessionStorage.getItem("itemNumber"));
    quantity = JSON.parse(sessionStorage.getItem("quantity"));
  
    console.log(itemNumber);
    console.log(quantity);

    menuList = JSON.parse(m);

    let node = document.getElementById('orderList');
    subTotal = 0.0;

    for(let i = 0; i < itemNumber.length; i++) {
      subTotal += menuList['menu'][itemNumber[i]]['price'] * quantity[i];

      let childNode = document.createElement('li');
      childNode.setAttribute('class','list-group-item');
      childNode.innerHTML = menuList['menu'][itemNumber[i]]['itemName'] + ' x ' + quantity [i] + ' - $' + (menuList['menu'][itemNumber[i]]['price'] * quantity[i]);

      node.appendChild(childNode);
    }

    let totalNode = document.getElementById('total');
    tax = taxRate * subTotal;
    orderTotal = subTotal + tax;
    totalNode.innerHTML = "Subtotal: $" + subTotal.toFixed(2) + "<br />" +
                          "Tax: $" + tax.toFixed(2) + "\n" + "<br />" +
                          "Total: $" + orderTotal.toFixed(2);
}

function itemInfo() {

     //     $.ajax({
     //    type: "GET",
     //    url: 'http://127.0.0.1:5000/data/menu',
     //    dataType: 'json',
     //
     //    success: function(response){
     //        menuList = response;
     //    }
     // });

    menuList = JSON.parse(m);

    let node0 = document.getElementById('n0');
    node0.innerText = menuList['menu'][0]['itemName'];
    node0 = document.getElementById('p0');
    node0.innerText = '$' + menuList['menu'][0]['price'];

    let node1 = document.getElementById('n1');
    node1.innerText = menuList['menu'][1]['itemName'];
    node1 = document.getElementById('p1');
    node1.innerText = '$' + menuList['menu'][1]['price'];

    let node2 = document.getElementById('n2');
    node2.innerText = menuList['menu'][2]['itemName'];
    node2 = document.getElementById('p2');
    node2.innerText = '$' + menuList['menu'][2]['price'];

    let node3 = document.getElementById('n3');
    node3.innerText = menuList['menu'][3]['itemName'];
    node3 = document.getElementById('p3');
    node3.innerText = '$' + menuList['menu'][3]['price'];

    let node4 = document.getElementById('n4');
    node4.innerText = menuList['menu'][4]['itemName'];
    node4 = document.getElementById('p4');
    node4.innerText = '$' + menuList['menu'][4]['price'];

    let node5 = document.getElementById('n5');
    node5.innerText = menuList['menu'][5]['itemName'];
    node5 = document.getElementById('p5');
    node5.innerText = '$' + menuList['menu'][5]['price'];

    let node6 = document.getElementById('n6');
    node6.innerText = menuList['menu'][6]['itemName'];
    node6 = document.getElementById('p6');
    node6.innerText = '$' + menuList['menu'][6]['price'];

    let node7 = document.getElementById('n7');
    node7.innerText = menuList['menu'][7]['itemName'];
    node7 = document.getElementById('p7');
    node7.innerText = '$' + menuList['menu'][7]['price'];

    let node8 = document.getElementById('n8');
    node8.innerText = menuList['menu'][8]['itemName'];
    node8 = document.getElementById('p8');
    node8.innerText = '$' + menuList['menu'][8]['price'];

    let node9 = document.getElementById('n9');
    node9.innerText = menuList['menu'][9]['itemName'];
    node9 = document.getElementById('p9');
    node9.innerText = '$' + menuList['menu'][9]['price'];

}
 

m = "{\n" +
    "\t\"menu\": [{\n" +
    "\t\t\t\"itemNumber\": 0,\n" +
    "\t\t\t\"itemName\": \"Cheese Burger\",\n" +
    "\t\t\t\"price\": 4.49\n" +
    "\t\t},\n" +
    "\t\t{\n" +
    "\t\t\t\"itemNumber\": 1,\n" +
    "\t\t\t\"itemName\": \"Hamburger\",\n" +
    "\t\t\t\"price\": 5.49\n" +
    "\t\t}, {\n" +
    "\t\t\t\"itemNumber\": 2,\n" +
    "\t\t\t\"itemName\": \"Double Cheeseburger\",\n" +
    "\t\t\t\"price\": 6.79\n" +
    "\t\t},\n" +
    "\t\t{\n" +
    "\t\t\t\"itemNumber\": 3,\n" +
    "\t\t\t\"itemName\": \"Double Hamburger\",\n" +
    "\t\t\t\"price\": 7.79\n" +
    "\t\t}, {\n" +
    "\t\t\t\"itemNumber\": 4,\n" +
    "\t\t\t\"itemName\": \"Crispy Chicken Sandwich\",\n" +
    "\t\t\t\"price\": 6.99\n" +
    "\t\t},\n" +
    "\t\t{\n" +
    "\t\t\t\"itemNumber\": 5,\n" +
    "\t\t\t\"itemName\": \"Fish Burger\",\n" +
    "\t\t\t\"price\": 6.99\n" +
    "\t\t}, {\n" +
    "\t\t\t\"itemNumber\": 6,\n" +
    "\t\t\t\"itemName\": \"Double Double\",\n" +
    "\t\t\t\"price\": 7.99\n" +
    "\t\t},\n" +
    "\t\t{\n" +
    "\t\t\t\"itemNumber\": 7,\n" +
    "\t\t\t\"itemName\": \"BBQ Burger\",\n" +
    "\t\t\t\"price\": 8.99\n" +
    "\t\t}, {\n" +
    "\t\t\t\"itemNumber\": 8,\n" +
    "\t\t\t\"itemName\": \"Coke\",\n" +
    "\t\t\t\"price\": 2.99\n" +
    "\t\t},\n" +
    "\t\t{\n" +
    "\t\t\t\"itemNumber\": 9,\n" +
    "\t\t\t\"itemName\": \"French Fries\",\n" +
    "\t\t\t\"price\": 3.49\n" +
    "\t\t}\n" +
    "\t]\n" +
    "\n" +
    "\n" +
    "}"
