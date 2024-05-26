// selecao de elementos
const todoForm = document.querySelector('#todo-form')
const todoInput = document.querySelector('#todo-text')
const todoList = document.querySelector('#todo-list')
const editForm = document.querySelector('#edit-form')
const editInput = document.querySelector('#edit-input')
const cancelEditbtn = document.querySelector('#cancel-edit-btn')
let oldInputElement;

// eventos
todoForm.addEventListener("submit", (e)=> {
    e.preventDefault();

    const inputValue = todoInput.value

    if (inputValue) {
        saveTodo(inputValue)
    }

    document.addEventListener('click', (a)=>{
        const targetEl = a.target
        const parentalEl = targetEl.closest("div");
        let todoTitle;

        if (parentalEl && parentalEl.querySelector('h3')) {
            todoTitle = parentalEl.querySelector('h3').innerText;
        }

        if(targetEl.classList.contains('finish-todo')) {
            parentalEl.classList.toggle('done')
        }

        if(targetEl.classList.contains('delet-todo')){
            parentalEl.remove();
        }

        if(targetEl.classList.contains('edit-todo')){
            toggleForms();

            editInput.value = todoTitle
            oldInputElement = todoTitle
        }
        cancelEditbtn.addEventListener('click', (e) => {
            e.preventDefault();

            toggleForms();
        })
    })
    editForm.addEventListener('submit', (a) =>{
        a.preventDefault();

        const editInputValue = editInput.value

        if (editInputValue) {
            updateTodo(editInputValue)
        }

        toggleForms();
    })
})
// funcao
const saveTodo = (text) => {
    const todo = document.createElement('div');
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3")
    todoTitle.innerText = text;
    todo.appendChild(todoTitle)  

    const donebtn = document.createElement("button")
    donebtn.classList.add("finish-todo")
    donebtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(donebtn)

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    const deletBtn = document.createElement("button")
    deletBtn.classList.add("delet-todo")
    deletBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deletBtn)

    todoList.appendChild(todo)

    todoInput.value = "";
    todoInput.focus();
}

const toggleForms = () => {
    editForm.classList.toggle('hide')
    todoForm.classList.toggle('hide')
    todoList.classList.toggle('hide')
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll('.todo')

    todos.forEach((todo) =>{
        let todoTitle = todo.querySelector('h3')

        console.log(todoTitle, text)

        if (todoTitle.innerText === oldInputElement) {
            todoTitle.innerText = text
        }
    })
}

