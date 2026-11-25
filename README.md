# Projects & Experiments — modular portfolio starter

A dark, responsive, featured-first portfolio built with Astro, TypeScript and Tailwind CSS 4. It is designed for GitHub Pages and includes one fictional example project ("System Monitor") to demonstrate the content model.

## Requirements

- Node.js 22 or newer
- npm
- A GitHub repository with GitHub Pages enabled

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Astro (normally `http://localhost:4321`).

## Build locally

Windows PowerShell:

```powershell
.\build.ps1
```

macOS / Linux:

```bash
chmod +x build.sh
./build.sh
```

Or run the commands directly:

```bash
npm install
npm run build
npm run preview
```

The production website is generated in `dist/`.

## Publish on GitHub Pages

1. Create a GitHub repository for the portfolio.
2. Upload the contents of this starter archive to the repository root (not the containing folder).
3. Make sure the default branch is named `main`, or edit `.github/workflows/deploy.yml` to match your branch.
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment → Source**, select **GitHub Actions**.
6. Push to `main`. The included workflow installs dependencies, builds Astro and deploys `dist/`.
7. When the workflow finishes, GitHub Pages will show the published URL in Settings → Pages.

The Astro configuration automatically detects the repository name in GitHub Actions:
- `username.github.io` repositories are published at the domain root.
- Other repositories are published under `/<repository-name>/`.

Do not set GitHub Pages to deploy from the `/docs` folder. Use **GitHub Actions**.

## Personalize the site

Edit `src/config/site.ts`:
- `title`
- `description`
- `introduction`
- `githubUrl`
- `email`
- navigation links

Edit `src/config/homepage.ts` to show or hide homepage sections and change the project preview count.

Edit `src/pages/about.astro` and `src/pages/contact.astro` to replace the starter copy.

## Add a project

Create a Markdown file in `src/content/projects/`, for example:

`src/content/projects/my-project.md`

Use this structure:

```yaml
---
title: My Project
description: A short project summary.
category: Software
status: active
featured: true
order: 2
technologies:
  - TypeScript
  - Astro
cover: /images/projects/my-project/cover.webp
gallery:
  - src: /images/projects/my-project/screenshot-1.webp
    alt: Description of screenshot
    caption: Optional caption
links:
  github: https://github.com/yourusername/my-project
  demo: https://your-demo.example
  documentation: https://your-docs.example
---

## Overview

Write the full project description here using Markdown.
```

All fields except `title`, `description`, `category`, and `cover` have defaults or are optional as defined in `src/content.config.ts`. Supported statuses are `active`, `completed`, `experimental`, and `archived`.

Put project images in `public/images/projects/my-project/`. Use optimized `.webp` or `.avif` images where possible. The cover and gallery paths are written from the `public/` directory root.

The project detail page, catalogue card, category filter and search entry are generated automatically. No component edits are needed to add a normal project.

## Remove the example project

Delete `src/content/projects/system-monitor.md` and its image folder at `public/images/projects/system-monitor/` after adding your own project(s).

## Main architecture

- `src/config/` — global site and homepage settings
- `src/content/projects/` — project data and Markdown descriptions
- `src/components/` — reusable UI, cards, catalogue and lightbox
- `src/layouts/` — shared page layouts
- `src/pages/` — homepage and dedicated routes
- `src/styles/` — global design tokens and styles
- `.github/workflows/deploy.yml` — automated GitHub Pages build and deployment

## Notes

- The example project is fictional and should be replaced before presenting the portfolio as your own work.
- GitHub Pages serves the generated static files. Node.js is only needed to build the site, locally or in GitHub Actions.
- The contact email and GitHub URL are placeholders. Change them before publishing.
- This starter uses CSS and small TypeScript scripts for search and the screenshot viewer; it does not require a runtime backend or database.
