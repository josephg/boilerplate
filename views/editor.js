module.exports = ({user, stem}) => `<!DOCTYPE html>
<title>Steamdance</title>
<meta charset="utf-8">
<link href='/toolpanel.css' rel='stylesheet' type='text/css'>
<link href='/icon.png' rel='icon' type='image/png'>
<script>
  window.currentUser = ${JSON.stringify(user ? user.username : null)}
</script>
<style>
@font-face {
  font-family: 'Play';
  font-style: normal;
  font-weight: 700;
  src: local('Play-Bold'), url(/Play.woff) format('woff');
}

body, html {
  width: 100%; height: 100%; padding: 0; margin: 0;
  font-family: 'Play', sans-serif;
  box-sizing: border-box;

  /* you see this if you try to scroll out of the module list */
  background-color: hsl(184, 49%, 7%);
}

* { box-sizing: inherit; }

a {
  color: hsl(203, 6%, 70%);
  text-decoration: none;
}

a:before {
  content: '[';
}
a:after {
  content: ']';
}

.boilerplate {
  position: relative;
  width: 100%; height: 100%;
}

.boilerplate canvas {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  cursor: crosshair;
}

.overlay {
  position: fixed;

  padding: 5px;
  background-color: hsla(184, 49%, 7%, 0.5);
  cursor: default;
  color: white;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.topleft { top: 0; left: 0; }
/*.topright { top: 0; right: 0; }*/
.botright { bottom: 0; right: 0; }

#readonly {
  display: none;
  color: red;
}

#worldname {
  color: hsl(42, 95%, 69%);
  margin: 0;
  padding: 0 0 0 8px;
  border: 0;
  font-size: 1em;
  background-color: transparent;
  min-width: 20em;
}

#playpanel {
  padding-top: 7px;
}

#playpanel span {
  cursor: pointer;
  color: hsl(42, 95%, 69%);
  font-size: 1.5em;
  margin: 7px;
  display: inline-block;
  min-width: 1em;
  text-align: center;
  vertical-align: top; /* needed because play button is tall */
}
/*#playpanel.running #play { color: hsl(0, 0%, 78%); }*/
/*#playpanel.stopped #pause { color: white; }*/
#playpanel.running #step { color: gray; }

#componentPanel {
  top: calc(-50% - 1px); /* No idea why the extra pixel is needed, but it is */
  right: 0;
  width: 300px;
  /*height: calc(50% + 1em + 2 * 5px);*/
  height: 50%;
  transition: top 0.6s;
  background-color: rgba(66, 66, 66, 0.61);
  padding: 0;
}

#componentPanel:hover { top: 0%; }

#moduleList {
  height: 100%;
  overflow-y: scroll;
}

#componentPanel > .disclosure {
  /*color: hsl(42, 95%, 69%);*/
  color: white;
  position: absolute;
  right: 0;
  top: 100%;
  padding: 5px;
  width: 50%;
  text-align: right;
  transition: color 0.6s;
  background-color: hsla(184, 49%, 7%, 0.5);
}

#componentPanel:hover > .disclosure {
  /*color: white;*/
  color: hsl(42, 95%, 69%);
}

#componentPanel .module {
  width: 100%;
  height: 300px; /* Same as width of #componentPanel */
  padding: 10px 10px 0 10px;
  position: relative;
}

#componentPanel .module:last-child {
  padding-bottom: 10px;
}

.module > canvas {
  width: 100%;
  height: 100%;
  background-color: hsla(184, 47%, 3%, 0.47);
}

.module.selected > canvas {
  background-color: rgba(19, 65, 70, 0.82);
}

.module > .rm {
  font-size: 30px;
  color: hsl(42, 95%, 69%);
  position: absolute;
  top: 10px;
  right: 14px;
  text-rendering: geometricPrecision;
  background-color: rgba(15, 21, 22, 0.51);
}

#addmod {
  font-size: 240px;
  text-align: center;
  background-color: hsla(184, 47%, 3%, 0.47);
  transition: height 0.6s;
}
</style>

<div id="bp" tabIndex=0 autofocus class="boilerplate"></div>

<div class='overlay topleft'>
  <a href='/'>&#9664;Browse</a>
  <span id='readonly'>CHANGES WILL NOT BE SAVED</span>
  <span id='worldname'></span>
  <div id='playpanel'>
    <span id="playpause" title="play (space bar)">►</span>
    <!-- <span id="pause" title="pause (space bar)">||</span> -->
    <span id="step" title="step (enter)">&gt;|</span>
  </div>
</div>

<div class='overlay' id='componentPanel'>
  <div id='moduleList'>
    <div class='module' id='addmod'>+</div>
  </div>
  <div class='disclosure'>▼ Modules</div>
</div>

<div class='overlay botright'>
  <span><a href="https://github.com/josephg/steamdance">github</a></span>
</div>

<div class="toolpanel">
  <div id="move">Move

  </div><div id="nothing">Empty
  </div><div id="thinsolid">grill
  </div><div id="solid">Solid

  </div><div id="bridge">bridge

  </div><div id="positive">pos
  </div><div id="negative">neg

  </div><div id="shuttle">shuttle
  </div><div id="thinshuttle">ts
  </div><div id="glue">S Glue
  </div><div id="cut">S Cut ✂
  </div>
</div>

<datalist id=worldlist></datalist>
<script src='/editor-compiled${stem}.js'></script>
`;
