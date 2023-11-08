let soundEnabled = true; // Default Sound Enabled

// creata array for sound
let songs = [];
let songFiles = ['music/a-.mp3', 'music/b-.mp3', 'music/c-.mp3', 'music/d-.mp3', 'music/e-.mp3', 'music/f-.mp3', 'music/g-.mp3',
                'music/a-1.mp3', 'music/b-1.mp3','music/c-1.mp3','music/d-1.mp3','music/e-1.mp3','music/f-1.mp3','music/g-1.mp3',
                'music/A.mp3','music/B.mp3','music/C.mp3','music/D.mp3','music/E.mp3','music/F.mp3','music/G.mp3',
                'music/a-2.mp3', 'music/b-2.mp3', 'music/c-2.mp3', 'music/d-2.mp3', 'music/e-2.mp3', 'music/f-2.mp3', 'music/g-2.mp3',
                'music/a3.mp3', 'music/b3.mp3', 'music/c3.mp3', 'music/d3.mp3', 'music/e3.mp3', 'music/f3.mp3', 'music/g3.mp3',
            ];

  function preload() {
  for (let i = 0; i < songFiles.length; i++) {
    songs[i] = loadSound(songFiles[i]);
  }
}

function stopAllSounds() {
    for (let song of songs) {
      if (song.isPlaying()) {
        song.stop(); // Stop playing the current sound
      }
    }
  }
  
  function toggleSound() {
    soundEnabled = !soundEnabled;
    if (!soundEnabled) {
      stopAllSounds(); // Stop all sounds if they are disabled
    }
  }
 
  function playRandomMusic(raindrop) {
    // Play music only when the sound switch is on
    if (soundEnabled) {
      let song = random(songs); // Choose a sound at random
      if (!song.isPlaying()) {
        song.play();
        song.onended(() => {
          raindrop.musicPlayed = false; // Allow to play again when the sound ends
        });
      }
    }
  }
  
  function keyPressed() {
    if (key === 's' || key === 'S') {
      toggleSound();
    }
  }