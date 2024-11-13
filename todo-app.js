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
      const  todoItem = createTodo(todo,todoIndex);
        todoList.append(todoItem);
    })
}

function createTodo(todo, todoIndex){
    const inputTodos = document.createElement("li");
    const todoText = todo.text;
    const todoID = "todo-" + todoIndex;
    inputTodos.className = "todo";
    inputTodos.innerHTML = `
        <div class="todo-content">
            <input type="checkbox" id="${todoID}">
                   
                        
                    <label for="${todoID}" class="todo-text">
                        ${todoText}
                    </label>
            </div>

            <button class="delete-todo">
                 <svg fill="#4A4D57" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" 
                     fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
             </button>
        
    `
    const deleteButton = inputTodos.querySelector('.delete-todo');
    deleteButton.addEventListener("click",() =>{
        deleteTodo(todoIndex);
    })
    const checkbox = inputTodos.querySelector("input[type='checkbox']");
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