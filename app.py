from flask import Flask, render_template, request, redirect
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
    for i in range(0, len(rv)):
        for j in range(0, len(rv[i])):
            inner_dict[name_dict[j]] = rv[i][j]
        item_list.append(inner_dict)
        inner_dict = {}
    json_menu = {"menu": item_list}
    return json_menu


@app.route('/data/orderinformation', methods=['POST'])
def orderInfo2db():
    data = request.json
    cur = mysql.connection.cursor()
    cur.execute(
        "INSERT INTO customerinformation(customerEmail, customerName, phone, address) VALUES (%s, %s, %s, %s)",
        (data['customerEmail'], data['customerName'], data['phone'], data['address'])
    )
    cur.execute(
        "INSERT INTO orderinformation(orderNumber, subtotal, tax, orderTotal, customerEmail, dateAndTime) "
        "VALUES (%s, %s, %s, %s, %s, %s)",
        (data['orderNumber'], float(data['subtotal']), float(data['tax']), float(data['orderTotal']),
         data['customerEmail'], data['dateAndTime'])
    )
    for i in range(len(data["itemNumber"])):
        cur.execute(
            "INSERT INTO orderitem(orderNumber, itemNumber, quantity) VALUES (%s, %s, %s)",
            (data['orderNumber'], int(data["itemNumber"][i]), int(data["quantity"][i]))
        )
    cur.execute(
        "INSERT INTO cardinformation(customerEmail, cardNumber, cardExpiration, cvv) VALUES (%s, %s, %s, %s)",
        (data['customerEmail'], data['cardNumber'], data['cardExpiration'], data['cvv'])
    )
    mysql.connection.commit()
    cur.close()
    return 'success'


@app.route('/')
def home():
    return render_template('index.html')


if __name__ == '__main__':
    app.run()
