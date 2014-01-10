
function unlockKiosk()
{
	
	//get the pin they entered.  If it is correct, let them go to either search or settings (index) depending on success path
	var successPath = storageGet('securesuccesspath');
	storageSet('securecancelpath', 'index');
	var pintyped = $('#pin').val();
	var pinstored = storageGet('pin');
	
	if(pintyped == pinstored)
	{
		if(successPath == 'search')
		{
			showMessage("Your kiosk has been unlocked.  You can now search for the church, organization, or fundraiser you are setting your kiosk to.", '', " ", "OK");
			openSearchPage();
		}
		else
		{
			$(':mobile-pagecontainer').pagecontainer('change', '#indexkpage', {
				transition: 'slidefade',
				changeHash: false,
				reverse: false,
				showLoadMsg: true
			});
			//$.mobile.changePage('#indexkpage','slide');
			//appwindow = window.open('index.html', '_self', 'location=yes');
		}
	}
	else
	{
		showMessage("Incorrect Pin, please try again.", '', " ", "OK");
		//alert("Sorry, but this is not the correct pin");
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
	showMessage("We have sent your pin to "+email, '', " ", "OK");
	//alert("We have sent your pin to "+email);

	

}
function cancelUnlockKiosk()
{
	var securecancelpath = storageSet('securecancelpath', 'index');
	if(securecancelpath == 'index')
	{
		$(':mobile-pagecontainer').pagecontainer('change', '#indexkpage', {
			transition: 'slidefade',
			changeHash: false,
			reverse: false,
			showLoadMsg: true
		});
		//appwindow = window.open('index.html', '_self', 'location=yes');
	}
	else
	{
		openDonationPage('');
	}
}