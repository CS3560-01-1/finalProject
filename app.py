from flask import Flask, render_template, request
from flask_mysqldb import MySQL
import yaml

app = Flask(__name__, static_folder="")

db = yaml.safe_load(open('db.yaml'))

app.config['MYSQL_HOST'] = db['MYSQL_HOST']
app.config['MYSQL_USER'] = db['MYSQL_USER']
app.config['MYSQL_PASSWORD'] = db['MYSQL_PASSWORD']
app.config['MYSQL_DB'] = db['MYSQL_DB']

mysql = MySQL(app)


@app.route('/data/menu')
def menu():
    # connect to mysql database
    cur = mysql.connection.cursor()
    # execute sql statement
    cur.execute("SELECT * FROM menu;")
    # fetch all the information
    rv = cur.fetchall()
    name_dict = {0: "itemNumber", 1: "itemName", 2: "price"}
    inner_dict = {}
    item_list = []
    # convert the dataset to json format
    for i in range(len(rv)):
        for j in range(len(rv[i])):
            inner_dict[name_dict[j]] = rv[i][j]
        item_list.append(inner_dict)
        inner_dict = {}
    json_menu = {"menu": item_list}
    return json_menu


@app.route('/data/orderinformation', methods=['POST'])
def orderInfo2db():
    data = request.json
    cur = mysql.connection.cursor()
    cur.execute("SELECT orderNumber FROM orderinformation;")
    rv = cur.fetchall()

    if len(rv) == 0:
        order_number = "1"
    else:
        print(rv)
        order_number = str(int(rv[len(rv) - 1][0]) + 1)

    cur.execute(
        "INSERT INTO orderinformation(orderNumber, subtotal, tax, orderTotal, dateAndTime) "
        "VALUES (%s, %s, %s, %s, %s)",
        (int(order_number), float(data['subtotal']), float(data['tax']), float(data['orderTotal']),
         data['dateAndTime'])
    )

    cur.execute(
        "INSERT INTO customerinformation(orderNumber, customerEmail, customerName, phone, address) "
        "VALUES (%s,%s, %s, %s, %s)",
        (int(order_number), data['customerEmail'], data['customerName'], data['phone'], data['address'])
    )
    for i in range(len(data["itemNumber"])):
        cur.execute(
            "INSERT INTO orderitem(orderNumber, itemNumber, quantity) VALUES (%s, %s, %s)",
            (int(order_number), int(data["itemNumber"][i]), int(data["quantity"][i]))
        )
    cur.execute(
        "INSERT INTO cardinformation(orderNumber, cardNumber, cardExpiration, cvv) VALUES (%s, %s, %s, %s)",
        (int(order_number), data['cardNumber'], data['cardExpiration'], data['cvv'])
    )
    mysql.connection.commit()
    cur.close()
    return order_number


@app.route('/')
def home():
    return render_template('index.html')


if __name__ == '__main__':
    app.run()
