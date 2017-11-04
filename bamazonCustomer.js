var Table = require("cli-table2");
var inquirer = require("inquirer");
var mysql = require("mysql");

// make a table that you can see in node using cli-table2
var table = new Table({
  chars: {
    'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
    , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
    , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
    , 'right': '║', 'right-mid': '╢', 'middle': '│'
  }
});

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("\nThis is Bamazon. There are products you can then browse and then purchase. Please proceed.\n");
  connectionSuccess();
});

function connectionSuccess() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    table.push(
      ["Product ID", "Product Name", "Price/Unit ($)", "Units Remaining"]
    );

        var productData = [];
    
        for (var i = 0; i < res.length; i++) {
    
          productData = [];
    
          productData.push(res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity);
    
          table.push(productData);
    }

    console.log(table.toString());
    purchase(res);
  });
}
function purchase(firstResponse) {
  inquirer.prompt([
    {
      type: "input",
      message: "Please input PRODUCT ID for item you wish to purchase.",
      name: "purchaseID"
    },
    {
      type: "input",
      message: "How many units are you interested in?",
      name: "howManyUnits"
    }
  ]).then(function (response) {
    var ID = response.purchaseID;
    var units = response.howManyUnits;

    connection.query("SELECT stock_quantity FROM products WHERE item_id=" + ID, function (err, res) {
      if (err) throw err;
  
        if(units <= res[0].stock_quantity){
  
          var newStock = res[0].stock_quantity - units;
          var price = firstResponse[(ID - 1)].price;
  
          updateNewStock(newStock,ID,price,units);
        }
      else{
        console.log("There is not enough of that product to purchase. Goodbye.");
        connection.end();
      }
    });
  })
}

function updateNewStock(newStock,ID, price, units){
  connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [newStock, ID], function (err, res) {
    if (err) throw err;
    var userTotal = price * units;
    console.log("Total due: $" + userTotal);
    connection.end();
  });
}