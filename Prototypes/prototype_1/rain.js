let raindrops = [];

function setup() {
  createCanvas(640, 360);
  for (let i = 0; i < 20; i++) {
    raindrops.push(new Raindrop());
  }
}

function draw() {
  background(230, 230, 250); 
  for (let raindrop of raindrops) {
    raindrop.fall();
    raindrop.show();
    // If the raindrop "disappears", the position is reset.
    if (raindrop.isGone()) {
      raindrop.reset();
    }
  }
}

class Raindrop {
  constructor() {
    this.reset(); // Reset a raindrop
  }


  reset() {
    this.x = random(width);
    this.y = random(-height, 0); // make the raindrops start at the top of the screen
    this.z = random(0, 20); //  the "depth" of the raindrop determines the speed and size of the raindrops
    this.len = map(this.z, 0, 20, 10, 20); // ength of raindrops
    this.yspeed = map(this.z, 0, 20, 1, 5); // speed
    this.splashed = false; // check if splashed
    this.radius = 0; // radius of the shape
    this.splashY = random(height / 3, height); // Random position of the raindrops to be transformed
    this.shapeMode = floor(random(3)); // choose the shape
  }

  
  // Logic for falling raindrops
  fall() {
    if (!this.splashed) {
      this.y += this.yspeed; 
      let grav = map(this.z, 0, 20, 0, 0.05); // acceleration of raindrops
      this.yspeed += grav;

      //  If the transformed position is reached, start to change.
      if (this.y > this.splashY) {
        this.splashed = true;
        this.yspeed = 0; // stop to fall
      }
    } else {
      // if it is transforming, increase the radius
      if (this.radius < 8) {
        this.radius += 0.2;
      }
    }
  }


  show() {
    if (!this.splashed) {
      let thick = map(this.z, 0, 20, 1, 3); // raindrop thickness
      strokeWeight(thick);
      stroke(138, 43, 226); 
      line(this.x, this.y, this.x, this.y + this.len); // draw rain drop
    } else {
      // Draws different shapes according to shapeMode.
      noFill();
      strokeWeight(2);
      let alpha = 255 - this.radius * 10; // Shape transparency
      stroke(138, 43, 226, alpha);
      switch (this.shapeMode) {
        case 0: // cricle
          ellipse(this.x, this.y, this.radius * 2);
          break;
        case 1: // rect
          rectMode(CENTER);
          rect(this.x, this.y, this.radius * 2, this.radius * 2);
          break;
        case 2: // star
          drawStar(this.x, this.y, this.radius, this.radius * 2, 5);
          break;
      }
    }
  }

  // Determine if a raindrop has completed its transformation and "disappeared".
  isGone() {
    return this.splashed && this.radius >= 8;
  }
}

// draw parrten star
function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// Resize the canvas when the browser window size changes
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
