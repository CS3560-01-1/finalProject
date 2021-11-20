let menuList;

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

  // Saves values in itemNumber[] and quantity[]
  sessionStorage.setItem("itemNumber", JSON.stringify(itemNumber));
  sessionStorage.setItem("quantity", JSON.stringify(quantity));

  alert("Item added.");
}


function cartValidation() {
    if (itemNumber.length === 0) {
        alert('Add something to the cart first :)');
    }

    else {
        window.location.href = "../static/html/cart.html";
    }

    return false;
}


/**
 * getInfo() gathers the user inputs from 'checkout.html' 
 * and stores them to varibales
*/
function getInfo() {
  customerName = document.getElementById("firstName");
  customerEmail = document.getElementById("email");
  phone = document.getElementById("phone");
  address = document.getElementById("address");
  address2 = document.getElementById("address2");
  city = document.getElementById("city");
  state = document.getElementById("state");
  zipCode = document.getElementById("zip");
  cardName = document.getElementById("cc-name");
  cardNumber = document.getElementById("cc-number");
  cardExpiration = document.getElementById("cc-expiration");
  cvv = document.getElementById("cc-cvv");

  // Saves user input from 'checkout.html'
  sessionStorage.setItem("customerName", JSON.stringify(customerName.value));
  sessionStorage.setItem("customerEmail", JSON.stringify(customerEmail.value));
  sessionStorage.setItem("phone", JSON.stringify(phone.value));
  sessionStorage.setItem("address", JSON.stringify(address.value));
  sessionStorage.setItem("address2", JSON.stringify(address2.value));
  sessionStorage.setItem("city", JSON.stringify(city.value));
  sessionStorage.setItem("state", JSON.stringify(state.value));
  sessionStorage.setItem("zipCode", JSON.stringify(zipCode.value));
  sessionStorage.setItem("cardName", JSON.stringify(cardName.value));
  sessionStorage.setItem("cardNumber", JSON.stringify(cardNumber.value));
  sessionStorage.setItem("cardExpiration", JSON.stringify(cardExpiration.value));
  sessionStorage.setItem("cvv", JSON.stringify(cvv.value));


  if (customerName.checkValidity() && customerEmail.checkValidity() && address.checkValidity() &&
      cvv.checkValidity() && city.checkValidity() && state.checkValidity() && phone.checkValidity() &&
      zipCode.checkValidity() && cardName.checkValidity() && cardNumber.checkValidity() &&
      cardExpiration.checkValidity()) {
       window.location.href= "../html/receipt.html";

    }

  return false;
}

/**
 * displayCart() helps with printing the details in 
 * 'receipt.html'
*/
function displayCart() {

  // Gets the saved values from 'index.html'
  itemNumber = JSON.parse(sessionStorage.getItem("itemNumber"));
  quantity = JSON.parse(sessionStorage.getItem("quantity"));

  // Print variables for testing
  console.log(itemNumber);
  console.log(quantity);

  menuList = JSON.parse(sessionStorage.getItem("menuList"));

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

    // menuList = JSON.parse(m);
    menuList = JSON.parse(sessionStorage.getItem("menuList"));
    let currentDate = new Date();
    dateAndTime = (currentDate.getMonth() + 1).toString() + currentDate.getDate().toString() + currentDate.getFullYear().toString() +
                      currentDate.getHours().toString() + currentDate.getMinutes().toString();

    customerName =  JSON.parse(sessionStorage.getItem("customerName"));
    customerEmail = JSON.parse(sessionStorage.getItem("customerEmail"));
    address = JSON.parse(sessionStorage.getItem("address"));
    address2 = JSON.parse(sessionStorage.getItem("address2"));
    city = JSON.parse(sessionStorage.getItem("city"));
    state = JSON.parse(sessionStorage.getItem("state"));
    zipCode = JSON.parse(sessionStorage.getItem("zipCode"));
    cardName = JSON.parse(sessionStorage.getItem("cardName"));
    cardNumber = JSON.parse(sessionStorage.getItem("cardNumber"));
    cardExpiration = JSON.parse(sessionStorage.getItem("cardExpiration"));
    cvv = JSON.parse(sessionStorage.getItem("cvv"));
    phone = JSON.parse(sessionStorage.getItem("phone"));

    // Gets saved values from 'index.html'
    itemNumber = JSON.parse(sessionStorage.getItem("itemNumber"));
    quantity = JSON.parse(sessionStorage.getItem("quantity"));
    let subTotal = 0.0;

    for(let i = 0; i < itemNumber.length; i++) {
        subTotal += menuList['menu'][itemNumber[i]]['price'] * quantity[i];
    }
    tax = taxRate * subTotal;
    orderTotal = subTotal + tax;

    if (address2 !== "") {
        address2 = ", " + address2;

    }

    let orderInfo = {
        'customerName' : customerName,
        'customerEmail' : customerEmail,
        'address' : address + address2 + ', ' + city + ', ' + state + ', ' + zipCode,
        'cardName' : cardName,
        'cardNumber' : cardNumber,
        'cardExpiration' : cardExpiration,
        'cvv' : cvv,
        'phone' : phone,
        'subtotal' : subTotal.toFixed(2),
        'tax' : tax.toFixed(2),
        'orderTotal': orderTotal.toFixed(2),
        'dateAndTime' : dateAndTime,
        'itemNumber' : itemNumber,
        'quantity' : quantity
    }

    $.ajax({
      type:'POST',
      contentType: 'application/json',
      url:'/data/orderinformation',
      data: JSON.stringify(orderInfo),
      dataType: 'text',
      success: function(response) {
          // Print the address(es)
        let printAddress = document.getElementById('printAddr');

        if(address2 !== ''){
            address2 = address2.substring(1);
            printAddress.innerHTML = address + "," + "<br />" +
                                   address2 + ",";
        }
        else {
            printAddress.innerHTML = address + ",";
        }

        let printCity = document.getElementById('printCity');
        printCity.innerHTML = city + ', '+ state + ' ' + zipCode;

        // Creates orderNum based on the criteria outlined above
        let printOrderNumber = document.getElementById('printOrderNum');

        // the order number returned from backend POST response
        printOrderNumber.innerHTML = 'Order #: ' + response +  "<br />";

        let node = document.getElementById('orderList');

        for(let i = 0; i < itemNumber.length; i++) {
          let childNode = document.createElement('li');
          childNode.setAttribute('class','list-group-item');
          childNode.innerHTML = menuList['menu'][itemNumber[i]]['itemName'] + ' x ' + quantity [i] + ' - $' + (menuList['menu'][itemNumber[i]]['price'] * quantity[i]);
          node.appendChild(childNode);
        }

        let totalNode = document.getElementById('total');

          totalNode.innerHTML = "Subtotal: $" + subTotal.toFixed(2) + "<br />" +
                        "Tax: $" + tax.toFixed(2) + "\n" + "<br />" +
                        "Total: $" + orderTotal.toFixed(2);

      }
      });
}

function itemInfo() {
        $.ajax({
        type: "GET",
        url: 'http://127.0.0.1:5000/data/menu',
        dataType: 'json',

        success: function(response){
            menuList = response;
            sessionStorage.setItem("menuList", JSON.stringify(menuList));

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
     });
}
