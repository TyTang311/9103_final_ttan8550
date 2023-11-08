let raindrops = []; // Array of raindrop objects to store
let slider; // Slider variable to control the number of raindrops
let circleDiameter = 20; // Global variable defining the diameter of a circle for determining the size of the shape

class Raindrop {
  constructor() {
    this.reset(); // Initializing raindrops
    this.size = circleDiameter;
    this.musicPlayed = false;
  }

  // Reset the properties of raindrops
  reset() {
    this.x = random(width); //Randomize the horizontal coordinates of the raindrop so that it is within the width of the canvas.
    this.y = height + random(height); // randomize the raindrop's vertical coordinate so that its initial position is below the canvas
    this.z = random(0, 20); // the "z-axis" value of the raindrop, which affects speed and size
    this.len = map(this.z, 0, 20, 20, 30); // map the length of the raindrops
    this.yspeed = map(this.z, 0, 20, 1, 5); //  map the droplet's falling speed
    this.splashed = false; // check if the raindrop has splashed or not
    this.radius = 0; // initial radius is zero
    this.patternY = random(100, height * 8 / 9); // set the raindrop's y-axis coordinate range
    this.shapeMode = floor(random(3)); // andomize the pattern 
    this.color = [random(255), random(255), random(255)]; 
    
    this.musicPlayed = false; // make sure the music can be played again on reset
    }

  // // Control the rise of the raindrops
  rise() {
    if (!this.splashed) { // f the raindrop hasn't splashed down yet
      this.y -= this.yspeed; 
      if (this.y < this.patternY) { // if it reaches splash height
        this.splashed = true; // mark it as splashed
      }
    } else {
      this.radius += 0.05; // if splashed, increase the radius of the splash circle
    }
  }

  // Show raindrops
  show() {
    if (!this.splashed) { // if the raindrops haven't splashed yet
      let thick = map(this.z, 0, 20, 2, 4); // Map the line thickness
      strokeWeight(thick); // et the thickness of the line
      stroke(138, 43, 226); 
      line(this.x, this.y, this.x, this.y - this.len); // draw the line raindrops 
    } else {
        //play sound
        if (!this.musicPlayed) {
            playRandomMusic(this);  
            this.musicPlayed = true;
          }

          //draw pattern
      let pattern = {
        x: this.x,
        y: this.patternY,
        radius: this.radius+= 0.5, 
        size: this.size,
        color: this.color,
        type: this.shapeMode
        
      };
      drawPattern(pattern); // Calling the drawPattern function to draw a pattern
    }   
  
}
  

  // Detection of complete disappearance of raindrops (radius of the splash circle is larger than the set diameter)
  isGone() {
    return this.splashed && this.radius > circleDiameter;
    } 
}


function setup() {
  createCanvas(windowWidth, windowHeight); // Create a canvas the size of the window
  slider = createSlider(1, 80, 20); // Create a slider control with a range of 1 to 80 and a default value of 20
  slider.position(35, 30); // set the position of the slider
  //Initialize the raindrop array
  for (let i = 0; i < slider.value(); i++) {
    raindrops.push(new Raindrop()); // generate raindrops based on the slider's value and add them to the array
  }
}



// runs every frame
function draw() {
  background('#194973'); 
  textSize(22);
  stroke(0);
  strokeWeight(1);
  fill('yellow');
  stroke(255);
  text('density of fireworks', 6, 25);
  
  textSize(18);
  fill('white');
  stroke(255);
  strokeWeight(1);
  text('minimum', 10, 60);
  text('maximum', 130, 60);
  
  textSize(22);
  stroke(255);
  strokeWeight(1);
  fill('lightblue');
  text('Press "S" to stop or play the sound.', 250, 50);

  //Adjust the number of raindrops based on the slider value
  while (raindrops.length < slider.value()) {
    raindrops.push(new Raindrop()); // if the array length is less than the slider value, add raindrops
  }
  while (raindrops.length > slider.value()) {
    raindrops.pop(); // if array length is greater than slider value, remove raindrops
  }

  for (let raindrop of raindrops) {
    raindrop.rise(); //control the raindrop's rise
    raindrop.show(); // show raindrops
    if (raindrop.isGone()) { //if raindrops are gone
      raindrop.reset(); // reset raindrop properties
    }
  }
}

function drawPattern(pattern) {
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

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight); // Reset the canvas size to match the new window size
  }
