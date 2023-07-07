<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { debounce } from "@/functions/main";
import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const props = defineProps({
  image: String,
  polygons: Array,
});

const threeContainer = ref(null);

let camera, renderer, scene, controls, sphereMesh, segmentSphereMesh;

function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function handleMouseClick(event) {
  event.preventDefault();

  // Calculate normalized device coordinates
  var mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Perform raycasting from the camera to the clicked position
  var raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  // Check for intersection between the ray and the segmentSphere mesh
  var intersects = raycaster.intersectObject(segmentSphereMesh);

  // If there is an intersection, handle the click event
  if (intersects.length > 0) {
    console.log('Segment clicked!');
    // Perform your desired action here when the segment is clicked
  }
}

const debouncedHandleResize = debounce(handleResize, 400);

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
  camera.position.set(0, 0, 400);

  // Create a renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  threeContainer.value.appendChild(renderer.domElement);

  // Create controls
  controls = new OrbitControls(camera, renderer.domElement);

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
  var segmntSphereGeometry = new THREE.SphereGeometry(500, 60, 40, -0.95, 0.3, 1.63, 0.2);
  var segmntSphereMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide, opacity: 0.5, transparent: true, border: 0x000000 });
  segmentSphereMesh = new THREE.Mesh(segmntSphereGeometry, segmntSphereMaterial);
  segmentSphereMesh.material.depthTest = false;
  segmentSphereMesh.renderOrder = 1;
  segmentSphereMesh.position.set(0,0,0);
  sphereMesh.add(segmentSphereMesh);

  // Render the scene
  function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", debouncedHandleResize);
  window.addEventListener('click', handleMouseClick);
});

onUnmounted(() => {
  window.removeEventListener("resize", debouncedHandleResize);
  window.removeEventListener('click', handleMouseClick);
});
</script>

<template>
  <div :id="props.id" ref="threeContainer" class="hero_home_three"></div>
</template>
