const canvas = document.getElementById("waveformCanvas");
const ctx = canvas.getContext("2d");

let filtered = false;

// -----------------------------
// 1) ADD THIS: Resize function
// -----------------------------
function resizeCanvas() {
  canvas.width = canvas.offsetWidth;   // match CSS width
  canvas.height = 300;                 // fixed height
}
// Call it immediately
resizeCanvas();
// -----------------------------


// Generate synthetic seismic trace
function generateSignal(filtered) {
  const data = [];
  for (let i = 0; i < 400; i++) {
    let noise = Math.sin(i * 0.05) * 2 + (Math.random() - 0.5) * 4;

    if (i === 150 || i === 320 || i === 480) {
      noise += 25;
    }

    if (filtered) {
      noise = noise * 0.3;
    }

    data.push(noise);
  }
  return data;
}

// Draw the waveform + title
function drawSignal(filtered) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "16px Arial";
  ctx.fillStyle = "#333";
  const title = filtered
    ? "Filtered Synthetic Seismogram"
    : "Raw Synthetic Seismogram";
  ctx.fillText(title, 10, 20);

  const data = generateSignal(filtered);
  const scale = 6;
  const baseline = 150;

  ctx.beginPath();
  ctx.moveTo(0, baseline - data[0] * scale);

  for (let i = 1; i < data.length; i++) {
    const x = (i / data.length) * canvas.width; // correct scaling
    ctx.lineTo(x, baseline - data[i] * scale);
  }

  ctx.strokeStyle = filtered ? "#d9534f" : "#0275d8";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.font = "14px Arial";
  ctx.fillStyle = "#555";

  // Y-axis label
  ctx.save();
  ctx.translate(20, canvas.height / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("Amplitude", 0, 0);
  ctx.restore();

  // X-axis label
  ctx.fillText("Time (samples)", canvas.width / 2 - 50, canvas.height - 10);
}

// -----------------------------
// 2) Initial draw AFTER resizing
// -----------------------------
drawSignal(false);

// Toggle button
document.getElementById("toggleButton").addEventListener("click", () => {
  filtered = !filtered;
  drawSignal(filtered);

  document.getElementById("toggleButton").textContent =
    filtered ? "Show Raw Signal" : "Show Filtered Signal";
});

// -----------------------------
// 3) Redraw on window resize
// -----------------------------
window.addEventListener("resize", () => {
  resizeCanvas();
  drawSignal(filtered);
});
