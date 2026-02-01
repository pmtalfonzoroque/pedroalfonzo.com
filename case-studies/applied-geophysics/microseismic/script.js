const canvas = document.getElementById("waveformCanvas");
const ctx = canvas.getContext("2d");

let filtered = false;

// Generate synthetic seismic trace
function generateSignal(filtered) {
  const data = [];
  for (let i = 0; i < 600; i++) {
    let noise = Math.sin(i * 0.05) * 2 + (Math.random() - 0.5) * 4;

    // Add synthetic "events"
    if (i === 150 || i === 320 || i === 480) {
      noise += 25;
    }

    // Simple smoothing for filtered version
    if (filtered) {
      noise = noise * 0.3;
    }

    data.push(noise);
  }
  return data;
}

// Draw the waveform + title
function drawSignal(filtered) {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Title
  ctx.font = "16px Arial";
  ctx.fillStyle = "#333";
  const title = filtered
    ? "Filtered Synthetic Seismogram"
    : "Raw Synthetic Seismogram";
  ctx.fillText(title, 10, 20);

  // Generate data
  const data = generateSignal(filtered);

  // Draw waveform
  ctx.beginPath();
  ctx.moveTo(0, 100 - data[0]);

  for (let i = 1; i < data.length; i++) {
    ctx.lineTo(i, 100 - data[i]);
  }

  ctx.strokeStyle = filtered ? "#d9534f" : "#0275d8"; // red vs blue
  ctx.lineWidth = 2;
  ctx.stroke();
}

// Initial draw
drawSignal(false);

// Toggle button
document.getElementById("toggleButton").addEventListener("click", () => {
  filtered = !filtered;
  drawSignal(filtered);

  document.getElementById("toggleButton").textContent =
    filtered ? "Show Raw Signal" : "Show Filtered Signal";
});
