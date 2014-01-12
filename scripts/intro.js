  
$(document).on('pageinit', function(event){
  $('div.ui-page').on("swipeleft", function () {
    var nextpage = $(this).next('div[data-role="page"]');
      if (nextpage.length > 0) {
       // $.mobile.changePage(nextpage, "slide", false, true);
	  
		$(':mobile-pagecontainer').pagecontainer('change', nextpage, {
			transition: 'slidefade',
			changeHash: false,
			reverse: false,
			showLoadMsg: true
		});
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
    }
  });
  
  $("body").off().on("swipeleft", function(event) {
		//alert('hello');
		/*window.location.href = "html/first.html";*/             
	});

	$("body").off("swipeleft").on("swipeleft", function(event) {
		//alert('hello');
		/*window.location.href = "html/first.html";*/             
	});
 
});

 