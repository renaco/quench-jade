console.log 'fsfs'
###
i = 0
text = 'First Pagessds'

console.log i

title = document.querySelectorAll('h1')

title.write = 'Tesst'

listen = (el, event, handler) ->
  if el.addEventListener
    el.addEventListener event, handler
  else
    el.attachEvent 'on' + event, ->
      handler.call el

###
