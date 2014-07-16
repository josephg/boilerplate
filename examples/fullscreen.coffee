
worldLabel = document.getElementById 'worldlabel'
worldName = null
load = ->
  location.hash = '#boilerplate' unless location.hash

  hash = location.hash
  worldName = hash[1..]
  worldLabel.textContent = worldName
  
  gridStr = localStorage.getItem "world #{worldName}"
  if gridStr != ''
    try
      grid = JSON.parse gridStr
      console.log 'loaded', worldName if grid
      return grid

sim = new Simulator load()

el = document.getElementById 'bp'
bp = new Boilerplate el, sim

window.onresize = ->
  bp.resizeTo(window.innerWidth, window.innerHeight)

isEmpty = (obj) ->
  return false for k of obj
  return true

setInterval =>
  delta = sim.step()
  if !isEmpty delta.changed
    bp.draw()
, 200

bp.onEditFinish = save = ->
  console.log 'saving', worldName
  localStorage.setItem "world #{worldName}", JSON.stringify sim.getGrid()

setInterval save, 5000

window.onhashchange = ->
  sim.grid = load() || {}
  bp.draw()

window.addEventListener 'copy', (e) ->
  document.activeElement?.boilerplate?.copy e

window.addEventListener 'paste', (e) ->
  document.activeElement?.boilerplate?.paste e

# putting autofocus in the html doesn't cut it for some reason.
el.focus()

Boilerplate.addKeyListener window

do ->
  panel = document.getElementsByClassName('toolpanel')[0]

  selected = null
  panel.onclick = (e) ->
    element = e.target
    return if element is panel

    Boilerplate.changeTool element.id

  Boilerplate.onToolChanged = (newTool) ->
    if selected
      selected.className = ''

    e = document.getElementById (newTool || 'solid')
    return unless e
    e.className = 'selected'
    selected = e

