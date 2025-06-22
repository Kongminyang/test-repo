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
let rockets = [];

class Rocket {
    constructor(x, targetY, color) {
        this.x = x;
        this.y = canvas.height;
        this.targetY = targetY;
        this.color = color;
        this.exploded = false;
    }
    update() {
        if (!this.exploded) {
            this.y -= 5;
            if (this.y <= this.targetY) {
                this.exploded = true;
                for (let i = 0; i < 40; i++) {
                    particles.push(new Particle(this.x, this.y, this.color));
                }
            }
        }
    }
    draw(ctx) {
        if (!this.exploded) {
            ctx.fillStyle = '#fff';
            ctx.fillRect(this.x - 1, this.y, 2, 8);
        }
    }
}

function launch() {
    const x = Math.random() * canvas.width;
   const targetY = Math.random() * canvas.height * 0.4 + 80;
    const color = `hsl(${Math.random() * 360}, 100%, 60%)`;
      rockets.push(new Rocket(x, targetY, color));
}

function update() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    rockets.forEach((r, i) => {
        r.update();
        r.draw(ctx);
        if (r.exploded) rockets.splice(i, 1);
    });

    particles.forEach((p, i) => {
        p.update();
        p.draw(ctx);
        if (p.alpha <= 0) particles.splice(i, 1);
    });

    requestAnimationFrame(update);
}

setInterval(launch, 1200);
update();
