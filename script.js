
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
  cloudBlob = atob(cloudBlob);
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
    document.getElementById(`${eleid}`).src = "image/png;base64,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";
    console.log(b2);
    return b2
  })

  return myURl;

}

async function to16arr(data){

  
  var dv = new Uint16Array(data);
  data = new Blob(dv);

    const toBinaryString2 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
  });
  
  let parsedFile = null;
  parsedFile =  await toBinaryString2(data);
  
    return parsedFile;
  }







