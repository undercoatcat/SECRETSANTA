const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let flakes = [];

for (let i = 0; i < 120; i++) {
    flakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        d: Math.random() + 0.5
    });
}

function drawSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(160, 160, 160, 0.8)";
    ctx.beginPath();

    for (let f of flakes) {
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    }

    ctx.fill();
    updateSnow();
}

function updateSnow() {
    for (let f of flakes) {
        f.y += f.d;
        if (f.y > canvas.height) {
            f.y = -5;
            f.x = Math.random() * canvas.width;
        }
    }
}

function loop() {
    drawSnow();
    requestAnimationFrame(loop);
}
loop();