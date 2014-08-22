---
---
$ ->
  # Loading Script
  $('.loader').fadeOut()
  $('#mask').fadeOut('slow')

  # Highlight current navigation
  if $(".navigation a[href='#{window.location.pathname}']").length === 1
    currentPage = $(".navigation a[href='#{window.location.pathname}']")
  else
    currentPage = $(".navigation a[href='/']")
  currentPage.parent().addClass('flex-active')
