const folderElement = document.getElementById("folder");
const tagsElement = document.getElementById("tags");
const saveButtonElement = document.getElementById("saveButton");

if (saveButtonElement) {
  saveButtonElement.addEventListener("click", function () {
    // @ts-ignore
    const defaultFolder = folderElement ? folderElement.value : "";
    // @ts-ignore
    const defaultTags = tagsElement ? tagsElement.value : "";

    chrome.storage.sync.set(
      { defaultFolder: defaultFolder, defaultTags: defaultTags },
      function () {
        console.log("Settings saved");
      }
    );
  });
} else {
  console.error("Save button element not found");
}
