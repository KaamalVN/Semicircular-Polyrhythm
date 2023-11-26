let audioContext;
let isAnimating = false;

const sa = 'audio/c4.mp3'; // C4
const re = 'audio/d4.mp3'; // D4
const ga = 'audio/e4.mp3'; // E4
const ma = 'audio/f4.mp3'; // F4
const pa = 'audio/g4.mp3'; // G4
const dha = 'audio/a4.mp3'; // A4
const ni = 'audio/b4.mp3'; // B4
const n1 = 'audio/c5.mp3'; // C5
const n2 = 'audio/d5.mp3'; // D5
const n3 = 'audio/e5.mp3'; // E5

const playNote = (audioFile) => {
  const audio = new Audio(audioFile);

  // Use the 'canplaythrough' event to ensure the audio is fully loaded
  audio.addEventListener('canplaythrough', () => {
    audio.play();
  });

  // Handle cases where the 'canplaythrough' event might not fire
  audio.addEventListener('loadeddata', () => {
    audio.play();
  });

  // Handle other error events
  audio.addEventListener('error', (error) => {
    console.error('Error loading audio:', error);
  });
};


function moveBallInCircle(ball, circle, audioFile) {
  var radius = circle.clientWidth / 2;
  var centerX = circle.offsetLeft + radius;
  var centerY = circle.offsetTop + radius;
  var angle = Math.PI;
  var angleIncrement = (0.011 * 550) / radius;
  var reverseDirection = false;
  radius -= 4;

  function moveBall() {
    if (!isAnimating) {
      return;
    }

    var x = centerX + radius * Math.cos(angle);
    var y = centerY + radius * Math.sin(angle);
    ball.style.left = x - ball.clientWidth / 2 + "px";
    ball.style.top = y - ball.clientHeight / 2 + "px";

    if (angle >= 2 * Math.PI) {
      reverseDirection = !reverseDirection;
      angle = 0;
      playNote(audioFile);
    } else if (angle <= -Math.PI) {
      reverseDirection = false;
      angle = Math.PI;
    }

    angle += reverseDirection ? -angleIncrement : angleIncrement;
    requestAnimationFrame(moveBall);
  }

  moveBall();
}

document.getElementById("toggleButton").addEventListener("click", function() {
  if (isAnimating) {
    isAnimating = false;
    document.getElementById("toggleButton").innerText = "Start";
  } else {
    isAnimating = true;
    document.getElementById("toggleButton").innerText = "Stop";

    moveBallInCircle(document.getElementById("movingBall1"), document.querySelector(".circle"), n3);
    moveBallInCircle(document.getElementById("movingBall2"), document.querySelector(".child-circle-1"), n2);
    moveBallInCircle(document.getElementById("movingBall3"), document.querySelector(".child-circle-2"), n1);
    moveBallInCircle(document.getElementById("movingBall4"), document.querySelector(".child-circle-3"), ni);
    moveBallInCircle(document.getElementById("movingBall5"), document.querySelector(".child-circle-4"), dha);
    moveBallInCircle(document.getElementById("movingBall6"), document.querySelector(".child-circle-5"), pa);
    moveBallInCircle(document.getElementById("movingBall7"), document.querySelector(".child-circle-6"), ma);
    moveBallInCircle(document.getElementById("movingBall8"), document.querySelector(".child-circle-7"), ga);
    moveBallInCircle(document.getElementById("movingBall9"), document.querySelector(".child-circle-8"), re);
    moveBallInCircle(document.getElementById("movingBall10"), document.querySelector(".child-circle-9"), sa);
  }
});
