const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Variable to collect employeeEntry arrays
let employeeData = [];

const collectInputs = async(inputs = []) => {
    // Array of questions for user input
    const prompts = [{
            type: 'input',
            name: 'name',
            message: "What is the employees name?",
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is their employee id?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the employees email address?',
        },
        {
            type: 'list',
            message: 'What role is the employee in?',
            name: 'role',
            choices: ['Manager', 'Engineer', 'Intern'],
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'What is the Managers office number?',
            when: function(answers) {
                // Only run if user answered Manager to the Role prompt
                return answers.role === "Manager";
            },
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is the Engineers GitHub Username?',
            when: function(answers) {
                // Only run if user answered Engineer to the Role prompt
                return answers.role === "Engineer";
            },
        },
        {
            type: 'input',
            name: 'school',
            message: 'What school does the Intern go to?',
            when: function(answers) {
                // Only run if user answered Intern to the Role prompt
                return answers.role === "Intern";
            },
        },
        {
            type: 'confirm',
            name: 'employee',
            message: 'Would you like to enter another employee?',
            default: true,
        }
    ];

    const { employee, ...answers } = await inquirer.prompt(prompts);
    const newInputs = [...inputs, answers];
    return employee ? collectInputs(newInputs) : newInputs;
};

const main = async() => {
    const inputs = await collectInputs();

    inputs.forEach(myFunction);

    function myFunction(employeeEntry) {
        switch (employeeEntry.role) {
            case "Manager":
                let tempManager = new Manager(employeeEntry.name, employeeEntry.id, employeeEntry.email, employeeEntry.officeNumber);
                employeeData.push(tempManager);
                break;
            case "Engineer":
                let tempEngineer = new Engineer(employeeEntry.name, employeeEntry.id, employeeEntry.email, employeeEntry.github);
                employeeData.push(tempEngineer);
                break;
            case "Intern":
                let tempIntern = new Intern(employeeEntry.name, employeeEntry.id, employeeEntry.email, employeeEntry.school);
                employeeData.push(tempIntern);
                break;
        }
    }

    // Function to write team.html file
    fs.writeFile(outputPath, render(employeeData), (err) =>
        err ? console.log(err) : console.log('Your team page has been generated!')
    );
};

main();