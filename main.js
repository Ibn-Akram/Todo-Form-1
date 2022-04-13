// class
class Todo{
    constructor(name,time,deadline){
        const _deadline=new Date(deadline)
        this.name = name
        this.deadline = deadline
        this.completed = false
        this.createdDate = Date.now()
        this.year = _deadline.getFullYear()
        this.month = _deadline.getMonth()
        this.day = _deadline.getDate()
        this.id = newuuid() 
        this.time=time
    }
}
// Array
 const todoList = [];
getTodoListFromLocaleStorage()
 reload()
  
 // functions 
 function saveToLocaleStorage(){
     localStorage.setItem('todoList',JSON.stringify(todoList))
 }
 function getTodoListFromLocaleStorage(){
     let todoListString=localStorage.getItem('todoList')
     if(todoListString){
         const result = JSON.parse(todoListString)
         todoList.push(...result)
     }
 }
 function reload(){
     const tbody=document.querySelector('tbody')
     tbody.innerHTML = ''
     for (let index = 0; index < todoList.length; index++) {
         const element = todoList[index];
         const row = createTableRow(element, index + 1)
         addRowToTable(row)
     }
 }
 function getTodoValues(){
     const name=document.querySelector('input[name="todoName"]')?.value
     const deadline=document.querySelector('input[name="todoDeadline"]')?.value
return {name,deadline}     
 }

 function setTodoValues(item){
    const name=document.querySelector('input[name="todoName"]')
    const deadline=document.querySelector('input[name="todoDeadline"]')
    name.value = item.name
    deadline.value = item.deadline
 }
 function addTodo(name,deadline){
const newTodo = new Todo(name,deadline)
todoList.push(newTodo)
saveToLocaleStorage()
reload()
 }
 function setEditMode(isEdit){
const addBtn = document.getElementById('addBtn')
const editBtn = document.getElementById('editBtn')
if(isEdit){
    addBtn.disabled=true
    editBtn.removeAttribute('disabled')
}else{
    addBtn.removeAttribute('disabled')
    editBtn.disabled=true
}
 }setEditMode(false)


function clearForm(){
    const name=document.querySelector('input[name="todoName"]')
     const deadline=document.querySelector('input[name="todoDeadline"]')
     name.value = ''
     deadline.value = ''
}
function newuuid(){
    return Math.random(1000000)*10000000
}
function editTodo(id){
const editBtn=document.getElementById('editBtn')
const editItem=todoList.find(a => a.id == id)
setTodoValues(editItem)
editBtn.setAttribute('data-id',id)
setEditMode(true)
}
//events
const body = document.querySelector('body')
body.addEventListener('click',(event)=>{
    event.stopPropagation()
    document.querySelector('tr').classList.remove('primary')
    console.log(event.path[1].classList.add('primary'))
})
const addBtn=document.getElementById('addBtn')

addBtn.addEventListener('click',()=>{
const {name,deadline}=getTodoValues()
if(name&&deadline){
    addTodo(name,deadline)
    clearForm()
}
else{
    
    alert('You must fill all of fields')
}
})
const editBtn=document.getElementById('editBtn')
editBtn.addEventListener('click',(event)=>{
    const {name,deadline}=getTodoValues()

    // validation
    const todoId = event.target.dataset.id 
    const editTodoItem = todoList.find(a => a.id == todoId)
    
    if(name&&deadline){
        editTodoItem.name=name
        editTodoItem.deadline=deadline
        saveToLocaleStorage()
        clearForm()
        reload()
    }else{
        alert('You have to fill all of fields')
    }
})

// Template
function addRowToTable(row){
const tbody = document.querySelector('tbody')
tbody.innerHTML += row
}
function createTableRow(todo,number){
    return` <tr data-id="${todo.id}">
    <td>${number}</td>
    <td>${todo.name}</td>
    <td>${todo.deadline}</td>
    <td>${new Date(todo.createdDate)}</td>
    <td>
        <input type="checkbox">
    </td>
    <td>
        <button class="btn btn-danger">
            <span class="fa fa-trash">

            </span>
        </button>
        <button onclick="editTodo('${todo.id}')" class="btn btn-info">
            <span class="fa fa-edit">

            </span>
        </button>
    </td>
</tr>
    `
}