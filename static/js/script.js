let menuList;

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
