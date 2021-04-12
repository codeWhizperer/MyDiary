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
    newDiv.innerHTML += `
    <p><b>Title:</b></p><p class="user__post--title title-${data.id} margin">${data.title}</p>
                        <p class="post--date margin"  ><b>Time: </b>${data.createdon}</p>
                        <p><b>Description:</b></p> <p class="user__post--description description-${data.id} margin" >${data.description}</p>
                        <button class="btn btn-edit" id="${data.id}" onclick="edit(this.id)"> Edit</button>
                        <button class="request-save-button save-${data.id}" style="display : none" onClick="">Save</button>
                        <button class="request-cancel-button cancel-${data.id}" style="display : none" onClick="">Cancel</button>
                        <button class="btn btn-delete" onClick="">Delete</button>
                        <button class="btn btn-view view-${data.id}">View</button>`
    container.append(newDiv)
  })
// this is a comment
}
  }
 
  
  getAllRequest();

  async function edit(id){
    const response = await fetch(`${path}/api/v1/user/entry/modify/${id}`, {
      method: "PATCH",
      headers:{
        "content-type": "application/json",
        "x-access-token": `${checkToken()}`
      }
    })
    .then(res => res.json())
    .then(response => response)
    .catch(e => e)
if(response.message === 'Diary entry not found!'){
  document.querySelector(`.cancel-${id}`).style.display = 'none';  document.querySelector(`.save-${id}`).style.display = 'none';
}else{
  contentEditable(id)
}
  }
/*
1.


fu


*/


function contentEditable(id){
   document.querySelector(`.cancel-${id}`).style.display = 'block';
   document.querySelector(`.save-${id}`).style.display = 'block';
   let edit = document.querySelector(`.title-${id}`)
   edit.setAttribute('contenteditable' , 'true');
   edit.classList.add('edit-border');
   let editDescription = document.querySelector(`.description-${id}`)
   editDescription.setAttribute('contenteditable' , 'true');
   editDescription.classList.add('edit-border');
}
 

















