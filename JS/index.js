import { descriptionRegex, titleRegex, validation } from "./Utils/validate.js";
import { showToast } from './Utils/ui.js';

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
let taskArr=getTasks();

//~ Function
//show modal Function
function showModal(){
    modalElement.classList.replace("d-none" ,"d-block");
}

//hide modal Function
function hideModal(){
      modalElement.classList.replace("d-block" ,"d-none");
}

//set tasks in local storage Function
function setTasks(){
localStorage.setItem(`tasks_${currentUser.Email}`,JSON.stringify(taskArr));
}

//get tasks from local storage function
function getTasks(){
    return JSON.parse(localStorage.getItem(`tasks_${currentUser.Email}`))||[];
}

//display Function
function addTask(){
   if(validation(titleInput,titleRegex) && validation(descriptionInput,descriptionRegex)){
     const task={
        status:statusInput.value,
        category:categoryInput.value,
        title:titleInput.value,
        description:descriptionInput.value,
    }
    taskArr.push(task);
    setTasks();
    hideModal();
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