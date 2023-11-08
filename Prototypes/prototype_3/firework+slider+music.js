
let songs = [];
let songFiles = ['music/a-.mp3', 'music/b-.mp3', 'music/c-.mp3', 'music/d-.mp3', 'music/e-.mp3', 'music/f-.mp3', 'music/g-.mp3'];

// Global variable definitions
let raindrops = []; // Array to store raindrop objects
let slider; // Slider variable for controlling the number of raindrops
let circleDiameter = 20; // Global variable defining the diameter of the circle to determine shape size
let phase = 0; // Define phase
let zoff = 0; // Define the z-axis offset for noise

function preload() {
  for (let i = 0; i < songFiles.length; i++) {
    songs[i] = loadSound(songFiles[i]);
  }
}

  
  

// Define a Raindrop class to create raindrop objects
class Raindrop {
  constructor() {
    //this.colors = [];
    this.reset(); // Call the reset method in the constructor to initialize the raindrop
    this.size = circleDiameter;
    this.musicPlayed = false;
  }

  reset() {
    this.x = random(width);
    this.y = height + random(height);  // make the raindrops start at the top of the screen
    this.z = random(0, 20); //  the "depth" of the raindrop determines the speed and size of the raindrops
    this.len = map(this.z, 0, 20, 10, 20); // ength of raindrops
    this.yspeed = map(this.z, 0, 20, 1, 5); // speed
    this.splashed = false; // check if splashed
    this.radius = 0; // radius of the shape
    this.patternY = random(0, height * 8 / 9); // Random position of the raindrops to be transformed
    this.shapeMode = floor(random(3)); // choose the shape
    this.color = [random(255), random(255), random(255)];  
    this.musicPlayed = false;
  }

  // Controlling the rise of raindrops 
  rise() {
    if (!this.splashed) { 
      this.y -= this.yspeed; 
      if (this.y < this.patternY) { // If it reaches the splash height
        this.splashed = true; // Mark as splashed
      }
    } else {
      this.radius += 0.05; // If it has splashed, increase the radius of the splash circle
    }
  }

  
  show() {
    if (!this.splashed) { 
      let thick = map(this.z, 0, 20, 1, 3); 
      strokeWeight(thick); // // raindrop thickness
      stroke(138, 43, 226); 
      line(this.x, this.y, this.x, this.y - this.len); // draw rain drop
    } else {
      if (!this.musicPlayed) 
      this.playRandomMusic();
      this.musicPlayed = true;

      let pattern = {
        x: this.x,
        y: this.patternY,
        radius: this.radius+= 0.5, //this.radius += 0.5;
        size: this.size,
        color: this.color,
        //dotColor: dotColor,
        type: this.shapeMode
        
      };
      drawPattern(pattern); //Calling the drawPattern function to draw a pattern
    }
  }

  // Determine if a raindrop has completed its transformation and "disappeared".
  isGone() {
    return this.splashed && this.radius > circleDiameter;
  }
  playRandomMusic() {
    let song = random(songs); //// Randomly select a song
    if (!song.isPlaying()) {
      song.play();
      song.onended(() => {
        this.musicPlayed = false; // Allow to play again when the song is finished
      });
    }
}

}
function setup() {
  createCanvas(windowWidth, windowHeight); // create a canvas the size of the window
  slider = createSlider(0, 80, 20); // Create a slider control with a range of 0 to 20, defaults to 20
  slider.position(10, 10); // set the position of the slider
  // Initialize the raindrops array
  for (let i = 0; i < slider.value(); i++) {
    raindrops.push(new Raindrop()); // generate raindrops based on the slider's value and add them to the array
  }
}


function draw() {
  background(230, 230, 250); 
  // Adjust the number of raindrops based on the slider value
  while (raindrops.length < slider.value()) {
    raindrops.push(new Raindrop()); // if the array length is less than the slider value, add raindrops
  }
  while (raindrops.length > slider.value()) {
    raindrops.pop(); // if array length is greater than slider value, remove raindrops
  }

  for (let raindrop of raindrops) {
    raindrop.rise(); // control the raindrop's rise
    raindrop.show(); // show raindrops
    if (raindrop.isGone()) { // if raindrops are gone
      raindrop.reset(); // reset raindrop 
    }
  }
}

function drawPattern(pattern) {
    noFill(); 
    // Decide which pattern to draw based on TYPE
    switch (pattern.type) {
        case 0:
            drawType0(pattern);
            break;
          case 1:
            drawType1(pattern);
            break;
          case 2:
            drawType2(pattern);
            break;
    }
  }


 function drawType0(pattern) {
    let outerRadius = pattern.radius*2.5 ; // define the radius of the pearl chain
    let pearls = [1, 1, 1, 0]; // define the pattern of pearls
    let pearlIndex = 0;
  
    let numPearls = TWO_PI * outerRadius / 20;
    for (let i = 0; i < numPearls; i++) {
      let angle = i * TWO_PI / numPearls;
      let pearlX = pattern.x + outerRadius * cos(angle);
      let pearlY = pattern.y + outerRadius * sin(angle);
  
      if (pearls[pearlIndex] === 1) {
        fill(random(255), random(255), random(255)); // set the fill color of the little pearl
        ellipse(pearlX, pearlY, 10); // draw a small pearl
      } else {
        fill(255); // set the fill color of the large pearl
        //ellipse(pearlX, pearlY, 20); 
      }
  
    }
  
    let numCircle = 5; // number of circles
    let startRadius = pattern.radius/4;  // initial radius
    let radiusStep = 5; // reduced radius
     fill(pattern.color); 
    for(let i = 0; i < numCircle; i++){      
      let radius = startRadius - radiusStep * i;
  
      ellipse(pattern.x, pattern.y, pattern.radius);
  
    }
  
    let numShapes = 20;
    for(let i = 0; i < numShapes; i++) {
      for(let j = 0; j < 5; j++){
        let angle = TWO_PI / numShapes * i;
        let shapeX = pattern.x + (pattern.radius / 2 + 5 * j) * cos(angle);
        let shapeY = pattern.y + (pattern.radius / 2 + 5 * j) * sin(angle);
        
        stroke(0);
        strokeWeight(0.5);
       fill(pattern.color);
       ellipse(shapeX, shapeY, pattern.radius/5);
    }
}
  }

    function drawType1(pattern) {
        let outerRadius = pattern.radius / 2 + 10; // Define the radius for the 
         
            
          let numCircle = 5; // Number of circles
          let startRadius = 100; // Initial radius
          let radiusStep = 20; // Decreasing radius
            let noiseMax = 5; 
          
        
          push(); // Start a new painting state

          stroke(255); 
          strokeWeight(2); 
          noFill(); 
          beginShape();
            
             noFill();
          //for(let i = 0; i < numCircle; i++){
           // let radius = startRadius - radiusStep * i;
        
          // The inner loop draws a noise waveform
          for (let a = 0; a < TWO_PI; a += 0.1) {
            let xoff = map(cos(a + phase), -1, 1, 0, noiseMax); // map the cos value to the x offset of the noise function
            let yoff = map(sin(a + phase), -1, 1, 0, noiseMax); // Map the y offset from the sin value to the noise function.
            // Create the radius of the waveform using the noise function.
            let r = map(noise(xoff, yoff, zoff), 0, 1, 10, pattern.radius*8);
            let x = pattern.x+r * cos(a); 
            let y = pattern.y+r*sin(a); 
            vertex(x, y);
          }
          
          endShape(CLOSE); // Finish drawing the shape.
          pop(); // Restore the previous drawing state.
          
          phase += 0.01; // Increase the phase to make the waveform move.
          zoff += 0.01; // Increase the z offset to make the waveform noisy.
            

     fill(255);
    for(let i = 0; i < numCircle; i++){
      
      let radius = startRadius - radiusStep * i;
  
      ellipse(pattern.x, pattern.y, pattern.radius);
  
    }
  
    let numShapes = 20;
      fill(pattern.color);
    for(let i = 0; i < numShapes; i++) {
      for(let j = 0; j < 5; j++){
        let angle = TWO_PI / numShapes * i;
        let shapeX = pattern.x + (pattern.radius / 2 + 5 * j) * cos(angle);
        let shapeY = pattern.y + (pattern.radius / 2 + 5 * j) * sin(angle);

        stroke(0);
        strokeWeight(0.5);
       //fill(pattern.color);
       ellipse(shapeX, shapeY, pattern.radius/5);
    }
    }
         } 
        
  
  function drawType2(pattern) {
fill(pattern.color);
    stroke(pattern.color);
for(let j = 0; j < 8; j ++){
        let radius = 6 * j;
        noFill();
         // Set the colour of the internal shape stroke
        ellipse(pattern.x, pattern.y, pattern.radius);
        drawSawtoothRing(pattern.x, pattern.y, pattern.radius*2 , 10, pattern.radius);
      
      }

  /*  triangle(
        pattern.x - pattern.radius, pattern.y + pattern.radius,
        pattern.x + pattern.radius, pattern.y + pattern.radius,
        pattern.x, pattern.y - pattern.radius
      );*/
  }
  
  function drawSawtoothRing(cx, cy, radius, teeth, toothHeight){
  let angleIncrement = TWO_PI/teeth;

  beginShape();
  for (let i = 0; i < teeth; i++) {
    let angle = i * angleIncrement;
    
    // Inner vertex
    let innerX = cx + (radius - toothHeight) * cos(angle);
    let innerY = cy + (radius - toothHeight) * sin(angle);
    vertex(innerX, innerY);
    
    // Outer vertex
    let outerX = cx + (radius + toothHeight) * cos(angle + angleIncrement / 2);
    let outerY = cy + (radius + toothHeight) * sin(angle + angleIncrement / 2);
    vertex(outerX, outerY);

    noFill(); // Set SawtoothRing to no fill
  }

  endShape(CLOSE);
  //fill(random(255), random(255), random(255)); // Restore fill properties of other shapes
}
// Resize the canvas when the browser window size changes
function windowResized() {
  resizeCanvas(windowWidth, windowHeight); 
}