
let dePage = document.querySelectorAll(".mygenericpage")[0];
let reqString = "https://script.google.com/macros/s/AKfycbyeGCc2c34RY53aturHkod7EQfF2gOaY4vxUF-cN4HXaKgTlClRazol/exec";
let paraTemplate = {"params":[{"initVal":"initKey"}]};

window.onload = () => {
    myStartUpFunction();
    checkTheURL()
}




function myStartUpFunction () {

        myGenericPageFormatting();
        addLogInButt();
        addHomeClicFunc();

}



function myGenericPageFormatting (){

  dePage.remove()

    
}


function addLogInButt () {

  let dismenuContainer = document.querySelectorAll(".sidemenuitem")[0];
  let listItem = dismenuContainer.querySelectorAll("li")[0].cloneNode(true);
  listItem.className = "loginbutt";
  listItem.innerHTML = "Log In";
  dismenuContainer.appendChild(listItem);
  listItem.addEventListener("click",logInButtEventOne);  

}

function logInButtEventOne () {

  window.location = "./backend.html";
  
}

function addHomeClicFunc (){

  let dismenuContainer = document.querySelectorAll(".sidemenuitem")[0];
  let listItem = dismenuContainer.querySelectorAll("li")[0];
  listItem.addEventListener("click",reloadHomePage);

}

function reloadHomePage () {
  window.location = "./index.html";
}

function initiateLogInSetup (backendMatch){

  let contentBox = document.querySelectorAll(".mycolumns")[1];
  let tempDiv = document.querySelectorAll(".logocontainer")[0];
  tempDiv.innerText = backendMatch;
 
  let googleStuff = document.querySelectorAll(".googlestuff")[0];


  contentBox.innerHTML = "";
  contentBox.appendChild(googleStuff);
  contentBox.style.height ="100%";

}

function checkTheURL () {

  let location = window.location;
  location = location.toString()
  let backendMatch = location.match(/\b(\w*backend\w*)\b/g)
  
  if(backendMatch!==null){
    initiateLogInSetup (backendMatch);
  }
  
 
  
}


function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  console.log('Token: ' + googleUser.getAuthResponse().id_token);

  let token = googleUser.getAuthResponse().id_token;

  hailTheServerOnAllChannels("login",token);
}





async function fetchInfoWithFilter (data) {

  data = JSON.stringify(data);
    
  const myInit = {
      method: "POST",
      mode: "no-cors",
      credentials: "omit",
      headers: {
       'Content-Type': 'text/txt',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
      body:data
    };

  var myRequest = new Request(reqString+"?paraOne="+data);
  

       
  const returnVal = await fetch(myRequest, myInit)
        .then(function(response) {
          if (!response.ok) {
            
            throw new Error("HTTP error, status = " + response.status);
            
          }
          
          return response.text();
        })
        .then(function(myBlob) {
          
          var cloudObject = JSON.parse(myBlob);
          
        
          return cloudObject;
          
        })
        .catch(function(error) {
          var p = document.createElement('p');
          p.appendChild(
            document.createTextNode('Error: ' + error.message)
          );
          tempDiv = document.querySelectorAll(".mycolumns")[1];
          tempDiv2 = document.querySelectorAll(".googlestuff")[0];
          tempDiv.insertBefore(p, tempDiv2);
        });

      
        document.querySelectorAll(".mycolumns")[1].innerHTML = returnVal;
        return returnVal; 

    // tempDiv.innerHTML = Object.entries(localVar.values)[0][1][3] ;   
};





function hailTheServerOnAllChannels(action,value) {

  if(action==="login"){

    let data = bundleMyData("login",value);

    startHailing(data,genericPrintResponse);

  }




};


async function startHailing(data,functionToRunAfter){
  let tempVal = await fetchInfoWithFilter(data);
 // document.querySelectorAll(".mycolumns")[1].innerHTML = tempVal;

 // return tempVal;
}



function bundleMyData(action,value) {

  let data = "mydata";

  if(action==="login"){
    data = bundleLoginData(value);
   
  }
return data;
}



function bundleLoginData(token) {
  let contextObject = JSON.parse(JSON.stringify(paraTemplate));

    contextObject.params[0]["action"] = "initfetch";
    contextObject.params[0]["token"] = token.toString();

    return contextObject;
}


function genericPrintResponse (responseObj){

 // document.querySelectorAll(".mycolumns")[1].innerHTML = responseObj;
}