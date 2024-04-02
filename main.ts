#! /usr/bin/env node 
import inquirer from "inquirer";

let todos: string[] = [];

async function main() {
    let condition = true;
    while (condition) {
        let addTask = await inquirer.prompt<{
            todo: string;
            addmore: boolean;
        }>([
            {
                name: "todo",
                type: "input",
                message: "What Do You Want To Add In Your Todos?"
            },
            {
                name: "addmore",
                type: "confirm",
                message: "Do You Want To Add More?",
                default: false
            }
        ]);

        todos.push(addTask.todo);

        if (!addTask.addmore) {
            condition = false;
        }
    }

    console.log("Your todos:");
    todos.forEach(todo => {
        console.log(todo);
    });
}

main();
