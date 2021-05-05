window.addEventListener('load',function(){
    document.querySelector('body').classList.add("loaded")  
  });
// 
// SIDE-NAVIGATION
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
    document.getElementById("mySidenav").style.width = "350px";
    document.getElementById("main").style.marginLeft = "350px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }
  
  /* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
  }
//   SIDE NAVIGATION END

// error modal
const errorDisplay = document.querySelector('.error--modal')

// lOADER
// Check if token is valid

const checkToken = () =>{
    const token = localStorage.getItem('user-token')
    if(token){
        return token
    }
    window.location.href =`../signin.html`
}

//Get user username and id from localStorgae 
const userName = localStorage.getItem('username' )
const userId = localStorage.getItem('id')

let path = 'https://mydiary-app-demo.herokuapp.com'
// Add entry
const submitForm = document.getElementById('submitForm').addEventListener('click',async(e)=>{
e.preventDefault();
const title = document.getElementById('title').value;
const description = document.getElementById('description').value;
if(title.trim() === '' || description.trim() === ''){
 errorDisplay.innerHTML= `<span>Input fields cannot be empty</span>`
 errorDisplay.classList.add('user-red')
 setTimeout(() => {
     errorDisplay.classList.remove('user-red')
 }, 2000);
}else{
    const postBody = {title:title, description:description ,userId: userId, userName: userName}
    const response = await fetch(`${path}/api/v1/user/new`, {
        method:"POST",
        body: JSON.stringify(postBody),
        headers:{
"content-type": 'application/json',
"x-access-token": `${checkToken()}`
        }})
        .then(res => res.json())
        .then(response => response)
        .catch(error=> error)
        if(response.message ==='Entry Created Successfully!'){
            errorDisplay.innerHTML = `<p>Saved!</p>`
            errorDisplay.classList.add('user-green')
            setTimeout(() => {errorDisplay.classList.remove('user-green')}, 1000);
          return  setTimeout(() => {
                 window.location.href = "../user/user.index.html"
            }, 1000)
        }

    }

})

// function contentEditable(){

// }

