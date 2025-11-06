
export function showToast(message, isSuccess = false) {
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

export function clearForm(){
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