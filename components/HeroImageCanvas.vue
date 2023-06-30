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
    drawPolygon(props.polygons[i].coordinates, i);
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

    if (props.polygons[index].text) {
      const text = props.polygons[index].text;
      ctx.font = "30px Arial";
      ctx.fillStyle = "black";

      // Calculate the midpoint of the polygon
      const midpoint = {
        x: polygonPoints.reduce((sum, point) => sum + point.x, 0) / polygonPoints.length,
        y: polygonPoints.reduce((sum, point) => sum + point.y, 0) / polygonPoints.length
      };

      // Measure the width and height of the text
      const textWidth = ctx.measureText(text).width;
      const textHeight = parseInt(ctx.font); // Approximate height based on font size

      // Adjust the position based on the text width and height
      const textX = midpoint.x * scale + offsetX - (textWidth / 2);
      const textY = midpoint.y * scale + offsetY + (textHeight / 2);

      // Draw the text
      ctx.fillText(text, textX, textY);
    }
    if (props.polygons[index].href) {
      canvas.style.cursor = 'pointer';
    }
  }

  if (hoveredPolygons.length == 0) {
    canvas.style.cursor = 'default';
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
    if (isPointInPolygon(mousePosition, props.polygons[i].coordinates)) {
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
    if (isPointInPolygon(clickedPoint, props.polygons[i].coordinates)) {
      if(props.polygons[i].href){
        navigateTo(props.polygons[i].href);
      }
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
