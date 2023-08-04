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
  if(props.modal) {
    dialog.showModal();
  } else {
    dialog.show();
  }
}

function closeDialog() {
  dialog.close();
}

onMounted(() => {
  if(!props.trigger) {
    return;
  }

  props.trigger.addEventListener("click", openDialog);
});

onUnmounted(() => {
  if(!props.trigger) {
    return;
  }

  props.trigger.removeEventListener("click", openDialog);
});
</script>

<template>
    <dialog class="dialog relative" ref="dialog">
      <slot>
        Error: Da ist etwas schief gelaufen. Bitte versuchen Sie es später erneut.
      </slot>
      <button @click="closeDialog" class="absolute right-2 top-2"><Icon name="ic:outline-close" /></button>
    </dialog>
</template>

<style scoped lang="less">

</style>
