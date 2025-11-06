//* Html Element

//^ Variables
const currentUser=JSON.parse(localStorage.getItem("currentUser"));

//~ Function

async function loadNavbar(){
    const container=document.getElementById("navbar-container");
    const response= await fetch("../Components/Navbar.html");
     const navHTML = await response.text();
     container.innerHTML=navHTML;
setTimeout(() => {
  const userImage = document.getElementById("userImage");
  const userName = document.getElementById("userName");
  userImage.src = currentUser.image ||"../assets/images/user.png";
  userName.textContent = `${currentUser.firstName} ${currentUser.lastName}`;
}, 0);

const avatar = document.querySelector('.avatar');
const info = document.querySelector('.info');
 const searchInput = document.querySelector(".search-bar input"); // ← هنا

avatar.addEventListener('click', () => {
  info.style.display = info.style.display === 'block' ? 'none' : 'block';
});
return {searchInput}

}

//&Events


loadNavbar();

