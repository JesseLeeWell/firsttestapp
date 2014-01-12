$(document).on('pageinit', function(event){
  $('div.indexpage').on("swipeleft", function () {
    var nextpage = $(this).next('div[data-role="page"]');
      if (nextpage.length > 0) {
        $.mobile.changePage(nextpage, "slide", false, true);
      }
  });

  $('div.indexpage').on("swiperight", function () {
    var prevpage = $(this).prev('div[data-role="page"]');
    if (prevpage.length > 0) {
      $.mobile.changePage(prevpage, { transition: "slide", reverse: true }, true, true);
    }
  });
});

  
