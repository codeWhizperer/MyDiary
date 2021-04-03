const checkToken = () =>{
    const token = localStorage.getItem('user-token')
    if(token){
        return token
    }
    window.location.href =`../signin.html`
}

let path = 'http://localhost:5000'
async function getAllRequest(){
    const response = await fetch(`${path}/api/v1/user/entry`, {
      method : "GET",
      headers:{
        "content-type" : "application/json",
        "x-access-token": ` ${checkToken()}`
      }
    }).then(res => res.json())
      .then(response => response)
      .catch(e => e)
if(response.message === "No Response"){
 return   document.getElementById('intro').classList.add('intro--entry--show');
}else if(response.message === "Unathorized!"){
    errorDisplay.innerHTML =`<p>Session has expired</p>`
    errorDisplay.classList.add('user-red')
    return setTimeout(() => {
        window.location.href('../signin.html')
    }, 2000);
}else{
  // if response !== No response || unauthorized
  document.getElementById('intro').classList.remove('intro--entry--show');
  // remove the intro--entry--show
  const datas = response.request;
  const container = document.querySelector('.container')
  // for each resource , create a new div
  datas.forEach((data)=>{
    const newDiv = document.createElement('div')
    newDiv.classList.add('user__posts')
    newDiv.innerHTML = `
    <p class="user__post--title"><b>Title: </b>${data.title}</p><br>
                        <p class="post--date" ><b>Time: </b>${data.createdon}</p><br>
                        <p class="user__post--description" ><b>Description</b><br>${data.description}</p>
                        <button class="btn btn-edit">Edit</button>
                        <button class="btn btn-delete" >Delete</button>
                        <button class="btn btn-view" >View</button>
    `
    container.append(newDiv)
  })

  // add class user__posts to the div
  // set new div to contents
  // append div to the container    
}
  }
  
  getAllRequest();
  
  
  
