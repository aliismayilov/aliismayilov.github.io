$(function() {
  var currentPage;
  $('.loader').fadeOut();
  $('#mask').fadeOut('slow');
  if ($(".navigation a[href='" + window.location.pathname + "']").length === 1) {
    currentPage = $(".navigation a[href='" + window.location.pathname + "']");
  } else {
    currentPage = $(".navigation a[href='/']");
  }
  return currentPage.parent().addClass('flex-active');
});
