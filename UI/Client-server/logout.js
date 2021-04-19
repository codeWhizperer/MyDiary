document.getElementById('logout').addEventListener('click', ()=>{
    localStorage.removeItem('username' )
    localStorage.removeItem('id')
    localStorage.removeItem('user-token')
    return setTimeout(() => {
        window.location.href = "../../../index.html"
    }, 2000);
})