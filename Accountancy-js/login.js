

//function atama
document.querySelector('#button').addEventListener('click',PostData);



document.onkeypress = enter;
function enter(e) {
  if (e.which == 13) { PostData(); }
}



function PostData(){

    //Verileri Alma
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    console.log(username);
    console.log(password);
    const data = {
        username : username,
        password : password
    }
    console.log(data);

    

    var json =JSON.stringify(data);

    console.log(json);

    var url= "http://192.168.1.152:3000/api/v1/users/login";
    var xhr = new XMLHttpRequest();
    xhr.open('POST',url,true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    

    
    
    xhr.onload = function(){
        var result = JSON.parse(xhr.response)
        console.log("result", result)
        console.log(result.data.id);
        var userID = result.data.id;
        console.log(userID);
        localStorage.setItem("id",userID);

        
        
        
        if(result.status == "success"){
            console.log("giriş başarılı")
            window.location = "homepage.html"
        } else {
            console.log("giriş başarız");
        }
    }
    xhr.send(json);

}
