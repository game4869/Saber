let capture;
let preFrame;
let time =0;
let scale = 9;

function setup() {

  createCanvas(600, 450);

  // 600 * 300 = 180,000

  capture = createCapture(VIDEO);
  capture.size(width/scale,height/scale);

  capture.hide();

  console.log("Video Width  = " + capture.width);
  console.log("Video Height = " + capture.height);
  light = loadSound('Lightsaber.mp3');
  // 60 * 30 = 1,800

  preFrame = createImage(capture.width,capture.height);

}

function draw() {

  background(255);

  capture.loadPixels();
  preFrame.loadPixels();

  for(let y = 0 ; y < capture.height ; y++) {
    for(let x = 0 ; x < capture.width ; x++) {

      let indexR   = (y * capture.width + x) * 4  ;
      let indexG   = (y * capture.width + x) * 4 + 1  ;
      let indexB   = (y * capture.width + x) * 4 + 2  ;
      let indexA   = (y * capture.width + x) * 4 + 3  ;

      let indexPFR = (y * preFrame.width + x) * 4  ;
      let indexPFG = (y * preFrame.width + x) * 4 + 1  ;
      let indexPFB = (y * preFrame.width + x) * 4 + 2  ;
      let indexPFA = (y * preFrame.width + x) * 4 + 3  ;

      let r = capture.pixels[indexR];
      let g = capture.pixels[indexG];
      let b = capture.pixels[indexB];
      let a = capture.pixels[indexA];

      let pfr = preFrame.pixels[indexPFR];
      let pfg = preFrame.pixels[indexPFG];
      let pfb = preFrame.pixels[indexPFB];
      let pfa = preFrame.pixels[indexPFA];

      stroke(r,g,b,a);
      strokeWeight(10);
      point((capture.width - x) * scale - (scale / 2)  , y * scale + (scale / 2));

      //เทียบ ความต่างระหว่างframe ปัจจุบันกับ frame ในอดีต
      let diff = dist(r,g,b,pfr,pfg,pfb);

      if(diff < 55) {
        fill(255,0,0,0);
      } else {
        fill(255,250,125,150);
        time++;
        if(time==300){
          light.play();
          time=0;
        }
      }

      noStroke();
      ellipse((capture.width - x) * scale - (scale / 2) ,y * scale + (scale / 2),10,10);
      
    }
  }

  // update preFrame
  preFrame.copy(capture,0,0,capture.width,capture.height,0,0,capture.width,capture.height);

}