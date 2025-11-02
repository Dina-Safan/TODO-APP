//* Html Element

const firstNameInput=document.getElementById("firstNameInput");
const lastNameInput=document.getElementById("lastNameInput");
const emailInput=document.getElementById("emailInput");
const passwordInput=document.getElementById("passwordInput");
const repasswordInput=document.getElementById("repasswordInput");
const btnRegister=document.getElementById("btn-Register");

//^ Variables
let userArr=JSON.parse(localStorage.getItem("users"))||[];
const nameRegex= /^[A-Z][a-z]{2,}$/;
const emailRegex=/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
const passwordRegex = /^\S{6,}$/;


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
function validation(element,regex){
    if(regex.test(element.value)){
       element.nextElementSibling.classList.add("invisible");
       element.classList.add("is-valid");
       element.classList.remove("is-invalid");  
         
       return true;
    }

    else{
         element.nextElementSibling.classList.remove("invisible");
         element.classList.remove("is-valid");
         element.classList.add("is-invalid");  
       
         return false;
    }
}

function clearForm(){
    firstNameInput.value="";
    lastNameInput.value="";
    emailInput.value="";
    passwordInput.value="";
    repasswordInput.value = "";
      const inputs = [firstNameInput, lastNameInput, emailInput, passwordInput, repasswordInput];
  inputs.forEach(input => {
    input.classList.remove("is-valid", "is-invalid");
    input.nextElementSibling.classList.add("invisible");
    
  });
}

function showToast(message, isSuccess = false) {
    Toastify({
        text: message,
        duration: 3000,
        position: "center",
        style: {
            background: isSuccess 
                ? "linear-gradient(to right, #00b09b, #96c93d)"
                : "linear-gradient(to right, #FFC100, #FFC100)",
        },
        offset: {
            x: 50, 
            y: 20
        },
    }).showToast();
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