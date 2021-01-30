const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// Array of questions for user input
const questions = [{
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
        name: 'Role',
        choices: ['Manager', 'Engineer', 'Intern'],
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: 'What is the Managers office number?',
        when: function(answers) {
            // Only run if user answered Manager to the Role prompt
            return answers.Role === "Manager";
        },
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is the Engineers GitHub Username?',
        when: function(answers) {
            // Only run if user answered Engineer to the Role prompt
            return answers.Role === "Engineer";
        },
    },
    {
        type: 'input',
        name: 'school',
        message: 'What school does the Intern go to?',
        when: function(answers) {
            // Only run if user answered Intern to the Role prompt
            return answers.Role === "Intern";
        },
    },
    {
        type: 'confirm',
        message: 'Would you like to enter another employee?',
        name: 'Employee',
        default: true,
    },
];

// Function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) =>
        err ? console.log(err) : console.log('README Generated!')
    );
}

// Function to initialize app
function init() {
    inquirer
        .prompt(questions)
        .then((data) => {
            //writeToFile('README.md', generateMarkdown(data))
        });
}

// Function call to initialize app
// init();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```


const collectInputs = async(inputs = []) => {
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
    console.log(inputs);
};

main();