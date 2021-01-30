
let dePage = document.querySelectorAll(".mygenericpage")[0];

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