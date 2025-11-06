import { descriptionRegex, titleRegex, validation } from "./Utils/validate.js";
import {  showToast } from './Utils/ui.js';

//* Html Element
const btnAddElement=document.querySelector("main .btn-add  button");
const modalElement=document.querySelector(".modal");
const statusInput =document.getElementById("statusInput");
const categoryInput =document.getElementById("categoryInput");
const titleInput =document.getElementById("titleInput");
const descriptionInput =document.getElementById("descriptionInput");
const addTaskBtn =document.getElementById("addTaskBtn");
const updateTaskBtn =document.getElementById("updateTaskBtn");



//^ Variables
const status={
    nextUp:document.querySelector(".task-container .nextUp .card-body "),
    inProgress:document.querySelector(".task-container .inProgress .card-body "),
    done:document.querySelector(".task-container .done .card-body "),
};
const counter={
    nextUp:document.querySelector(".task-container .nextUp .card-title "),
    inProgress:document.querySelector(".task-container .inProgress .card-title "),
    done:document.querySelector(".task-container .done .card-title "),
};
let taskIndex;
let taskArr=getTasks();
displayAllTasks();



//~ Function
//show modal Function
function showModal(){
    modalElement.classList.replace("d-none" ,"d-block");
    document.body.style.overflow = "hidden";
    window.scroll(0,0);
}

//hide modal Function
function hideModal(){
      modalElement.classList.replace("d-block" ,"d-none");
    //   clear();
      document.body.style.overflow="auto";
}

//set tasks in local storage Function
function setTasks(){
localStorage.setItem(`tasks_${currentUser.Email}`,JSON.stringify(taskArr));
}

//get tasks from local storage function
function getTasks(){
    return JSON.parse(localStorage.getItem(`tasks_${currentUser.Email}`))||[];
}

//add Function
function addTask(){
   if(validation(titleInput,titleRegex) && 
   validation(descriptionInput,descriptionRegex) &&
statusInput.value !=="" && categoryInput.value !==""){
     const task={
        status:statusInput.value,
        category:categoryInput.value,
        title:titleInput.value,
        description:descriptionInput.value,
    }
    taskArr.push(task);
    setTasks();
    displayTask(taskArr.length-1);
    hideModal();
    clear();
   }
}

//display Function
function displayTask(i){
    taskIndex=i;
    let task=`  <div class="card task px-3 py-2">
                                    <div class="title">${taskArr[i].title}</div>
                                    <div class="description">${taskArr[i].description}</div>
                                    <div class="tag ${taskArr[i].category}">${taskArr[i].category}</div>
                                    <div class="icons d-flex align-items-center gap-3">
                                        <i class="fa-solid fa-pen-to-square "></i>
                                        <i class="fa-solid fa-trash" onclick="deleteTask(${i})"></i>
                                        <i class="fa-solid fa-palette"></i>
                                    </div>
                                </div>`
        status[taskArr[i].status].innerHTML +=task;  
        counter[taskArr[i].status].querySelector(".counter").innerHTML= +counter[taskArr[i].status].querySelector(".counter").innerHTML +1; 
}

//Display All Tasks
function displayAllTasks(){
    for(let i=0;i<taskArr.length;i++){
        displayTask(i);
    }
}

//clear function
function clear(){
    titleInput.value="";
    descriptionInput.value="";
     categoryInput.value="";
    statusInput.value="";
    titleInput.classList.remove("is-valid");
    descriptionInput.classList.remove("is-valid")

}

//delete Function
function deleteTask(index){
    taskArr.splice(index,1);
    setTasks();
    resetCounter();
    resetTasks();
    displayAllTasks();
}
window.deleteTask = deleteTask;


//reset Counter Function
function resetCounter(){
      for (let key in counter) {
    counter[key].querySelector(".counter").innerHTML = 0;
  }
   
}

//reset ConatinerTask Function
function resetTasks(){
    for (let key in status) {
    status[key].innerHTML = "";
  }

}

//& Events
//show modal
btnAddElement.addEventListener("click",showModal)

//hide modal (First Way)
modalElement.addEventListener("click",function(e){
    if(e.target === modalElement || e.target==modalElement.querySelector(".container"))hideModal() 
})
          //(Second Way)
window.addEventListener("keyup",function(e){
    if(e.code=="Escape") hideModal()
})

//add task
addTaskBtn.addEventListener("click",addTask)

//validate titile 
titleInput.addEventListener("input",function(e){validation(titleInput,titleRegex)});
//validate description
descriptionInput.addEventListener("input",function(e){validation(descriptionInput,descriptionRegex)});