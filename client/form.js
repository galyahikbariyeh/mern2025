var userForm = document.getElementById('userForm')
var API_URL='http://127.0.0.1:5050/api/create'

userForm.addEventListener('submit',async function (e) {
    e.preventDefault()
    var name=document.getElementById('name').value
    var email=document.getElementById('email').value
    var password=document.getElementById('password').value
    var role=document.getElementById('role').value
    var user={name,email,password,role}
    console.log(user)

    var response= await fetch(API_URL,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user),
    }).then(res=>res.json())
    .then(data=>{
        console.log(data.message)
        if(data.message=='User register in successfully'){
            alert('User register in successfully')
           // 
            window.location.href='index.html'
        }
      
    })
    console.log(response)
    
})