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
      var bottom_of_object = $(this).offset().top + $(this).outerHeight() / 2
      var bottom_of_window = $(window).scrollTop() + $(window).height()
      if (bottom_of_window > bottom_of_object) {
        $(this).animate({
          'opacity': '1',
          'top': 0,
        }, 300)
      }
    });
    $('.lazyload2').each(function (i) {
      var bottom_of_object = $(this).offset().top + $(this).outerHeight() / 2
      var bottom_of_window = $(window).scrollTop() + $(window).height()
      if (bottom_of_window > bottom_of_object) {
        $(this).animate({
          'opacity': '1',
          'top': 0,
        }, 600)
      }
    });
    $('.lazyload3').each(function (i) {
      var bottom_of_object = $(this).offset().top + $(this).outerHeight() / 2 
      var bottom_of_window = $(window).scrollTop() + $(window).height()
      if (bottom_of_window > bottom_of_object) {
        $(this).animate({
          'opacity': '1',
          'top': 0,
        }, 900)
      }
    });
  });

  // mobile navigation menu slide toggle 
  $("#burger_btn").click(function(){
    $('#close_btn').show()
    $('.m_gnb .navigation_wrap').animate({
      left: 0
    },500)
    $('#dim').animate({
      left: 0
    },200)
  });

  $('#close_btn, #dim').click(function(){
    $('#close_btn').hide()
    $('.m_gnb .navigation_wrap').animate({
      left: "-290px"
    }, 300)
    $('#dim').animate({
      left: "-100%"
    }, 500)
  })
})
