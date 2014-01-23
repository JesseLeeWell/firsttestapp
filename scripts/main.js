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
	var _baseURL =  'http://dev.continuetogive.com/';
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
var _contactRequestURL ='index.php?moduleType=Module_kiosk&task=appcontactrequestform';
var _searchPage = 'index.php?moduleType=Module_Search&task=show.results';
var _signUpPage = 'index.php?moduleType=Module_Registration&task=regflow_church&registrationstep=regcreateaccount'

var appwindow = null;
var browserwindow = null;
var _storagePageID = "storagePageID";
var _storageDisplayName = "storageDisplayName";
var _storageFullURL = "storageFullURL";
var _storagePin = 'pin';
//set our startpageselection
var tmpstartpageselection = storageGet('startpageselection');
if(!tmpstartpageselection)
{
	//if they never set it before, set it to settingspage
	storageSet('startpageselection', 'settingspage');
}


// Cordova is ready
//


function onDeviceReady() { 
	var hideIntro = storageGet('hideintro');
	var alreadyshowedintro = window.sessionStorage.getItem('alreadyshowedintro');
	
	if((hideIntro && hideIntro == 'true') || (alreadyshowedintro && alreadyshowedintro == 'true'))
	{
		setupSettingsPage();
		determinStartPage();
	}
	else
	{
		//set the session storage that it showed the intro
		window.sessionStorage.setItem("alreadyshowedintro", "true");	
		loadMoreInfo('');		
		//appwindow = window.open('intro.html', '_self', 'location=yes');
	}
	
	
	
}
function determinStartPage()
{
	//based on the settings they chose, open the correct screen
	//settings vs donation vs point of sale
	
	//first make sure we have a donation page set, if not defaule to settings.
	var pageid = getPageID();
	var displayname = getDisplayName();	
	
	if((!pageid || /^\s*$/.test(pageid)) || (!displayname || /^\s*$/.test(displayname)))
	{
		return true; //just leave them on the settings screen
	}
	else
	{
		
		//determine what they set as the opeing page
		var startpageselection = storageGet('startpageselection');
		switch(startpageselection)
		{
			case 'donationpage':
			  openDonationPage('');
			  break;
			case 'pointofsalepage':
			  openDonationPage('/donation_prompt?show_purchase_form=true');
			  break;
			default:
			  //default is just settings page, so just do nothing
			  break;
		}
	
	}
	

}
function iabLoadStart(event) { 
	//alert(event.type + ' - ' + event.url);
}

 function iabLoadStartSearch(event) { 
	
	cururl = event.url;
	
	if(cururl.indexOf("?displayname") != -1)
	{
		
		storeURLInfo(cururl);
		
		setupSettingsPage();
		
		storageSet('step-search','true');
	
		browserwindow.removeEventListener('exit', iabCloseSearch);
		//browserwindow.addEventListener('exit', iabCloseDonation);
		//browserwindow.close();
		showMessage("Now that your page is set, you can put your kiosk into donation or point of sale mode from this settings screen ", '', " ", "OK");
		//browserwindow.close();
		//alert("end found displayname");
		//appwindow = window.open('index.html', '_self', 'location=yes');
		
		//
		/*
		$(':mobile-pagecontainer').pagecontainer('change', '#setstartscreenpage', {
			transition: 'slidefade',
			changeHash: false,
			reverse: true,
			showLoadMsg: true
		});
		*/
		/*
		$(':mobile-pagecontainer').pagecontainer('change', '#indexpage', {
			transition: 'slidefade',
			changeHash: false,
			reverse: true,
			showLoadMsg: true
		});
		*/
		browserwindow.close();
	}
}

 function iabLoadStopDonation(event) { 
	
	cururl = event.url;
	
	if(cururl.indexOf("donation_prompt") != -1)
	{
		
		
	
		
		//browserwindow.executeScript({code: "callAlertTest();"});

	}
}

function iabLoadStop(event) {
	
}

function iabCloseSearch(event) {	
 
	 browserwindow.removeEventListener('loadstart', iabLoadStartSearch);
	 browserwindow.removeEventListener('loadstop', iabLoadStop);
	 browserwindow.removeEventListener('exit', iabCloseSearch);
	 //make sure the home screen is back to index
	 appwindow = window.open('index.html', '_self', 'location=yes');	
}

function iabCloseDonation(event) {	
 
	
	showUnlockKioskPage();	 
	 browserwindow.removeEventListener('loadstop', iabLoadStop);
	 browserwindow.removeEventListener('exit', iabCloseDonation);
	//appwindow = window.open('index.html', '_self', 'location=yes');	//donation windows should already be at the index any ways
	//openDonationPage('');
}
function openSearch()
{
	//set the settings path
	storageSet('securesuccesspath', 'search');
	storageSet('securecancelpath', 'index');
	//determin if they should go to the secure kiosk or the unlock kiosk page
	var pin = storageGet(_storagePin);
	var email = storageGet('email');
	if((!pin || /^\s*$/.test(pin)) || (!email || /^\s*$/.test(email)))
	{
		showSecureKioskPage();
	}
	else
	{
		
		showUnlockKioskPage();
	
	}
}
function openSearchPage()
{	
	browserwindow = window.open(_kioskURL + _searchPage, '_blank', 'location=no,closebuttoncaption=settings');
	
	browserwindow.addEventListener('loadstart', iabLoadStartSearch);
	//browserwindow.addEventListener('loadstop', iabLoadStartSearch);
	browserwindow.addEventListener('exit', iabCloseSearch);
	
}
function openSignupPage()
{
	
	browserwindow = window.open(_baseURL + _signUpPage, '_blank', 'location=no,closebuttoncaption=settings');
	//browserwindow.addEventListener('exit', iabClose);
	
}
function getParameterByName(name, url) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(url);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function openDonationPage(extras)
{
	
	storageSet('securesuccesspath', 'index');
	storageSet('securecancelpath', 'donation');
	var pageid = getPageID();
	var url =_kioskURL + pageid + extras;
	
	browserwindow = window.open(url, '_blank', 'location=no,closebuttoncaption=settings');	
	
	browserwindow.addEventListener('exit', iabCloseDonation);
	browserwindow.addEventListener('loadstop', iabLoadStopDonation);

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
function setupSettingsPage()
{
	alert('setupSettingsPage');
	//set up the radio buttons for start page
	var startpageselection = storageGet('startpageselection');	
	var nametoset = "radiostartpagegroup"+startpageselection;
	$("#"+nametoset).prop("checked", true);
	$("input[type='radio']").checkboxradio("refresh");
	
	//setup the donation buttons
	alert('setupSettingsPage');
	setupDonationAndPurchaseButtons();
	
}
function setupDonationAndPurchaseButtons()
{
	alert('setupDonationAndPurchaseButtons');
	var fullURL = getFullURL();
	//now get the pageid
	
	var pageid = getPageID();
	var displayname = getDisplayName();
	
	var infoField = document.getElementById("savedSearchDonationButton");
	infoField.innerHTML = displayname;
	
	var infoField2 = document.getElementById("savedSearchPOSButton");
	infoField2.innerHTML = displayname;
	alert('setupDonationAndPurchaseButtons');
	
	//determin if we should show those buttons
	if((!pageid || /^\s*$/.test(pageid)) || (!displayname || /^\s*$/.test(displayname)))
	{
		$( "#preselectedpagediv" ).hide();
	}
	else
	{
		
		$( "#preselectedpagediv" ).show();
	
	}
	alert('setupDonationAndPurchaseButtons');
	
	

}
function findPageID(fullURL)
{
	
	var urlAux = fullURL.split('/');
    var pageid = urlAux[3];
	urlAux = pageid.split('?');
	pageid = urlAux[0];
	return pageid;
}
function showUnlockKioskPage()
{
	//set the state to locked so our timer function will cancel after the apointed time.
	//but if they unlock it with the correct pin, then the state will go to unlocked, and the cancel option will not happen
	storageSet('unlockkioskcurrentstate', 'locked');
	setTimeout(function() {
		  cancelUnlockKioskIfStateIsCorrect();// Do something after 5 seconds
	}, 10000);
	
	
	 $(':mobile-pagecontainer').pagecontainer('change', '#unlockkioskpage', {
        transition: 'pop',
        changeHash: false,
        reverse: false,
        showLoadMsg: true,
		role: "dialog"
    });
	//$.mobile.changePage('#unlockkioskpage','slidefade');
	//appwindow = window.open('index.html#unlockkioskpage', '_self', 'location=yes');
}
function showSecureKioskPage()
{
	 $(':mobile-pagecontainer').pagecontainer('change', '#securekioskpage', {
        transition: 'pop',
        changeHash: false,
        reverse: false,
        showLoadMsg: true,
		role: "dialog"
    });
	//$.mobile.changePage('#securekioskpage','slidefade');
	//window.location = "securekiosk.html";
}
function saveStartPageRadioButtonValue()
{
	var startpageselection = $('input[name=startpagegroup]:checked').val();
	//alert(startpageselection);
	storageSet('startpageselection', startpageselection);
	
}
function loadSettingsPage()
{
	appwindow = window.open('index.html', '_self', 'location=yes');
	
}

function loadMoreInfo(pagetype)
{
	
	switch(pagetype)
		{
			case 'dialog':
			   $(':mobile-pagecontainer').pagecontainer('change', 'intro.html', {
					transition: 'pop',
					changeHash: false,
					reverse: false,
					showLoadMsg: true,
					role: "dialog"
				});
			  break;
			
			default:
			  appwindow = window.open('intro.html', '_self', 'location=yes');
			  break;
		}
	

}

function loadContactRequest()
{
	var url = _baseURL + _contactRequestURL;
	appwindow = window.open(url, '_blank', 'location=no');
	
}
function openSetStartScreenPage()
{
	 $(':mobile-pagecontainer').pagecontainer('change', '#setstartscreenpage', {
		transition: 'pop',
		changeHash: false,
		reverse: false,
		showLoadMsg: true,
		role: "dialog"
	});
}

function closeSetStartScreenPage()
{
	storageSet('step-startscreen','true');
	 $(':mobile-pagecontainer').pagecontainer('change', '#startreceivingdonationspage', {
		transition: 'pop',
		changeHash: false,
		reverse: true,
		showLoadMsg: true,
		role: "page"
	});
}
function clearDataForTesting()
{

	window.localStorage.clear();
	setupSettingsPage();
	

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

function setupbyscreensize()
{

	width = $(document).width(); // returns width of HTML document
	if(width < 912)
	{
		
	 $('#donation_calculator_div').hide();
	 $('#donation_prompt_div').removeClass('inline_block');
	}
	else
	{
		$('#donation_calculator_div').show();
		$('#donation_prompt_div').addClass('inline_block');
		
	}
}
$( window ).resize(function() {
setupbyscreensize();
});

setupbyscreensize();
