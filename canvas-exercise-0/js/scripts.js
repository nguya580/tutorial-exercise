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
  flowField.animate(0); //call public method if class
};

// window canvas resize when change
window.addEventListener("resize", function () {
  cancelAnimationFrame(flowFieldAnimation);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
  flowField.animate(0);
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
    this.#ctx.lineWidth = 1;
    this.#width = width;
    this.#height = height;
    this.x = 0;
    this.y = 0;
    this.lastTime = 0;
    this.interval = 1000 / 60;
    this.timer = 0;
    this.cellSize = 15;
    this.gradient;
    this.#createGradient();
    this.#ctx.strokeStyle = this.gradient;
    this.radius = 0;
    this.vr = 0.03;
  }

  #createGradient() {
    this.gradient = this.#ctx.createLinearGradient(
      0,
      0,
      this.#width,
      this.#height
    );
    this.gradient.addColorStop("0.1", "#ff5c33");
    this.gradient.addColorStop("0.2", "#ff66b3");
    this.gradient.addColorStop("0.4", "#ccccff");
    this.gradient.addColorStop("0.6", "#b3ffff");
    this.gradient.addColorStop("0.8", "#80ff80");
    this.gradient.addColorStop("0.9", "#ffff33");
  }

  // private method only be call within class
  #drawLine(angle, x, y) {
    let positionX = x;
    let positionY = y;
    let dx = mouse.x - positionX;
    let dy = mouse.y - positionY;
    let distance = dx * dx + dy * dy;
    if (distance > 600000) distance = 600000;
    else if (distance < 100000) distance = 100000;

    let length = distance / 10000;
    // beginPath tell canvas that we want to draw a new shape
    this.#ctx.beginPath();
    this.#ctx.moveTo(x, y); //line start at (x, y)
    this.#ctx.lineTo(
      x + Math.cos(angle) * length,
      y + Math.sin(angle) * length
    );
    this.#ctx.stroke();
  }

  // public methos can be call outside class
  animate(timeStamp) {
    // to deal with time frame equally on all computers, new or all
    const deltaTime = timeStamp - this.lastTime;
    this.lastTime = timeStamp;
    if (this.timer > this.interval) {
      this.#ctx.clearRect(0, 0, this.#width, this.#height); //only show the current frame
      this.radius += this.vr;
      if (this.radius > 5 || this.radius < -5) {
        this.vr *= -1;
      }

      for (let y = 0; y < this.#height; y += this.cellSize) {
        for (let x = 0; x < this.#width; x += this.cellSize) {
          const angle = (Math.cos(x * 0.01) + Math.sin(y * 0.01)) * this.radius;
          this.#drawLine(angle, x, y);
        }
      }

      this.timer = 0;
    } else {
      this.timer += deltaTime;
    }

    flowFieldAnimation = requestAnimationFrame(this.animate.bind(this)); //loop animate() to keep drawing, bind() to remind JS not to forget .this
  }
}
