# DevOps Handbook

<div align="center">

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub_Pages-222222?logo=github&logoColor=white)](https://serwin35.github.io/devops-handbook/)

### [🌐 Live Demo → serwin35.github.io/devops-handbook](https://serwin35.github.io/devops-handbook/)

**Your all-in-one interactive DevOps reference — cheatsheets, structured lessons, and built-in search, all in one fast React app.**

</div>

---

## About

**DevOps Handbook** is an interactive learning platform built with React 19 and deployed on GitHub Pages. It gives engineers and students a single place to look up commands, learn concepts, and work through structured lessons — covering everything from Linux fundamentals and filesystem navigation to Docker containers, Git workflows, SSH key management, and more.

The live demo requires no login, no setup — just open it in your browser and start learning.

---

## Features

- **Structured lessons** — step-by-step guided content across multiple lessons (Lesson 01–03+)
- **15 quick-reference cheatsheets** — every major topic a DevOps practitioner needs
- **Built-in search** — find commands and concepts instantly across the entire platform
- **Responsive layout** — works on desktop, tablet, and mobile
- **Zero-install access** — fully deployed on GitHub Pages, no local setup required to read

---

## Cheatsheets

| Topic | Description |
| :--- | :--- |
| Bash Scripting | Variables, loops, conditionals, functions, and script patterns |
| Cron Jobs | Crontab syntax, scheduling expressions, and job management |
| Docker Basics | Images, containers, volumes, networks, and Compose |
| Editors — Vim & Nano | Essential keybindings and editing workflows |
| Filesystem | Linux directory hierarchy, navigation, and file operations |
| Git Commands | Branching, merging, rebasing, remotes, and history |
| Linux Basics | Core commands, users, groups, and system information |
| Network Tools | `curl`, `wget`, `netstat`, `ss`, `tcpdump`, and friends |
| Networking | IP addressing, subnets, DNS, ports, and protocols |
| Networking Basics | Foundational networking concepts from the ground up |
| Package Management | `apt`, `yum`/`dnf`, `snap`, and package lifecycle |
| Permissions | `chmod`, `chown`, `umask`, ACLs, and special bits |
| Processes & Monitoring | `ps`, `top`, `htop`, `kill`, `strace`, and resource monitoring |
| SSH Keys | Key generation, `ssh-agent`, `authorized_keys`, and config |
| Systemd | Units, services, timers, `journalctl`, and `systemctl` |

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| UI Framework | React 19 |
| Language | TypeScript 5 |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS 4 |
| Routing | React Router 7 |
| Linting | ESLint + Prettier |
| Git Hooks | Husky + lint-staged |
| Deployment | GitHub Pages |

---

## Prerequisites

- **Node.js** v18.0.0 or higher
- **npm** (bundled with Node.js)

---

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/serwin35/devops-handbook.git
cd devops-handbook

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173/devops-handbook`.

---

## Available Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Compile the application for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check for code quality issues |
| `npm run prepare` | Set up Husky git hooks |

---

## Project Structure

```text
devops-handbook/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components (Layout, Card, etc.)
│   ├── data/            # Search index and static content data
│   ├── hooks/           # Custom React hooks (useProgress, usePageTitle)
│   ├── pages/
│   │   ├── cheatsheets/ # 15 cheatsheet pages (Docker, Git, SSH, etc.)
│   │   └── lessons/     # Structured lesson pages (Lesson 01–03+)
│   ├── App.tsx          # Main application routing
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles and Tailwind imports
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
└── tsconfig.json        # TypeScript configuration
```

---

## Contributing

Contributions are welcome. To propose a new cheatsheet, fix a typo, or improve lesson content:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-topic`
3. Commit your changes: `git commit -m "feat: add your-topic cheatsheet"`
4. Push the branch: `git push origin feat/your-topic`
5. Open a pull request

Please keep content accurate, concise, and consistent with the existing style.

---

## License

This project is open source. See the [LICENSE](./LICENSE) file for details.

---

<div align="center">

Built with React + Vite · Deployed on GitHub Pages

[Live Demo](https://serwin35.github.io/devops-handbook/) · [Report an Issue](https://github.com/serwin35/devops-handbook/issues)

</div>
