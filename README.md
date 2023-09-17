# Save to Obsidian

A browser extension that enables users to effortlessly scrape the current website they're on and create a new note in their Obsidian vault.

## Features

- **Quick Note Creation**: With just a click, transform the content of the current webpage into a structured Obsidian note.
- **Metadata Extraction**: The extension captures essential meta information like title, byline, and date.
- **Tags Handling**: Auto-fetches site meta keywords, and allows for easy tagging in Obsidian.
- **Markdown Support**: The content is converted to Markdown format for seamless integration with Obsidian.
- **File Naming**: A special mechanism ensures that file names are clean and compliant with the file system.

## Getting Started

### Prerequisites

- A modern web browser compatible with browser extensions (e.g., Chrome, Firefox).
- [Obsidian](https://obsidian.md/) installed and set up with a vault.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nsttt/save-to-obsidian.git
   ```

2. Navigate to the project directory:

   ```bash
   cd save-to-obsidian
   ```

3. Since the project uses `pnpm`, install the required dependencies using:
   ```bash
   pnpm install
   ```

### Usage

1. Load the extension into your browser.
2. Navigate to the desired webpage.
3. Use the context menu to activate `Save to Obsidian`.
4. The content of the website will be scraped, converted to markdown, and saved to your Obsidian vault.

### Development

This project is bundled with `tsup` for a smooth TypeScript development experience. To run a development build, use:

```bash
pnpm run dev
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Acknowledgements

- Built with [tsup](https://github.com/egoist/tsup) for TypeScript bundling.
- Inspired by the power of [Obsidian](https://obsidian.md/) and [Obsidian Web Clipper by Stephango](https://stephango.com/obsidian-web-clipper).
- Special thanks to all contributors and users!
