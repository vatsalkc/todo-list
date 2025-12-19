document.addEventListener('DOMContentLoaded',()=>{

const todoinput = document.getElementById("todo-input")
const addtaskbutton = document.getElementById("add-task-btn")
const todolist = document.getElementById("todo-list")

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

tasks.forEach(task => rendertasks(task));

addtaskbutton.addEventListener('click',()=>{
    const tasktext = todoinput.value.trim()
    if(tasktext === "") return;

    const newTask = {
        id:Date.now(),
        text:tasktext,
        completed:false
    }

    tasks.push(newTask);
    savetask();
    todoinput.value = "";
    console.log("task added");
    savetask()
    rendertasks(newTask)
})

function rendertasks(task){
    const li = document.createElement('li');
    li.setAttribute('data-id',task.id);

    if(task.completed){
        li.classList.add("completed")
    }

    li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>
    `;

    li.addEventListener('click',(e)=>{
        if(e.target.tagName==="BUTTON") return
        task.completed = !task.completed
        li.classList.toggle('completed')
        savetask()
    });

    li.querySelector('button').addEventListener('click',(e)=>{
        e.stopPropagation(); //prevent toggle
        tasks = tasks.filter(t => t.id !== task.id)
        li.remove()
        savetask();
    })

    todolist.appendChild(li)
}

function savetask(){
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

})