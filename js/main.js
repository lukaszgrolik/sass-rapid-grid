$(function() {
  $('.row').each(function() {
    $(this).children('.col').syncHeight();
  })
});