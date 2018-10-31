
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

  //  main page slider
  // use flickity
  $('.main_slide').flickity({
    // options
    cellAlign: 'left',
    contain: true,
    wrapAround: true,
    pageDots: false
  });
  
  // slides first child hide 
  $('.main_slide .flickity-slider li:first-child').hide();
  $('.flickity-button').click(function () {
    //effect when the click slides button 
    $('.main_slide .flickity-slider li:first-child').fadeIn(300);
    $('.gallery_sub').fadeOut(200);
  })
})
