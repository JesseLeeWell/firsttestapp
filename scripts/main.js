 // Wait for Cordova to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // Global InAppBrowser reference
    var iabRef = null;

    function iabLoadStart(event) {
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
         iabRef = window.open('http://apache.org', '_blank', 'location=yes');
         iabRef.addEventListener('loadstart', iabLoadStart);
         iabRef.addEventListener('loadstop', iabLoadStop);
         iabRef.addEventListener('exit', iabClose);
    }
