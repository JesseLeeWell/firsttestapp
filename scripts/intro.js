/*
$(document).on('pageinit', function(event){
  $('div.ui-page').on("swipeleft", function () {
    var nextpage = $(this).next('div[data-role="page"]');
      if (nextpage.length > 0) {
        $.mobile.changePage(nextpage, "slide", false, true);
      }
  });

  $('div.ui-page').on("swiperight", function () {
    var prevpage = $(this).prev('div[data-role="page"]');
    if (prevpage.length > 0) {
      $.mobile.changePage(prevpage, { transition: "slide", reverse: true }, true, true);
    }
  });
});

*/

$(function() {
    var scrollBarLinks = {
        0: '#home',
        1: '#link2',
        2: '#link3',
        3: '#link4',
        4: '#link5',
        5: '#link6',
        6: '#link7',
        7: '#link8',
        8: '#link9',
        9: '#link10',
        10: '#link11',
        11: '#link12'
    };
    var scrollBarText = {
        0: 'Home',
        1: 'Link 2',
        2: 'Link 3',
        3: 'Link 4',
        4: 'Link 5',
        5: 'Link 6',
        6: 'Link 7',
        7: 'Link 8',
        8: 'Link 9',
        9: 'Link 10',
        10: 'Link 11',
        11: 'Link 12'
    };
    var scrollBarIcons = {
        0: 'home',
        1: 'star',
        2: 'star',
        3: 'star',
        4: 'star',
        5: 'star',
        6: 'star',
        7: 'star',
        8: 'star',
        9: 'star',
        10: 'star',
        11: 'star'
    };

    var numLinksShown = 6;
    var scrollCursor = 0;

    for (var i = 0; i < numLinksShown; i++) {
        $("<a>", {
            'href': scrollBarLinks[i],
            'id': 'scrollBarBtn-' + i,
            'data-role': 'button',
            'data-inline': true,
            'data-icon': scrollBarIcons[i],
            'data-iconpos': 'right',
            'text': scrollBarText[i]
        }).appendTo("#scrollBar").button();
    }

    $("#scrollBar").swiperight(function() {
        if (scrollCursor == 0) {
            alert("Can't slide to the right. 0");
            return false;
        }
        $("#scrollBar > a:last").remove();
        scrollCursor--;
        $("<a>", {
            'href': scrollBarLinks[scrollCursor],
            'id': 'scrollBarBtn-' + (scrollCursor),
            'data-role': 'button',
            'data-inline': true,
            'data-icon': scrollBarIcons[scrollCursor],
            'data-iconpos': 'right',
            'text': scrollBarText[scrollCursor]
        }).appendTo("#scrollBar").button();
    });

    $("#scrollBar").swipeleft(function() {
        if (scrollCursor == scrollBarLinks.length) {
            alert("Can't slide to the left. " + scrollBarLinks.length);
            return false;
        }
        $("#scrollBar > a:first").remove();
        var nextBtn = scrollCursor + numLinksShown;
        scrollCursor++;
        $("<a>", {
            'href': scrollBarLinks[nextBtn],
            'id': 'scrollBarBtn-' + (nextBtn),
            'data-role': 'button',
            'data-inline': true,
            'data-icon': scrollBarIcons[nextBtn],
            'data-iconpos': 'right',
            'text': scrollBarText[nextBtn]
        }).appendTo("#scrollBar").button();
    });
});  
