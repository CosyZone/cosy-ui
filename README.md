# Cosy UI

An Astro component library that provides a unified UI style for multiple projects under the same organization.

## Quick Start

Installation

```bash
npm install @coffic/cosy-ui
```

Usage in an Astro component:

```js
---
import { Button } from "@coffic/cosy-ui";
---
<Button>Hi</Button>
```

## Development

### Project Structure

The project is managed using pnpm workspaces, and includes the following parts:

- `packages/cosy-ui`: Source code of the component library
- `demo`: Sample project used to test these components during development

### Install Dependencies

```bash
pnpm install
```

### Start Development

```bash
pnpm run dev
```

### Build

Build the Demo:

```bash
pnpm build
```

## Contribution

Issues and Pull Requests are welcome!

## License

MIT
