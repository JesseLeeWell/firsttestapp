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

var appwindow = null;
var browserwindow = null;
var _storagePageID = "storagePageID";
var _storageDisplayName = "storageDisplayName";
var _storageFullURL = "storageFullURL";

    // Cordova is ready
    //

function onDeviceReady() {
	setupDonationAndPurchaseButtons();

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
		appwindow = window.open('index.html', '_self', 'location=yes');		
		
	}
}


function iabLoadStop(event) {
	
}

function iabClose(event) {	 
	 browserwindow.removeEventListener('loadstart', iabLoadStart);
	 browserwindow.removeEventListener('loadstop', iabLoadStop);
	 browserwindow.removeEventListener('exit', iabClose);
}


	
function openstartpage()
{
	browserwindow = window.open('http://apache.org', '_blank', 'location=yes');
	 browserwindow.addEventListener('loadstart', iabLoadStart);
	 browserwindow.addEventListener('loadstop', iabLoadStop);
	 browserwindow.addEventListener('exit', iabClose);
}
function openSearchPage()
{
	
	browserwindow = window.open(_kioskURL + 'index.php?moduleType=Module_Search&task=show.results', '_blank', 'location=yes');
	
	browserwindow.addEventListener('loadstart', iabLoadStartSearch);
	browserwindow.addEventListener('exit', iabClose);
	
}
function openSignupPage()
{
	
	browserwindow = window.open(_baseURL + "home/churches", '_blank', 'location=yes');
	browserwindow.addEventListener('exit', iabClose);
	
}
function getParameterByName(name, url) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(url);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function openDonationPage(extras)
{
	var pageid = getPageID();
	var url =_kioskURL + pageid + extras;
	
	browserwindow = window.open(url, '_blank', 'location=yes');	
	
	browserwindow.addEventListener('exit', iabClose);

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
	
	return true;
}
function showMessage(message, callback, title, buttonName){
	
        title = title || "default title";
        buttonName = buttonName || 'OK';
		callback = callback || 'showMessageCallBack';
		
        if(navigator.notification && navigator.notification.alert){
			
			navigator.notification.alert(
				message,  // message
				showMessageCallBack,         // callback
				title,            // title
				buttonName                  // buttonName
			);
           

        }else{

            alert(message);
            callback();
        }

    }
