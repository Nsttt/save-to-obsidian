import browser from "webextension-polyfill";

const folderElement = document.getElementById(
	"folder",
) as HTMLInputElement | null;
const tagsElement = document.getElementById("tags") as HTMLInputElement | null;
const saveButtonElement = document.getElementById(
	"saveButton",
) as HTMLButtonElement | null;

// Function to load the current values from sync storage
const loadCurrentValues = async () => {
	try {
		const result = await browser.storage.sync.get([
			"defaultFolder",
			"defaultTags",
		]);

		if (folderElement) {
			folderElement.value = result.defaultFolder || ""; // Set to empty string if not found
		}

		if (tagsElement) {
			tagsElement.value = result.defaultTags || ""; // Set to empty string if not found
		}
	} catch (error) {
		console.error("Failed to load current values:", error);
	}
};

// Save button event listener
if (saveButtonElement) {
	saveButtonElement.addEventListener("click", () => {
		const defaultFolder = folderElement ? folderElement.value.trim() : "";
		const defaultTags = tagsElement ? tagsElement.value.trim() : "";

		browser.storage.sync.set({
			defaultFolder: defaultFolder,
			defaultTags: defaultTags,
		});
	});
} else {
	console.error("Save button element not found");
}

// Load the current values when the script runs
loadCurrentValues();
