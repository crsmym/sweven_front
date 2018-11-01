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
})
