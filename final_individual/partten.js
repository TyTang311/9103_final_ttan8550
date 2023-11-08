let phase = 0; // Defining the phase
let zoff = 0; // Define the z-axis offset of the noise

//Patterns with colorful circles rotating
function drawType0(pattern) {
  
    let outerRadius = pattern.radius*2.5 ; // Define the radius of the pearl chain
    let numPearls = TWO_PI * outerRadius / 20;
  
    for (let i = 0; i < numPearls; i++) {
      let angle = i * TWO_PI / numPearls;
      let pearlX = pattern.x + outerRadius * cos(angle);
      let pearlY = pattern.y + outerRadius * sin(angle);
      
        stroke(255);
  strokeWeight(1);
      fill(random(255), random(255), random(255)); // Setting the fill color of the small pearls
        ellipse(pearlX, pearlY, 10); // Drawing a small pearl
      } 
  //drawing inner circles
    let numCircle = 5; // Number of circles
    stroke(255);
  strokeWeight(1);
     fill(pattern.color);
    for(let i = 0; i < numCircle; i++){
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

//Moving White Wave Border Pattern
    function drawType1(pattern) {

          let noiseMax = 20; // Setting the noise maximum to a fixed value

          push(); // start a new drawing state
          
          stroke(255); 
          strokeWeight(2); 
          noFill(); 
 
          beginShape(); // Start drawing the shape.
            

          // Draw a shape with a randomly changing radius.
          for (let a = 0; a < TWO_PI; a += 0.1) {
            let xoff = map(cos(a + phase), -1, 1, 0, noiseMax); 
            let yoff = map(sin(a + phase), -1, 1, 0, noiseMax); 
    
            let r = map(noise(xoff, yoff, zoff), 0, 1, 10, pattern.radius*5);
            let x = pattern.x+r * cos(a); 
            let y = pattern.y+r*sin(a); 
            vertex(x, y); 
          }
          
          endShape(CLOSE); // Finish drawing the shape
          pop(); // Restore the previous painting
          
          phase += 0.003; // Increase the phase to make the waveform move
          zoff += 0.008; // Increasing the z offset causes the noise effect of the waveform to change
  stroke(255);
  strokeWeight(1);
          fill(random(255), random(255), random(255));

            ellipse(pattern.x, pattern.y, pattern.radius*0.5);

        //drawing inner circles
          let numShapes = 10;
          stroke(0);
             strokeWeight(0.5);
            fill(pattern.color);
          for(let i = 0; i < numShapes; i++) {
            for(let j = 0; j < 5; j++){
              let angle = TWO_PI / numShapes * i;
              let shapeX = pattern.x + (pattern.radius / 2 + 5 * j) * cos(angle);
              let shapeY = pattern.y + (pattern.radius / 2 + 5 * j) * sin(angle);
             ellipse(shapeX, shapeY, pattern.radius/5);
          }
          }

         } 

         //polygonal pattern
         function drawType2(pattern) {


            for(let j = 0; j < 8; j ++){
              
                noFill();     
              stroke(pattern.color);
      strokeWeight(1);
              
            //Call drawSawtoothRing Graphics
                drawSawtoothRing(pattern.x, pattern.y, pattern.radius*2 , 20, pattern.radius*0.4);
              
                stroke(255);
  strokeWeight(1);
              fill(pattern.color);         
            ellipse(pattern.x, pattern.y, pattern.radius*2);
              
              fill(random(255), random(255), random(255));         
            ellipse(pattern.x, pattern.y, pattern.radius*0.5);
              
              
         }                         
         }
 
         function drawSawtoothRing(cx, cy, radius, teeth, toothHeight){
            let angleIncrement = TWO_PI/teeth;
         //fill("outerX", "outerY", "pattern.radius");
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
              noFill();
              vertex(outerX, outerY);
          
              // Set SawtoothRing to no fill
                }
            endShape(CLOSE);

       //   Draw small circles between the sides 
      for (let a = 0; a < teeth; a++) {     
      let angle2 = a * TWO_PI / teeth;
      let pearlX = cx + (radius + toothHeight) * cos(angle2);
      let pearlY = cy + (radius + toothHeight) * sin(angle2);
       fill(random(255), random(255), random(255));
      ellipse(pearlX, pearlY, toothHeight);
     
    }
      }