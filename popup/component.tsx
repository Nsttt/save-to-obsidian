import React, { useState } from "react";
import browser from "webextension-polyfill";

export default () => {
  const [folder, setFolder] = useState("");
  const [tags, setTags] = useState([""]);

  function handleOnClick() {
    browser.storage.sync.set({ defaultFolder: folder, defaultTags: tags });
  }

  return (
    <div className="flex flex-col gap-4 p-4 shadow-sm bg-gradient-to-r from-purple-500 to-pink-500 w-96">
      <h1>Settings</h1>
      <input
        className="w-48"
        type="text"
        placeholder="Folder"
        value={folder}
        onChange={(e) => setFolder(e.target.value)}
      />
      <input
        className="w-48"
        type="text"
        placeholder="Tags"
        value={tags.toString()}
        onChange={(e) => setTags(e.target.value.split(","))}
      />
      <button
        className="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm disabled:opacity-75 w-48"
        onClick={handleOnClick}
      >
        Save
      </button>
    </div>
  );
};
