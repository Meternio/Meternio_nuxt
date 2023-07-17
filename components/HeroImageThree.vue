<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { debounce, throttle } from "@/functions/main";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const props = defineProps({
  image: String,
  polygons: Array,
});

const threeContainer = ref(null);

let camera, renderer, scene, controls, sphereMesh;
const segmentSpheres = [];

function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function handleInteractions(event) {
  event.preventDefault();

  // Calculate normalized device coordinates
  var mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Perform raycasting from the camera to the mouse position
  var raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  // Check for intersection between the ray and the segmentSphere mesh
  var intersects = raycaster.intersectObjects(segmentSpheres);

  // Reset material for all spheres
  for (let i = 0; i < segmentSpheres.length; i++) {
    segmentSpheres[i].material = new THREE.MeshBasicMaterial({
      color: 0x000000,
      side: THREE.DoubleSide,
      opacity: 0.5,
      transparent: true,
      depthTest: false,
    });
  }

  // If there is an intersection, handle the hover event for the specific sphere
  if (intersects.length > 0) {
    let hoveredObject = intersects[0].object;
    hoveredObject.material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      opacity: 0.5,
      transparent: true,
      depthTest: false,
    });

    if (event.type === "mousemove") {
      console.log("Mouse is moving");
    } else if (event.type === "click") {
      console.log("Mouse was clicked");
    }
  }
}

function createSegmentWithOutline(
  radius,
  widthSegments,
  heightSegments,
  phiStart,
  phiLength,
  thetaStart,
  thetaLength,
  rotationX = 0,
) {
  // Create a sphere segment geometry
  var segmentSphereGeometry = new THREE.SphereGeometry(
    radius,
    widthSegments,
    heightSegments,
    phiStart,
    phiLength,
    thetaStart,
    thetaLength
  );

  // Create a material for the main segment
  var segmentMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    side: THREE.DoubleSide,
    opacity: 0.5,
    transparent: true,
    depthTest: false,
  });

  // Create the main segment mesh
  var segmentMesh = new THREE.Mesh(segmentSphereGeometry, segmentMaterial);

  segmentMesh.rotation.x = rotationX; // Rotate around the x-axis

  // Add the group to the scene
  scene.add(segmentMesh);
  segmentSpheres.push(segmentMesh);
}

const debouncedHandleResize = debounce(handleResize, 400);
const throttledHandleInteractions = throttle(handleInteractions, 10);

onMounted(() => {
  // Create a scene
  scene = new THREE.Scene();

  // Create a camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(60, 20, 60);

  // Create a renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  threeContainer.value.appendChild(renderer.domElement);

  // Create controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 100;
  controls.maxDistance = 400;
  controls.zoomSpeed = 2;
  controls.update();

  // Create a sphere for the 360 View
  var sphereGeometry = new THREE.SphereGeometry(500, 60, 40);
  sphereGeometry.scale(-1, 1, 1);
  var materialSphere = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(props.image),
  });
  sphereMesh = new THREE.Mesh(sphereGeometry, materialSphere);
  scene.add(sphereMesh);

  // Create a sphere segment geometry
  // positional x, width, positional y, height
  createSegmentWithOutline(500, 60, 40, -0.938, 0.3, 1.64, 0.2, 0.02);

  // Render the scene
  function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", debouncedHandleResize);
  window.addEventListener("click", handleInteractions);
  window.addEventListener("mousemove", throttledHandleInteractions);
});

onUnmounted(() => {
  window.removeEventListener("resize", debouncedHandleResize);
  window.removeEventListener("click", handleInteractions);
  window.removeEventListener("mousemove", throttledHandleInteractions);
});
</script>

<template>
  <div :id="props.id" ref="threeContainer" class="hero_home_three"></div>
</template>
