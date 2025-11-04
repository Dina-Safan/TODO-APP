import { clearForm, showToast } from "./Utils/ui.js";
//* Html Element
const emailInput=document.getElementById("emailInput");
const passwordInput=document.getElementById("passwordInput");
const btnLogin=document.getElementById("btn-Login");
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
 

//& Events
btnLogin.addEventListener("click",login);
