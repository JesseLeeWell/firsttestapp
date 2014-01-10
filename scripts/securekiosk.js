
function secureKiosk()
{
	
	//first gather the data they entered
	//do some checking and validating	
	var pin = $('#pin').val();
	var confirmpin = $('#confirmpin').val();
	var email = $('#email').val();
	var name = $('#name').val();	
	var phonenumber = $('#phonenumber').val();
	var represents = $('#represents').val();
	
	var urlstring = "&name="+name+"&email="+email+"&phonenumber="+phonenumber+"&represents="+represents;
	
	var urltocall = _baseURL + _kiosksetupURL + urlstring;
	//store this stuff locally
	storageSet('pin', pin);
	storageSet('email', email);
	storageSet('name', name);
	storageSet('phonenumber', phonenumber);
	storageSet('represents', represents);
	
	// Assign handlers immediately after making the request,
	// and remember the jqxhr object for this request
	var jqxhr = $.post( urltocall);
	showMessage("Your kiosk has been secured.  You can now search for the organization you are setting your kiosk to.", '', " ", "OK");

	iabRef = window.open(_kioskURL + 'index.php?moduleType=Module_Search&task=show.results', '_blank', 'location=yes');
	
	iabRef.addEventListener('loadstart', iabLoadStartSearch);
	iabRef.addEventListener('exit', iabClose);
	
}