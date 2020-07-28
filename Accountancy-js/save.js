var userID = localStorage.getItem("id");
console.log(userID);
var customerID = localStorage.getItem("customerid");
console.log(customerID);



showPayment();
function showPayment(){
    var urlcost = `http://192.168.1.152:3000/api/v1/customers/${userID}`;
    var xhrcost = new XMLHttpRequest();

    xhrcost.open('GET',urlcost,true);
    xhrcost.onload = function(){
        console.log(xhrcost.status);

        var posts = JSON.parse(xhrcost.response);
        console.log("result", posts);



        var balancehtml=`
          <p class="p5">KDV'li Alınan: ${posts.data.userbalance.inMoneyVAT}</p>
          <p class="p4">KDV Miktarı: ${posts.data.userbalance.amountVAT}</p>
          <p class="p4">KDV'siz Alınan: ${posts.data.userbalance.inMoney}</p>
          <hr class="hr2"/>
          <p class="p4">Ödenen Toplam: ${posts.data.userbalance.outMoney}</p>
        `;

        document.querySelector('.box5').innerHTML = balancehtml;


        var totalhtml=`
          <p class="p7">Toplam Bakiye: ${posts.data.userbalance.totalMoney}</p>
        `
        document.querySelector('.box6').innerHTML = totalhtml;
    }
    xhrcost.send();
}





//function atama
document.querySelector('#savebuton').addEventListener('click',PostData);


document.onkeypress = enter;
function enter(e) {
  if (e.which == 13) { PostData(); }
}

function PostData(){

    //Verileri Alma
    var id = localStorage.getItem("id");
    var customerInfo = document.getElementById('customerInfo').value;
    var customerName = document.getElementById('customerName').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var taxNumber = document.getElementById('taxNumber').value;
    var taxAddress = document.getElementById('taxAddress').value;

    console.log(customerInfo);
    console.log(customerName);
    console.log(phoneNumber);
    console.log(taxNumber);
    console.log(taxAddress);
    const data = {
        userID: id,
        customerInfo: customerInfo, 
        customerName: customerName, 
        phoneNumber: phoneNumber, 
        taxNumber: taxNumber, 
        taxAddress: taxAddress 
    }
    console.log(data);

    

    var json =JSON.stringify(data);

    console.log(json);

    var url= "http://192.168.1.152:3000/api/v1/customers/add";
    var xhr = new XMLHttpRequest();
    xhr.open('POST',url,true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');

    
    
    xhr.onload = function(){
        var result = JSON.parse(xhr.response);
        console.log("result", result)
        // if(result.status == "success"){
        //     console.log("Kaydedildi");
        //     window.location = "http://127.0.0.1:5502/homepage.html"

        //     // var post =xhr.responseText;
        //     // console.log(post);
        // } else {
        //     console.log("Kaydedilemedi!!");
        // }
        window.location = "homepage.html"
    }
    xhr.send(json);

}