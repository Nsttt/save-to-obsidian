// import React from "react";
// import { render, fireEvent, screen } from "@testing-library/react";
// import { $, expect } from "@wdio/globals";
// import browser from "webextension-polyfill";

// import Popup from "./component"; // Update the import path as needed

// describe("Popup Component Tests", () => {
//   it("should allow adding and removing tags", async () => {
//     render(<Popup />);

//     // Check initial state of tags
//     expect(screen.getByText("clippings")).toBeInTheDocument();

//     // Simulate adding a tag
//     const input = screen.getByLabelText("Tags");
//     fireEvent.change(input, { target: { value: "new-tag" } });
//     fireEvent.keyDown(input, { key: "Enter" });

//     // Check if the tag was added
//     expect(screen.getByText("new-tag")).toBeInTheDocument();

//     // Simulate removing a tag
//     const removeTagButton = screen.getAllByRole("button", {
//       name: /remove tag/i,
//     })[0];
//     fireEvent.click(removeTagButton);

//     // Check if the tag was removed
//     expect(screen.queryByText("new-tag")).not.toBeInTheDocument();
//   });

//   it("should save data correctly", () => {
//     render(<Popup />);

//     // Simulate setting folder name
//     const folderInput = screen.getByLabelText("Folder Name");
//     fireEvent.change(folderInput, { target: { value: "/test/folder" } });

//     // Simulate clicking the save button
//     const saveButton = screen.getByRole("button", { name: /save/i });
//     fireEvent.click(saveButton);

//     // Check if browser storage was called correctly
//     expect(browser.storage.sync.set).toHaveBeenCalledWith({
//       defaultFolder: "/test/folder",
//       defaultTags: ["clippings"], // Assuming initial tags state includes 'clippings'
//     });
//   });
// });
