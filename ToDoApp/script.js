const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let editTodo = null;

// Function to add a todo
const addTodo = () => {
    const inputText = inputBox.value.trim();

    if (validateInput(inputText)) {
        if (editTodo) {
            editTodo.previousElementSibling.textContent = inputText;
            addBtn.textContent = "Add";
            editTodo = null;
        } else {
            createTodoElement(inputText);
        }

        inputBox.value = "";
        saveLocalTodos(inputText);
    }
}

// Function to validate input
const validateInput = (text) => {
    if (text.length === 0) {
        alert("You must write something in your to-do.");
        return false;
    }
    return true;
}

// Function to create a new todo element
const createTodoElement = (text) => {
    const li = document.createElement("li");

    // Creating p tag
    const p = document.createElement("p");
    p.textContent = text;
    li.appendChild(p);

    // Creating Edit Btn
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("btn", "editBtn");
    li.appendChild(editBtn);

    // Creating Delete Btn
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remove";
    deleteBtn.classList.add("btn", "deleteBtn");
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
}

// Function to handle task editing and deletion
const updateTodo = (e) => {
    if (e.target.classList.contains("deleteBtn")) {
        const taskItem = e.target.parentElement;
        todoList.removeChild(taskItem);
        deleteLocalTodos(taskItem.querySelector("p").textContent);
    }

    if (e.target.classList.contains("editBtn")) {
        const taskItem = e.target.parentElement;
        inputBox.value = taskItem.querySelector("p").textContent;
        inputBox.focus();
        addBtn.textContent = "Edit";
        editTodo = e.target;
    }
}

// Function to save local todo
const saveLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to get local todo
const getLocalTodos = () => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {
            createTodoElement(todo);
        });
    }
}

// Function to delete local todo
const deleteLocalTodos = (todoText) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    let todoIndex = todos.indexOf(todoText);
    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);

