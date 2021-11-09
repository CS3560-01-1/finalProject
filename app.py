from flask import Flask, render_template
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
def hello_world():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM menu;")
    rv = cur.fetchall()
    return str(rv)


# @app.route('/data')
# def hello_world2():
#     cur = mysql.connection.cursor()
#     cur.execute("INSERT INTO menu(ItemNumber, ItemName, Price) VALUES (10, "Ice Tes", 2.99);")
#     mysql.connection.commit()
#     cur.close()
#     return 'success'


@app.route('/')
def home():
    return render_template('index.html')


if __name__ == '__main__':
    app.run()
