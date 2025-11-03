export const nameRegex= /^[A-Z][a-z]{2,}$/;
export const emailRegex=/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
export const passwordRegex = /^\S{6,}$/;

export function validation(element,regex){
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