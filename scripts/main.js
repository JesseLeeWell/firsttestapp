document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	navigator.splashscreen.hide();
	//deviceInfoApp = new deviceInfoApp();
	//deviceInfoApp.run();
	 var ref = window.open('http://apache.org', '_blank', 'location=yes');
         ref.addEventListener('loadstart', function() { alert('start: ' + event.url); });
         ref.addEventListener('loadstop', function() { alert('stop: ' + event.url); });
         ref.addEventListener('exit', function() { alert(event.type); });

	//window.localStorage.setItem("key", "value");
        //var keyname = window.localStorage.key(i);
        // keyname is now equal to "key"
        var value = window.localStorage.getItem("key");
        // value is now equal to "value"
		//alert(value);
        //window.localStorage.removeItem("key");
        window.localStorage.setItem("key2", "value2");

		//var ref = window.open('https://www.kiosk.continuetogive.com/index.php?moduleType=Module_Search&task=show.results', '_blank', 'location=yes');
	//ref.addEventListener('loadstart', function() { alert('start: ' + event.url); });
	
}
function openSearchPage()
{
	var ref = window.open('https://www.kiosk.continuetogive.com/index.php?moduleType=Module_Search&task=show.results', '_blank', 'location=yes');
	ref.addEventListener('loadstart', function() { alert('start: ' + event.url); });
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


function deviceInfoApp() {
}

deviceInfoApp.prototype = {
    
	run:function() {
		var that = this;
		document.getElementById("deviceName").addEventListener("click", function() {
			that._viewDeviceName.apply(that, arguments);
		});
		document.getElementById("deviceCordovaVersion").addEventListener("click", function() {
			that._viewCordovaVersion.apply(that, arguments);
		});
		document.getElementById("devicePlatform").addEventListener("click", function() {
			that._viewDevicePlatform.apply(that, arguments);
		});
		document.getElementById("deviceUUID").addEventListener("click", function() {
			that._viewDeviceUUID.apply(that, arguments);
		});
		document.getElementById("deviceVersion").addEventListener("click", function() {
			that._viewDeviceVersion.apply(that, arguments);
		});
	},
    
	_viewDeviceName : function() {
		var infoField = document.getElementById("infoField");
		infoField.innerHTML = device.model;
	},
    
	_viewCordovaVersion : function() {
		var infoField = document.getElementById("infoField");
		infoField.innerHTML = device.cordova;
	},
    
	_viewDevicePlatform : function () {
		var infoField = document.getElementById("infoField");
		infoField.innerHTML = device.platform;
	},
    
	_viewDeviceUUID : function () {
		var infoField = document.getElementById("infoField");
		infoField.innerHTML = device.uuid;
	},
    
	_viewDeviceVersion:function viewDeviceVersion() {
		var infoField = document.getElementById("infoField");
		infoField.innerHTML = device.version;
	}
};