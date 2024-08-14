import browser from "webextension-polyfill";

const folderElement = document.getElementById(
  "folder"
) as HTMLInputElement | null;
const tagsElement = document.getElementById("tags") as HTMLInputElement | null;
const saveButtonElement = document.getElementById(
  "saveButton"
) as HTMLButtonElement | null;

if (saveButtonElement) {
  saveButtonElement.addEventListener("click", () => {
    const defaultFolder = folderElement ? folderElement.value : "";
    const defaultTags = tagsElement ? tagsElement.value : "";

    browser.storage.sync.set({
      defaultFolder: defaultFolder,
      defaultTags: defaultTags,
    });
  });
} else {
  console.error("Save button element not found");
}
