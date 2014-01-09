
function unlockKiosk()
{
	//get the pin they entered.  If it is correct, let them go to search.
	var pintyped = $('#pin').val();
	var pinstored = storageGet('pin');
	
	if(pintyped == pinstored)
	{
		
		iabRef = window.open(_kioskURL + 'index.php?moduleType=Module_Search&task=show.results', '_blank', 'location=yes');
	
		iabRef.addEventListener('loadstart', iabLoadStartSearch);
		iabRef.addEventListener('exit', iabClose);
	}
	else
	{
		
		alert("Sorry, but this is not the correct pin");
	}
	
	
	
}

function fogotPin()
{
	//forgot pin, send email
	//get the pin they entered in storage, and hit our server with the email
	//they have saved.  Then let them know we sent the pin.
	var pin = storageGet('pin');
	var email = storageGet('email');
	
	var urlstring = "&pin="+pin+"&email="+email;
	
	var urltocall = _baseURL + _forgotPinURL + urlstring;	
	var jqxhr = $.post( urltocall);
	alert("We have sent your pin to "+email);

	

}