import React, { useState } from "react";
import browser from "webextension-polyfill";

export default () => {
  const [folder, setFolder] = useState("");
  const [tags, setTags] = useState([""]);

  function handleOnClick() {
    browser.storage.sync.set({ defaultFolder: folder, defaultTags: tags });
  }

  return (
    <div className="flex flex-col gap-4 p-4 shadow-md bg-gray-800 w-96 border border-gray-600 rounded-md">
      <h1 className="text-white text-xl">Settings</h1>
      <input
        className="w-full p-2 bg-gray-700 text-white border border-gray-500 rounded-md"
        type="text"
        placeholder="Folder"
        value={folder}
        onChange={(e) => setFolder(e.target.value)}
      />
      <input
        className="w-full p-2 bg-gray-700 text-white border border-gray-500 rounded-md"
        type="text"
        placeholder="Tags"
        value={tags.toString()}
        onChange={(e) => setTags(e.target.value.split(","))}
      />
      <button
        className="px-4 py-2 font-semibold text-sm bg-blue-600 text-white rounded-md shadow-sm disabled:opacity-75 w-full hover:bg-blue-700 transition-colors"
        onClick={handleOnClick}
      >
        Save
      </button>
    </div>
  );
};
