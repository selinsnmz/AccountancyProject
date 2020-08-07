// Show Detail
var userID = localStorage.getItem("id");
console.log(userID);
var customerID = localStorage.getItem("customerid");
console.log(customerID);
var customernotes = [];
var customerpayments = [];




getDetail();

function getDetail(){
    
    var url =`http://192.168.1.152:3000/api/v1/customers/${userID}/details/${customerID}`;
    var xhr = new XMLHttpRequest();

    xhr.open('GET',url,true);
    xhr.onload = function(){
        console.log(xhr.status);

        var post = JSON.parse(xhr.response);
        console.log("result", post);

        console.log(post.customer.customerName);
        console.log(post.customer.customerInfo);


        var customerhtml =`
            <p class="customerdetailp">Şirket Adı: ${post.customer.customerName}</p>
            <p class="customerdetailp">Şirket Unvanı: ${post.customer.customerInfo}</p>
        `;

        document.querySelector('.customerdetail').innerHTML = customerhtml;


        var customerpayments = post.customer.payments;
        console.log(customerpayments);
        var paymenthtml="";
        
        
        for(i=0; i< post.customer.payments.length; i++){
            console.log(post.customer.payments[i].inOrOut);
            if(post.customer.payments[i].inOrOut == false){
                var date = post.customer.payments[i].date;
                var a = date.slice(0,10);
                paymenthtml +=`
                    <div class="customerpaymentsdiv">
                        <button class="customerpayments-btn" id="${post.customer.payments[i].id}" onClick="deletePaymentsList(this)" ><img src"close.png"></button>
                        <p class="pcustomerpayments">   COST: -${post.customer.payments[i].cost},  DATE: ${a}</p>
                    </div>`
            }else{
                var date = post.customer.payments[i].date;
                var a = date.slice(0,10);
                paymenthtml +=`
                    <div class="customerpaymentsdiv">
                        <button class="customerpayments-btn" id="${post.customer.payments[i].id}" onClick="deletePaymentsList(this)" ><img src"close.png"></button>
                        <p class="pcustomerpayments">   COST :  +${post.customer.payments[i].cost},  DATE :  ${a}</p>
                    </div>`
            }

            document.querySelector('.paymentlist').innerHTML = paymenthtml;
        }


       // 

        var paymentlisthtml="";
        var paymentlist2html="";
        
        
        paymentlisthtml +=`
        Alınan Ödeme: ${post.customer.customerbalance.inMoney}`;
        document.querySelector('.payment-getcostp').innerHTML = paymentlisthtml;
            
        paymentlist2html +=`
        Yapılan Ödeme: ${post.customer.customerbalance.outMoney} `;
        document.querySelector('.payment-getcostp2').innerHTML = paymentlist2html;

         




        var customernotes = post.customer.notes ;
        console.log(customernotes);
        var noteshtml="";
        
        for(i=0; i < post.customer.notes.length; i++){
            console.log(post.customer.notes[i].notes);

            noteshtml +=`
                <div class="customernotesdiv">
                  <button class="customernotes-btn"  id="${post.customer.notes[i].id}" onClick="deleteNotes(this)"><img src="../../assets/Accountancy-icons/close.png"></button>
                  <p class="customernotesp">${post.customer.notes[i].notes}</p>
                </div>
            `

            document.querySelector('.customernotes').innerHTML = noteshtml;
            
        }
        // document.querySelector('#customernotes-btn').addEventListener('click',deleteNotes);


     }
     xhr.send();
}



showPayment();
function showPayment(){
    var urlcost = `http://192.168.1.152:3000/api/v1/customers/${userID}`;
    var xhrcost = new XMLHttpRequest();

    xhrcost.open('GET',urlcost,true);
    xhrcost.onload = function(){
        console.log(xhrcost.status);

        var posts = JSON.parse(xhrcost.response);
        console.log("result", posts);

        var userhtml =`${posts.data.companyName}`;
        document.querySelector('.username').innerHTML = userhtml;

        var userhtml1 = `${posts.data.companyInfo}`
        document.querySelector('.userInfo').innerHTML = userhtml1;



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
    xhrcost.send();
}





// Popup Al
var modal1 = document.getElementById('myModal1');
// Kipi açan düğmeyi al
var btn1 = document.getElementById("myBtn1");
// Kipi kapatan <span> öğesini edinin
var span1 = document.getElementsByClassName("close1")[0];
// Kullanıcı düğmeyi tıklattığında
btn1.onclick = function() {
    modal1.style.display = "block";
}
// Kullanıcı <span> (x) düğmesini tıkladığında, popup
span1.onclick = function() {
    modal1.style.display = "none";
}
// Kullanıcı modelden başka herhangi bir yeri tıklattıysa, onu kapatın.
window.onclick = function(event) {
    if (event.target == modal1) {
        modal1.style.display = "none";
    }
}


document.querySelector('.odemeyap-btn').addEventListener('click',odemeYap);


function odemeYap(){
    var cost = parseInt(document.getElementById('odemetutari-odemeyap').value);
    var date = document.getElementById('date1').value;
    // var VAT2 = document.getElementsByName('radio1');
    var inOrOut = "0";
    var infoKDV = "false";
    
    // console.log(VAT.values());

    // for(var i = 0; i < VAT2.length; i++){
    //     if(VAT2[i].checked){
    //         // console.log('checked:' + VAT2[i].value);
    //         var infoKDV = VAT2[i].value;

    //     }}

    console.log(cost);
    console.log(date);
    console.log(infoKDV);

    odemeAlYap(cost,infoKDV,inOrOut,date);

}




//2.popup

// Popup Al
var modal2 = document.getElementById('myModal2');
// Kipi açan düğmeyi al
var btn2 = document.getElementById("myBtn2");
// Kipi kapatan <span> öğesini edinin
var span2 = document.getElementsByClassName("close2")[0];
// Kullanıcı düğmeyi tıklattığında
btn2.onclick = function() {
    modal2.style.display = "block";
}
// Kullanıcı <span> (x) düğmesini tıkladığında, popup
span2.onclick = function() {
    modal2.style.display = "none";
}
// Kullanıcı modelden başka herhangi bir yeri tıklattıysa, onu kapatın.
window.onclick = function(event) {
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
}

document.querySelector('.odemeal-btn').addEventListener('click',odemeAl);


function odemeAl(){
    var cost = parseInt(document.getElementById('odemetutari-odemeal').value);
    var date = document.getElementById('date2').value;
    var VAT1 = document.getElementsByName('radio2');
    var inOrOut = "1";

    
    
    // console.log(VAT.values());

    for(var i = 0; i < VAT1.length; i++){
        if(VAT1[i].checked){
            console.log('checked:' + VAT1[i].value);
            var infoKDV = VAT1[i].value;

        }}

    console.log(cost);
    console.log(date);
    console.log(infoKDV);

    odemeAlYap(cost,infoKDV,inOrOut,date);

}



//Ödeme Al Yap
function odemeAlYap(cost,infoKDV,inOrOut,date){
    console.log(cost); 
    console.log(infoKDV); 
    console.log(inOrOut); 
    console.log(date); 
    console.log(userID);
    console.log(customerID);

   const data = { 
        userID: userID, 
        customerID: customerID, 
        cost: cost, 
        infoKDV: infoKDV, 
        inOrOut: inOrOut, 
        date: date 
                }

    console.log(data);

    var json = JSON.stringify(data);
    console.log(json);

    var urlpayment = "http://192.168.1.152:3000/api/v1/payments/add";
    var xhrpayment = new XMLHttpRequest();

    xhrpayment.open('POST',urlpayment,true);
    xhrpayment.setRequestHeader('Content-type','application/json; charset=utf-8');

    xhrpayment.onload = function(){
        // var resultpayment = JSON.parse(xhrpayment.response);
        // console.log("resultnotes" , resultpayment);

        window.location.reload();

    }
    xhrpayment.send(json);
}


// DELETE PAYMENTS LİST

// if(customerpayments.length != 0){
// document.querySelector('.customerpayments-btn').addEventListener('click',deletePaymentsList);

function deletePaymentsList(item){
    var paymentsid = item.id;
    console.log(paymentsid);
     
    var urldeletep = `http://192.168.1.152:3000/api/v1/payments/${userID}/delete/${paymentsid}`;
    var xhrdeletep = new XMLHttpRequest();

    xhrdeletep.open('DELETE',urldeletep,true);

    xhrdeletep.onload = function(){
        var result = xhrdeletep.response;
        console.log(result);
        window.location.reload();
    }
    xhrdeletep.send();
}
// }






//3.popup

// Popup Al
var modal3 = document.getElementById('myModal3');
// Kipi açan düğmeyi al
var btn3 = document.getElementById("myBtn3");
// Kipi kapatan <span> öğesini edinin
var span3 = document.getElementsByClassName("close3")[0];
// Kullanıcı düğmeyi tıklattığında
btn3.onclick = function() {
    modal3.style.display = "block";
}
// Kullanıcı <span> (x) düğmesini tıkladığında, popup
span3.onclick = function() {
    modal3.style.display = "none";
}
// Kullanıcı modelden başka herhangi bir yeri tıklattıysa, onu kapatın.
window.onclick = function(event) {
    if (event.target == modal3) {
        modal3.style.display = "none";
    }
}

// ADD NOTES

var notes = document.getElementsByClassName('notekle').value;
var date = document.getElementsByClassName('date3').value;

document.querySelector('.notekle-btn').addEventListener('click',notEkle);


function notEkle(){
    console.log(customerID);
    var notes = document.getElementById('notekle').value;

    console.log(notes);
    var date = document.getElementById('date3').value;

    console.log(date);

    const data = {
        customerID: customerID,
        notes: notes,
        date: date
    }
    console.log(data);

    var json = JSON.stringify(data);
    console.log(json);

    var urlnotes = "http://192.168.1.152:3000/api/v1/notes/add";
    var xhrnotes = new XMLHttpRequest();

    xhrnotes.open('POST',urlnotes,true);
    xhrnotes.setRequestHeader('Content-type','application/json; charset=utf-8');

    xhrnotes.onload = function(){
        var resultnotes = JSON.parse(xhrnotes.response);
        console.log("resultnotes" , resultnotes);

        window.location.reload();

    }
    xhrnotes.send(json);

}


console.log(customernotes.length);

// DELETE NOTES

// if(customernotes.length != 0){
// document.querySelector('#customernotes-btn').addEventListener('click',deleteNotes);

function deleteNotes(item){
    var noteid = item.id;
    console.log(noteid);
    // var id = document.getElementById('customernotes-btn').value;
    // console.log(id);
     
    var urldeleten = `http://192.168.1.152:3000/api/v1/notes/delete/${noteid}`;
    var xhrdeleten = new XMLHttpRequest();

    xhrdeleten.open('DELETE',urldeleten,true);

    xhrdeleten.onload = function(){
        var result = xhrdeleten.response;
        console.log(result);
        window.location.reload();
    }
    xhrdeleten.send();
}
// }










