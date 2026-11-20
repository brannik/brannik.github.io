# Frostbound Tactics — WotLK Raid Guides

Responsive static website starter for Warmane WotLK 3.3.5a. No build tools or server-side code required.

## Preview
Open `index.html`, or run `python -m http.server 8000` in this folder and visit `http://localhost:8000`.

## Boss banners
Put your boss artwork in `assets/bosses/` using the filenames in `assets/bosses/README.txt`. Recommended landscape image size: 1200x650 or larger. Existing frost-themed card art is used automatically when a matching image is absent.

## Edit tactics
Edit `data.js`. Each boss entry contains its raid, wing, description, mechanic labels, priorities, short summary, banner image path and accent tint. The included text is starter material, not a complete or independently verified Warmane strategy. Replace it with your tested tactics and timings.

## Publish without replacing your current homepage
Copy this whole folder into a directory named `tactics` in your existing `brannik.github.io` repository. Commit and push. It will appear at `https://brannik.github.io/tactics/`. Or merge the contents into your repo root if you want this to become the homepage. Use your repository's existing GitHub Pages deployment method.

The package does not publish to GitHub automatically.
