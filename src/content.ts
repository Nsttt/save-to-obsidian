import { Readability } from "@mozilla/readability";
import TurndownService from "turndown";

const DEFAULT_FOLDER = "Encounters/";
const DEFAULT_TAGS = "clippings";

function getTagsFromMeta(): string {
  const metaElement = document.querySelector<HTMLMetaElement>(
    'meta[name="keywords" i]'
  );
  let tags = DEFAULT_TAGS;

  if (metaElement) {
    const content = metaElement.getAttribute("content");
    if (content) {
      const keywords = content
        .split(",")
        .map((keyword) => keyword.trim().replace(/\s+/g, ""));
      tags += " " + keywords.join(" ");
    }
  }

  return tags;
}

function getSelectionHtml(): string {
  let html = "";
  const sel = window.getSelection();
  if (sel && sel.rangeCount) {
    const container = document.createElement("div");
    for (let i = 0; i < sel.rangeCount; ++i) {
      container.appendChild(sel.getRangeAt(i).cloneContents());
    }
    html = container.innerHTML;
  }
  return html;
}

function getFileName(fileName: string): string {
  const isWindows = window.navigator.userAgent.toLowerCase().includes("win");
  const invalidChars = isWindows ? /[:/\\?%*|"<>]/g : /[:/\\|]/g;

  return fileName.replace(":", "").replace(invalidChars, "-");
}

function convertDate(date: Date): string {
  const yyyy = date.getFullYear().toString();
  const mm = (date.getMonth() + 1).toString().padStart(2, "0");
  const dd = date.getDate().toString().padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function createNote() {
  const folder = DEFAULT_FOLDER;
  const tags = getTagsFromMeta();
  const selection = getSelectionHtml();
  const clonedDoc = document.cloneNode(true) as Document;
  const readable = new Readability(clonedDoc).parse();

  if (!readable) {
    console.error("Failed to parse the document with Readability.");
    return;
  }

  const { title, byline, content } = readable;
  const fileName = getFileName(title);
  const markdownify = selection || content;
  const vaultName = "&vault=" + encodeURIComponent("");
  const turndownService = new TurndownService({
    headingStyle: "atx",
    hr: "~~~",
    bulletListMarker: "-",
    codeBlockStyle: "fenced",
    emDelimiter: "*",
  });

  const markdownBody = turndownService.turndown(markdownify);
  const today = convertDate(new Date());

  const fileContent = `
---
author:    ${byline}
title:     [${title}]
source:    ${document.URL}
clipped:   ${today}
tags:      [${tags}]
---

${markdownBody}
`;

  document.location.href = `obsidian://new?file=${encodeURIComponent(
    folder + fileName
  )}&content=${encodeURIComponent(fileContent)}${vaultName}`;
}

chrome.runtime.onMessage.addListener((request) => {
  if (request.message === "clicked_context_menu") {
    createNote();
  }
});
