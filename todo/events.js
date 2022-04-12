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
export {addBtn,editBtn,body}