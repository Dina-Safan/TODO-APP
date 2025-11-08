import { descriptionRegex, titleRegex, validation } from "./Utils/validate.js";
// import {  showToast } from './Utils/ui.js';
import { logOut } from './Utils/main.js';

//* Html Element
const btnAddElement=document.querySelector("main .btn-add  button");
const modalElement=document.querySelector(".modal");
//Modal Input and Btn
const statusInput =document.getElementById("statusInput");
const categoryInput =document.getElementById("categoryInput");
const titleInput =document.getElementById("titleInput");
const descriptionInput =document.getElementById("descriptionInput");
const addTaskBtn =document.getElementById("addTaskBtn");
const updateTaskBtn =document.getElementById("updateTaskBtn");
//Theme Style
const htmlElement=document.documentElement;
const  lightBtn=document.querySelector(".helper .icons .theme .fa-sun");
const  darkBtn=document.querySelector(".helper .icons .theme .fa-moon");
let currentTheme=localStorage.getItem("currentTheme")||"light";
htmlElement.setAttribute("data-bs-theme",currentTheme);
modeTheme(currentTheme);
//logout
const logoutBtn=document.querySelector(".logout");


//^ Variables
const paletteColors = [ "#FF8F8F",  "#D6F4ED", "#FFE6D4",  "#E9B3FB",  "#BDE3C3" ];
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
        bg:"var(--bs-body-bg)",
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
    let task=`  <div class="card task px-3 py-2" style="background-color:${taskArr[i].bg}">
                                    <div class="title">${taskArr[i].title}</div>
                                    <div class="description">${taskArr[i].description}</div>
                                    <div class="tag ${taskArr[i].category}">${taskArr[i].category}</div>
                                    <div class="icons d-flex align-items-center gap-3">
                                        <i class="fa-solid fa-pen-to-square" onclick="editTask(${i})" ></i>
                                        <i class="fa-solid fa-trash" onclick="deleteTask(${i})"></i>
                                        <i class="fa-solid fa-palette" onclick="changeColor(event,${i})"></i>
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

//delete Function
function deleteTask(index){
    taskArr.splice(index,1);
    setTasks();
    resetCounter();
    resetTasks();
    displayAllTasks();
}
window.deleteTask = deleteTask;

//edit Function
function editTask(index){
    statusInput.value=taskArr[index].status;
    categoryInput.value=taskArr[index].category;
    titleInput.value=taskArr[index].title;
    descriptionInput.value=taskArr[index].description;
    updateTaskBtn.classList.replace("d-none","d-block");
    addTaskBtn.classList.replace("d-block","d-none");
    showModal();
}
window.editTask=editTask;

//update Function
function updateTask(index){
 taskArr[index].status= statusInput.value;
 taskArr[index].category= categoryInput.value;
 taskArr[index].title=titleInput.value;
 taskArr[index].description=descriptionInput.value;
 updateTaskBtn.classList.replace("d-block","d-none");
 addTaskBtn.classList.replace("d-none","d-block");
 setTasks();
 resetCounter();
 resetTasks();
 displayAllTasks();
 hideModal();
}

//show modal Function
function showModal(){
    modalElement.classList.replace("d-none" ,"d-block");
    document.body.style.overflow = "hidden";
    window.scroll(0,0);
}

//hide modal Function
function hideModal(){
      modalElement.classList.replace("d-block" ,"d-none");
      clear();
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

//clear function
function clear(){
    titleInput.value="";
    descriptionInput.value="";
     categoryInput.value="";
    statusInput.value="";
    titleInput.classList.remove("is-valid");
    descriptionInput.classList.remove("is-valid")

}

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


async function initHome(){
 const { searchInput } = await loadNavbar();   
//Search Function
function searchTask(){
      resetCounter();
       resetTasks();
    for(let i=0 ;i<taskArr.length;i++){
        if((taskArr[i].title.toLowerCase()).includes(searchInput.value.toLowerCase()) || (taskArr[i].category.toLowerCase()).includes(searchInput.value.toLowerCase())){
            displayTask(i);
        }
    }
}
      searchInput.addEventListener("input",searchTask);
       
}
initHome();

//Mode Theme Function
function modeTheme(theme){
    currentTheme=theme;
     localStorage.setItem("currentTheme",theme);
      htmlElement.setAttribute("data-bs-theme",theme);

     if(theme=="light"){
            lightBtn.classList.add("d-none");
    lightBtn.classList.remove("d-block");
    darkBtn.classList.remove("d-none");
    darkBtn.classList.add("d-block");
     }

     else{
        lightBtn.classList.remove("d-none");
    lightBtn.classList.add("d-block");
    darkBtn.classList.add("d-none");
    darkBtn.classList.remove("d-block");

     }
}

// Palette color Function
function changeColor(event,index){ 
  const random = Math.trunc(Math.random() * paletteColors.length);
  const newColor=paletteColors[random]
  taskArr[index].bg  = newColor;
  setTasks();
 event.target.closest(".task").style.backgroundColor=newColor;
}
window.changeColor=changeColor;

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

//update event 
updateTaskBtn.addEventListener("click",function(){updateTask(taskIndex)})

//Theme event
lightBtn.addEventListener("click",function(e){modeTheme("light")});
darkBtn.addEventListener("click",function(e){modeTheme("dark")});

//logout event
logoutBtn.addEventListener("click",function(){
    logOut();
    showToast("LogOut Successfully" ,true);
});

