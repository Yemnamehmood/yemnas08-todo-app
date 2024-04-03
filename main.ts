#! /usr/bin/env node 
import inquirer from "inquirer";
//Making Todo List 

let todos: string[] = [];

async function main() {
    let condition = true;
    while (condition) {
        let choice = await inquirer.prompt<{
            option: string;
        }>([
            {
                name: "option",
                type: "list",
                message: "What action would you like to do?",
                choices: ["Add", "View", "Read", "Update", "Delete", "Exit"]
            }
        ]);

        switch (choice.option) {
            case "Add":
                await addTask();
                break;
            case "View":
                viewTasks();
                break;
            case "Read":
                await readTask();
                break;
            case "Update":
                await updateTask();
                break;
            case "Delete":
                await deleteTask();
                break;
            case "Exit":
                condition = false;
                break;
        }
    }
}

async function addTask() {
    let task = await inquirer.prompt<{ todo: string }>([
        {
            name: "todo",
            type: "input",
            message: "What task do you want to add to your todos?"
        }
    ]);
    todos.push(task.todo);
    console.log("Task added successfully!");
}

function viewTasks() {
    if (todos.length === 0) {
        console.log("No tasks in your todos.");
    } else {
        console.log("Your todos:");
        todos.forEach(todo => {
            console.log(todo);
        });
    }
}

async function readTask() {
    if (todos.length === 0) {
        console.log("No tasks to read.");
        return;
    }

    let taskToRead = await inquirer.prompt<{ todo: string }>([
        {
            name: "todo",
            type: "list",
            message: "Which task would you like to read?",
            choices: todos
        }
    ]);

    console.log(`Selected task: ${taskToRead.todo}`);
}

async function updateTask() {
    if (todos.length === 0) {
        console.log("No tasks to update.");
        return;
    }

    let taskToUpdate = await inquirer.prompt<{ todo: string }>([
        {
            name: "todo",
            type: "list",
            message: "Which task would you like to update?",
            choices: todos
        }
    ]);

    let newTask = await inquirer.prompt<{ newTodo: string }>([
        {
            name: "newTodo",
            type: "input",
            message: "Enter the updated task:"
        }
    ]);

    let index = todos.indexOf(taskToUpdate.todo);
    todos[index] = newTask.newTodo;
    console.log("Task updated successfully!");
}

async function deleteTask() {
    if (todos.length === 0) {
        console.log("No tasks to delete.");
        return;
    }

    let taskToDelete = await inquirer.prompt<{ todo: string }>([
        {
            name: "todo",
            type: "list",
            message: "Which task would you like to delete?",
            choices: todos
        }
    ]);

    todos = todos.filter(todo => todo !== taskToDelete.todo);
    console.log("Task deleted successfully!");
}

main();

