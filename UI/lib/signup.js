const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const username = document.getElementById('username');
const form = document.getElementById('form')
const errorElement = document.getElementById('error');
form.addEventListener('submit', (event)=>{
let message = [];
if(firstname.value === ''){
 message.push('Please Enter The Input Field');
}

if(message.length > 0){
  event.preventDefault()
  errorElement.innerText = message.join(', ')
}
})

function myFunction() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  window.addEventListener('load',function(){
    document.querySelector('body').classList.add("loaded")  
  });