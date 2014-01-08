 // Wait for Cordova to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // Global InAppBrowser reference
    var iabRef = null;

    function iabLoadStart(event) { alert('in load start');
        alert(event.type + ' - ' + event.url);
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
         openstartpage();
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
	alert('in search');
	var ref = null;
	ref = window.open('https://www.kiosk.continuetogive.com/index.php?moduleType=Module_Search&task=show.results', '_blank', 'location=yes');
	ref.addEventListener('loadstart', iabLoadStart);
	/*
	ref.addEventListener('loadstart', 
		function() 
		{ 
			alert('in loadstart');
			
			var url = event.url;
			if(url.indexOf("?displayname") != -1)
			{
				//var displayname = $.url(url).param('displayname');
				alert("here");
				//save this page
			}
			
		});
	*/
}
