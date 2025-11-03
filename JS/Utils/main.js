export function logOut(){
    localStorage.removeItem("currentUser");
   showToast("Logged out successfully!", true);
  setTimeout(() => {
    window.location.href = "./login.html";
  }, 1000);
}