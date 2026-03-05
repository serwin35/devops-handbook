# DevOps Learning Hub

An interactive educational platform designed for learning DevOps concepts, featuring structured lessons, quick-reference cheatsheets, and a searchable knowledge base.

## 🚀 Overview

The **DevOps Learning Hub** is a React-based web application providing a modern, interactive interface for technical documentation and educational content. It covers topics ranging from Linux permissions and filesystem structure to containerization with Docker and version control with Git.

### Key Features
- **Structured Lessons:** Step-by-step guides (e.g., Lesson 01-03).
- **Interactive Cheatsheets:** Quick reference for Git, Docker, Networking, Systemd, and more.
- **Built-in Search:** Easily find commands and concepts across the platform.
- **Responsive Layout:** Optimized for both desktop and mobile learning.

## 🛠 Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 7](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Routing:** [React Router 7](https://reactrouter.com/)
- **Language:** TypeScript
- **Linting & Formatting:** ESLint, Prettier, Husky, lint-staged

## 📋 Requirements

- **Node.js:** v18.0.0 or higher (recommended)
- **Package Manager:** npm (standard) or yarn/pnpm

## ⚙️ Setup & Run

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd devops-init
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173/devops-handbook` (note the `/devops-handbook` basename).

4. **Build for production:**
   ```bash
   npm run build
   ```
   The production-ready files will be generated in the `dist/` directory.

## 📜 Available Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Compiles the application for production. |
| `npm run lint` | Runs ESLint to check for code quality issues. |
| `npm run preview` | Previews the production build locally. |
| `npm run prepare` | Sets up Husky git hooks. |

## 📂 Project Structure

```text
devops-init/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable UI components (Layout, Card, etc.)
│   ├── data/        # Search index and static content data
│   ├── hooks/       # Custom React hooks (useProgress, usePageTitle)
│   ├── pages/       # Application views
│   │   ├── cheatsheets/ # Individual cheatsheet pages (Docker, Git, etc.)
│   │   └── lessons/     # Structured lesson pages
│   ├── App.tsx      # Main application routing and structure
│   ├── main.tsx     # Application entry point
│   └── index.css    # Global styles and Tailwind imports
├── index.html       # HTML template
├── vite.config.js   # Vite configuration
└── tsconfig.json    # TypeScript configuration
```

## 🔐 Environment Variables

Currently, no specific environment variables are required for this project.
- **TODO:** Document any future API keys or configuration flags here.

## 🧪 Tests

Automated tests are not yet implemented for this project.
- **TODO:** Add unit tests (e.g., Vitest) and E2E tests (e.g., Playwright).
- **Running tests (Future):** Automated tests are not yet implemented. Once added, they can be run via `npm test`.

## 📄 License

**TODO:** No license file found. Please add a `LICENSE` file to the root directory (e.g., MIT, Apache 2.0).

---
*Created by the DevOps Learning Hub Team.*
