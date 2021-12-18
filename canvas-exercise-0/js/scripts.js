let canvas;
let ctx;
let flowField;
let flowFieldAnimation;

window.onload = () => {
  // get intellisense (suggestions) for canvas method by including this line of code
  /** @type {CanvasRenderingContext2D} */
  /** @type {HTMLCanvasElement} */

  canvas = document.getElementById("canvas1");
  ctx = canvas.getContext("2d");

  // set width and height same as window
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
  flowField.animate(); //call public method if class
};

// window canvas resize when change
window.addEventListener("resize", function () {
  cancelAnimationFrame(flowFieldAnimation);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
  flowField.animate();
});

const mouse = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
});

class FlowFieldEffect {
  /** @type {CanvasRenderingContext2D} */
  /** @type {HTMLCanvasElement} */

  // private class
  #ctx;
  #width;
  #height;

  constructor(ctx, width, height) {
    this.#ctx = ctx;
    this.#ctx.strokeStyle = "white";
    this.#width = width;
    this.#height = height;
    this.x = 0;
    this.y = 0;
    this.angle = 0;
  }

  // private method only be call within class
  #draw(x, y) {
    const length = 300;
    // beginPath tell canvas that we want to draw a new shape
    this.#ctx.beginPath();
    this.#ctx.moveTo(x, y); //line start at (x, y)
    this.#ctx.lineTo(mouse.x, mouse.y);
    this.#ctx.stroke();
  }

  // public methos can be call outside class
  animate() {
    this.angle += 0.1;
    this.#ctx.clearRect(0, 0, this.#width, this.#height); //only show the current frame
    this.#draw(this.#width / 2, this.#height / 2);
    this.x += 0.5;
    this.y += 2.5;
    // console.log("animating");
    flowFieldAnimation = requestAnimationFrame(this.animate.bind(this)); //loop animate() to keep drawing, bind() to remind JS not to forget .this
  }
}
