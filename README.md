# Save to Obsidian - Web Extension

Save to Obsidian is a powerful browser extension that allows users to effortlessly scrape content from webpages and create structured notes in their Obsidian vaults. This extension is now available across multiple browsers, including Chrome and Firefox. with a modern development setup featuring Vite, TailwindCSS, and WebdriverIO.

## Features

- **Quick Note Creation**: Easily transform the content of any webpage into a structured Obsidian note with just a click.
- **Metadata Extraction**: Automatically captures essential metadata like title, byline, and date.
- **Tags Handling**: Auto-fetches site meta keywords for easy tagging in Obsidian.
- **Markdown Support**: Converts content to Markdown format for seamless integration with Obsidian.
- **File Naming**: Ensures clean, compliant file naming for system compatibility.

## Installation

The extension can be downloaded from:

- Chrome: [Chrome Web Store](https://chrome.google.com/webstore/detail/save-to-obsidian/lnihnbkolojkaehnkdmpliededkfebkk)
- Firefox: [Firefox Add-ons](https://addons.mozilla.org/en-GB/firefox/addon/save-to-obsidian/)

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/nsttt/save-to-obsidian.git
   ```

2. Navigate to the project directory:

   ```bash
   cd save-to-obsidian
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

### Build and Run

- To build the extension, run:

  ```bash
  pnpm build
  ```

- Start a browser with the extension installed:

  ```bash
  # For Chrome
  pnpm start:chrome
  ```

  ```bash
  # For Firefox
  pnpm start:firefox
  ```

### Usage

1. Enable developer mode in your browser.
2. Load the unpacked extension.
3. Navigate to a webpage and use the context menu to activate "Save to Obsidian".
4. The content will be saved as a markdown note in your Obsidian vault.

## Development

This project is bundled with `Vite` for TypeScript development. Run a development build using:

```bash
pnpm dev
```

## Testing

- Component tests:

  ```bash
  pnpm test:component
  ```

- E2E tests:

  ```bash
  pnpm test:e2e
  ```

## Contributing

Contributions are welcome! For major changes, please open an issue first to discuss your ideas.

## Acknowledgements

- Inspired by [Obsidian](https://obsidian.md/) and the [Obsidian Web Clipper by Stephango](https://stephango.com/obsidian-web-clipper).
- Special thanks to all contributors and users!
- Built using the [Stateful Web Extension Starter Kit](https://stateful.com/blog/building-cross-browser-web-extensions).
