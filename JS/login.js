
import { hideModal, modalElement, showModal } from "./Utils/modal.js";
import {  showToast } from "./Utils/ui.js";
import { passwordRegex, validation } from "./Utils/validate.js";


//* Html Element
const emailInput=document.getElementById("emailInput");
const passwordInput=document.getElementById("passwordInput");
const btnLogin=document.getElementById("btn-Login");
const forgetBtn=document.querySelector(".forget");
const updatePassBtn=document.getElementById("updatePassword");
const resetPassInput=document.getElementById("resetPassInput");
const userEmail=document.getElementById("user-email");


//^ Variables
const userArr=JSON.parse(localStorage.getItem("users"))||[];
//~ Function

function login(){      
   const isExist= userArr.find((user)=>user.Email==emailInput.value && user.password==passwordInput.value);
   if(isExist){
     localStorage.setItem("currentUser", JSON.stringify(isExist));
     showToast("Login successful!", true);
    setTimeout(() => {
    window.location.href = "./index.html";
  }, 1000);
   }
   else{
    showToast("Login failed. Check your details");
    emailInput.value="";
    passwordInput.value="";
   
   }
    }
 
function forgetPassword(){
 const isExist=userArr.find((user)=>user.Email==userEmail.value);
 if(isExist){
  if(validation(resetPassInput,passwordRegex)){ 

    isExist.password=resetPassInput.value;
   localStorage.setItem("users", JSON.stringify(userArr));
   showToast("Password updated successfully!", true);
   hideModal();
   resetPassInput.value="";
   userEmail.value="";

  }
 }
 else{
  
  showToast("This email is not registered")
 }
}

//& Events
btnLogin.addEventListener("click",login);
forgetBtn.addEventListener("click",showModal);
updatePassBtn.addEventListener("click",forgetPassword);
resetPassInput.addEventListener("input",function(){validation(resetPassInput,passwordRegex)});
//hide modal (First Way)
modalElement.addEventListener("click",function(e){
    if(e.target === modalElement || e.target==modalElement.querySelector(".container"))
        {hideModal();
           
        }
})
          //(Second Way)
window.addEventListener("keyup",function(e){
    if(e.code=="Escape") {hideModal();
           
        }
})
