<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const props = defineProps({
  trigger: Object,
  modal: {
    type: Boolean,
    default: true,
  },
});

const dialog = ref(null);
const closingAnimation = ref(false);
const openingAnimation = ref(true);

function openDialog() {
  openingAnimation.value = true;
  setTimeout(() => {
    openingAnimation.value = false;
  }, 300);
  if (props.modal) {
    dialog.value.showModal();
  } else {
    dialog.value.show();
  }
}

function closeDialog(event, closeImmediately = false) {
  if (event.target === dialog.value || closeImmediately) {
    closingAnimation.value = true;
    setTimeout(() => {
      closingAnimation.value = false;
      dialog.value.close();
    }, 300);
  }
}

onMounted(() => {
  if (dialog.value) {
    dialog.value.addEventListener("click", closeDialog);
  }

  if (props.trigger) {
    props.trigger.addEventListener("click", openDialog);
  }
});

onUnmounted(() => {
  if (dialog.value) {
    dialog.value.removeEventListener("click", closeDialog);
  }

  if (props.trigger) {
    props.trigger.removeEventListener("click", openDialog);
  }
});
</script>

<template>
  <dialog
    class="dialog relative overflow-x-hidden rounded-lg"
    :class="{
      'animate-enter': openingAnimation,
      'animate-exit': closingAnimation,
    }"
    ref="dialog"
  >
    <div class="dialog-content">
      <slot>
        <h2>Hmm...</h2>
        <p>Da ist etwas schief gelaufen. Bitte versuche es später erneut.</p>
      </slot>
    </div>
    <button
      @click="(e) => closeDialog(e, true)"
      class="dialog-close absolute right-px top-px leading-[0]"
    >
      <Icon name="ic:outline-close" class="h-auto w-6" />
    </button>
  </dialog>
</template>

<style scoped lang="less">
.dialog {
  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }

  &.animate-enter {
    .dialog {
      &-content, &-close {
        animation: appearAnimation 0.3s ease-in-out;
      }
    }
  }

  &.animate-exit {
    .dialog {
      &-content, &-close {
        animation: disappearAnimation 0.3s ease-in-out;
      }
    }
  }
}
</style>
