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
       <div class="profile__image"><img  src="../../images//img_avatar.png" class="image" alt="img_avatar"></div>
       <div class="profile__content">
           <p class="label margin">Firstname</p>
           <p  contenteditable="false" class="profile-edit">${data.firstname}</p>
           <p class="label margin">Lastname</p>
           <p contenteditable="false" class="profile-edit">${data.lastname}</p>
          <p class="label margin">Username</p>
          <p contenteditable="true" class="profile-edit">${data.username}</p>
          <p class="label margin">Email</p>
          <p contenteditable="true" class="profile-edit">${data.email}</p>
          <div class="profile-button">
              <button class="btn btn__update">Update</button>
              <button class="btn btn__home">Home</button>
          </div>
       </div>
</div>
       `
   });
}
}
userProfile()