const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
const addRoseBtn = document.getElementById('addRoseBtn');
const fireworksBtn = document.getElementById('fireworksBtn');
const resetBtn = document.getElementById('resetBtn');
const messageBox = document.getElementById('messageBox');
const messageTextElement = document.getElementById('messageText');

let roses = [];
let particles = [];
let animationFrameId;

const inspirationalMessages = [
    "Just like a rose, you possess a unique beauty and strength. Even in the darkest moments, your light can shine. Keep blooming!",
    "You are stronger than you think, and more capable than you know. Embrace your journey.",
    "Every challenge you face is an opportunity to grow. Believe in your resilience.",
    "Your presence brightens the world. Never forget the unique light you bring.",
    "Like fireworks, you have the power to create dazzling moments. Shine brightly!",
    "Even the smallest step forward is progress. Celebrate your victories, big or small.",
    "You are worthy of all the good things life has to offer. Embrace your worth.",
    "The most beautiful view comes after the hardest climb. Keep going, you're almost there.",
    "Your potential is limitless. Dare to dream big and follow your heart.",
    "In every ending, there is a new beginning. Embrace change and new possibilities."
];

function getRandomMessage() {
    const randomIndex = Math.floor(Math.random() * inspirationalMessages.length);
    return inspirationalMessages[randomIndex];
}

function resizeCanvas() {
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.6;
    if (canvas.width < 300) canvas.width = 300;
    if (canvas.height < 200) canvas.height = 200;
}

function drawRose(x, y, size = 30, color = '#E7788E') {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = color;
    ctx.strokeStyle = '#8B0000';
    ctx.lineWidth = 1;

    for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.ellipse(0, 0, size * 0.6, size * 0.4, i * Math.PI / 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(0, 0, size * 0.2, 0, Math.PI * 2);
    ctx.fillStyle = '#C2185B';
    ctx.fill();
    ctx.stroke();

    ctx.restore();
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.color = color;
        this.velocity = {
            x: (Math.random() - 0.5) * 8,
            y: (Math.random() - 0.5) * 8
        };
        this.alpha = 1;
        this.friction = 0.98;
        this.gravity = 0.1;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        this.velocity.y += this.gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
    }
}

function launchFireworks(x, y, count = 100) {
    const colors = ['#FFD700', '#FF4500', '#ADFF2F', '#1E90FF', '#FF69B4', '#FFFFFF'];
    for (let i = 0; i < count; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, color));
    }
}

function animate() {
    animationFrameId = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    roses.forEach(rose => {
        drawRose(rose.x, rose.y, rose.size, rose.color);
    });

    for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.update();
        particle.draw();

        if (particle.alpha <= 0 || particle.size <= 0.5) {
            particles.splice(i, 1);
        }
    }
}

// Event listeners
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const roseSize = Math.random() * 20 + 25;
    const roseColor = ['#FFC0CB', '#FF69B4', '#FF1493', '#C71585'][Math.floor(Math.random() * 4)];

    roses.push({ x, y, size: roseSize, color: roseColor });
    messageTextElement.textContent = getRandomMessage();
    messageBox.classList.add('show');
    launchFireworks(x, y, 80);
});

addRoseBtn.addEventListener('click', () => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const roseSize = Math.random() * 20 + 25;
    const roseColor = ['#FFC0CB', '#FF69B4', '#FF1493', '#C71585'][Math.floor(Math.random() * 4)];

    roses.push({ x, y, size: roseSize, color: roseColor });
    messageTextElement.textContent = getRandomMessage();
    messageBox.classList.add('show');
    launchFireworks(x, y, 80);
});

fireworksBtn.addEventListener('click', () => {
    if (roses.length > 0) {
        roses.forEach(rose => launchFireworks(rose.x, rose.y, 120));
    } else {
        for(let i = 0; i < 3; i++) {
            launchFireworks(Math.random() * canvas.width, Math.random() * canvas.height, 150);
        }
    }
});

resetBtn.addEventListener('click', () => {
    cancelAnimationFrame(animationFrameId);
    roses = [];
    particles = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    messageBox.classList.remove('show');
    messageTextElement.textContent = inspirationalMessages[0];
    animate();
});

// Initialize
window.addEventListener('resize', resizeCanvas);
window.onload = function() {
    resizeCanvas();
    animate();
};