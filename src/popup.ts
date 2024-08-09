import browser from "webextension-polyfill";

const folderElement = document.getElementById("folder");
const tagsElement = document.getElementById("tags");
const saveButtonElement = document.getElementById("saveButton");

if (saveButtonElement) {
  saveButtonElement.addEventListener("click", () => {
    // @ts-ignore
    const defaultFolder = folderElement ? folderElement.value : "";
    // @ts-ignore
    const defaultTags = tagsElement ? tagsElement.value : "";

    browser.storage.sync.set({
      defaultFolder: defaultFolder,
      defaultTags: defaultTags,
    });
  });
} else {
  console.error("Save button element not found");
}
