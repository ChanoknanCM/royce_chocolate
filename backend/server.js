var express = require("express");
var cors = require("cors");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678910",
  database: "login",
});
console.log(connection);
var app = express();
app.use(cors());
app.use(express.json());

app.get("/user", (req, res) => {
  connection.query("SELECT * FROM login.user;", (error, result) => {
    if (error) {
      return res.status(500).json(error);
    }
    return res.status(200).json(result);
  });
});



app.get("/user/:id", (req, res) => {
  const {id} = req.params
  connection.query("SELECT * FROM login.user WHERE `user`.id = ? ;",[parseInt(id)] ,(error, result) => {
    if (error) {
      return res.status(500).json(error);
    }
    return res.status(200).json(result[0]);
  });
});

app.get("/order/:id", (req, res) => {
  const {id} = req.params
  connection.query("SELECT * FROM orders  WHERE orders.user_id = ? ORDER BY order_id DESC LIMIT 1",[parseInt(id)] ,(error, result) => {
    if (error) {
      return res.status(500).json(error);
    }
    return res.status(200).json(result[0]);
  });
});


app.post("/product/receipt", (req, res) => {
  const user_id = req.body.id;
  connection.query(
    "SELECT * FROM orders  WHERE orders.user_id = ? ORDER BY order_id DESC LIMIT 1",
    [parseInt(user_id)],
    (error, result) => {
      console.log(result);
      const receipt_id = result[0]?.order_id;
      connection.query(
        "SELECT * FROM orders INNER JOIN order_items ON orders.order_id = order_items.order_id INNER JOIN product ON product.id = order_items.product_id INNER JOIN `user` ON orders.user_id = `user`.id where `user`.id = ? and orders.order_id = ?",
        [parseInt(user_id), parseInt(receipt_id)],
        (error, result) => {
          return res.status(200).json(result);
        }
      );
    }
  );
});

app.post("/product/payment", (req, res) => {
  const product = req.body;
  console.log(product);
  const total_price_order = product.cart.reduce((a, b) => a + b.total, 0);
  console.log(total_price_order);
  const datenow = new Date();
  const cart = product.cart;
  try {
    connection.query(
      "INSERT INTO `login`.`orders` (`user_id`, `total_amount`,`dateNow`) VALUES (?, ?, ?);",
      [parseInt(product.id), total_price_order, datenow],
      async (error, result) => {
        if (error) {
          return res.status(500).json(error);
        }
        try {
          const order_id = result.insertId;
          for (const item of cart) {
            console.log(item);
            const result_order = connection.query(
              "INSERT INTO `login`.`order_items` (`order_id`, `product_id`, `order_quantity`, `price`) VALUES (?, ?, ?, ?);",
              [
                order_id,
                parseInt(item.id),
                parseInt(item.amount),
                parseInt(item.product_price),
              ],
              async (error, result) => {
                console.log("start insert");
                if (error) {
                  console.log(error);
                  return res.status(500).json(error);
                }
                console.log(result);
              }
            );
          }
          return res.status(200).json("order items added");
        } catch (innerErr) {
          console.log(innerErr);
          return res.status(400).json("Errorrrrr");
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json("errrrrrrrrrrrrrrrrr");
  }

  //  for(const product of product){
  // connection.query(
  //   "INSERT INTO `login`.`user` (`username`, `firsname`, `password`, `telephone`, `address`) VALUES (?,?,?,?,?);",
  //   [username, firsname, password, telephone, address],
  //   (error, result) => {
  //     if (error) {
  //       return res.status(500).json(error);
  //     }
  //     console.log(result);
  //     return res.status(200).json(result);
  //   }
  // );

  //  }
});

app.post("/user/login", (req, res) => {
  const { username, password } = req.body;
  connection.query(
    "SELECT * FROM user WHERE username = ? AND password = ?",
    [username, password],
    (error, result) => {
      if (error) {
        return res.status(500).json(error);
      }

      if (result.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      return res.status(200).json(result);
    }
  );
});

app.get("/product/list", (req, res) => {
  connection.query("SELECT * FROM product ", (error, result) => {
    if (error) {
      return res.status(500).json(error);
    }
    // User found, successful login
    return res.status(200).json(result);
  });
});

app.post("/user/insert", (req, res) => {
  const username = req.body.username;
  const firsname = req.body.firsname;
  const password = req.body.password;
  const telephone = req.body.telephone;
  const address = req.body.address;

  connection.query(
    "INSERT INTO `login`.`user` (`username`, `firsname`, `password`, `telephone`, `address`) VALUES (?,?,?,?,?);",
    [username, firsname, password, telephone, address],
    (error, result) => {
      if (error) {
        return res.status(500).json(error);
      }
      console.log(result);
      return res.status(200).json(result);
    }
  );
});
app.put("/user/update", (req, res) => {
  const username = req.body.username;
  const firsname = req.body.firsname;
  const password = req.body.password;
  const telephone = req.body.telephone;
  const address = req.body.address;
  const id = parseInt(req.body.id);
  connection.query(
    "UPDATE `login`.`user` SET username = ?, firsname = ?, password = ?, telephone = ?, address = ? WHERE (id = ?);",
    [username, firsname, password, telephone, address, id],
    (error, result) => {
      if (error) {
        return res.status(500).json(error);
      }
      console.log(result);
      return res.status(200).json(result);
    }
  );
});

app.post("/user/delete", (req, res) => {
  const id = parseInt(req.body.id);
  connection.query(
    "DELETE FROM `login`.`user` WHERE (id = ?);",
    [id],
    (error, result) => {
      if (error) {
        return res.status(500).json(error);
      }
      console.log(result);
      return res.status(200).json(result);
    }
  );
});

app.listen(5000, function () {
  console.log("CORS-enabled web server listening on port 5000");
});
