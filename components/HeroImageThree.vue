<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { debounce, throttle } from "@/functions/main";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { useDialogStore } from '@/stores/dialogStore';

const dialogStore = useDialogStore();
const router = useRouter();
let cameraAnimationIndex = 0;


const props = defineProps({
  image: String,
  cameraPosition: Array,
  cameraRotation: Array,
  cameraAnimationPositionAndRotation: Array,
  segments: Array,
});

const threeContainer = ref(null);

let camera, renderer, scene, controls, sphereMesh;
const segmentSpheres = [];

function cameraAnimation(){
  if(
    props.cameraAnimationPositionAndRotation[cameraAnimationIndex][0] === Math.round(camera.position.x) &&
    props.cameraAnimationPositionAndRotation[cameraAnimationIndex][1] === Math.round(camera.position.y) &&
    props.cameraAnimationPositionAndRotation[cameraAnimationIndex][2] === Math.round(camera.position.z) &&
    props.cameraAnimationPositionAndRotation[cameraAnimationIndex][3] === Math.round((camera.rotation.x + Number.EPSILON) * 100) / 100 &&
    props.cameraAnimationPositionAndRotation[cameraAnimationIndex][4] === Math.round((camera.rotation.y + Number.EPSILON) * 100) / 100 &&
    props.cameraAnimationPositionAndRotation[cameraAnimationIndex][5] === Math.round((camera.rotation.z + Number.EPSILON) * 100) / 100
  ){
    cameraAnimationIndex++;
    return;
  }

  if(props.cameraAnimationPositionAndRotation[cameraAnimationIndex][0] > Math.round(camera.position.x)){
    camera.position.x += 1;
  } else if(props.cameraAnimationPositionAndRotation[cameraAnimationIndex][0] < Math.round(camera.position.x)){
    camera.position.x -= 1;
  }

  if(props.cameraAnimationPositionAndRotation[cameraAnimationIndex][1] > Math.round(camera.position.y)){
    camera.position.y += 1;
  } else if(props.cameraAnimationPositionAndRotation[cameraAnimationIndex][1] < Math.round(camera.position.y)){
    camera.position.y -= 1;
  }

  if(props.cameraAnimationPositionAndRotation[cameraAnimationIndex][2] > Math.round(camera.position.z)){
    camera.position.z += 1;
  } else if(props.cameraAnimationPositionAndRotation[cameraAnimationIndex][2] < Math.round(camera.position.z)){
    camera.position.z -= 1;
  }

  if(props.cameraAnimationPositionAndRotation[cameraAnimationIndex][3] > Math.round((camera.rotation.x + Number.EPSILON) * 100) / 100){
    camera.rotation.x += 0.005;
  } else if(props.cameraAnimationPositionAndRotation[cameraAnimationIndex][3] < Math.round((camera.rotation.x + Number.EPSILON) * 100) / 100){
    camera.rotation.x -= 0.005;
  }

  if(props.cameraAnimationPositionAndRotation[cameraAnimationIndex][4] > Math.round((camera.rotation.y + Number.EPSILON) * 100) / 100){
    camera.rotation.y += 0.005;
  } else if(props.cameraAnimationPositionAndRotation[cameraAnimationIndex][4] < Math.round((camera.rotation.y + Number.EPSILON) * 100) / 100){
    camera.rotation.y -= 0.005;
  }

  if(props.cameraAnimationPositionAndRotation[cameraAnimationIndex][5] > Math.round((camera.rotation.z + Number.EPSILON) * 100) / 100){
    camera.rotation.z += 0.005;
  } else if(props.cameraAnimationPositionAndRotation[cameraAnimationIndex][5] < Math.round((camera.rotation.z + Number.EPSILON) * 100) / 100){
    camera.rotation.z -= 0.005;
  }
}

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
      opacity: 0.2,
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
      //console.log("Mouse is moving");
    } else if (event.type === "click") {
      //console.log("Mouse was clicked");
      if(hoveredObject.dialogId && document.querySelector(`#${hoveredObject.dialogId}`)){
        dialogStore.openDialog(document.querySelector(`#${hoveredObject.dialogId}`));
        return;
      }

      if(hoveredObject.href){
        if(hoveredObject.href === "/"){
          window.location.reload();
          return;
        }

        router.push(hoveredObject.href);
        return;
      }
    }
  }
}

function createSegment(
  radius,
  widthSegments,
  heightSegments,
  phiStart,
  phiLength,
  thetaStart,
  thetaLength,
  rotationX,
  dialogId = null,
  href = null,
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
    opacity: 0.2,
    transparent: true,
    depthTest: false,
  });

  // Create the main segment mesh
  var segmentMesh = new THREE.Mesh(segmentSphereGeometry, segmentMaterial);

  segmentMesh.rotation.x = rotationX; // Rotate around the x-axis

  segmentMesh.dialogId = dialogId;
  segmentMesh.href = href;

  // Add the group to the scene
  scene.add(segmentMesh);
  segmentSpheres.push(segmentMesh);
}

const debouncedHandleResize = debounce(handleResize, 400);
const throttledHandleInteractions = throttle(handleInteractions, 10);
const throttledCameraAnimation = throttle(cameraAnimation, 0);

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

  if(props.cameraPosition){
    camera.position.set(...props.cameraPosition);
  } else {
    camera.position.set(60, 20, 60);
  }

  if(props.cameraRotation){
    camera.rotation.set(...props.cameraRotation);
  } else {
    camera.rotation.set(0, 0, 0);
  }
  
  // Create a renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  threeContainer.value.appendChild(renderer.domElement);

  // Create controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 1;
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
  for (let i = 0; i < props.segments.length; i++) {
    createSegment(...props.segments[i].segment, props.segments[i]?.dialogId, props.segments[i]?.href);
  }

  // Render the scene
  function animate() {
    requestAnimationFrame(animate);
    
    if(props.cameraAnimationPositionAndRotation && props.cameraAnimationPositionAndRotation.length > cameraAnimationIndex){
        controls.enabled = false;
        throttledCameraAnimation();
    } else if(controls.enabled === false){
        camera.position.set(props.cameraAnimationPositionAndRotation[props.cameraAnimationPositionAndRotation.length - 1][0], props.cameraAnimationPositionAndRotation[props.cameraAnimationPositionAndRotation.length - 1][1], props.cameraAnimationPositionAndRotation[props.cameraAnimationPositionAndRotation.length - 1][2]);
        camera.rotation.set(props.cameraAnimationPositionAndRotation[props.cameraAnimationPositionAndRotation.length - 1][3], props.cameraAnimationPositionAndRotation[props.cameraAnimationPositionAndRotation.length - 1][4], props.cameraAnimationPositionAndRotation[props.cameraAnimationPositionAndRotation.length - 1][5]);
        controls.enabled = true;
        controls.update();
    }

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
  <div :id="props.id" ref="threeContainer" class="hero_three"></div>
  <slot></slot>
</template>
