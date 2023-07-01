<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { debounce } from "@/functions/main";
import * as THREE from "three";

const props = defineProps({
  image: String,
  polygons: Array,
});

const threeContainer = ref(null);

let camera, renderer, scene;

function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
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
  camera.position.set(0, 0, 5);

  // Create a renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  threeContainer.value.appendChild(renderer.domElement);

  // Create a cube
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Create a sphere for the 360 View
  var sphere = new THREE.SphereGeometry(500, 60, 40);
  sphere.scale(-1, 1, 1);
  var materialSphere = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(props.image),
  });
  var mesh = new THREE.Mesh(sphere, materialSphere);
  scene.add(mesh);

  // Render the scene
  function animate() {
    requestAnimationFrame(animate);

    // cube rotation
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  animate();
  window.addEventListener("resize", debouncedHandleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", debouncedHandleResize);
});
</script>

<template>
  <div :id="props.id" ref="threeContainer" class="hero_home_three"></div>
</template>
