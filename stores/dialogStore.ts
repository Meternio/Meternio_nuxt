export const useDialogStore = defineStore("dialog", () => {
  const dialog = ref([]);
  const closingAnimation = ref(false);
  const openingAnimation = ref(true);

  function addDialog(dialog) {
    this.dialog.push(dialog);
  }

  function removeDialog(dialog) {
    this.dialog = this.dialog.filter((d) => d !== dialog);
  }

  function openDialog(dialog, isModal = true) {
    const filteredDialogs = this.dialog.filter((d) => d === dialog);
    const filteredDialog = filteredDialogs.length > 0 ? filteredDialogs[0] : null;

    if (!filteredDialog) {
      return;
    }

    this.openingAnimation = true;
    setTimeout(() => {
      this.openingAnimation = false;
    }, 500);
    if (isModal) {
      filteredDialog.showModal();
    } else {
      filteredDialog.show();
    }
  }

  function closeDialog(dialog, event, closeImmediately = false, callback = () => {}) {
    event.stopPropagation();
    event.stopImmediatePropagation();

    if (event.target === dialog || closeImmediately) {
      this.closingAnimation = true;
      setTimeout(() => {
        this.closingAnimation = false;
        dialog.close();
        window.setTimeout(() => {
          callback();
        }, 200);
      }, 200);
    }
  }

  return {
    dialog,
    closingAnimation,
    openingAnimation,
    addDialog,
    removeDialog,
    openDialog,
    closeDialog,
  };
});
