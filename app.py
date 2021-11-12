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
    for i in range(0, len(rv)):
        for j in range(0, len(rv[i])):
            inner_dict[name_dict[j]] = rv[i][j]
        item_list.append(inner_dict)
        inner_dict = {}
    json_menu = {"menu": item_list}
    return json_menu


# @app.route('/data')
# def hello_world2():
#     cur = mysql.connection.cursor()
#     cur.execute("INSERT INTO restaurant.menu(ItemNumber, ItemName, Price) VALUES (10, 'IceTes', 2.99);")
#     mysql.connection.commit()
#     cur.close()
#     return 'success'


@app.route('/')
def home():
    return render_template('index.html')


if __name__ == '__main__':
    app.run()
