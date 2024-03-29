const checkToken = () =>{
    const token = localStorage.getItem('user-token')
    if(token){
        return token
    }
    window.location.href =`../signin.html`
}

let path = 'https://mydiary-app-demo.herokuapp.com'
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
                        <button class="btn btn-save save-${data.id}" id="${data.id}" style="display : none" onClick="save(this.id)">Save</button>
                        <button class="btn btn-cancel cancel-${data.id}" id="${data.id}" style="display : none" onClick="cancel(this.id)">Cancel</button>
                        <button class="btn btn-delete" id="${data.id}" id="${data.id}" onClick="deleteById(this.id)">Delete</button>
                       `
    container.append(newDiv)
  })
// this is a comment
}
  }
 
  
  getAllRequest();

  async function edit(id){
    const editTitle = document.querySelector(`.title-${id}`)
const editDescription = document.querySelector(`.description-${id}`)
const title = editTitle.innerText;
const description = editDescription.innerText;
const requestBody = {title:title, description:description}
    const response = await fetch(`${path}/api/v1/user/entry/modify/${id}`, {
      method: "PATCH",
      body: JSON.stringify(requestBody),
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

function contentEditable(id){
   document.querySelector(`.cancel-${id}`).style.display = 'inline-block';
   document.querySelector(`.save-${id}`).style.display = 'inline-block';
   let edit = document.querySelector(`.title-${id}`)
   edit.setAttribute('contenteditable' , 'true');
   edit.classList.add('edit-border');
   let editDescription = document.querySelector(`.description-${id}`)
   editDescription.setAttribute('contenteditable' , 'true');
   editDescription.classList.add('edit-border');
}

function removeContentEditable(id){
  document.querySelector(`.cancel-${id}`).style.display = 'none';
  document.querySelector(`.save-${id}`).style.display = 'none';
  let edit = document.querySelector(`.title-${id}`)
  edit.setAttribute('contenteditable' , 'false');
  edit.classList.remove('edit-border');
  let editDescription = document.querySelector(`.description-${id}`)
  editDescription.setAttribute('contenteditable' , 'false');
  editDescription.classList.remove('edit-border');
}
 function cancel(id){
   removeContentEditable(id)
 }
async function save(id){
removeContentEditable(id)
const editTitle = document.querySelector(`.title-${id}`)
const editDescription = document.querySelector(`.description-${id}`)
const title = editTitle.innerText;
const description = editDescription.innerText;
const requestBody = {title:title, description:description}
const response = await fetch(`${path}/api/v1/user/entry/modify/${id}`, {
  method:"PATCH",
  body: JSON.stringify(requestBody),
  headers:{
    "content-type": "application/json",
    "x-access-token": `${checkToken}`
  }
}).then(res => res.json())
  .then(response => response)
  .catch(error => error)
let errorDisplay = document.querySelector('.error--modal')
errorDisplay.innerHTML= `<p>Success</p>`
errorDisplay.classList.add('user-error-open')
setTimeout(() => {
  errorDisplay.classList.remove('user-error-open')
}, 1000);

}


async function deleteById(id){
  let currentId = id
  document.querySelector('.post-delete-modal').style.transform = 'translateY(0)'
   document.querySelector('.btn-delete-yes').addEventListener('click', async()=>{
      const response = await fetch(`${path}/api/v1/user/entry/delete/${currentId}`, {
      method : "DELETE",
      headers:{
        "content-type" : "application/json",
        "x-access-token" : `${checkToken()}`
      }
    }).then(res => res.json())
      .then(response => response)
      .catch(e => e)
      if(response.message === 'Entry successfully deleted'){
        document.querySelector('.post-delete-modal').style.transform = 'translateY(-100em);';
       return setTimeout(()=>{window.location.href = '../user/user.index.html'} , 1000);
      }else{}
  })
  document.querySelector('.btn-delete-no').addEventListener('click', ()=>{
    window.location.href = '../user/user.index.html'
})
  }


