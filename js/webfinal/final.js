var key_color = ['#ff00dd', '#ff9500', '#ffff00', '#38ffd7','#4488ff'];
var guitar_keys = { a: 0, s: 1, j: 2, k: 3, l: 4 };
var width_of_lane = 60;
var hit_key_y    = 340;
var hit_area  = 50;
var volumeLevel= 50;
var musicStarted= false;
var noteDuration = 500;
var noteSpeed= 280;
var hypePhrases= ['YOU ROCK', 'NICE!', 'EPIC!'];
var phraseIndex= 0;
var combo = 0;
var canvas = document.querySelector('#guitarHeroCanvas');
var ctx    = canvas.getContext('2d');
var guitarNotes = [];
var noteRadius = 18;


function note_maker() {
  var col= Math.floor(Math.random() * 5);
  guitarNotes.push({
    col: col, y: -noteRadius, hit: false, missed: false
  });
}




var noteRythm  = 0;
function updateFretBoard() {
  volumeLevel = Math.max(0, volumeLevel - 16 * 0.003);
  noteRythm += 16;
  if (noteRythm >= noteDuration) {
    noteRythm = 0;
    note_maker();}
  for (var i = 0; i < guitarNotes.length; i++) {
    var n = guitarNotes[i];
    if (n.hit) continue;
    n.y += noteSpeed * (16 / 1000);
    if (!n.missed && n.y > hit_key_y + hit_area) {
      n.missed = true;
      volumeLevel = Math.max(0, volumeLevel - 8);
      combo = 0;
      showStatus('YOU MISSED A NOTE!');
    }
  }
  guitarNotes = guitarNotes.filter(function(n) {
    return n.y < 420;
  });
  if (combo >= 5) {
  document.getElementById('submitVolumeButton').style.display = 'block';
} else {
  document.getElementById('submitVolumeButton').style.display = 'none';
}
document.getElementById('numberOfVolume').textContent = Math.round(volumeLevel);
  document.getElementById('volumeBar').style.width = volumeLevel + '%';
  document.getElementById('music_for_guitar_hero').volume = volumeLevel / 100;
}

function drawNote() {
  ctx.clearRect(0, 0, 300, 400);
  for (var i = 0; i < guitarNotes.length; i++) {
    var n = guitarNotes[i];
    var x = width_of_lane * n.col + width_of_lane / 2;
ctx.beginPath();
ctx.arc(x, n.y, noteRadius, 0, Math.PI * 2);
if (n.missed) {
ctx.fillStyle = '#c94e4e';
} else if (n.hit) {
ctx.fillStyle = '#ffffff';
} else {
  ctx.fillStyle = key_color[n.col];
}
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.stroke();
  }
}

var gameInterval = null;

function gameLoop() {
  if (!musicStarted) return;
  updateFretBoard();
  drawNote();
}

function noteChecker(col) {
  var best = null;
  var bestDist = Infinity;
  for (var i = 0; i < guitarNotes.length; i++) {
  var n = guitarNotes[i];
  if (n.hit || n.missed || n.col !== col) continue;
  var dist = Math.abs(n.y - hit_key_y);
  if (dist < hit_area && dist < bestDist) {
    bestDist = dist;
      best = n;}
  }
 if (best) {
guitarNotes = guitarNotes.filter(function(n) { return n !== best; });
  volumeLevel = Math.min(100, volumeLevel + 5);
  showStatus(hypePhrases[phraseIndex]);
  phraseIndex = (phraseIndex + 1) % 3;
  combo++;
}
}

function submitVolume() {
  musicStarted = false;
  clearInterval(gameInterval);
  guitarNotes = [];
  drawNote();
  combo = 0;
  document.getElementById('submitVolumeButton').style.display = 'none';
  var btn = document.getElementById('startButton');
  btn.textContent = 'PLAY AGAIN';
  btn.style.display = 'inline-block';
  showStatus('VOLUME SET TO ' + Math.round(volumeLevel));
}
// this gives status updates every now and then 
var statusTimer = null;
function showStatus(msg) {
  document.getElementById('status').textContent= msg;
  clearTimeout(statusTimer);
  statusTimer = setTimeout(function() {
document.getElementById('status').textContent = '';}, 400);
}

function startGame() {
  guitarNotes = [];
  volumeLevel = 1;
  noteRythm = 0;
  musicStarted = true;
 var song = document.getElementById('music_for_guitar_hero');
  song.volume = 0;     
  song.play();
  document.getElementById('startButton').style.display = 'none';
  gameInterval = setInterval(gameLoop, 16);
}

document.addEventListener('keydown', function(e) {
  if (!musicStarted) return;
  var key = e.key.toLowerCase();
  if (guitar_keys[key] !== undefined) {
    noteChecker(guitar_keys[key]);}
  if (e.key === ' ' && combo >= 5) {
    submitVolume();}
});


//my loop ins't working 
//var guitarNoteButtons = document.querySelectorAll('.guitarNoteButtons');
//guitarNoteButtons.forEach(function(btn) {
  //btn.addEventListener('mousedown', function() {
  // if (!musicStarted) return;
   //noteChecker(parseInt(btn.dataset.col));
  //});
//});

document.getElementById('startButton').addEventListener('click', startGame);


document.getElementById('keyA').addEventListener('mousedown', function() {
if (!musicStarted) return;
noteChecker(0);});
document.getElementById('keyS').addEventListener('mousedown', function() {
if (!musicStarted) return;
noteChecker(1);});
document.getElementById('keyJ').addEventListener('mousedown', function() {
if (!musicStarted) return;
noteChecker(2);});
document.getElementById('keyK').addEventListener('mousedown', function() {
if (!musicStarted) return;
noteChecker(3);});
document.getElementById('keyL').addEventListener('mousedown', function() {
if (!musicStarted) return;
noteChecker(4);});