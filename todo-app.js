const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

let todoArray = getTodo();
console.log(todoArray);
updateTodoList();

todoForm.addEventListener('submit' , function(e){
    e.preventDefault();
    addTodo();
});

function addTodo(){
    const todoText = todoInput.value.trim();
    if(todoText.length > 0){

        const todoObject = {
            text: todoText,
            complete: false
        }
        todoArray.push(todoObject);
        
        createTodo(todoText);
        updateTodoList();
        saveTodo();
        todoInput.value = "";
    }else{
        alert("Please Enter a Task");
    }
}

function updateTodoList(){
    todoList.innerHTML = "";
    todoArray.forEach((todo, todoIndex) =>{
        todoItem = createTodo(todo,todoIndex);
        todoList.append(todoItem);
    })
}

function createTodo(todo, todoIndex){
    const inputTodos = document.createElement("li");
    const todoText = todo.text;
    const todoID = "todo-" + todoIndex;
    inputTodos.className = "todo";
    inputTodos.innerHTML = `
            <input type="checkbox" id="${todoID}">
                    <label class="custom-checkbox" for="${todoID}">
                        <svg fill ="transparent" xmlns="http://www.w3.org/2000/svg" 
                        height="24px" viewBox="0 -960 960 960" 
                        width="24px" fill="#e8eaed">
                        <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                    </label>
                    <label for="${todoID}" class="todo-text">
                        ${todoText}
                    </label>
                    <button class="delete-todo">
                        <svg fill="#4A4D57" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" 
                        fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                    </button>

    `
    const deleteButton = inputTodos.querySelector('.delete-todo');
    deleteButton.addEventListener("click",() =>{
        deleteTodo(todoIndex);
    })
    const checkbox = inputTodos.querySelector("input");
    checkbox.addEventListener("change", ()=>{
        todoArray[todoIndex].complete = checkbox.checked;
        saveTodo();
    })
    checkbox.checked = todo.complete;
    return inputTodos;
}

function saveTodo() {
    const todoJSON = JSON.stringify(todoArray);
    localStorage.setItem("todos", todoJSON);
}

function getTodo(){
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}

function deleteTodo(todoIndex){
 todoArray.splice(todoIndex, 1);
    saveTodo();
    updateTodoList();
}