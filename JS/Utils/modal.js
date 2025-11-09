
export const modalElement=document.querySelector(".modal");

//show modal Function
 export function showModal(){
    modalElement.classList.replace("d-none" ,"d-block");
    document.body.style.overflow = "hidden";
    window.scroll(0,0);
}

//hide modal Function
 export function hideModal(){
      modalElement.classList.replace("d-block" ,"d-none");
    
      document.body.style.overflow="auto";
}


