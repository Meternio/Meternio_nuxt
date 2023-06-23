<script setup>
import { onMounted, onUnmounted } from "vue";
import { debounce } from "@/functions/main";

const props = defineProps({
  id: String,
  image: String,
  polygons: Array,
});

let canvas, ctx, img, scale, offsetX, offsetY;
var hoveredPolygons = [];

function drawImage() {
  let canvasWidth = canvas.width;
  let canvasHeight = canvas.height;
  let imgWidth = img.width;
  let imgHeight = img.height;

  scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
  offsetX = (canvasWidth - imgWidth * scale) / 2;
  offsetY = (canvasHeight - imgHeight * scale) / 2;

  ctx.drawImage(img, offsetX, offsetY, imgWidth * scale, imgHeight * scale);

  // Draw polygon relative to the image
  for (var i = 0; i < props.polygons.length; i++) {
    drawPolygon(props.polygons[i], i);
  }
}

function drawPolygon(polygonPoints, index) {
  ctx.beginPath();

  ctx.moveTo(
    polygonPoints[0].x * scale + offsetX,
    polygonPoints[0].y * scale + offsetY
  );
  for (var i = 1; i < polygonPoints.length; i++) {
    ctx.lineTo(
      polygonPoints[i].x * scale + offsetX,
      polygonPoints[i].y * scale + offsetY
    );
  }
  ctx.closePath();

  if (hoveredPolygons.includes(index)) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fill();
  }

  ctx.lineWidth = 5;
  ctx.strokeStyle = "white";
  ctx.stroke();
}

function isPointInPolygon(point, polygon) {
  var inside = false;
  var x = point.x;
  var y = point.y;

  for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    var xi = polygon[i].x * scale + offsetX;
    var yi = polygon[i].y * scale + offsetY;
    var xj = polygon[j].x * scale + offsetX;
    var yj = polygon[j].y * scale + offsetY;

    var intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) {
      inside = !inside;
    }
  }

  return inside;
}

function handleMouseMove(event) {
  var canvasRect = canvas.getBoundingClientRect();
  var mousePosX = event.clientX - canvasRect.left;
  var mousePosY = event.clientY - canvasRect.top;

  var mousePosition = {
    x: mousePosX,
    y: mousePosY,
  };

  hoveredPolygons = [];
  for (var i = 0; i < props.polygons.length; i++) {
    if (isPointInPolygon(mousePosition, props.polygons[i])) {
      hoveredPolygons.push(i);
    }
  }
  drawImage();
}

function handleClick(event) {
  var canvasRect = canvas.getBoundingClientRect();
  var clickX = event.clientX - canvasRect.left;
  var clickY = event.clientY - canvasRect.top;

  var clickedPoint = {
    x: clickX,
    y: clickY,
  };

  for (var i = 0; i < props.polygons.length; i++) {
    if (isPointInPolygon(clickedPoint, props.polygons[i])) {
      console.log("Polygon clicked!");
    }
  }
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawImage();
}

const debouncedResizeCanvas = debounce(resizeCanvas, 400);

onMounted(() => {
  canvas = document.getElementById(props.id);
  ctx = canvas.getContext("2d");
  img = new Image();
  img.src = props.image;

  window.addEventListener("resize", debouncedResizeCanvas);
  canvas.addEventListener("click", handleClick);
  canvas.addEventListener("mousemove", handleMouseMove);

  img.onload = () => {
    resizeCanvas();
  };
});

onUnmounted(() => {
  window.removeEventListener("resize", debouncedResizeCanvas);
  canvas.removeEventListener("click", handleClick);
  canvas.removeEventListener("mousemove", handleMouseMove);
});
</script>

<template>
  <canvas :id="props.id"></canvas>
</template>
