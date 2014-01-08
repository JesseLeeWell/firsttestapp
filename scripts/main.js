 // Wait for Cordova to load
    //
document.addEventListener("deviceready", onDeviceReady, false);

    // Global InAppBrowser reference
var iabRef = null;
var _baseURL = 'https://www.continuetogive.com/';
var _kioskURL = 'https://www.kiosk.continuetogive.com/';
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
		storeFullURL(cururl);
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
	var pageid = window.localStorage.getItem("pageid");
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

function setupDonationAndPurchaseButtons()
{
	var fullURL = storageGet(_storageFullURL);
	//now get the pageid
	var pageid = findPageID(fullURL);
	//get displayname
	var displayname = getParameterByName("displayname", fullURL);
	
	//save these
	storePageID(pageid);
	storeDisplayName(displayname);
	
	var infoField = document.getElementById("savedSearchDonationButton");
	infoField.innerHTML = displayname;
	
	var infoField2 = document.getElementById("savedSearchPOSButton");
	infoField2.innerHTML = displayname;
	
	

}
function findPageID(fullURL)
{
	//alert("here");
	//var donationURL = "https://www.kiosk.continuetogive.com/1597539/show_donation_prompt?donation_template.amount";
	var urlAux = fullURL.split('/');
    var pageid = urlAux[3];
	return pageid;
}
