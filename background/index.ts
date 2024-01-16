import browser from "webextension-polyfill";

// This will create a context menu item
browser.runtime.onInstalled.addListener(() => {
  browser.contextMenus.create({
    id: "saveText",
    title: "Save to Obsidian",
  });
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "saveText" && tab?.id !== undefined) {
    browser.tabs.sendMessage(tab?.id, {
      message: "clicked_context_menu",
    });
  }
});
