// This will create a context menu item
chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: "saveText",
    title: "Save to Obsidian",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "saveText") {
    let selectedText = info.selectionText;
    saveTextToFile(selectedText ?? "Error gathering this text");
  }
});

function saveTextToFile(text: string) {
  let dataUri = "data:text/plain;charset=utf-8," + encodeURIComponent(text);

  // Download the text as a file
  chrome.downloads.download({
    url: dataUri,
    filename: "./highlighted_text.md", // TODO: This doesn't work as for now.
    conflictAction: "prompt",
  });
}
