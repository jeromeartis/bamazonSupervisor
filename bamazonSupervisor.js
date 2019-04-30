let mysql = require('mysql')
let inquire = require('inquirer')



let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
})

function start() {
  console.log('----------------')
  console.log('Bamazon Supervisor')
  console.log('----------------\n')
  inquire
  .prompt([{
      type: 'list',
      message: 'Select from list below what action you would like to complete.',
      choices: ['Create New Department','View Product Sales by Department'],
      name: "action"
  }
]).then(function (response) {
      switch (response.action) {
          case 'View Product Sales by Department':
              viewProductsBYDept();
              break;

          case 'Create New Department':
              createNewDepartment();
              break;
      }
  }).catch(function (error) {
      throw error;
  });
  connection.query('SELECT department_name FROM products', function (err,res){
    console.table(res)
  });
}

function viewProductsBYDept() {

       inquire
       .prompt([
         {
           type: 'input',
           message: 'Enter Department Name:',
           name: 'action'
       }
     ]).then(function (response) {

        departName = response.action
         console.log(response.action);

        connection.query(`SELECT * FROM products WHERE department_name = "${departName}"`, function (err, res) {
                console.table(res)
                totalProfit();

        })
})
}

function totalProfit (){

  connection.query(`SELECT departments.department_id, departments.department_name, departments.over_head_costs,products.product_sales FROM bamazon.products left join departments on products.item_id = departments.department_id WHERE departments.department_name = "${departName}"`, function (err, res) {

          for (let i = 0; i < res.length; i++){
            console.log("*******************************")
            let totalProfit = Number(res[i].over_head_costs)+ Number(res[i].product_sales)
            // console.table(res[i].over_head_costs);
            // console.table(res[i].product_sales);
            console.log(`TOTAL PROFIT: ${totalProfit}`)
            console.log("*******************************")
        }
});

}
function createNewDepartment() {
  inquire
  .prompt([
    {
      type: 'input',
      message:'Enter New Department name',
      name: 'action'
    }
  ]).then(function(response){
    let input = response.action
    console.log(input)
    connection.query("SELECT products.department_name FROM products ", function (error, res) {
        console.log(`Hellkadjlkaj:${res[0].department_name}`)
        for (i in res) {
          for (j in res[i].department_name){
          if(j === res[i].department_name){
          console.log("Update")
        }
      }
          }
        })
    })
  }



start();
