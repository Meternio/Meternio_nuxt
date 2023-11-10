<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import { useDialogStore } from '@/stores/dialogStore';

const dialogStore = useDialogStore();
const nuxtApp = useNuxtApp();

const props = defineProps({
  trigger: Object,
  modal: {
    type: Boolean,
    default: true,
  },
});

const dialog = ref(null);

onMounted(() => {
  nuxtApp.$dialogPolyfill.registerDialog(dialog.value);

  if (dialog.value) {
    dialogStore.addDialog(dialog.value);
    dialog.value.addEventListener("click", (e) => dialogStore.closeDialog(dialog.value, e));
  }

  if (props.trigger) {
    props.trigger.addEventListener("click", () => dialogStore.openDialog(dialog.value));
  }
});

onBeforeUnmount(() => {
  if (dialog.value) {
    dialogStore.removeDialog(dialog.value);
    dialog.value.removeEventListener("click", dialogStore.closeDialog);
  }

  if (props.trigger) {
    props.trigger.removeEventListener("click", dialogStore.openDialog);
  }
});
</script>

<template>
  <dialog
    class="dialog relative overflow-x-hidden rounded-lg container lg:max-w-3xl py-5"
    :class="{
      'animate-enter': dialogStore.openingAnimation,
      'animate-exit': dialogStore.closingAnimation,
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
      @click="(e) => dialogStore.closeDialog(dialog, e, true)"
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

  /* START-polyfill */
  position: absolute;
  left: 0; right: 0;
  width: -moz-fit-content;
  width: -webkit-fit-content;
  width: fit-content;
  height: -moz-fit-content;
  height: -webkit-fit-content;
  height: fit-content;
  margin: auto;
  border: solid;
  padding: 1em;
  background: white;
  color: black;
  display: block;

  + .backdrop {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0; right: 0; bottom: 0; left: 0;
  }

  &:not([open]) {
    display: none;
  }

  ._dialog_overlay {
    position: fixed;
    top: 0; right: 0; bottom: 0; left: 0;
  }

  &.fixed {
    position: fixed;
    top: 50%;
    transform: translate(0, -50%);
  }
  /* END-polyfill */

  &.animate-enter {
    .dialog {
      &-content, &-close {
        animation: appearAnimation 0.5s ease-in-out;
      }
    }
  }

  &.animate-exit {
    .dialog {
      &-content, &-close {
        animation: disappearAnimation 0.2s ease-in-out;
      }
    }
  }
}
</style>
