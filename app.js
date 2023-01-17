const todoInput = document.querySelector('.new-todo');
const listTodo = document.querySelector('.list');
const countTodo = document.querySelector('.count-left');
const btnArrow = document.querySelector('.checkbox-todo');
const filterAll = document.querySelector('#all');
const filterActive = document.querySelector('#active');
const filterCompleted = document.querySelector('#completed');
const clearCompleted = document.querySelector('.clear-completed')


//Массив куда я сохраняю данные 
let tasks = [];
//LocalStorage
function saveLocalStorage() {
    localStorage.setItem('todosList', JSON.stringify(tasks));
}
if (localStorage.getItem('todosList')) {
    tasks = JSON.parse(localStorage.getItem('todosList'));
    addTodo();
}
// Счетчик 
function countNumberLeft () {
    let count = 0;
    let taskItemList = listTodo.querySelectorAll('li');
    taskItemList.forEach(todo => {
    if (!todo.classList.contains('completed')) {
        count++
    }
    })
    countTodo.innerHTML = count
    saveLocalStorage();
}

//Разметка задачи
function addTodo () {
    let message = '';
    if (tasks) {
        tasks.forEach(function(todo, id) {
            let isCompleted = todo.completed == false ?  ''  : 'completed checked';

                message += `
                <li id='${todo.id}' class='${isCompleted}'>
                  <div class='view'>
                    <input data-action='completed' class='toggle' type='checkbox' ${isCompleted}>
                    <label>${todo.title}</label>
                    <button type='button' data-action='delete' class='destroy'></button>
                    </div> 
                    </li>`;
            listTodo.innerHTML = message;
            
        })
    }
    countNumberLeft(); 
    saveLocalStorage(); 
}

//Добавление задачи
todoInput.addEventListener('keyup', function (e) {
 if (e.keyCode === 13) {
    if(!todoInput.value) return;
    e.preventDefault();
    let taskInfo = {
        id: Date.now(),
        completed: false,
        title: todoInput.value
    }
    tasks.push(taskInfo);
    todoInput.value = ''
    addTodo();
    saveLocalStorage();
    
 }
 countNumberLeft (); 
});
//Удаление задачи
listTodo.addEventListener('click', function(e){
    if(e.target.dataset.action === 'delete') {
        deleteTask(e);
        saveLocalStorage();
    }
});
function deleteTask (e) { 
const btnTaskDelete = e.target.closest('li');
const index = tasks.findIndex(function(todo) {
  if (todo.id === Number(btnTaskDelete.id)) {
    return true
}
})
tasks.splice(index, 1)
btnTaskDelete.remove();
countNumberLeft ()
}
//Удаление через ClearCompleted 
clearCompleted.onclick = function () {
    const taskItem = listTodo.querySelectorAll('li');
    taskItem.forEach(todo => {
        if (todo.classList.contains('completed')) {
            todo.parentNode.removeChild(todo);
            tasks.splice(todo, 1)
            saveLocalStorage();
        };
        countNumberLeft(); 
    });
}


//Отметка задач 
listTodo.addEventListener('click', function (e) {
if (e.target.dataset.action === 'completed') {
completedTask(e);
saveLocalStorage();
}
});
function completedTask (e) {
    const btnCompletedTask = e.target.closest('li');
    btnCompletedTask.classList.toggle('completed')
    
    const indexTask = tasks.find(function (todo) {
        if (todo.id === Number(btnCompletedTask.id)){
            return true
        }
    })
    saveLocalStorage();
    indexTask.completed = !indexTask.completed
    countNumberLeft ()
}

//Отметка всех задач




//Стрелка если все задача completed

// Фильтрация 
filterAll.onclick = function filterAllTask () {
    const taskItem = listTodo.querySelectorAll('li');
    taskItem.forEach(todo => {
     todo.style.display = 'block'
    });
    filterActive.classList.remove('selected');
    filterAll.classList.add('selected');
    filterCompleted.classList.remove('selected');
   
}

filterActive.onclick = function filterActiveTask () {
    const taskItem = listTodo.querySelectorAll('li');
    taskItem.forEach(todo => {
     todo.style.display = 'block'
     if (todo.classList.contains('completed')) {
        todo.style.display = 'none'
     }
    });
    filterActive.classList.add('selected');
    filterAll.classList.remove('selected');
    filterCompleted.classList.remove('selected');
  
    
}

filterCompleted.onclick = function filterCompletedTask () {
    const taskItem = listTodo.querySelectorAll('li');
    taskItem.forEach(todo => {
     todo.style.display = 'block'
     if (!todo.classList.contains('completed')) {
        todo.style.display = 'none'
     }
    });
    filterActive.classList.remove('selected');
    filterAll.classList.remove('selected');
    filterCompleted.classList.add('selected');
   
}


