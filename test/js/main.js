$(function() {

  $('.col-height-toggle-button').click(function() {
    
    $('html').toggleClass('equal-height');

    if ($('html').hasClass('equal-height')) {
      $('.equal-height .row').each(function() {
        $(this).children('.col').syncHeight();
      });
    } else {
      $('.col').css('min-height', '');
    }
    
  });

});