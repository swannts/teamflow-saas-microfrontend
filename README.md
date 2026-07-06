# TeamFlow SaaS — React + Vue Microfrontend Dashboard

Welcome to **TeamFlow SaaS**, a beginner-friendly yet enterprise-grade learning project designed to demonstrate how to build a microfrontend dashboard using **Vite**, **npm workspaces**, and **Module Federation**.

This project showcases a modern SaaS portal with a React host app dynamically loading three separate microfrontends: a React dashboard, a React Kanban board, and a Vue project tracker.

---

## Table of Contents
1. [What is a Microfrontend?](#what-is-a-microfrontend)
2. [Why React + Vue Together?](#why-react--vue-together)
3. [How Module Federation Works Here](#how-module-federation-works-here)
4. [Folder Structure](#folder-structure)
5. [Applications & Responsibilities](#applications--responsibilities)
6. [Getting Started & Installation](#getting-started--installation)
7. [Running the Application](#running-the-application)
8. [Docker Configuration](#docker-configuration)
9. [Learning Roadmap & Next Steps](#learning-roadmap--next-steps)

---

## What is a Microfrontend?

**Microfrontends** extend the concept of microservices to the frontend. Instead of building a massive, single codebase (monolith), you break down the frontend into smaller, semi-independent applications.
Each application (or "remote") can:
- Be built with different technologies (e.g. React, Vue, Svelte, Angular).
- Be developed and deployed independently.
- Own a single domain context of the overall system (e.g. dashboard, task management, user profile).

## Why React + Vue Together?

In a large corporate setting, different teams often specialize in different frameworks. For instance, a core product might be built in React, but a subsidiary tool or analytics package might have been built in Vue.
Integrating React and Vue together demonstrates the ultimate flex of microfrontends: **framework agnosticism**. Using standard JS mounting bridges, we can embed any framework dynamically inside another without compiling them together at build time.

## How Module Federation Works Here

We use `@originjs/vite-plugin-federation` to handle loading modules at runtime.

1. **Remotes (`dashboard-app`, `project-app`, `task-app`)**:
   - Compile code into standard chunks.
   - Generate a `remoteEntry.js` file exposing specific components or entry points.
   - For example, `dashboard-app` exposes `./DashboardComponent`, and `project-app` (Vue) exposes `./mount`.

2. **Host (`host-app`)**:
   - Points to remote entry files served on their respective ports.
   - Fetches the scripts dynamically at runtime over HTTP.
   - Loads React remotes using standard `React.lazy()` and `Suspense`.
   - Loads the Vue remote by fetching the exposed `mount` function and calling it inside a React ref's lifecycle loop.

---

## Folder Structure

```text
teamflow-saas-microfrontend/
├── apps/
│   ├── host-app/           # React - Main Shell Container (Port 3000)
│   ├── dashboard-app/      # React - Summary Metrics Remote (Port 3001)
│   ├── project-app/        # Vue 3 - Project Listing Remote (Port 3002)
│   └── task-app/           # React - Kanban Board Remote (Port 3003)
├── packages/
│   ├── shared-ui/          # CSS Styles, Shared React Components
│   └── shared-utils/       # Date format helper, Mock Data, Constants
├── package.json            # Root configuration specifying npm workspaces
├── README.md               # You are here!
└── .gitignore
```

---

## Applications & Responsibilities

1. **Host App (React, Port 3000)**: Coordinates layouts, menus, routing via `react-router-dom`, remote loading, fallback loader placeholders, and error boundary isolation.
2. **Dashboard App (React, Port 3001)**: Provides workspace stats (Total Projects, Total Tasks, Completion rates), activity lists, and team rosters.
3. **Project App (Vue 3, Port 3002)**: Allows users to search and filter project status cards. Exposes a clean JS bridge method called `mount` so that React can control it.
4. **Task App (React, Port 3003)**: Houses a full-featured Kanban board layout with interactive columns (Todo, In Progress, Review, Done).

---

## Getting Started & Installation

First, ensure you have Node.js (version 18 or above) installed. Clone the repository and run:

```bash
# Install dependencies for all workspaces at the root level
npm install
```

---

## Running the Application

### 1. Dev Mode (Start all apps concurrently)
Run the root script to start the Host and all three remote servers at the same time:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the Host app.

### 2. Standalone Mode
You can also run any specific app individually to develop in isolation:
```bash
# Run host app only
npm run dev:host

# Run dashboard remote only (Standalone)
npm run dev:dashboard

# Run projects remote only (Standalone)
npm run dev:projects

# Run tasks remote only (Standalone)
npm run dev:tasks
```

### 3. Build & Production Check
To build the microfrontends and generate remote entry files:
```bash
npm run build
```
This builds all applications into their local `dist/` directories, ready for deployment.

---

## Docker Configuration

This project includes Docker configuration for both development and production environments.

### 1. Development Mode (with hot-reloading)
Runs all microfrontend dev servers concurrently with local code directory sharing:
```bash
# Start all dev servers via Docker Compose
docker-compose -f docker-compose.dev.yml up --build
```
Access the host app at [http://localhost:3000](http://localhost:3000).

### 2. Production Mode (with Nginx & CORS enabled)
Runs static production builds inside separate Nginx containers, mapping the identical development ports so Module Federation works out-of-the-box:
```bash
# Build production bundle and start separate Nginx services
docker-compose -f docker-compose.prod.yml up --build
```
Access the application at [http://localhost:3000](http://localhost:3000).

---

## Learning Roadmap & Next Steps

If you are expanding on this project, here is a recommended learning path:
1. **Shared State**: Add shared state management (e.g. sharing user profiles or active workspace context via custom events or global state objects).
2. **Dynamic Routing**: Enable nested routing where a remote microfrontend can define its own routing layout and synchronize with the host URL.
3. **CI/CD Pipeline**: Deploy each application to independent server folders (e.g. AWS S3 buckets) to see how dynamic deployment is done without rebuilding the host.
4. **CSS Isolation**: Implement styling isolation techniques (such as CSS Modules or shadow DOM boundaries) to prevent styling leakage between React and Vue.
