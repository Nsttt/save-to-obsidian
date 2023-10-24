import { Readability } from "@mozilla/readability";
import TurndownService from "turndown";

function createNote() {
  /* Optional vault name */
  const vault = "";

  /* Optional folder name such as "Clippings/" */
  const folder = "Encounters/";

  /* Optional tags  */
  let tags = "clippings";

  /* parse and lightly clean the site's meta keywords content into tags, if present */
  const metaElement = document.querySelector<HTMLMetaElement>(
    'meta[name="keywords" i]'
  );
  if (metaElement) {
    const content = metaElement.getAttribute("content");
    if (content) {
      const keywords = content.split(",");
      keywords.forEach(function (keyword) {
        let tag = " " + keyword.split(" ").join("");
        tags += tag;
      });
    }
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

  const selection = getSelectionHtml();

  const clonedDoc = document.cloneNode(true) as Document;
  const readable = new Readability(clonedDoc).parse();

  if (!readable) {
    console.error("Failed to parse the document with Readability.");
    return;
  }

  const { title, byline, content } = readable;

  function getFileName(fileName: string) {
    const userAgent = window.navigator.userAgent.toLowerCase();

    // Check if the user agent contains 'win', which indicates Windows platform
    const isWindows = userAgent.includes("win");

    if (isWindows) {
      fileName = fileName.replace(":", "").replace(/[/\\?%*|"<>]/g, "-");
    } else {
      fileName = fileName
        .replace(":", "")
        .replace(/\//g, "-")
        .replace(/\\/g, "-");
    }
    return fileName;
  }

  const fileName = getFileName(title);
  const markdownify = selection ? selection : content;
  const vaultName = vault ? "&vault=" + encodeURIComponent(`${vault}`) : "";

  const turndownService = new TurndownService({
    headingStyle: "atx",
    hr: "~~~",
    bulletListMarker: "-",
    codeBlockStyle: "fenced",
    emDelimiter: "*",
  });
  const markdownBody = turndownService.turndown(markdownify);

  let date = new Date();

  function convertDate(date: Date) {
    let yyyy = date.getFullYear().toString();
    let mm = (date.getMonth() + 1).toString();
    let dd = date.getDate().toString();
    let mmChars = mm.split("");
    let ddChars = dd.split("");
    return (
      yyyy +
      "-" +
      (mmChars[1] ? mm : "0" + mmChars[0]) +
      "-" +
      (ddChars[1] ? dd : "0" + ddChars[0])
    );
  }

  const today = convertDate(date);

  /* YAML front matter as tags render cleaner with special chars  */
  const fileContent =
    "---\n" +
    "author:    " +
    byline +
    "\n" +
    "title:     [" +
    title +
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
