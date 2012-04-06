canvas = document.getElementsByTagName('canvas')[0]
canvas.width = 800
canvas.height = 600

ctx = canvas.getContext '2d'

CELL_SIZE = 20

canvas.onclick = (e) ->
  mx = e.pageX - e.target.offsetLeft
  my = e.pageY - e.target.offsetTop
  stx = Math.floor mx / CELL_SIZE
  sty = Math.floor my / CELL_SIZE
  clicked stx, sty

placing = 'nothing'
document.onkeydown = (e) ->
  kc = e.keyCode
  pressed = ({
    49: 'nothing'
    50: 'solid'
    51: 'positive'
    52: 'negative'
    53: 'shuttle'
    54: 'thinshuttle'
    55: 'thinsolid'
  })[kc]
  if pressed?
    placing = if pressed is 'solid' then null else pressed

grid = {}
ws = new WebSocket 'ws://' + window.location.host
ws.onmessage = (msg) ->
  msg = JSON.parse msg.data
  if msg.delta
    console.log msg.delta
    for k,v of msg.delta
      if v?
        grid[k] = v
      else
        delete grid[k]
    draw()

scroll_x = 0 # in tile coords
scroll_y = 0

colors =
	solid: 'black'
	nothing: 'white'
	thinshuttle: 'rgb(255,0,255)'
	shuttle: 'rgb(128,0,128)'
	negative: 'red'
	positive: 'rgb(0,255,0)'

draw = ->
  ctx.fillStyle = 'black'
  ctx.fillRect 0, 0, canvas.width, canvas.height
  for k,v of grid
    [_,x,y] = /^(\d+),(\d+)$/.exec k
    x = parseInt x
    y = parseInt y
    if scroll_x <= x < scroll_x + Math.floor(canvas.width/CELL_SIZE) and
       scroll_y <= y < scroll_y + Math.floor(canvas.height/CELL_SIZE)
      ctx.fillStyle = colors[v]
      ctx.fillRect (x-scroll_x)*CELL_SIZE, (y-scroll_y)*CELL_SIZE, CELL_SIZE, CELL_SIZE
  return

clicked = (stx, sty) ->
  tx = stx - scroll_x
  ty = sty - scroll_y
  delta = {}
  delta[[tx,ty]] = placing
  ws.send JSON.stringify {delta}
  if placing?
    grid[[tx,ty]] = placing
  else
    delete grid[[tx,ty]]
  draw()
