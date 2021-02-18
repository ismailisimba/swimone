
let dePage = document.querySelectorAll(".mygenericpage")[0];
let myGoogleBox = document.querySelectorAll(".googlestuff")[0];
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
localVar["tempDivs"] = {};
localVar["counters"] = {};
localVar["columnHtml"] = "<p>Sorry, Something may have gone wrong!!?<p>";
localVar["newHtml"] = "<p>Sorry, Something may have gone wrong!!?<p>";
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
  contentBox.style.minHeight ="1000px";

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





async function hailTheServerOnAllChannels(action,value) {

  if(action==="login"){

    let data = await bundleMyData(action,value).then((data)=>{
      startHailing(data,"login",genericPrintResponse);
      return data;
    });

    customPopUpFunc(popUp,"Signing In","fullsteamahead");

  }else if(action==="uploadFiles"){
    let data = await bundleMyData(action,value).then(()=>{
      let myObj = bundleTokenAfter(value);
      myObj.params[0].dataObj = localVar.cloudObj.contentObj.contentObj.draft;
      startHailing(myObj,"uploadImages",genericPrintResponse);
    });

    customPopUpFunc(popUp,"Uploading","fullsteamahead");
  }else if(action==="delete"){
    
    let data = await bundleMyData(action,value).then(()=>{
      let myObj = bundleTokenAfter(value);
      myObj.params[0].dataObj = localVar.cloudObj.contentObj.contentObj.delete;
     
     customPopUpFunc(popUp,"Deleting","fullsteamahead");
      startHailing(myObj,action,genericPrintResponse);
    });

  }else if(action==="uploadStory"){
    let data = await bundleMyData(action,value).then(()=>{

      
      let myObj = bundleTokenAfter(value);
      myObj.params[0].dataObj = localVar.cloudObj.contentObj.contentObj.draft.stories[0];
     
     customPopUpFunc(popUp,"Saving Story","fullsteamahead");
      startHailing(myObj,action,genericPrintResponse);
    });

  }else if(action==="deleteStories"){
    let data = await bundleMyData(action,value).then(()=>{
      let myObj = bundleTokenAfter(value);
      myObj.params[0].dataObj = localVar.cloudObj.contentObj.contentObj.delete;
    
     customPopUpFunc(popUp,"Deleting","fullsteamahead");
      startHailing(myObj,action,genericPrintResponse);
    });
  }




};


async function startHailing(data,para,functionToRunAfter){
  fetchInfoWithFilter(data,para).then((responseObj)=>{
    functionToRunAfter(responseObj);
  });
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
  
    
  }else if(action==="delete"){
    
   data = updateCloudObj("deleteFiles",{});
      
  
    

  }else if(action==="uploadStory"){
   // data = updateCloudObj("story",value);

  }else if (action==="deleteStories"){
    data = updateCloudObj("deleteStories",{});
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
myCanvas.innerHTML = "";
myCanvas.style.color = "black";
myCanvas.style.fontSize = "14px";
myCanvas.style.fontWeight = "600";
myCanvas.style.letterSpacing = "2px";
myCanvas.style.display = "flex";
//popUp.remove();

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

  myGoogleBox.innerHTML = "";
  myGoogleBox.innerHTML =  `<div class="g-signin2" data-onsuccess="onSignIn"></div>`;

  let myButt = document.createElement("div");
  myButt.className = "mylogbutt";
  myButt.innerHTML = `<a href="#" onclick="signOut();">Sign out</a>`;
  myGoogleBox.appendChild(myButt);

  let tempdiv = document.createElement("div");
  tempdiv.id = "temporarydiv";
  document.querySelectorAll(".mycolumns")[1].appendChild(tempdiv);
  document.querySelectorAll(".mycolumns")[1].appendChild(myGoogleBox);
  document.querySelectorAll(".mycolumns")[1].style.overflowY="scroll";

  cPan.style.backgroundColor = "white";
  cPan.style.borderColor = "white";
  cPan.querySelectorAll(".setinset")[0].style.height = "48px";
  cPan.querySelectorAll(".cpancontentcont")[0].innerHTML = "";
  document.querySelectorAll(".mycolumns")[1].appendChild(cPan);
  //tempdiv.innerHTML = localVar.cloudObj.backendHTML;

  document.querySelectorAll("title")[0].innerHTML= "Swim - You're In!";
  customPopUpFunc(popUp,"phrase","stop");
  insertAndExecute("temporarydiv",localVar.cloudObj.backendHTML).then(function(){
    addBackendEventListeners();
    fillUpFiles(localVar.cloudObj);
    fillUpSiteMapInfo(localVar.cloudObj);
    fillUpStories(localVar.cloudObj);
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
   // tempDiv.innerHTML = theNum;
    

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
  let numberOfBoxes = 1 // edit

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
  let numberOfBoxes = 5 //view, edit and delete and publish and unpublish

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
    let myTextArr = ["Edit"];

  sumOfHeight =  fillBoxes(contentMom,boxHeight,numberOfBoxes,myTextArr);


  }else if(context==="menuPosts"){
    let boxHeight = 42;
    let myTextArr = ["View","Edit","Delete","Publish","Unpublish"];

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


}

function addCpanOptsClickFuncs(){

  let cPanItem = this;
  localVar.tempDivs["butt1"] = this;
  let menuBoxIndex = localVar.counters.currentAtCpan;
  let menuBox = document.querySelectorAll(".backendchildcontainer")[menuBoxIndex]; 
  let tempDiv = document.querySelectorAll(".logocontainer")[0];

  if(menuBoxIndex==0){

    addFileUploadFuncs(cPanItem);
   

  }else if(menuBoxIndex==1){

    addSiteMapFuncs(cPanItem);
   

  }else if(menuBoxIndex==2){

    addPostListFuncs(cPanItem);
  

  }else if(menuBoxIndex==3){
  

  }
  

}


function addFileUploadFuncs(cPanItem){

  let thisButtText = cPanItem.innerText;


    if(thisButtText==="Upload Files"){
      genericInputClick();
    }else if(thisButtText==="Delete Files"){
      setupForFileDeletion();  
    }

}

function addSiteMapFuncs(cPanItem){

  let thisButtText = cPanItem.innerText;


    if(thisButtText==="Edit"){
      siteMapShowEditors(cPanItem);
    }else{  
    }

}


function addPostListFuncs(cPanItem){

  let thisButtText = cPanItem.innerText;


    if(thisButtText==="Delete"){
      setupForStoryDeletion();
    }else if(thisButtText==="View"){ 
      setupForStoryView(); 
    }


}


function siteMapShowEditors(cPanItem){
  cPanItem.style.height = "auto";
  cPanItem.innerText = "Please review all the entries then click Save - at bottom of Sitemap Box - when done.";
  let siteMapCont = document.querySelectorAll(".bigcontrolpanelcont")[0];
  let myTextAreas = siteMapCont.querySelectorAll("textarea");
  let mySelects = siteMapCont.querySelectorAll("select");

  myTextAreas.forEach(element => {
    element.style.visibility = "visible";
  })

  mySelects.forEach(element => {
    element.style.visibility = "visible";
  })

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

 

 localVar.cloudObj.contentObj.contentObj.draft.images.push(tempObj);

  }


}else if(context==="deleteFiles"){
  let copy = localVar.cloudObj.contentObj.contentObj.delete[0];
  let itemsToDel = document.querySelectorAll(".cpancontentcont")[0];
  itemsToDel = itemsToDel.querySelectorAll(".fileListItemCont");
  localVar.cloudObj.contentObj.contentObj.delete = [];

  for(let i = 0 ; i < itemsToDel.length ; i++){

    let tempObj = JSON.parse(JSON.stringify(copy));

    tempObj.type =  "file";
    tempObj.id =  itemsToDel[i].querySelectorAll(".idhref")[0].innerText;

 

 localVar.cloudObj.contentObj.contentObj.delete.push(tempObj);

  }

  data = localVar.cloudObj.contentObj.contentObj.delete;
  
  
}else if(context==="deleteStories"){
  let copy = localVar.cloudObj.contentObj.contentObj.delete[0];
  let itemsToDel = document.querySelectorAll(".cpancontentcont")[0];
  itemsToDel = itemsToDel.querySelectorAll(".fileListItemCont");
  localVar.cloudObj.contentObj.contentObj.delete = [];

  for(let i = 0 ; i < itemsToDel.length ; i++){

    let tempObj = JSON.parse(JSON.stringify(copy));

    tempObj.type =  "story";
    tempObj.id =  itemsToDel[i].querySelectorAll(".idhref")[0].innerText;



 localVar.cloudObj.contentObj.contentObj.delete.push(tempObj);

  }

  data = localVar.cloudObj.contentObj.contentObj.delete;
  

  


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

  let butClone = localVar.tempDivs.butt1.cloneNode(true);
  let fileContClone = cPanGenericCont.querySelectorAll(".imageListItemCont")[0].cloneNode(true);
  let parent = document.querySelectorAll(".cpancontentcont")[0];

  parent.innerHTML = "";

  butClone.innerHTML = `Please click the files you want to delete. <br> To unselect, click again. <br> When done, click here to confirm deletion`;
  butClone.style.height = "auto";

  butClone.addEventListener("click",sendDeletionsToServer);

  addFileClicks();

  parent.appendChild(butClone);

}

function setupForStoryDeletion(){

  let butClone = localVar.tempDivs.butt1.cloneNode(true);
  let fileContClone = cPanGenericCont.querySelectorAll(".imageListItemCont")[0].cloneNode(true);
  let parent = document.querySelectorAll(".cpancontentcont")[0];

  parent.innerHTML = "";

  butClone.innerHTML = `Please click the stories/posts you want to delete. <br> To unselect, click again. <br> When done, click here to confirm deletion`;
  butClone.style.height = "auto";

  butClone.addEventListener("click", sendDeletionsToServerToo);

  addStoryClicks();

  parent.appendChild(butClone);

}


function addFileClicks(){

  let myClickableFileHrefs = document.querySelectorAll(".testhref1");

  myClickableFileHrefs.forEach(element => {
    element.addEventListener("click",toggleFileSelectStyle)
  })

}

function addStoryClicks(){

  let myClickableStoryHrefs = document.querySelectorAll(".postpreview");

  myClickableStoryHrefs.forEach(element => {
    element.addEventListener("click",toggleStorySelectStyle)
  })


}


function toggleFileSelectStyle() {
  let fileContClone = this.parentNode.cloneNode(true);
  fileContClone.id = this.parentNode.querySelectorAll(".idhref")[0].innerText;
  let parent = document.querySelectorAll(".cpancontentcont")[0];
  

  if(this.classList.contains("testhref1selected")){

    removeSelectedFileFromCpan(parent,this.parentNode);
    this.classList.remove("testhref1selected");


  }else{
    parent.appendChild(fileContClone);
    this.classList.add("testhref1selected");

  }
}

function toggleStorySelectStyle() {
  let storyContClone = document.querySelectorAll(".fileListItemCont")[0].cloneNode(true);
  storyContClone.id = this.querySelectorAll(".storyhref")[0].id+",child";
  let parent = document.querySelectorAll(".cpancontentcont")[0];

  

  if(this.classList.contains("storyhref2selected")){

    removeSelectedStoryFromCpan(parent,this);
    this.classList.remove("storyhref2selected");


  }else{

    let filename = storyContClone.querySelectorAll(".filename")[0];
    let filetype = storyContClone.querySelectorAll(".filetype")[0];
    let filesize = storyContClone.querySelectorAll(".filesize")[0];
    let idhref = storyContClone.querySelectorAll(".idhref")[0];
    filetype.remove();
    filesize.remove();
    filename.innerHTML = this.querySelectorAll("h2")[0].innerHTML;
    idhref.innerHTML = this.querySelectorAll("a")[0].id;

    filename.style.height = "100%";
    filename.style.textOverflow = "unset";
    filename.style.overflow = "auto";
    filename.style.whiteSpace = "normal";

    parent.appendChild(storyContClone);
    this.classList.add("storyhref2selected");

  }
}

function removeFileSelectClicks () {
  let myClickableFileHrefs = document.querySelectorAll(".testhref1");

  myClickableFileHrefs.forEach(element => {
    element.removeEventListener("click",toggleFileSelectStyle,false)
  })
}

function removeStorySelectClicks () {
  let myClickableStoryHrefs = document.querySelectorAll(".postpreview");

  myClickableStoryHrefs.forEach(element => {
    element.removeEventListener("click",toggleStorySelectStyle,false)
    element.removeEventListener("click",showStoryReadPage,false)
  })
}

function removeSelectedFileFromCpan(parent,fileParentNode){

  let idtoCheck = fileParentNode.querySelectorAll(".idhref")[0].innerText;
  let deNode = document.getElementById(idtoCheck);
  deNode.remove();

};

function removeSelectedStoryFromCpan(parent,fileParentNode){

  let idtoCheck = fileParentNode.querySelectorAll("a")[0].id+",child";
  let deNode = document.getElementById(idtoCheck);
  deNode.remove();

};




function sendDeletionsToServer () {
  let token = getToken();
  hailTheServerOnAllChannels("delete",token);

}

function sendDeletionsToServerToo () {
  let token = getToken();
  hailTheServerOnAllChannels("deleteStories",token);

}



function customPopUpFunc(popupEle,phrase,action) {

  let mom = popupEle.querySelectorAll(".spanCont")[0];
  let deKid = mom.querySelectorAll("span")[0]

  if(action==="stop"){
    popupEle.style.visibility = "collapse";
    popupEle.remove();

  }else if(action==="fullsteamahead"){
    document.querySelectorAll(".mycolumns")[1].innerHTML = "";
    popupEle.style.visibility = "visible";
    deKid.innerText = phrase;
    document.querySelectorAll(".mycolumns")[1].appendChild(popupEle);
  }

  
}


function myResetFuncs(){
removeFileSelectClicks();
removeStorySelectClicks();

toggleFileSelectStyleOff();
toggleStorySelectStyleOff()

}


function toggleFileSelectStyleOff() {
  let fileCont = document.querySelectorAll(".imagescontainer")[0];
  let hrefs69 = fileCont.querySelectorAll(".testhref1");
  
  hrefs69.forEach(element=>{
    element.classList.remove("testhref1selected");
  })
  
}

function toggleStorySelectStyleOff() {
  let hrefs69 = document.querySelectorAll(".postpreview");
  
  hrefs69.forEach(element=>{
    element.classList.remove("storyhref2selected");
  })
  
}


function fillUpSiteMapInfo(responseObj){

  let newSettings = {};
  let cloudSettings = responseObj.settingsObj;

  newSettings["title"] = document.getElementById("posttit");
  newSettings["titleDisp"] = document.querySelectorAll(".contrpantitshow")[0];

  newSettings["catchphrase"] = document.getElementById("postcat");
  newSettings["catchphraseDisp"] = document.querySelectorAll(".contrpancatshow")[0];

  newSettings["featureOne"] = document.getElementById("feature1");
  newSettings["featureOneDisp"] = document.querySelectorAll(".featureshow1")[0];

  newSettings["featureTwo"] = document.getElementById("feature2");
  newSettings["featureTwoDisp"] = document.querySelectorAll(".featureshow2")[0];

  newSettings["featureThree"] = document.getElementById("feature3");
  newSettings["featureThreeDisp"] = document.querySelectorAll(".featureshow3")[0];

  newSettings["email"] = document.getElementById("emailcollector");
  newSettings["emailDisp"] = document.querySelectorAll(".addrshow1")[0];

  newSettings["address"] = document.getElementById("wordaddresscollector");
  newSettings["addressDisp"] = document.querySelectorAll(".addrshow3")[0];

  newSettings["fb"] = document.getElementById("fbcollector");
  newSettings["fbDisp"] = document.querySelectorAll(".addrshow4")[0];

  newSettings["num"] = document.getElementById("phonecollector");
  newSettings["numDisp"] = document.querySelectorAll(".addrshow2")[0];

  newSettings["twtt"] = document.getElementById("twtcollector");
  newSettings["twttDisp"] = document.querySelectorAll(".addrshow5")[0];

  newSettings["lnkd"] = document.getElementById("lnkdcollector");
  newSettings["lnkdDisp"] = document.querySelectorAll(".addrshow7")[0];

  newSettings["inst"] = document.getElementById("instcollector");
  newSettings["instDisp"] = document.querySelectorAll(".addrshow6")[0];
  
  //newSettings.title.innerText = "Kennoobi!";
  //newSettings.catchphrase.innerText = "Kennoobi!";
  //newSettings.featureOne.innerText = "Kennoobi!";
  //newSettings.featureTwo.innerText = "Kennoobi!";
  //newSettings.featureThree.innerText = "Kennoobi!";
  //newSettings.email.innerText = "Kennoobi!";
  //newSettings.address.innerText = "Kennoobi!";
  //newSettings.fb.innerText = "Kennoobi!";
  //newSettings.num.innerText = "Kennoobi!";
  //newSettings.twtt.innerText = "Kennoobi!";
  //newSettings.lnkd.innerText = "Kennoobi!";
  //newSettings.inst.innerText = "Kennoobi!";

  newSettings.title.style.visibility = "collapse";
  newSettings.titleDisp.innerHTML = cloudSettings.title;

  newSettings.catchphrase.style.visibility = "collapse";
  newSettings.catchphraseDisp.innerHTML = cloudSettings.catchphrase;

  newSettings.featureOne.style.visibility = "collapse";
  newSettings.featureOneDisp.innerHTML = cloudSettings.featureOne;

  newSettings.featureTwo.style.visibility = "collapse";
  newSettings.featureTwoDisp.innerHTML = cloudSettings.featureTwo;

  newSettings.featureThree.style.visibility = "collapse";
  newSettings.featureThreeDisp.innerHTML = cloudSettings.featureThree;

  newSettings.email.style.visibility = "collapse";
  newSettings.emailDisp.innerHTML = cloudSettings.buzEmail;

  newSettings.address.style.visibility = "collapse";
  newSettings.addressDisp.innerHTML = cloudSettings.address;

  newSettings.fb.style.visibility = "collapse";
  newSettings.fbDisp.innerHTML = cloudSettings.fb;

  newSettings.num.style.visibility = "collapse";
  newSettings.numDisp.innerHTML = cloudSettings.num;

  newSettings.twtt.style.visibility = "collapse";
  newSettings.twttDisp.innerHTML = cloudSettings.twt;

  newSettings.lnkd.style.visibility = "collapse";
  newSettings.lnkdDisp.innerHTML = cloudSettings.linkd;

  newSettings.inst.style.visibility = "collapse";
  newSettings.instDisp.innerHTML = cloudSettings.instg;

  
}

function deStoryFunc(storyHtml){

  let tempDivObj = document.createElement("div");
  let newStoryObj = {};
  newStoryObj["myHtml"] = "";
  newStoryObj["myImages"] = [];

  let imgObj = {id:"",data:"",mime:""};

  tempDivObj.innerHTML = storyHtml;

  let children = tempDivObj.childNodes;
  let imgindex = 0;

  children.forEach(element => {
    let names = element.childNodes;

    names.forEach(child=>{
      
      if(child.nodeName==="IMG"){
        console.log(child);

        let typeOfImage = child.src.split(":")[0];
        typeOfImage = typeOfImage.match(/\b(\w*http\w*)\b/g);

        if(typeOfImage!==null){

        }else {

          let copy = JSON.parse(JSON.stringify(imgObj));

        let [myDate]    = new Date().toLocaleDateString("en-US").split("-");
        let [hour, minute, second] = new Date().toLocaleTimeString("en-US").split(/:| /);
        console.log(child.src);

        let newArr = child.src.split(",");
        copy.data = newArr[1];
        copy.mime = newArr[0].split(";")[0];
        copy.mime = copy.mime.split(":")[1];

        copy.id = myDate+hour+minute+second+document.getElementById("editposttit").value+imgindex

        
          child.src = "https://ismizo.com/resources/icons/loading.png";
          child.id = copy.id;

          newStoryObj.myImages.push(copy);
          
        
        imgindex++;


        }
        
      
      }
    })

  
   
  })

  newStoryObj.myHtml = tempDivObj.innerHTML;
  



  
  

   localVar.cloudObj.contentObj.contentObj.draft.stories[0].storyObj = newStoryObj;
   localVar.cloudObj.contentObj.contentObj.draft.stories[0].title = document.getElementById("editposttit").value;
   localVar.cloudObj.contentObj.contentObj.draft.stories[0].description = document.getElementById("descrtit").value;
   localVar.cloudObj.contentObj.contentObj.draft.stories[0].type = "draft";

    let token = getToken();
  hailTheServerOnAllChannels("uploadStory",token);
    
}












function  fillUpStories(responseObj) {

  let stories = responseObj.contentObj.contentObj.published.stories;

  let numOfStories = stories.length;

  let storyCont = document.querySelectorAll(".postpreview")[0];
  let parent = document.querySelectorAll(".postscontainer")[0];

  parent.innerHTML = "";



  for(let i=0 ; i <numOfStories ; i++){
    let tempDiv = storyCont.cloneNode(true);
    tempDiv = fillTempStoryDiv(tempDiv,stories[i]);
    parent.appendChild(tempDiv);
  }

  

};



function fillTempStoryDiv(tempDiv,storyObj) {


  let myHref2 = document.createElement("a");
  myHref2.className = "storyhref";
  let myStyle = document.createElement("style");
  myStyle.innerHTML = `
    
      .storyhref{
        position: absolute;
        color: white;
        top: 0px;
        right: 0px;
        display: block;
        font-size:11.69px;
        width: 69px;
        height: 18px;
        box-sizing: border-box;
        background-color: transparent;
        z-index: 50;
        font-weight: normal;
        letter-spacing: 1.69px;

      }
  `;

  tempDiv.querySelectorAll("h2")[0].innerHTML = storyObj.title;
  tempDiv.querySelectorAll("p")[0].innerHTML = storyObj.description;
  
  myHref2.innerHTML = storyObj.type;
  myHref2.id = storyObj.stats[0].timeid;
  
  
  
  tempDiv.appendChild(myHref2);
  tempDiv.appendChild(myStyle);

  return tempDiv;

}


function setupForStoryView() {

  
  localVar.columnHtml = document.querySelectorAll(".mycolumns")[1];

  let parent = document.querySelectorAll(".cpancontentcont")[0];

  parent.innerHTML = "";

  let butClone = localVar.tempDivs.butt1.cloneNode(true);

  butClone.innerHTML = `Please click the stories/posts you want to read.`;
  butClone.style.height = "auto";

  parent.appendChild(butClone);
  

  let stories = document.querySelectorAll(".postpreview");

  stories.forEach(element => {
    element.addEventListener("click",showStoryReadPage);
  })
  
}

function showStoryReadPage() {
  let storyid = this.querySelectorAll(".storyhref")[0].id;
  dePage.style.visibility = "visible";

  let deBut = dePage.querySelectorAll("button")[0];

  deBut.addEventListener("click", backToBackend)
  
  localVar.columnHtml.replaceWith(dePage);
  addNewHtmlFuncs(storyid);

}

function backToBackend (){
  dePage.replaceWith(localVar.columnHtml);
  dePage.removeEventListener("click",backToBackend,false);
}


function addNewHtmlFuncs(storyid) {
  let stories = localVar.cloudObj.contentObj.contentObj.published.stories
  let searchResponse = searchStory(stories,storyid);

  if(searchResponse.status==="found"){
    populateStory(searchResponse.obj);
  }else{
    alert("Ooops there's been an error reading your post. Please report to ismaili.a.simba@gmail.com");
  }

 
};

function searchStory(stories,storyid){

  let response = {}
  response["status"] = "notFound";

  for(let i=0 ; i<stories.length ; i++){
    if(storyid===stories[i].stats[0].timeid){

      response["obj"] = stories[i];
      response.status = "found";

    }
  }

  return response

};


function populateStory(storyObj){
  let titleDiv = dePage.querySelectorAll("h1")[0];
  let storyContainer = dePage.querySelectorAll("div")[0];

  readStoryObj(storyContainer,storyObj);

  titleDiv.innerHTML = storyObj.title;

};


function readStoryObj(storyContainer,storyObj){

  storyContainer.innerHTML = storyObj.storyObj.myHtml;

  let images = storyContainer.querySelectorAll("img");

  images.forEach(element => {
    if(element.src==="https://ismizo.com/resources/icons/loading.png"){
      
      fetchDisImage(element);
    }
  })

 

};


function fetchDisImage (element) {

  let deId = {id:element.id};
  let contextObject = JSON.parse(JSON.stringify(paraTemplate));

  contextObject.params[0]["action"] = "later...";
  contextObject.params[0]["token"] = "wHaT tOkEn!";
  contextObject.params[0]["dataObj"] = deId;


  startHailing(contextObject,"quickfetch",setDisBlocToSrc);


}

async function setDisBlocToSrc(responseObj){

  let eleid = responseObj.deFileObj.id;
  let cloudBlob = responseObj.deFileObj.data;
 // cloudBlob = atob(cloudBlob);
  var b = await createMyURL(cloudBlob,eleid);

}

async function createMyURL (data,eleid) {

  //var buffer = await data.arrayBuffer();

  let myURl = await to16arr(data).then(blob => {
    //let newB = new Blob(blob);
    return blob;
  }).then(b =>{
    //const objectURL = URL.createObjectURL(b);
    return b;
  }).then(b2 =>{
    document.getElementById(`${eleid}`).src = `data:image/png;base64,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`;
    console.log(b2);
    return b2
  })

  return myURl;

}

async function to16arr(data){

  
  //var dv = new Uint16Array(data);
  //data = new Blob(dv);

    const toBinaryString2 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
  });
  
 // let parsedFile = null;
  //parsedFile =  await toBinaryString2(data);
  
    return data;
  }







