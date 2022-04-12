// class
class Todo{
    constructor(name,deadline){
        const _deadline=new Date(deadline)
        this.name = name
        this.deadline = deadline
        this.completed = false
        this.createdDate = Date.now()
        this.year = _deadline.getFullYear()
        this.month = _deadline.getMonth()
        this.day = _deadline.getDate()
        this.id = newuuid() 
    }
}
export default Todo