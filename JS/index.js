//* Html Element
const btnAddElement=document.querySelector("main .btn-add  button");
const modalElement=document.querySelector(".modal");



//^ Variables


//~ Function
//show modal fun
function showModal(){
    modalElement.classList.replace("d-none" ,"d-block");
}

//hide modal function
function hideModal(){
      modalElement.classList.replace("d-block" ,"d-none");
}

//& Events

//show modal
btnAddElement.addEventListener("click",showModal)

//hide modal
modalElement.addEventListener("click",function(e){
    if(e.target == modalElement.querySelector(".container"))hideModal()
})

window.addEventListener("keyup",function(e){
    if(e.code=="Escape") hideModal()
})