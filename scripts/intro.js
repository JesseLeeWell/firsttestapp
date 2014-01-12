/*
$(document).on('pageinit', function(event){
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
*/
$(document).on('pageshow', 'div:jqmData(role="page")', function(){

     var page = $(this), nextpage, prevpage;

     // check if the page being shown already has a binding
      if ( page.jqmData('bound') != true ){
            // if not, set blocker
            page.jqmData('bound', true)
            // bind
                .on('swipeleft.paginate', function() {
                    console.log("binding to swipe-left on "+page.attr('id') );
                    nextpage = page.next('div[data-role="page"]');
                    if (nextpage.length > 0) {
                        $.mobile.changePage(nextpage);
                        }
                    })
                .on('swiperight.paginate', function(){
                    console.log("binding to swipe-right "+page.attr('id');
                    prevpage = page.prev('div[data-role="page"]');
                    if (prevpage.length > 0) {
                        $.mobile.changePage(prevpage, {
                            reverse : true,
                            });
                        };
                     });
            }
        });
