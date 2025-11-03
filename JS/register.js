import { clearForm, showToast } from "./Utils/ui";
import { emailRegex, nameRegex, passwordRegex, validation } from "./Utils/validate";

//* Html Element
const firstNameInput=document.getElementById("firstNameInput");
const lastNameInput=document.getElementById("lastNameInput");
const emailInput=document.getElementById("emailInput");
const passwordInput=document.getElementById("passwordInput");
const repasswordInput=document.getElementById("repasswordInput");
const btnRegister=document.getElementById("btn-Register");

//^ Variables
let userArr=JSON.parse(localStorage.getItem("users"))||[];

//~ Function
function register(){
    const isPasswordMatch= (passwordInput.value === repasswordInput.value && passwordInput.value !== "");
 if(validation(firstNameInput,nameRegex) 
    && validation(lastNameInput,nameRegex) 
&& validation(emailInput,emailRegex) 
&&validation(passwordInput,passwordRegex)
&& isPasswordMatch){
   
       const isExist=userArr.find((user)=>user.Email==emailInput.value);
    if(isExist){
   showToast("This Email is already exist");
        return;
    } 
    
    const user={
        firstName:firstNameInput.value,
        lastName:lastNameInput.value,
        Email:emailInput.value,
        password:passwordInput.value,
    }
    userArr.push(user);
    localStorage.setItem("users",JSON.stringify(userArr));
    clearForm();
    showToast("Account Created Successfully!",true)
 }

 else{
showToast("Please Enter Valid Data",)
}
}

//& Events
btnRegister.addEventListener("click",register);
 firstNameInput.addEventListener("input",function(){validation(firstNameInput,nameRegex)});
 lastNameInput.addEventListener("input",function(){validation(lastNameInput,nameRegex)});
 emailInput.addEventListener("input",function(){validation(emailInput,emailRegex)});
 passwordInput.addEventListener("input",function(){validation(passwordInput,passwordRegex)});
repasswordInput.addEventListener("input",function(){
     if(passwordInput.value == repasswordInput.value && passwordInput.value!=""){
        repasswordInput.classList.add("is-valid");
        repasswordInput.classList.remove("is-invalid");
        repasswordInput.nextElementSibling.classList.add("invisible");
        return true;
    }
    else{
          repasswordInput.classList.remove("is-valid");
        repasswordInput.classList.add("is-invalid");
        repasswordInput.nextElementSibling.classList.remove("invisible");
        return false;
    }

})