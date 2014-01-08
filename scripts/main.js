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
		var urlParams;
		var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

		urlParams = {};
		while (match = search.exec(query))
			urlParams[decode(match[1])] = decode(match[2]);
			
		alert(urlParams["displayname"]);
		//displayname = $.url(url).param('displayname');
		window.localStorage.setItem("displayname", "displayname");
		alert("here");
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
