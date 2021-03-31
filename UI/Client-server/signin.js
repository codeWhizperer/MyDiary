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

    const login = document.getElementById('sign-in-btn').addEventListener("click", async(e)=>{
        e.preventDefault();
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        const signInBody = { username:username, password:password};
       let response =  await  fetch('http://localhost:5000/api/v1/users/login', {
            method:"POST",
            body:JSON.stringify(signInBody),
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
       }else if(response.message === 'User doesn\'t exist'){
           errorDisplay.innerHTML = `<p>Invalid Username or User doesn't exist</p>`
           errorDisplay.classList.add('user-red')
           setTimeout(() => {errorDisplay.classList.remove('user-red')}, 1500);
       }else if(response.message === 'Password Incorrect'){
        errorDisplay.innerHTML = `<p>Incorrect Password, Try Again</p>`
        errorDisplay.classList.add('user-red')
        setTimeout(() => {errorDisplay.classList.remove('user-red')}, 1500);
    } else if(response.message === 'User Successfully LoggedIn'){
    errorDisplay.innerHTML = `<p>Welcome Back ${username}</p>`
    errorDisplay.classList.add('user-green')
    setTimeout(() => {errorDisplay.classList.remove('user-green')}, 1500);
    window.localStorage.setItem('user-token', response["usertoken"])
    window.localStorage.setItem('id', response["userId"]);
    window.localStorage.setItem('username', response["user"]);
    return setTimeout(() => {
        window.location.href = `../HTML/user/user.index.html`
    }, 1500);
    
       }else{
           errorDisplay.innerHTML = `<p>Something Happened, Try Again please.</p>`
           errorDisplay.classList.add('user-error-open')
           setTimeout(() => {errorDisplay.classList.remove('user-error-open')}, 1500);
    
       }
    
    
    })