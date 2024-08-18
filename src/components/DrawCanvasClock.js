let canvas = null;
let ctx = null;
let particles = [];
let text = "";

class Particle {
    constructor() {
        const r = Math.min(canvas.width, canvas.height) / 2;
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const rad = getRandom(0, 360) * Math.PI / 180;
        this.x = cx + r * Math.cos(rad);
        this.y = cy + r * Math.sin(rad);
        this.size = getRandom(2 * devicePixelRatio, 7 * devicePixelRatio);
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = "#1987543d";
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    moveTo(tx, ty) {
        const duration = 500;
        const sx = this.x;
        const sy = this.y;
        const xSpeed = (tx - sx) / duration;
        const ySpeed = (ty - sy) / duration;
        const startTime = Date.now();
        const _move = () => {
            const t = Date.now() - startTime;
            const x = sx + xSpeed * t;
            const y = sy + ySpeed * t;
            this.x = x;
            this.y = y;
            if (t >= duration) {
                this.x = tx;
                this.y = ty;
                return;
            }
            requestAnimationFrame(_move);
        }
        _move();
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)  + min);
}

function initCanvasSize() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    particles.forEach((particle) => {
        particle.draw();
    });
    requestAnimationFrame(draw);
}

function update() {
    const newText = getText();
    if (newText === text) {
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    text = newText;
    ctx.fillStyle = "#000";
    ctx.textBaseline = "middle";
    ctx.font = `${180 * devicePixelRatio}px 'DS-Digital', monospace`;
    const {width, height} = canvas;
    ctx.fillText(text, (width - ctx.measureText(text).width) / 2, height / 2 - height / 5);
    const points = getPoints();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < points.length; ++i) {
        let p = particles[i];
        if (!p) {
            p = new Particle();
            particles.push(p);
        }
        const [x, y] = points[i];
        p.moveTo(x, y);
    }
    if (points.length < particles.length) {
        particles.splice(points.length);
    }
}

function getText() {
    return new Date().toTimeString().substring(0, 8);
}

function getPoints() {
    const {
        width,
        height,
        data
    } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const points = [];
    const gap = 4;
    for (let i = 0; i < width; i += gap) {
        for (let j = 0; j < height; j += gap) {
            const index = (i + j * width) * 4;
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];
            const a = data[index + 3];
            if (r === 0 && g === 0 && b === 0 && a === 255) {
                points.push([i, j]);
            }
        }
    }
    return points;
}

export const drawClock = (_canvas) => {
    canvas = _canvas;
    ctx = canvas.getContext("2d", {
        willReadFrequently: true,
    });
    initCanvasSize();
    draw();
}
