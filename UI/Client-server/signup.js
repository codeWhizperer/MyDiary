let errorDisplay = document.querySelector('.error--modal')
window.addEventListener('load',function(){
    document.querySelector('body').classList.add("loaded")  
  });
  
const password = document.getElementById('password')
const toggle = document.getElementById('togglePassword')
togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});


let path = `http://localhost:5000`

const signUp = document.getElementById('sign-up-btn').addEventListener("click", async(e)=>{
    e.preventDefault();
    let firstname = document.getElementById('firstname').value;
    let lastname = document.getElementById('lastname').value;
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    const signUpBody = {firstname:firstname, lastname:lastname, username:username, email:email, password:password};
   let response =  await  fetch('http://localhost:5000/api/v1/users/signup', {
        method:"POST",
        body:JSON.stringify(signUpBody),
        headers:{
            "content-type":"application/json"
        }})

        .then(res => res.json())
        .then(response => response)
        .catch(error =>error);
        if(response.message === 'Some values are missing'){
            errorDisplay.innerHTML = `<p>Please fill the input fields correctly!</p>`
     errorDisplay.classList.add('user-error-open');
     setTimeout(() => {errorDisplay.classList.remove('user-error-open')}, 1500);
   }else if(response.message === 'User Already Exist'){
       errorDisplay.innerHTML = `<p>User Already Exist</p>`
       errorDisplay.classList.add('user-red')
       setTimeout(() => {errorDisplay.classList.remove('user-red')}, 1500);
   }else if(response.message === "User Register Successfully"){
errorDisplay.innerHTML = `<p>User Register Successfully</p>`
errorDisplay.classList.add('user-green')
setTimeout(() => {errorDisplay.classList.remove('user-green')}, 1500);
window.localStorage.setItem('user-token', response["usertoken"])
window.localStorage.setItem('id', response["userId"]);
window.localStorage.setItem('username', response["user"]);
return setTimeout(() => {
    window.location.href = `../HTML/signin.html`
}, 1500);

   }else{
       errorDisplay.innerHTML = `<p>Something Happened, Try Again please.</p>`
       errorDisplay.classList.add('user-error-open')
       setTimeout(() => {errorDisplay.classList.remove('user-error-open')}, 1500);

   }


})
// switch (key) {
//     case value:
        
//         break;

//     default:
//         break;
// }