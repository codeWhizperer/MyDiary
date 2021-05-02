const checkToken = ()=>{
    const token = localStorage.getItem('user-token')
    if(token){
        return token
    }
    window.location.href('./signin.html')
}
let path = 'http://localhost:5000'
const currentId = localStorage.getItem('id')
// console.log(currentId)
const profileWrapper = document.querySelector('.profile_wrapper')
async function userProfile(){
    const response = await fetch(`${path}/api/v1/user/profile/${currentId}`, {
        method:"GET",
        headers:{
            "content-type":"application/json",
            "x-access-token": `${checkToken()}`
        }
    }).then(res => res.json())
    .then(response => response)
    .catch(e => e)
    const datas = response.message;
if(response.info === 'User profile'){
   datas.forEach(data => {
       profileWrapper.innerHTML = `
       <div class="profile-container">
       <div class="profile__image"><img  src="../../images/default-avatar.jpg" class="image" alt="img_avatar"></div>
       <div class="profile__content">
           <p class="label margin">Firstname</p>
           <p  contenteditable="false" class="profile-edit">${data.firstname}</p>
           <p class="label margin">Lastname</p>
           <p contenteditable="false" class="profile-edit">${data.lastname}</p>
          <p class="label margin">Username</p>
          <p contenteditable="true" id="username-${data.id}" class="profile-edit">${data.username}</p>
          <p class="label margin">Email</p>
          <p contenteditable="true" id="email-${data.id}" class="profile-edit">${data.email}</p>
          <div class="profile-button">
              <button id="${data.id}" class="btn btn__update" onClick="profileUpdate(this.id)">Update</button>
              <button class="btn btn__home" onClick="">Home</button>
          </div>
       </div>
</div>
       `
   });
}
}
userProfile()

// s

// const username = document.getElementById('username');
// const email = document.getElementById('email')
// const updateBtn = document.querySelector(`.email-${currentId}`)
const successDisplay = document.querySelector('.error--modal')
async function profileUpdate(){
    const usernameValue = document.querySelector(`#username-${currentId}`).innerText;
    const emailValue = document.querySelector(`#email-${currentId}`).innerText;
    const requestBody = ({username:usernameValue, email:emailValue})

    const response = await fetch(`${path}/api/v1/user/profile/update/${currentId}`, {
        method: "PUT",
        body: JSON.stringify(requestBody),
        headers: {
            "content-type": "application/json",
            "x-access-token": `${checkToken()}`
        }
    }).then(res => res.json())
      .then(response => response)
      .catch(e => e)
if(response.message === 'Profile Successfully updated'){
    successDisplay.innerHTML = `<p>Profile sucessfully updated!</p>`
    successDisplay.classList.add('user-green')
    setTimeout(() => {
        successDisplay.classList.remove('user-green')
    }, 1500);
}
}


// ProfileUpdate()