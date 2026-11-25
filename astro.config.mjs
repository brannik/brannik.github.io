import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

const repository = process.env.GITHUB_REPOSITORY ?? "";
const [owner, repo] = repository.split("/");
const isUserOrOrgSite = owner && repo === `${owner}.github.io`;

const site = owner ? `https://${owner}.github.io` : "http://localhost:4321";
const base = owner && !isUserOrOrgSite ? `/${repo}` : "/";

export default defineConfig({
  site,
  base,
  integrations: [],
  vite: {
    plugins: [tailwindcss()],
  },
});
