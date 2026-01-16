# Santa Clara University Design System

A React-based component library viewer for the Santa Clara University Design System. This application dynamically scrapes content types from the SCU brand site, providing developers with a live preview playground and copy-paste ready HTML snippets.

Built with **Vite**, **React**, **TypeScript**, and **Tailwind CSS**.

## Features

* **Dynamic Content Loading:** Fetches and parses component data directly from SCU's existing assets.
* **Interactive Playground:** Live preview of components with isolated styles using iframe.
* **Developer Experience:**
    * Syntax highlighting (Prism.js)
    * One-click code copying
    * Prettier formatting for raw HTML
* **Workspace Customization:** Resizable split-pane layout (IDE style) for sidebar, preview, and code panels.

## Prerequisites

* Node.js (v18 or higher recommended)
* npm

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/SCU-Academic-Technology/umc-brand.git
cd umc-brand
```

### 2. Install dependencies

```bash
npm install

```

### 3. Run the development server

```bash
npm run dev

```

The app will be available at `http://localhost:5173`.

> **Note on CORS:** The development server uses a proxy to fetch data from `scu.edu` to avoid CORS errors. This is configured in `vite.config.ts`.

## Building for Production

### 1. Configure Base Path

Ensure `vite.config.ts` has the correct base URL for your server environment:

```typescript
// vite.config.ts
export default defineConfig({
  base: '/put/path/here/', // Update this to your actual deployment path
  // ...
})
```

### 2. Build

```bash
npm run build
```

This generates a `dist` folder containing the static assets.

### 3. Deployment

Upload the contents of the `dist` folder to your web server.

## Project Structure

```text
src/
├── assets/            # Static assets (logos, icons)
├── components/        # Reusable UI components
│   ├── CodePanel.tsx  # Syntax highlighting & copy functionality
│   ├── Navbar.tsx     # Sidebar navigation
│   └── Playground.tsx # Iframe-based component preview
├── data/
│   └── components.ts  # Static definitions for content types
├── pages/             # Static information pages
│   ├── Colors.tsx
│   ├── Favicon.tsx
│   ├── Style.tsx
│   └── Welcome.tsx
├── App.tsx            # Main layout & data fetching logic
├── index.css          # Tailwind & global styles
└── main.tsx           # Entry point & Router configuration
```

## Tech Stack

* **Framework:** React + Vite
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM
* **Utilities:**
  * `react-resizable-panels` (Layout)
  * `prismjs` (Syntax Highlighting)
  * `prettier` (Code Formatting)
