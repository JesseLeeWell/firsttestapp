 // Wait for Cordova to load
    //
document.addEventListener("deviceready", onDeviceReady, false);

    // Global InAppBrowser reference
var iabRef = null;

function iabLoadStart(event) { 
	alert(event.type + ' - ' + event.url);
}

 function iabLoadStartSearch(event) { 
	
	cururl = event.url;
	
	if(cururl.indexOf("?displayname") != -1)
	{
		displayname = getParameterByName("displayname", cururl);
		
			
		alert(displayname);
		//displayname = $.url(url).param('displayname');
		window.localStorage.setItem("displayname", displayname);
		window.localStorage.setItem("url", cururl);
		alert("here");
		var infoField = document.getElementById("savedSearchDonationButton");
		infoField.innerHTML = displayname;
		//alert(displayname);
		//save this page
	}
}


function iabLoadStop(event) {
	alert(event.type + ' - ' + event.url);
}

function iabClose(event) {
	 alert(event.type);
	 iabRef.removeEventListener('loadstart', iabLoadStart);
	 iabRef.removeEventListener('loadstop', iabLoadStop);
	 iabRef.removeEventListener('exit', iabClose);
}

    // Cordova is ready
    //
function onDeviceReady() {
	var displayname = window.localStorage.getItem("displayname", "displayname");
	alert(displayname);
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
	
	iabRef = window.open('https://www.kiosk.continuetogive.com/index.php?moduleType=Module_Search&task=show.results', '_blank', 'location=yes');
	
	iabRef.addEventListener('loadstart', iabLoadStartSearch);
	iabRef.addEventListener('exit', iabClose);
	
}
function getParameterByName(name, url) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(url);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function openDonationPage()
{
	var url = window.localStorage.getItem("url");
	iabRef = window.open(url, '_blank', 'location=yes');	
	
	iabRef.addEventListener('exit', iabClose);

}
