// This will create a context menu item
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "saveText",
    title: "Save to Obsidian",
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "saveText" && tab?.id !== undefined) {
    chrome.tabs.sendMessage(tab?.id, {
      message: "clicked_context_menu",
    });
  }
  // if (info.menuItemId === "saveText" && tab?.id !== undefined) {
  //   chrome.scripting.executeScript({
  //     target: { tabId: tab.id },
  //     files: ["content.js"],

  //   });
  // }
});
