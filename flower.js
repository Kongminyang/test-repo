const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Particle {
    constructor(x, y, color) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 2;
        this.x = x;
        this.y = y;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.color = color;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.02; // gravity
        this.alpha -= 0.01;
    }
    draw(ctx) {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
}

let particles = [];
function launch() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.5;
    const color = `hsl(${Math.random() * 360}, 100%, 60%)`;
    for (let i = 0; i < 30; i++) {
        particles.push(new Particle(x, y, color));
    }
}

function update() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
        p.update();
        p.draw(ctx);
        if (p.alpha <= 0) particles.splice(i, 1);
    });
    requestAnimationFrame(update);
}

setInterval(launch, 1500);
update();
