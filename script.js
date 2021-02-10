
let dePage = document.querySelectorAll(".mygenericpage")[0];
let popUp = document.querySelectorAll(".custompopup")[0];
let cPanGenericCont = document.querySelectorAll(".genericCpanCont")[0];
let reqString = "https://script.google.com/macros/s/AKfycbyeGCc2c34RY53aturHkod7EQfF2gOaY4vxUF-cN4HXaKgTlClRazol/exec";
let paraTemplate = {"params":[{"initVal":"initKey"}]};
let localVar = {};
let cPan = document.querySelectorAll(".settcont")[0];


window.onload = () => {
    myStartUpFunction();
    checkTheURL();
}

//initiate local counters, indexes, e.t.c here
localVar["counters"] = {};
localVar.counters["currentAtCpan"] = 0


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
  document.querySelectorAll(".mycolumns")[1].style.overflowY="hidden";
}

function initiateLogInSetup (backendMatch){

  let contentBox = document.querySelectorAll(".mycolumns")[1];
  //let tempDiv = document.querySelectorAll(".logocontainer")[0];
 // tempDiv.innerText = backendMatch;
 
  let googleStuff = document.querySelectorAll(".googlestuff")[0];


  contentBox.innerHTML = "";
  contentBox.appendChild(googleStuff);
  contentBox.style.minHeight ="100%";

}

function checkTheURL () {

  let location = window.location;
  location = location.toString()
  let backendMatch = location.match(/\b(\w*backend\w*)\b/g)
  
  if(backendMatch!==null){
    cPan.remove();
    cPanGenericCont.remove();
    popUp.remove();
    
    initiateLogInSetup(backendMatch);
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
  customPopUpFunc(popUp);
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





async function hailTheServerOnAllChannels(action,value) {

  if(action==="login"){

    let data = await bundleMyData(action,value).then((data)=>{
      startHailing(data,"login",genericPrintResponse);
      return data;
    });

    

  }else if(action==="uploadFiles"){
    let data = await bundleMyData(action,value).then(()=>{
      let myObj = bundleTokenAfter(value);
      myObj.params[0].dataObj = localVar.cloudObj.contentObj.contentObj.draft;
      startHailing(myObj,"uploadImages",fillUpFiles);
    });
  }else if(action==="delete"){
    
    let data = await bundleMyData(action,value).then(()=>{
      let myObj = bundleTokenAfter(value);
      myObj.params[0].dataObj = localVar.cloudObj.contentObj.contentObj.delete;
     console.log(myObj);
      startHailing(myObj,action,fillUpFiles);
    });

  }




};


async function startHailing(data,para,functionToRunAfter){
  fetchInfoWithFilter(data,para).then((responseObj)=>{
    functionToRunAfter(responseObj);
  });

 // return tempVal; 
}



async function bundleMyData(action,value) {

  let data = "mydata";

  if(action==="login"){
    data = bundleLoginData(value);
   
  }else if(action==="uploadFiles"){

    data =  await bundleFilesForUpload().then((data)=>{
      data = updateCloudObj("images",data);
      return data;
    });
    //console.log(localVar.cloudObj.contentObj.contentObj.draft.images);
    
  }else if(action==="delete"){
    
   data = updateCloudObj("deleteFiles",{});
      
  
    //console.log(localVar.cloudObj.contentObj.contentObj.draft.images);

  }
return data;
}



function bundleLoginData(token) {
  let contextObject = JSON.parse(JSON.stringify(paraTemplate));

    contextObject.params[0]["action"] = "login";
    contextObject.params[0]["token"] = token.toString();

    return contextObject;
}


function bundleTokenAfter(token) {
  let contextObject = JSON.parse(JSON.stringify(paraTemplate));

    contextObject.params[0]["action"] = "later...";
    contextObject.params[0]["token"] = token.toString();
    contextObject.params[0]["dataObj"] = {};

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
myCanvas.style.display = "flex";

if(loginStatus==="captainHasTheCon"){
  initSetupBackend("captainHasTheCon");
}else{
 alert("There seems to be an error. Please use the correct email. <br> If the error persists please email: ismaili.a.simba@gmail.com");
 signOut();
 document.querySelectorAll("title")[0].innerHTML= "Swim - Log In";
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

function getToken() {
  var auth2 = gapi.auth2.getAuthInstance();
  let status = auth2.isSignedIn.get();
  let tokentemp = "";

  if(status){

    let user = auth2.currentUser.get()
    tokentemp = user.getAuthResponse().id_token;

  }else{

    alert("Please reload the page and log in");

  }

  return tokentemp;

}



function  initSetupBackend(status){

  if(status==="captainHasTheCon"){

    setupBackendCanvasLoggedIn();

  }else{


  }


};

async function setupBackendCanvasLoggedIn(){

  let myButt = document.createElement("div");
  myButt.className = "mylogbutt";
  let myGoogleBox = document.querySelectorAll(".googlestuff")[0];
  myButt.innerHTML = `<a href="#" onclick="signOut();">Sign out</a>`;
  myGoogleBox.appendChild(myButt);

  let tempdiv = document.createElement("div");
  tempdiv.id = "temporarydiv";
  document.querySelectorAll(".mycolumns")[1].appendChild(tempdiv)
  document.querySelectorAll(".mycolumns")[1].style.overflowY="scroll";

  cPan.style.backgroundColor = "#061826";
  cPan.style.borderColor = "#061826";
  cPan.querySelectorAll(".cpancontentcont")[0].innerHTML = "";
  document.querySelectorAll(".mycolumns")[1].appendChild(cPan);
  //tempdiv.innerHTML = localVar.cloudObj.backendHTML;

  document.querySelectorAll("title")[0].innerHTML= "Swim - You're In!";
  
  insertAndExecute("temporarydiv",localVar.cloudObj.backendHTML).then(function(){
    addBackendEventListeners();
    fillUpFiles(localVar.cloudObj);
  });


}




 async function insertAndExecute(id, text) {
  document.getElementById(id).innerHTML = text;
  var scripts = Array.prototype.slice.call(document.getElementById(id).getElementsByTagName("script"));
  for (var i = 0; i < scripts.length; i++) {
      if (scripts[i].src != "") {
          var tag = document.createElement("script");
          tag.src = scripts[i].src;
          document.getElementsByTagName("head")[0].appendChild(tag);
      }
      else {
         eval(scripts[i].innerHTML);
      }
  }
}


function addBackendEventListeners(){

  let cPanCont = document.querySelectorAll(".setinset")[0];
  cPanCont.style.visibility = "visible";

  addCPanActionClicks();
  addInputFileReading();

  
}

function addCPanActionClicks(){

  addCPanActionClicksforImages();
};


function addCPanActionClicksforImages(){
  let myClickables = document.querySelectorAll(".backendoxtitle");
  let thisTempCounter = 0;
  myClickables.forEach(element=>{
    element.id = element.className+thisTempCounter;
      element.addEventListener("click",displayYourCPanOptions)
      thisTempCounter++;
  })
};

function displayYourCPanOptions(){
  let parent = this.parentNode;
    
  if(parent.classList.contains("bigcontcollapse")){

    collapseCpan();
    
  }else{

  
    let theNum = this.id.slice(14);
    theNum = parseInt(theNum,10);
  
    let tempDiv = document.querySelectorAll(".logocontainer")[0];
    tempDiv.innerHTML = theNum;
    

  displayCpanOptions(theNum);
   

  }
}

function displayCpanOptions(eleIndex){

  localVar.counters.currentAtCpan = eleIndex;

  if(eleIndex==0){

    displayImageCpanOptions();
   

  }else if(eleIndex==1){
    displaySiteMapCpanOptions();

  }else if(eleIndex==2){

    displayPostsCpanOptions();

  }else if(eleIndex==3){

    //displayPostAddEdCpanOptions();

  }

 
}

function  displayImageCpanOptions(){

  //let container = document.querySelectorAll(".setinset")[0];
  let contentMom = document.querySelectorAll(".cpancontentcont")[0];
  let context = "menuIm";
  let numberOfBoxes = 2 //delete and upload

  let sumOfHeight = fillContentMom(contentMom,context,numberOfBoxes);
  expandTheCpan(sumOfHeight);
    


}



function  displaySiteMapCpanOptions(){

  //let container = document.querySelectorAll(".setinset")[0];
  let contentMom = document.querySelectorAll(".cpancontentcont")[0];
  let context = "menuSite";
  let numberOfBoxes = 2 //update and edit

  let sumOfHeight = fillContentMom(contentMom,context,numberOfBoxes);
  expandTheCpan(sumOfHeight);

}

function  displayPostsCpanOptions(){

  //let container = document.querySelectorAll(".setinset")[0];
  let contentMom = document.querySelectorAll(".cpancontentcont")[0];
  let context = "menuPosts";
  let numberOfBoxes = 4 //edit and delete and publish and unpublish

  let sumOfHeight = fillContentMom(contentMom,context,numberOfBoxes);
  expandTheCpan(sumOfHeight);

}

function  displayPostAddEdCpanOptions(){

  //let container = document.querySelectorAll(".setinset")[0];
  let contentMom = document.querySelectorAll(".cpancontentcont")[0];
  let context = "menuPostsss";
  let numberOfBoxes = 4 //edit and delete and publish and unpublish

  let sumOfHeight = fillContentMom(contentMom,context,numberOfBoxes);
  expandTheCpan(sumOfHeight);

}


function fillContentMom(contentMom,context,numberOfBoxes){

  let sumOfHeight

  if(context==="menuIm"){
    let boxHeight = 42;
    let myTextArr = ["Delete Files", "Upload Files"]

  sumOfHeight =  fillBoxes(contentMom,boxHeight,numberOfBoxes,myTextArr);
  }else if(context==="menuSite"){
    let boxHeight = 42;
    let myTextArr = ["Update", "Edit"];

  sumOfHeight =  fillBoxes(contentMom,boxHeight,numberOfBoxes,myTextArr);


  }else if(context==="menuPosts"){
    let boxHeight = 42;
    let myTextArr = ["Delete", "Edit","Publish","Unpublish"];

  sumOfHeight =  fillBoxes(contentMom,boxHeight,numberOfBoxes,myTextArr);


  }

  return sumOfHeight;
};


function fillBoxes(contentMom,boxHeight,numberOfBoxes,myTextArr){

  let sumOfHeight = 0;
  contentMom.innerHTML = "";

  for(let i = 0; i<numberOfBoxes;i++){
    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = myTextArr[i];
    tempDiv.style.height = boxHeight+"px";
    tempDiv.className = "butts";
    tempDiv.addEventListener("click",addCpanOptsClickFuncs);
    sumOfHeight = sumOfHeight + boxHeight;
    contentMom.appendChild(tempDiv);

  }

  return sumOfHeight;
};


function expandTheCpan(sumOfHeight){
sumOfHeight = 369;
let cPanInside = document.querySelectorAll(".setinset")[0]
  /*

  if(sumOfHeight>569){
    sumOfHeight = 569;
  }

  
  let compStyles = window.getComputedStyle(cPanInside);
  let height = compStyles.getPropertyValue('height');
  height = height.slice(0, height.length-2);
 // alert(height);
  height = parseInt(height,10);

  if(height>569){
    height= 569;
  }

  if(height>50&&sumOfHeight<569&&height<569){
    sumOfHeight = sumOfHeight + height;
  }else{
    sumOfHeight = 569;
  }

  

  sumOfHeight = sumOfHeight + 36;
*/
  cPanInside.style.height = sumOfHeight+"px";
}

function collapseCpan (){

  let cPanInside = document.querySelectorAll(".setinset")[0]

  cPanInside.style.height = "100%";
  document.querySelectorAll(".cpancontentcont")[0].innerHTML = "";

  removeFileSelectClicks();
}

function addCpanOptsClickFuncs(){

  let cPanItem = this;
  let menuBoxIndex = localVar.counters.currentAtCpan;
  let menuBox = document.querySelectorAll(".backendchildcontainer")[menuBoxIndex]; 
  let tempDiv = document.querySelectorAll(".logocontainer")[0];

  if(menuBoxIndex==0){

    addFileUploadFuncs("images",cPanItem,menuBox);

  }else if(menuBoxIndex==1){

  }else if(menuBoxIndex==2){

  }else if(menuBoxIndex==3){

  }
  

}


function addFileUploadFuncs(context,cPanItem,menuBox){

  let thisButtText = cPanItem.innerText;

  if(context==="images"){

    if(thisButtText==="Upload Files"){
     
      cPanItem.addEventListener("click", genericInputClick);
    }else if(thisButtText==="Delete Files"){
      cPanItem.addEventListener("click",setupForFileDeletion);
      
    }

    


  }

}

function genericInputClick(){
  let menuBoxIndex = localVar.counters.currentAtCpan;
  let menuBox = document.querySelectorAll(".backendchildcontainer")[menuBoxIndex]; 
  let thisInput = menuBox.querySelectorAll("input")[0];
  thisInput.click();
}

function addInputFileReading(){

  let inputs = document.querySelectorAll("input");

  inputs.forEach(element=>{
    element.addEventListener("input",readDeFilesToCpan);
   
  })


}



function readDeFilesToCpan(){

  let logoCont = document.querySelectorAll(".logocontainer")[0];
  let contentBox = document.querySelectorAll(".cpancontentcont")[0];
  let filesArr = this.files;
  



 let sumOfHeight = writeFilesToCpan(filesArr,contentBox);
 

  expandTheCpan(sumOfHeight)

 // logoCont.innerHTML= filesArr[0].name;


}

function writeFilesToCpan(filesArr,contentBox) {
  let numOfFilesCont = cPanGenericCont.querySelectorAll("span")[0];
  let fileDeetsCont = cPanGenericCont.querySelectorAll(".imageListItemCont");
  let cloneFD = fileDeetsCont[0].cloneNode(true);
  let sumOfHeight = 0;
  fileDeetsCont.forEach(element=>{
    element.remove();
  })

  numOfFilesCont.innerHTML = filesArr.length;

  localVar.counters["filesForUploadArr"] = filesArr;
  for(let i=0;i<filesArr.length;i++){

    sumOfHeight = sumOfHeight + 18;

    let tempdiv = cloneFD.cloneNode(true);
    let fileNameCont = tempdiv.querySelectorAll(".filename")[0];
    let fileTypeCont = tempdiv.querySelectorAll(".filetype")[0];
    let fileSizeCont = tempdiv.querySelectorAll(".filesize")[0];

    fileNameCont.innerHTML = filesArr[i].name;
    fileSizeCont.innerHTML = filesArr[i].size;
    fileTypeCont.innerHTML = filesArr[i].type;

    tempdiv.innerHTML = "";
    tempdiv.appendChild(fileNameCont);
    tempdiv.appendChild(fileTypeCont);
    tempdiv.appendChild(fileSizeCont);

    
    cPanGenericCont.appendChild(tempdiv);

  }
  //contentBox.innerHTML = "";
  collapseCpan();

  let sumOfH = fillBoxes2(contentBox,42,2,["Cancel","Upload"]);

  sumOfH = sumOfH + sumOfHeight;
  cPanGenericCont.style.visibility = "visible";
  contentBox.appendChild(cPanGenericCont);
  return sumOfH;

}


function fillBoxes2(contentMom,boxHeight,numberOfBoxes,myTextArr){

  let sumOfHeight = 0;
  contentMom.innerHTML = "";

  for(let i = 0; i<numberOfBoxes;i++){
    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = myTextArr[i];
    tempDiv.style.height = boxHeight+"px";
    tempDiv.className = "butts";
    tempDiv.addEventListener("click",addImageUpoadFuncs);
    sumOfHeight = sumOfHeight + boxHeight;
    contentMom.appendChild(tempDiv);

  }

  return sumOfHeight;
};

function addImageUpoadFuncs(){
  let myText = this.innerText;

  if(myText==="Cancel"){
    collapseCpan();
    document.getElementById("backendoxtitle0").click();
  }else{
    let token = getToken();
    hailTheServerOnAllChannels("uploadFiles",token);
  }
  
 // console.log(myText);
}

async function bundleFilesForUpload(){

  let filesDataObj = [];
  let copy = {fileInfo:{"ogname":"","meme":""},fileData:""};
  

  for(let i = 0 ; i < localVar.counters.filesForUploadArr.length ; i++){

    let tempObj = JSON.parse(JSON.stringify(copy));



      let file = localVar.counters.filesForUploadArr[i];

      tempObj.fileInfo.ogname = file.name;
      tempObj.fileInfo.meme = file.type;
      tempObj.fileData = await readFile(file).then((file)=>{
        file =  btoa(file);
        return file;
      }).then((file)=>{
        return file;
      })

      filesDataObj.push(tempObj);

  
    }
   
  

  return filesDataObj;

}

async function readFile (file){

  const toBinaryString = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

let parsedFile = null;
parsedFile =  await toBinaryString(file);

  return parsedFile;
}


function updateCloudObj(context,data){

  

if(context==="images"){
  //console.log(localVar.cloudObj.contentObj.contentObj.draft.images);
  let copy =  localVar.cloudObj.contentObj.contentObj.draft.images[0];
  localVar.cloudObj.contentObj.contentObj.draft.images = [];
  let [myDate]    = new Date().toLocaleDateString("en-US").split("-");
  let [hour, minute, second] = new Date().toLocaleTimeString("en-US").split(/:| /);

  for(let i = 0 ; i < data.length ; i++){

    let tempObj = JSON.parse(JSON.stringify(copy));

    tempObj.data = data[i].fileData;
    tempObj.name =  data[i].fileInfo.ogname;
    tempObj.id =  myDate+"---"+hour+minute+second+i+"---"+tempObj.name;
    tempObj.info.push({"mime":data[i].fileInfo.meme});
    tempObj.info.push({"timeObj":[{"myDate":myDate},{"hour":hour},{"minute":minute},{"second":second}]});

 //   console.log(data.length);

 localVar.cloudObj.contentObj.contentObj.draft.images.push(tempObj);

  }

//  console.log(localVar.cloudObj.contentObj.contentObj.draft.images);
}else if(context==="deleteFiles"){
  let copy = localVar.cloudObj.contentObj.contentObj.delete[0];
  let itemsToDel = document.querySelectorAll(".cpancontentcont")[0];
  itemsToDel = itemsToDel.querySelectorAll(".fileListItemCont");
  localVar.cloudObj.contentObj.contentObj.delete = [];

  for(let i = 0 ; i < itemsToDel.length ; i++){

    let tempObj = JSON.parse(JSON.stringify(copy));

    tempObj.type =  "file";
    tempObj.id =  itemsToDel[i].querySelectorAll(".idhref")[0].innerText;

 //   console.log(data.length);

 localVar.cloudObj.contentObj.contentObj.delete.push(tempObj);

  }

  data = localVar.cloudObj.contentObj.contentObj.delete;
  //console.log(data)
  
}
return data;
}



function fillUpFiles(responseObj) {
  localVar["cloudObj"] = responseObj;
  let filesArr = localVar.cloudObj.contentObj.contentObj.published.images;
  filesArr.splice(0,1);

  let pageLim = 5;
  let numOfFiles =  filesArr.length;
  let numOfPages = Math.floor(numOfFiles/pageLim);
  let remainder = Math.floor(numOfFiles%pageLim);

  if(numOfPages<1||numOfPages==1&&remainder<1){
    numOfPages = 1;
  }else if(numOfPages>=1){
    numOfPages = numOfPages + 1;

  }

  
  //let myPage = createFilePageContObj(numOfPages,pageLim,remainder);

      
      let fileConts = document.querySelectorAll(".fileListItemCont");
      let fileCont = fileConts[0];
      let parent = fileCont.parentNode;

      fileConts.forEach(element=>{
        element.remove();
      })

      for(let i=0 ; i <numOfFiles ; i++){
        let tempDiv = fileCont.cloneNode(true);
        tempDiv = fillTempFileDiv(tempDiv,filesArr[i]);
        parent.appendChild(tempDiv);
      }
    



 
//  console.log(numOfPages);
  

}

function fillTempFileDiv(tempDiv,fileObj) {

  let myHref1 = document.createElement("a");
  myHref1.innerHTML = "X";
  let myHref2 = document.createElement("a");
  myHref2.className = "idhref";
  myHref1.className = "testhref1";
  let myStyle = document.createElement("style");
  myStyle.innerHTML = `
    
      .testhref1{
        position: absolute;
        top: 0px;
        left: 0px;
        display: block;
        width: 100%;
        height: 100%;
        background-color: #e8dab2;
        color: #061826;
        font-size: 24px;
        text-align: center;
        font-weight: bold;
        opacity: 0;
        z-index: 100;
      }

      .idhref{
        position: absolute;
        top: 0px;
        left: 0px;
        display: block;
        font-size:0px;
        width: 0px;
        height: 0px;
        background-color: transparent;
        z-index: 50;

      }
  `;

  tempDiv.querySelectorAll(".filename")[0].innerHTML = fileObj.realName;
  tempDiv.querySelectorAll(".filetype")[0].innerHTML = "";
  tempDiv.querySelectorAll(".filesize")[0].innerHTML = fileObj.size;
  myHref2.innerText = fileObj.name;
  tempDiv.appendChild(myHref1);
  tempDiv.appendChild(myHref2);
  tempDiv.appendChild(myStyle);

  return tempDiv;

}







/*
function createFilePageContObj(numOfPages,pageLim,remainder){

  let myNav = document.querySelectorAll(".inputcontainer")[0];
  let fileConts = document.querySelectorAll(".fileListItemCont");
  let fileCont = fileConts[0];

  fileConts.forEach(element=>{
    element.remove();
  })

  myNav.remove();

  let obj = {};
  let bigArr = [];

  for(let i=0 ; i < numOfPages ; i++){
    let tempObj = JSON.parse(JSON.stringify(obj));
    tempObj["I am"] = "Page "+i;
    bigArr.push(tempObj);
    tempObj = null;
  }

 return bigArr;
}
*/

function setupForFileDeletion(){

  let butClone = this.cloneNode(true);
  let fileContClone = cPanGenericCont.querySelectorAll(".imageListItemCont")[0].cloneNode(true);
  let parent = this.parentNode;

  parent.innerHTML = "";

  butClone.innerHTML = `Please click the files you want to delete. <br> To unselect, click again. <br> When done, click here to confirm deletion`;
  butClone.style.height = "auto";

  butClone.addEventListener("click",sendDeletionsToServer);

  addFileClicks(fileContClone,parent,butClone);

  parent.appendChild(butClone);

}


function addFileClicks(fileContClone,parent,butClone){

  let myClickableFileHrefs = document.querySelectorAll(".testhref1");

  myClickableFileHrefs.forEach(element => {
    element.addEventListener("click",toggleFileSelectStyle)
  })


}


function toggleFileSelectStyle() {
  let fileContClone = this.parentNode.cloneNode(true);
  fileContClone.id = this.parentNode.querySelectorAll(".idhref")[0].innerText;
  let parent = document.querySelectorAll(".cpancontentcont")[0];
  

  if(this.classList.contains("testhref1selected")){

    removeSelectedFileFromCpan(parent,this.parentNode);
    this.classList.toggle("testhref1selected");


  }else{
    parent.appendChild(fileContClone);
    this.classList.toggle("testhref1selected");

  }
}

function removeFileSelectClicks () {
  let myClickableFileHrefs = document.querySelectorAll(".testhref1");

  myClickableFileHrefs.forEach(element => {
    element.removeEventListener("click",toggleFileSelectStyle,false)
  })
}

function removeSelectedFileFromCpan(parent,fileParentNode){

  let idtoCheck = fileParentNode.querySelectorAll(".idhref")[0].innerText;
  let deNode = document.getElementById(idtoCheck);
  deNode.remove();

};


function sendDeletionsToServer () {
  let token = getToken();
  hailTheServerOnAllChannels("delete",token);

}



function customPopUpFunc(popupEle) {

  popupEle.style.visibility = "visible";

  document.querySelectorAll(".mycolumns")[1].appendChild(popupEle);
}