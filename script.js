
let dePage = document.querySelectorAll(".mygenericpage")[0];
let reqString = "https://script.google.com/macros/s/AKfycbyeGCc2c34RY53aturHkod7EQfF2gOaY4vxUF-cN4HXaKgTlClRazol/exec";
let paraTemplate = {"params":[{"initVal":"initKey"}]};
let localVar = {};

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
 /*  var profile = googleUser.getBasicProfile();
 console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
 
  console.log('Token: ' + googleUser.getAuthResponse().id_token);
   */
  let signInBut = document.querySelectorAll(".g-signin2")[0];
  signInBut.style.visibility = "collapse";
  signInBut.style.width = "0px";

  let token = googleUser.getAuthResponse().id_token;

  hailTheServerOnAllChannels("login",token);
}





async function fetchInfoWithFilter (data,para) {

  data = JSON.stringify(data);
    

  var myRequest = new Request(reqString+"?paraOne="+para);
  

       
  const returnVal = await fetch(myRequest, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'omit', // include, *same-origin, omit
    headers: {
      //'Content-Type': 'text/txt'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: data // body data type must match "Content-Type" header
  })
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

      
       // document.querySelectorAll(".mycolumns")[1].innerHTML = returnVal;
        return returnVal; 

    // tempDiv.innerHTML = Object.entries(localVar.values)[0][1][3] ;   
};





function hailTheServerOnAllChannels(action,value) {

  if(action==="login"){

    let data = bundleMyData("login",value);

    startHailing(data,"login",genericPrintResponse);

  }




};


async function startHailing(data,para,functionToRunAfter){
  fetchInfoWithFilter(data,para).then((responseObj)=>{
    functionToRunAfter(responseObj);
  });

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
 localVar["cloudObj"] = responseObj;
  let loginStatus = responseObj.tokenObject.status;
let myCanvas = document.querySelectorAll(".mycolumns")[1];
//myCanvas.innerHTML = "";
myCanvas.style.color = "black";
myCanvas.style.fontSize = "14px";
myCanvas.style.fontWeight = "600";
myCanvas.style.letterSpacing = "2px";

if(loginStatus==="captainHasTheCon"){
  initSetupBackend("captainHasTheCon");
}else{
  myCanvas.innerHTML = loginStatus;
}
//myCanvas.innerHTML = Object.entries(responseObj.tokenObject);

 
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    location.reload();
    console.log('User signed out.');
  });
}



function  initSetupBackend(status){

  if(status==="captainHasTheCon"){

    setupBackendCanvasLoggedIn();

  }else{


  }


};

function setupBackendCanvasLoggedIn(){

  let myButt = document.createElement("div");
  myButt.className = "mylogbutt";
  let myGoogleBox = document.querySelectorAll(".googlestuff")[0];
  myButt.innerHTML = `<a href="#" onclick="signOut();">Sign out</a>`;
  myGoogleBox.appendChild(myButt);



}