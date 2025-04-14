

/*var API_URL='http://127.0.0.1:5050/api/user'
var token= sessionStorage.getItem('authToken')

if(!token){
    window.location.href='index.html'
}



async function getUsers(){
    try {
        var response = await fetch(API_URL,{
            headers:{
                'Content-Type':'application/json',
                'Authr': token
            },
            method:'GET',
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           
            if(data.message=='you are not admin'){
                
                 alert('User not allowed')
                window.location.href='index.html'
            }
            else{
                alert('User logged in successfully')
            }
        })
    } catch (error) {
        console.log(error)
        alert('User not found')
        window.location.href='index.html'
    }
  
}

getUsers()*/

var API_URL='http://127.0.0.1:5050/api/user'
var token= sessionStorage.getItem('authToken')

if(!token){
    window.location.href='index.html'
}
/*async function update(id) {
console.log(id)
    
}*/
async function update(id, user) {
    var conf = confirm('Are you sure you want update this user')
    console.log(conf);
    var UPDATE_URL = 'http://127.0.0.1:5050/api/updateUser';

    if (conf) {
        var response = await fetch(UPDATE_URL + "/" + id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authr': token
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.message == 'User update successfully') {
                alert('User update successfully');
                //window.location.reload();
            } else {
                alert('user can not update')
            }
        })
       
    } else {
       
    }
}

async function  deleteUser(id) {
    var conf= confirm('Are you sure you want delete this user')
    console.log(conf)
    var DELET_URL='http://127.0.0.1:5050/api/deleteUser'
    if(conf){
      var response= await fetch(DELET_URL+"/"+id,{
        method:"DELETE",
        headers:{
            'Content-Type':'application/json',
                'Authr': token
        }
      }).then(res=>res.json())
      .then(data=>{
        console.log(data)
        if(data.message == 'User delete successfully'){
            alert('User delete successfully')
            window.location.reload()
        }
        else{
            alert('User not found')
        }
      })
    }
    else{
      //do nothing
    }
      
    }
   //
   

async function getUsers(){
    try {
        var response = await fetch(API_URL,{
            headers:{
                'Content-Type':'application/json',
                'Authr': token
            },
            method:'GET',
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            var tbody=document.getElementById('usersTable')
            data.map(user=>{
                console.log(user)
                var tr=document.createElement('tr')
                var td1=document.createElement('td')
                td1.innerHTML=user.name
                tr.appendChild(td1)

                var td2=document.createElement('td')
                td2.innerHTML=user.role
                tr.appendChild(td2)

                var td3=document.createElement('td')
                td3.innerHTML=user.email
                

                var td4=document.createElement('td')
               var updateButton=document.createElement('button')
               updateButton.innerHTML='Update'
               updateButton.onclick=()=>update(user._id)
               td4.appendChild(updateButton)

               var deleteButton=document.createElement('button')
               deleteButton.innerHTML='Delete'
               deleteButton.onclick=()=>deleteUser(user._id)
               var td5=document.createElement('td')
               td5.appendChild(deleteButton)

               tr.appendChild(td3)
               tr.appendChild(td4)
               tr.appendChild(td5)

               tbody.appendChild(tr)
            }

            )
            if(data.message=='you are not admin'){
                
                 alert('User not allowed')
                window.location.href='index.html'
            }
            else{
                alert('User logged in successfully')
            }
        })
    } catch (error) {
        console.log(error)
        alert('User not found')
        window.location.href='index.html'
    }
  
}

getUsers()






