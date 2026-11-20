# Encounter data schema (starter v1)

Each boss folder contains `encounter.js`, assigning `window.ENCOUNTER`. Example:

```js
window.ENCOUNTER = {
  schemaVersion: "1.0.0",
  name: "Example Boss",
  raid: "icc",
  raidName: "Icecrown Citadel",
  wing: "Lower Spire",
  description: "Encounter summary",
  summary: "Verified short briefing",
  mechanics: ["Mechanic A"],
  priorities: ["Raid priority"],
  map: "assets/map.png",
  phases: [{ name: "Phase 1", description: "Phase details" }],
  timers: [{ name: "Ability", phase: "Phase 1", type: "recurring", interval_seconds: 30 }]
};
```

Timer fields are optional. `interval_seconds` must be grounded in reliable Warmane 3.3.5a testing/source data; omit it if unknown. The current viewer displays timer definitions but does not run a live countdown engine yet.
