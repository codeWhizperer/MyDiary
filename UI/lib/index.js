/*WINDOW LOADER*/
window.addEventListener('load',function(){
    document.querySelector('body').classList.add("loaded")  
  });
  




/*Mobile Dropdown */

let dropdown = document.querySelector('.dropdown')

dropdown.addEventListener('click', (e)=>{
    if(dropdown.classList.contains('closed')){
        dropdown.classList.remove('closed')
    } else{
        dropdown.classList.add('closed')
    }
})