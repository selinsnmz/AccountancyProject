let id = localStorage.getItem("id");
console.log(id);


function getData(){
    var url = `http://192.168.1.152:3000/api/v1/customers/${id}`;
    var xhr = new XMLHttpRequest();

    xhr.open('GET',url,true);
    xhr.onload = function(){
        console.log(xhr.status);

        var posts = JSON.parse(xhr.response);
        console.log("result", posts);


        var customerhtml="";
        for(i = 0;i < posts.data.customers.length ;i++){
            console.log("i ", i)
            console.log("id", posts.data.customers[i].id);
            console.log("name", posts.data.customers[i].customerName);
            console.log("info", posts.data.customers[i].customerInfo);
            console.log("phoneNumber", posts.data.customers[i].phoneNumber);
        

            customerhtml +=`
              <div class="customerdiv">
                <button class="customerbtn" id = "${posts.data.customers[i].id}"  onClick="deleteData(this)"><img src="../img/close.png"></button>
                <p class="p411">Şirket Adı: ${posts.data.customers[i].customerName}</p>
                <p class="p411">Şirket Unvanı: ${posts.data.customers[i].customerInfo}</p>
                <p class="p411">Telefon Numarası: ${posts.data.customers[i].phoneNumber}</p>
                <button class="sendbtn" id = "${posts.data.customers[i].id}"  onClick="showData(this)"><button>
              </div>`
            
        document.querySelector('.box4').innerHTML = customerhtml;
        }



        var balancehtml=`
        <p class="balancedetailp1">KDV'li Alınan: ${posts.data.userbalance.inMoneyVAT}</p>
        <p class="balancedetailp">KDV Miktarı: ${posts.data.userbalance.amountVAT}</p>
        <p class="balancedetailp">KDV'siz Alınan: ${posts.data.userbalance.inMoney}</p>
        <hr class="hr2"/>
        <p class="balancedetailp">Ödenen Toplam: ${posts.data.userbalance.outMoney}</p>
      `;

      document.querySelector('.balancedetail').innerHTML = balancehtml;


      var totalhtml=`
        <p class="ptotalbalance">Toplam Bakiye: ${posts.data.userbalance.totalMoney}</p>
      `
      document.querySelector('.totalbalance').innerHTML = totalhtml;
        
    }
    xhr.send();
    
}

//DELETİNG DATA
        
function deleteData(item){
  //Find customer id
  var customerid = item.id;
  console.log(customerid);

  // Delete POST
  var urldelete = `http://192.168.1.152:3000/api/v1/customers/delete/${customerid}`
  console.log(urldelete);
  var xhrdelete = new XMLHttpRequest();
  xhrdelete.open('DELETE',urldelete,true);
  xhrdelete.setRequestHeader('Content-type','application/json; charset=UTF-8');
 
 
  xhrdelete.onload = function(){
    var result = JSON.parse(xhrdelete.response);
    console.log(result);
    window.location.reload();
  }
  xhrdelete.send();

}

// Show Customer Details
function showData(item){
  var custid = item.id;
  console.log(custid);
  // var value = document.getElementById("id").value;
  // console.log(value);
  localStorage.setItem("customerid",custid);
  window.location = "companydetail.html"
}

getData();