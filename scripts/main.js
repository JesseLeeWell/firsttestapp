document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	navigator.splashscreen.hide();
	deviceInfoApp = new deviceInfoApp();
	deviceInfoApp.run();
	var ref = window.open('https://www.continuetogive.com', '_blank', 'location=yes');
	ref.addEventListener('loadstop', 
		function(event) 
		{ 
			var s = event.url;
			alert(s.indexOf("home/churches") != -1);
			
		});
}

function openPage(page)
{
alert("start of page");
var ref = window.open(page, '_blank', 'location=yes');
/*
	ref.addEventListener('loadstop', 
		function(event) 
		{ 
			alert("done loading");
			
		});
	*/
	ref.addEventListener('loadstop', function(event) { alert('stop: ' + event.url); });

		//mCordovaWebView.sendJavaScript("javascript:cardswipefilldata('123', '123', '123', '123', '123', '123', '123', '123', '123')");
alert("done with page");
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