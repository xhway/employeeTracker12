const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees_db'
},
console.log(`Connected to the employees_db database.`)
);
connection.connect(function(err){
    if (err) throw err;
    options();
})

function options(){
    inquirer
    .prompt({
        name: 'action',
        type: 'list',
        message: 'Welcome to the employee database. What would you like to do?',
        choices: [
            'View all employees',
            'View all departments',
            'View all roles',
            'Add an employee',
            'Add a department',
            'Add a role', 
            'Update employee role',
            'Delete an employee',
            'EXIT'
        ]
    }).then(function (answer){
        switch(answer.action){
            case 'View all employees':
                viewEmployees();
                break;
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Update employee role':
                updateEmployee();
                break;     
            case 'Delete an employee':
                deleteEmployee();
                break;
            case 'EXIT':
                exitApp();
               default:
                break;      
        }
    })
};
//View all of the employees in the DB
function viewEmployees(){
    const query = 'SELECT * FROM employee';
    connection.query(query, function(err, res){
        if(err)throw err;
        console.log(res.length + 'employees found');
        console.table('All Employees', res);
        options();
    })
};

//View all departements in the DB
function viewDepartments(){
    const query = 'SELECT * FROM department';
    connection.query(query, function(err,res){
        if(err)throw err;
        console.table('All Departments', res);
        options();
    })
};
//View all roles in the DB
function viewRoles(){
    const query = 'SELECT * FROM role';
    connection.query(query, function(err,res){
        if(err)throw err;
        console.table('All roles', res);
        options();
    })
};
//Add an employee to the DB
function addEmployee(){
    connection.query('SELECT * FROM role', function (err, res){
        if(err)throw err;
        inquirer
            .prompt([
                {
                    name: 'first_name',
                    type: 'input',
                    message: " What is the employee's first name? ",
                },
                {
                    name : 'last_name',
                    type: 'input',
                    message: " What is the employee's last name?"
                },
                {
                    name: 'manager_id',
                    type: 'input',
                    message: "What is the employee's manager's ID?"
                },
                {
                    name: 'role',
                    type: 'list',
                    choices: function(){
                        let roleArray = [];
                        for (let i = 0; i< res.length; i++){
                            roleArray.push(res[i].title);
                        }
                        return roleArray;
                    },
                    message:"What is the employee's role? "
                }
            ]).then(function (answer){
                let role_id;
                for (let a = 0; a < res.length; a++){
                    if (res[a].title == answer.role){
                        role_id = res[a].id;
                        console.log(role_id)
                    }
                    
                }
                connection.query(
                    'INSERT INTO employee SET ?',
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        manager_id: answer.manger_id,
                        role_id: role_id,
                    },
                    function (err){
                        if (err)throw err;
                        console.log('Your employee has been added.');
                        options();
                    })
                
            })
    })
};
//Add department to the DB
function addDepartment(){
    inquirer
        .prompt([
            {
                name: 'newDepartment',
                type:'input',
                message: 'Which department would you like to add?'
            }
        ]).then(function (answer){
            connection.query(
                'INSERT INTO department SET ?',
                {
                    name: answer.newDepartment
                });
            const query = 'SELECT * FROM department';
            connection.query(query, function(err, res){
                if(err)throw err;
                console.log('Your department has been added.');
                console.table('All Departments', res);
                options();
            })
        })
};
//Adding role to the DB
function addRole(){
    connection.query(' SELECT * FROM department', function(err, res){
        if(err)throw err;

        inquirer
        .prompt([
           { name: 'new_role',
            type: 'input',
            message:" What new role would you like to add?"
        },
            {
                name: 'salary',
                type: 'input',
                message: "What is the salary of this role? (enter a number)"
        },
        {
            name: 'Department',
            type: 'list',
            choices: function(){
                let deptArray = [];
                for (let i = 0; i < res.length; i++){
                    deptArray.push(res[i].name);
                }
                return deptArray;
            },
        }
        ]).then(function(answer){
            let department_id;
            for (let a = 0; a < res.length; a++) {
                if (res[a].name == answer.Department) {
                    department_id = res[a].id;
                }
            }
            connection.query(
                'INSERT INTO role SET ?',
                {
                    title: answer.new_role,
                    salary: answer.salary,
                    department_id: department_id
                },
                function(err,res){
                    if(err)throw err;
                    console.log('Your new role hase been added.');
                    console.table('All Roles', res);
                    options();
                })
            
        })
    })
};
//Update role in DB
function updateRole(){

};
//Delete employee from DB
function deleteEmployee(){

};
//Exit app
function exitApp(){
    connection.end();
};