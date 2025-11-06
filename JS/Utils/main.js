import { showToast } from "./ui.js";

export function logOut(){
    localStorage.removeItem("currentUser");
   showToast("Logged out successfully!", true);
  setTimeout(() => {
    window.location.href = "./login.html";

  }, 1000);
}