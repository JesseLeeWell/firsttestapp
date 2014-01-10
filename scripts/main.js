 // Wait for Cordova to load
    //
document.addEventListener("deviceready", onDeviceReady, false);

//environment
var environment = 'dev';
//var environment = 'qa';
//var environment = 'prod';
//var environment = 'local';
 // Global InAppBrowser reference
if(environment == 'dev')
{
	var _baseURL = 'http://dev.continuetogive.com/';
	var _kioskURL = 'http://dev.kiosk.continuetogive.com/';
	
}
else if(environment == 'qa')
{
	var _baseURL = 'http://qa.continuetogive.com/';
	var _kioskURL = 'http://qa.kiosk.continuetogive.com/';
}
else if(environment == 'local')
{
	var _baseURL = 'http://dev.continuetogive.com/';
	var _kioskURL = 'http://dev.kiosk.continuetogive.com/';
}
else if(environment == 'prod')
{
	var _baseURL = 'http://www.continuetogive.com/';
	var _kioskURL = 'http://www.kiosk.continuetogive.com/';
}
else
{
	var _baseURL = 'http://dev.continuetogive.com/';
	var _kioskURL = 'http://dev.kiosk.continuetogive.com/';
}
var _kiosksetupURL = 'index.php?moduleType=Module_kiosk&task=setupkiosk';
var _forgotPinURL = 'index.php?moduleType=Module_system&task=kioskforgotpassword';

var iabRef = null;
var _storagePageID = "storagePageID";
var _storageDisplayName = "storageDisplayName";
var _storageFullURL = "storageFullURL";

    // Cordova is ready
    //
	function alertDismissed() {
    // do something
}
function onDeviceReady() {
	setupDonationAndPurchaseButtons();


navigator.notification.alert(
    'You are the winner!',  // message
    alertDismissed,         // callback
    'Game Over',            // title
    'Done'                  // buttonName
);

}


function iabLoadStart(event) { 
	//alert(event.type + ' - ' + event.url);
}

 function iabLoadStartSearch(event) { 
	
	cururl = event.url;
	
	if(cururl.indexOf("?displayname") != -1)
	{
		storeURLInfo(cururl);		
		setupDonationAndPurchaseButtons();	
		
	}
}


function iabLoadStop(event) {
	
}

function iabClose(event) {	 
	 iabRef.removeEventListener('loadstart', iabLoadStart);
	 iabRef.removeEventListener('loadstop', iabLoadStop);
	 iabRef.removeEventListener('exit', iabClose);
}


	
function openstartpage()
{
	iabRef = window.open('http://apache.org', '_blank', 'location=yes');
	 iabRef.addEventListener('loadstart', iabLoadStart);
	 iabRef.addEventListener('loadstop', iabLoadStop);
	 iabRef.addEventListener('exit', iabClose);
}
function openSearchPage()
{
	
	iabRef = window.open(_kioskURL + 'index.php?moduleType=Module_Search&task=show.results', '_blank', 'location=yes');
	
	iabRef.addEventListener('loadstart', iabLoadStartSearch);
	iabRef.addEventListener('exit', iabClose);
	
}
function openSignupPage()
{
	
	iabRef = window.open(_baseURL + "home/churches", '_blank', 'location=yes');
	iabRef.addEventListener('exit', iabClose);
	
}
function getParameterByName(name, url) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(url);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function openDonationPage(extras)
{
	var pageid = getPageID();
	var url =_kioskURL + pageid + extras;
	
	iabRef = window.open(url, '_blank', 'location=yes');	
	
	iabRef.addEventListener('exit', iabClose);

}
function storageSet(key, value)
{
	window.localStorage.setItem(key, value);
}
function storageGet(key)
{
	return window.localStorage.getItem(key);
}
function storePageID(value)
{
	storageSet(_storagePageID, value);
}
function storeFullURL(value)
{
	storageSet(_storageFullURL, value);
}
function storeDisplayName(value)
{
	storageSet(_storageDisplayName, value);
}
function getPageID()
{
	return storageGet(_storagePageID);
}
function getDisplayName()
{
	return storageGet(_storageDisplayName);
}
function getFullURL()
{
	return storageGet(_storageFullURL);
}
function storeURLInfo(fullURL)
{
	
	storeFullURL(fullURL);
	var pageid = findPageID(fullURL);
	//get displayname
	var displayname = getParameterByName("displayname", fullURL);
	
	//save these
	storePageID(pageid);
	storeDisplayName(displayname);
}
function setupDonationAndPurchaseButtons()
{
	var fullURL = getFullURL();
	//now get the pageid
	
	var pageid = getPageID();
	var displayname = getDisplayName();
	
	var infoField = document.getElementById("savedSearchDonationButton");
	infoField.innerHTML = displayname;
	
	var infoField2 = document.getElementById("savedSearchPOSButton");
	infoField2.innerHTML = displayname;
	
	

}
function findPageID(fullURL)
{
	
	var urlAux = fullURL.split('/');
    var pageid = urlAux[3];
	urlAux = pageid.split('?');
	pageid = urlAux[0];
	return pageid;
}
function showMessageCallBack()
{
	alert("in callback");
	return true;
}
function showMessage(message, callback, title, buttonName){
	
        title = title || "default title";
        buttonName = buttonName || 'OK';
		callback = callback || 'showMessageCallBack';
		alert(callback);
        if(navigator.notification && navigator.notification.alert){

            navigator.notification.alert(
                message,    // message
                callback,   // callback
                title,      // title
                buttonName  // buttonName
            );

        }else{

            alert(message);
            callback();
        }

    }
