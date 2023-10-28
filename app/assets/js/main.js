let canvasArea;
let light;

class CanvasArea {
  constructor() {
    // this.canvas = document.getElementById('rootCanvas');

    this.canvas = document.createElement('canvas');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.context = this.canvas.getContext('2d');
  }

  update() {
    this.context.fillStyle = '#2c343f';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

class ComputerMouse {
  constructor(x, y, tiedToMouse) {
    this.tied = tiedToMouse || false;
    this.y = y;
    this.x = x;
    this.sizeCircleMouse = 20;
    this.sizeCircleShadowLight = 1000;
    // this.sizeCircleShadowLight = 100;
    this.color = 'white';
    if (this.tied) {
      window.addEventListener('mousemove', (e) => {
        this.x = e.clientX;
        this.y = e.clientY;
      });
    }
  }

  update() {
    let ctx = canvasArea.context;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.sizeCircleShadowLight, 0, 2 * Math.PI);
    let gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.sizeCircleShadowLight * 0.75,
    );
    gradient.addColorStop(0, '#3b4654');
    gradient.addColorStop(1, '#2c343f');
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.sizeCircleMouse, 0, 2 * Math.PI);
    gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.sizeCircleMouse * 0.32,
    );
    gradient.addColorStop(0, '#fff');
    gradient.addColorStop(1, '#3b4654');
    ctx.fillStyle = gradient;
    ctx.fill();
  }
}

class ElementsOfShadow {
  constructor(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speedX = 0;
    this.speedY = 0;
  }

  update() {
    this.ctx = canvasArea.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.width, this.height, this.x, this.y);
  }
}

const init = () => {
  canvasArea = new CanvasArea();
  light = new ComputerMouse(window.innerWidth / 2, window.innerHeight / 2, true);
  animation({
    clear: () => {
      canvasArea.clear();
    },
    update: (params) => {
      canvasArea.update();
      light.update();
    },
    render: (params) => {},
  });
};

function animation(obj) {
  const { clear, update, render } = obj;
  let pTimeStamp = 0;
  requestAnimationFrame(tick);

  function tick(timeStamp) {
    requestAnimationFrame(tick);

    const diff = timeStamp - pTimeStamp;
    pTimeStamp = timeStamp;
    const fps = 1000 / diff;
    const secondPart = diff / 100;

    const params = {
      timeStamp,
      pTimeStamp,
      diff,
      fps,
      secondPart,
    };

    clear();
    update(params);

    render(params);
  }
}

window.addEventListener('DOMContentLoaded', init);
