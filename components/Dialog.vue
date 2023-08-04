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

function openDialog() {
  if (props.modal) {
    dialog.value.showModal();
  } else {
    dialog.value.show();
  }
}

function closeDialog(event, closeImmediately = false) {
  if (event.target === dialog.value || closeImmediately) {
    dialog.value.close();
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
  <dialog class="dialog relative overflow-x-hidden" ref="dialog">
    <slot>
      <h2>Hmm...</h2>
      <p>Da ist etwas schief gelaufen. Bitte versuche es später erneut.</p>
    </slot>
    <button @click="(e) => closeDialog(e, true)" class="absolute right-px top-px leading-[0]">
      <Icon name="ic:outline-close" class="h-auto w-6"/>
    </button>
  </dialog>
</template>

<style scoped lang="less">
.dialog {
  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>
