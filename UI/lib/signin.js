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
