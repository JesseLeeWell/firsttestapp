document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	//navigator.splashscreen.hide();
	alert("here");
	 var ref = window.open('http://apache.org', '_blank', 'location=yes');
         ref.addEventListener('loadstart', function() { alert('start: ' + event.url); });
         ref.addEventListener('loadstop', function() { alert('stop: ' + event.url); });
         ref.addEventListener('exit', function() { alert(event.type); });
	//window.localStorage.setItem("key", "value");
        //var keyname = window.localStorage.key(i);
        // keyname is now equal to "key"
        //var value = window.localStorage.getItem("key");
        // value is now equal to "value"
		//alert(value);
        //window.localStorage.removeItem("key");
       // window.localStorage.setItem("key2", "value2");

		//var ref = window.open('https://www.kiosk.continuetogive.com/index.php?moduleType=Module_Search&task=show.results', '_blank', 'location=yes');
	//ref.addEventListener('loadstart', function() { alert('start: ' + event.url); });
	
}
function openSearchPage()
{
	alert('in search');
	//var ref = window.open('https://www.kiosk.continuetogive.com/index.php?moduleType=Module_Search&task=show.results', '_blank', 'location=yes');
	//ref.addEventListener('loadstart', function() { alert('start: ' + event.url); });
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
function openPage(page)
{
alert("start of page");
var ref = window.open(page, '_blank', 'location=yes');

}

