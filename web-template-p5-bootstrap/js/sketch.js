// Load any font, or images
function preload() {

}

// Create Canvas
function setup() {
    var canvas = createCanvas(800, 800);

    // Move the canvas so it’s inside our <div id="sketch_holder">.
    canvas.parent('sketch_holder');
}

function draw() {
    if (mouseIsPressed) {
        fill(0);
    } else {
        fill(255);
    }
    ellipse(mouseX, mouseY, 80, 80);
}
