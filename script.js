// Canvas setup
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let circles = [];
let selectedCircle = null;
let isDragging = false;

// Circle class
class Circle {
  constructor(x, y, radius = 20, color = "orange") {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

draw() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.closePath();

  if (this === selectedCircle) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = "#ffa500"; // orange border
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();
  }
}



  isPointInside(px, py) {
    const dx = px - this.x;
    const dy = py - this.y;
    return Math.sqrt(dx * dx + dy * dy) <= this.radius;
  }
}

// Redraw all circles
function drawAllCircles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach(c => c.draw());
}

// Add or select circle
canvas.addEventListener("mousedown", function(e) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  let clickedCircle = circles.find(c => c.isPointInside(mouseX, mouseY));

  if (clickedCircle) {
    // Reset all circles to default orange
    circles.forEach(c => c.color = "#ffa500");
    // Select clicked circle
    selectedCircle = clickedCircle;
    selectedCircle.color = "#ffffff"; // fill for selected
    isDragging = true;
  } else {
    // Reset all circles to default orange
    circles.forEach(c => c.color = "#ffa500");
    // Add new circle (orange by default)
    const newCircle = new Circle(mouseX, mouseY, 20, "#ffa500");
    circles.push(newCircle);
    selectedCircle = null; // no selection yet
  }
  drawAllCircles();
});


// Move circle while dragging
canvas.addEventListener("mousemove", function(e) {
  if (isDragging && selectedCircle) {
    const rect = canvas.getBoundingClientRect();
    selectedCircle.x = e.clientX - rect.left;
    selectedCircle.y = e.clientY - rect.top;
    drawAllCircles();
  }
});

// Stop dragging
canvas.addEventListener("mouseup", function() {
  isDragging = false;
});

// Delete selected circle with Delete key
document.addEventListener("keydown", function(e) {
  if (e.key === "Delete" && selectedCircle) {
    circles = circles.filter(c => c !== selectedCircle);
    selectedCircle = null;
    drawAllCircles();
  }
});

// Resize circle with mouse wheel
canvas.addEventListener("wheel", function(e) {
  if (selectedCircle) {
    e.preventDefault();
    if (e.deltaY < 0) {
      selectedCircle.radius += 2; // scroll up
    } else {
      selectedCircle.radius = Math.max(5, selectedCircle.radius - 2); // scroll down
    }
    drawAllCircles();
  }
});
