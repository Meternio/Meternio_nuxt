<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { debounce, throttle } from "@/functions/main";
import * as THREE from "three";
import CameraControls from 'camera-controls';
import { useDialogStore } from '@/stores/dialogStore';

const dialogStore = useDialogStore();
const router = useRouter();
const emit = defineEmits();

const props = defineProps({
  image: String,
  cameraPosition: Array,
  cameraRotation: Array,
  standupAnimation: Boolean,
  segments: Array,
});

const threeContainer = ref(null);
const isLoadingScreen = ref(true);
const isStandupAnimation = ref(false);

let camera, renderer, scene, controls, sphereMesh, clock, loop;
const segmentSpheres = [];

function finishedLoading() {
  isLoadingScreen.value = false;

  if (props.standupAnimation) {
    standupAnimation();
  }
}

async function standupAnimation() {
  controls.enabled = false;
  isStandupAnimation.value = true;
  await controls.rotateTo(Math.PI * 0.5, Math.PI * 0.5, true);
  await controls.elevate(450, true);
  await controls.rotate(Math.PI * 0.2, 0, true);
  await controls.rotate(-Math.PI * 0.4, 0, true);
  await controls.rotate(Math.PI * 0.2, 0, true);
  isStandupAnimation.value = false;
  controls.enabled = true;
  window.addEventListener("click", handleInteractions);
  window.addEventListener("mousemove", throttledHandleInteractions);
}

async function leaveAnimation() {
  controls.enabled = false;
  await controls.lookInDirectionOf(-41, -10, 26, true);
  await controls.forward(400, true);
  controls.enabled = true;
  emit('leaveTour');
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
      if (hoveredObject.dialogId && document.querySelector(`#${hoveredObject.dialogId}`)) {
        dialogStore.openDialog(document.querySelector(`#${hoveredObject.dialogId}`));
        return;
      }

      if (hoveredObject.functionToCall) {
        if (hoveredObject.functionToCall === 'leaveAnimation') {
          leaveAnimation();
        }

        return;
      }

      if (hoveredObject.href) {
        if (hoveredObject.href === "/") {
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
  functionToCall = null,
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
  segmentMesh.functionToCall = functionToCall;

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

  if (props.cameraPosition) {
    camera.position.set(...props.cameraPosition);
  } else {
    camera.position.set(0, 0, 0);
  }

  if (props.cameraRotation) {
    camera.rotation.set(...props.cameraRotation);
  } else {
    camera.rotation.set(0, 0, 0);
  }

  // Create a renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  threeContainer.value.appendChild(renderer.domElement);

  // Create a clock
  clock = new THREE.Clock();

  // Create controls
  CameraControls.install({ THREE: THREE });
  controls = new CameraControls(camera, renderer.domElement);
  controls.distance = 50;
  controls.maxDistance = 200;
  controls.minDistance = 10;
  controls.elevate(-450, false);
  controls.rotateTo(Math.PI * 0.5, Math.PI * 0.7, false);

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
    createSegment(...props.segments[i].segment, props.segments[i]?.dialogId, props.segments[i]?.href, props.segments[i]?.functionToCall);
  }

  // Render the scene
  function animate() {
    controls.update(clock.getDelta());

    loop = requestAnimationFrame(animate);

    renderer.render(scene, camera);
  }

  animate();

  if (props.standupAnimation) {
    isStandupAnimation.value = true;
  } else {
    window.addEventListener("click", handleInteractions);
    window.addEventListener("mousemove", throttledHandleInteractions);
  }

  window.addEventListener("resize", debouncedHandleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", debouncedHandleResize);
  window.removeEventListener("click", handleInteractions);
  window.removeEventListener("mousemove", throttledHandleInteractions);
  cancelAnimationFrame(loop);
  loop = null;
  scene = null;
  camera = null;
  renderer = null;
  controls = null;
  sphereMesh = null;
  segmentSpheres.length = 0;
  clock = null;
});
</script>

<template>
  <LoadingScreen v-if="isLoadingScreen" loading-text="virtuelles Büro wird geladen" @loading-finished="finishedLoading"/>
  <Transition>
    <div v-if="isStandupAnimation" class="initialize-screen font-pressStart bg-slate/60 pointer-events-none text-white absolute h-full w-full flex items-center justify-center flex-col gap-5 z-10">
      <span :class="{
        'animate-typeIn': !isLoadingScreen,
      }" class="initialize-screen__text text-xl font-bold text-center">System startet.</span>
    </div>
  </Transition>
  <div :id="props.id" ref="threeContainer" class="hero_three h-full w-full"></div>
  <slot></slot>
</template>

<style scoped lang="less">
  .hero_three {
    :deep(canvas) {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

  .initialize-screen {
    &__text {
      overflow: hidden; /* Ensures the content is not revealed until the animation */
      border-right: .15em solid theme("colors.primary"); /* The typwriter cursor */
      white-space: nowrap; /* Keeps the content on a single line */
      margin: 0 auto; /* Gives that scrolling effect as the typing happens */
      text-indent: 100%;
      width: 0;
      max-width: fit-content;
      &.animate-typeIn {
        text-indent: 0;
        width: auto;
        animation:
          typing 3.5s steps(40, end),
          blink-caret .75s step-end infinite;
      }
    }
  }
</style>
