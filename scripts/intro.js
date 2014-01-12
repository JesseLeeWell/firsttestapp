
$(document).on('pageinit', function(event){
	$('div.ui-page').unbind();
  $('div.ui-page').on("swipeleft", function () { 
    var nextpage = $(this).next('div[data-role="page"]');
      if (nextpage.length > 0) {
       // $.mobile.changePage(nextpage, "slide", false, true);
	  event.stopImmediatePropagation();
		$(':mobile-pagecontainer').pagecontainer('change', nextpage, {
			transition: 'slidefade',
			changeHash: false,
			reverse: false,
			showLoadMsg: true
		});
		return false;
      }
  });

  $('div.ui-page').on("swiperight", function () { 
	
    var prevpage = $(this).prev('div[data-role="page"]');
    if (prevpage.length > 0) {
     // $.mobile.changePage(prevpage, { transition: "slide", reverse: true }, true, true);
	 event.stopImmediatePropagation();
	  $(':mobile-pagecontainer').pagecontainer('change', prevpage, {
			transition: 'slidefade',
			changeHash: false,
			reverse: true,
			showLoadMsg: true
		});
		return false;
    }
  });
  

 
});

function closeIntro()
{
	appwindow = window.open('index.html', '_self', 'location=yes');

}
function closeIntroPerminataly()
{
	storageSet('hideintro', 'true');
	appwindow = window.open('index.html', '_self', 'location=yes');
}
