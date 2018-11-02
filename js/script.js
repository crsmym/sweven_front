$(function(){

  // navigation effect
  $(window).scroll(function () {
    // 100 = The point you would like to fade the nav in.
    if ($(window).scrollTop() > 100) {
      $('#header').addClass('active');
    } else {
      $('#header').removeClass('active');
    }
  });
  
  // contents lazyload effect
  $(window).scroll(function () {
    $('.lazyload1').each(function (i) {
      var bottom_of_object = $(this).offset().top + $(this).outerHeight()
      var bottom_of_window = $(window).scrollTop() + $(window).height()
      if (bottom_of_window > bottom_of_object) {
        $(this).animate({
          'opacity': '1',
          'top': 0,
        }, 500)
      }
    });
    $('.lazyload2').each(function (i) {
      var bottom_of_object = $(this).offset().top + $(this).outerHeight()
      var bottom_of_window = $(window).scrollTop() + $(window).height()
      if (bottom_of_window > bottom_of_object) {
        $(this).animate({
          'opacity': '1',
          'top': 0,
        }, 800)
      }
    });
    $('.lazyload3').each(function (i) {
      var bottom_of_object = $(this).offset().top + $(this).outerHeight()
      var bottom_of_window = $(window).scrollTop() + $(window).height()
      if (bottom_of_window > bottom_of_object) {
        $(this).animate({
          'opacity': '1',
          'top': 0,
        }, 1100)
      }
    });
  })
})
