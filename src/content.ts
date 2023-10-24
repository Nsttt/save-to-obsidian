import { Readability } from "@mozilla/readability";
import TurndownService from "turndown";

function getFileName(title: string) {
  const isWindows = window.navigator.userAgent.toLowerCase().includes("win");

  const fileName = isWindows
    ? title.replace(":", "").replace(/[/\\?%*|"<>]/g, "-")
    : title.replace(":", "").replace(/\//g, "-").replace(/\\/g, "-");

  return fileName;
}

function getSelectionHtml() {
  let html = "";
  const sel = window.getSelection();
  if (sel && sel.rangeCount) {
    let container = document.createElement("div");
    for (let i = 0, len = sel.rangeCount; i < len; ++i) {
      container.appendChild(sel.getRangeAt(i).cloneContents());
    }
    html = container.innerHTML;
  }
  return html;
}

function convertDate(date: Date) {
  const yyyy = date.getFullYear().toString();
  const mm = (date.getMonth() + 1).toString();
  const dd = date.getDate().toString();
  const mmChars = mm.split("");
  const ddChars = dd.split("");

  return (
    yyyy +
    "-" +
    (mmChars[1] ? mm : "0" + mmChars[0]) +
    "-" +
    (ddChars[1] ? dd : "0" + ddChars[0])
  );
}

function createNote() {
  /* Optional vault name */
  const vault = "";
  const vaultName = vault ? "&vault=" + encodeURIComponent(`${vault}`) : "";

  /* Optional folder name such as "Clippings/" */
  const folder = "Encounters/";

  /* Optional tags  */
  let tags = "clippings";

  const selection = getSelectionHtml();
  const today = convertDate(new Date());

  const clonedDoc = document.cloneNode(true) as Document; // ? Have to do this, structuredClone doesn't work on DOM elements.
  const readable = new Readability(clonedDoc).parse();

  /* parse and lightly clean the site's meta keywords content into tags, if present */
  const metaElement = document.querySelector<HTMLMetaElement>(
    'meta[name="keywords" i]'
  );

  if (metaElement) {
    const content = metaElement.getAttribute("content");
    if (content) {
      const keywords = content.split(",");
      keywords.forEach((keyword) => {
        const tag = " " + keyword.split(" ").join("");
        tags += tag;
      });
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

  /* YAML front matter as tags render cleaner with special chars  */
  const fileContent =
    "---\n" +
    "author:    " +
    readable.byline +
    "\n" +
    "title:     [" +
    readable.title +
    "]\n" +
    "source:    " +
    document.URL +
    "\n" +
    "clipped:   " +
    today +
    "\n" +
    "tags:      [" +
    tags +
    "]\n" +
    "---\n\n" +
    markdownBody;

  document.location.href =
    "obsidian://new?" +
    "file=" +
    encodeURIComponent(folder + fileName) +
    "&content=" +
    encodeURIComponent(fileContent) +
    vaultName;
}

chrome.runtime.onMessage.addListener(function (request) {
  if (request.message === "clicked_context_menu") {
    createNote();
  }
});
