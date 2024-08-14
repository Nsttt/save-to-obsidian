import { Readability } from "@mozilla/readability";
import TurndownService from "turndown";
import browser from "webextension-polyfill";

const DEFAULT_VAULT = "";
const DEFAULT_FOLDER = "/";
const DEFAULT_TAGS = ["clippings"];

function getFileName(title: string) {
	const isWindows = window.navigator.userAgent.toLowerCase().includes("win");

	// Windows: \ / : * ? " < > |
	// Other OS: \ / :
	const invalidChars = isWindows ? /[\\/:*?"<>|]/g : /[\\/:]/g;
	const fileName = title.replace(invalidChars, "-");

	// Limit the file name to 100 characters
	if (fileName.length > 100) {
		return fileName.substring(0, 100);
	}

	return fileName;
}

function getSelectionHtml() {
	let html = "";
	const sel = window.getSelection();
	if (sel?.rangeCount) {
		const container = document.createElement("div");
		for (let i = 0, len = sel.rangeCount; i < len; ++i) {
			container.appendChild(sel.getRangeAt(i).cloneContents());
		}
		html = container.innerHTML;
	}
	return html;
}

function getToday() {
	const date = new Date();
	const yyyy = date.getFullYear().toString();
	const mm = (date.getMonth() + 1).toString();
	const dd = date.getDate().toString();
	const mmChars = mm.split("");
	const ddChars = dd.split("");

	return `${yyyy}-${mmChars[1] ? mm : `0${mmChars[0]}`}-${
		ddChars[1] ? dd : `0${ddChars[0]}`
	}`;
}

async function createNote() {
	const data = await browser.storage.sync.get(["defaultTags", "defaultFolder"]);

	const folder = data.defaultFolder || DEFAULT_FOLDER;
	const tags = [...DEFAULT_TAGS, data.defaultTags];

	const vaultName = DEFAULT_VAULT
		? `&vault=${encodeURIComponent(`${DEFAULT_VAULT}`)}`
		: "";

	const selection = getSelectionHtml();

	const clonedDoc = document.cloneNode(true) as Document; // ? Have to do this, structuredClone doesn't work on DOM elements.
	const readable = new Readability(clonedDoc).parse();

	/* parse and lightly clean the site's meta keywords content into tags, if present */
	const metaElement = document.querySelector<HTMLMetaElement>(
		'meta[name="keywords" i]',
	);

	if (metaElement) {
		const content = metaElement.getAttribute("content");
		if (content) {
			const keywords = content.split(",");
			for (const keyword of keywords) {
				const tag = ` ${keyword.trim()}`;
				tags.push(tag);
			}
		}
	}

	if (!readable) {
		console.error("Failed to parse the document with Readability.");
		return;
	}

	const fileName = getFileName(readable.title);

	const turndownService = new TurndownService({
		headingStyle: "atx",
		hr: "~~~",
		bulletListMarker: "-",
		codeBlockStyle: "fenced",
		emDelimiter: "*",
	});

	const markdownify = selection ? selection : readable.content;
	const markdownBody = turndownService.turndown(markdownify);
	const today = getToday();

	/* YAML front matter as tags render cleaner with special chars  */
	const fileContent =
		// biome-ignore lint/style/useTemplate: <explanation>
		"---\n" +
		"author:    " +
		readable.byline +
		"\n" +
		"source:    " +
		document.URL +
		"\n" +
		"clipped:   " +
		today +
		"\n" +
		"tags:      [" +
		tags.join(",") +
		"]\n" +
		"---\n\n" +
		markdownBody;

	document.location.href = `obsidian://new?file=${encodeURIComponent(
		folder + fileName,
	)}&content=${encodeURIComponent(fileContent)}${vaultName}`;
}

browser.runtime.onMessage.addListener((request) => {
	if (request.message === "clicked_context_menu") {
		createNote();
	}
});
