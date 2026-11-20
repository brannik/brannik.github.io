
const ROSTER_FILE = "guild-roster.json";
const ARMORY_BASE = "https://armory.warmane.com/character/";

const rosterBody = document.getElementById("roster-body");
const searchInput = document.getElementById("roster-search");
const rankFilter = document.getElementById("rank-filter");
const memberCount = document.getElementById("member-count");
const rosterStatus = document.getElementById("roster-status");

let characters = [];

function createCell(text, className = "") {
    const cell = document.createElement("td");
    cell.textContent = text;

    if (className) cell.className = className;

    return cell;
}

function renderRoster() {
    const search = searchInput.value.trim().toLowerCase();
    const selectedRank = rankFilter.value;

    const filtered = characters.filter(character => {
        const matchesName = character.name.toLowerCase().includes(search);
        const matchesRank = !selectedRank || character.rank === selectedRank;

        return matchesName && matchesRank;
    });

    rosterBody.replaceChildren();
    memberCount.textContent = filtered.length;

    if (filtered.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 4;
        cell.className = "roster-message";
        cell.textContent = characters.length
            ? "No characters match your search."
            : "The guild roster is currently empty.";

        row.appendChild(cell);
        rosterBody.appendChild(row);

        return;
    }

    filtered.forEach((character, index) => {
        const row = document.createElement("tr");

        row.appendChild(createCell(String(index + 1), "number-column"));

        const nameCell = document.createElement("td");
        const link = document.createElement("a");

        link.className = "character-link";
        link.textContent = character.name;
        link.href = ARMORY_BASE +
            encodeURIComponent(character.name) +
            "/Icecrown";

        link.target = "_blank";
        link.rel = "noopener noreferrer";

        nameCell.appendChild(link);
        row.appendChild(nameCell);

        const rankCell = document.createElement("td");
        const rankBadge = document.createElement("span");

        rankBadge.className = "rank-badge";
        rankBadge.textContent = character.rank;

        rankCell.appendChild(rankBadge);
        row.appendChild(rankCell);

        row.appendChild(createCell("Icecrown", "realm-column"));

        rosterBody.appendChild(row);
    });
}

function populateRankFilter() {
    const ranks = [...new Set(
        characters.map(character => character.rank)
    )].sort((a, b) => a.localeCompare(b));

    rankFilter.replaceChildren();

    const allOption = document.createElement("option");
    allOption.value = "";
    allOption.textContent = "All guild ranks";
    rankFilter.appendChild(allOption);

    ranks.forEach(rank => {
        const option = document.createElement("option");
        option.value = rank;
        option.textContent = rank;
        rankFilter.appendChild(option);
    });
}

async function loadRoster() {
    try {
        const response = await fetch(ROSTER_FILE);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("Roster JSON must contain an array.");
        }

        characters = data.filter(character =>
            character &&
            typeof character.name === "string" &&
            character.name.trim() &&
            typeof character.rank === "string" &&
            character.rank.trim()
        ).map(character => ({
            name: character.name.trim(),
            rank: character.rank.trim()
        }));

        populateRankFilter();
        renderRoster();

        rosterStatus.textContent =
            `Loaded ${characters.length} characters.`;

    } catch (error) {
        console.error("Unable to load guild roster:", error);

        rosterBody.replaceChildren();

        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 4;
        cell.className = "roster-message";
        cell.textContent = "Unable to load guild-roster.json.";

        row.appendChild(cell);
        rosterBody.appendChild(row);

        memberCount.textContent = "0";
        rosterStatus.textContent =
            "Check that guild-roster.json exists and contains valid JSON.";
    }
}

searchInput.addEventListener("input", renderRoster);
rankFilter.addEventListener("change", renderRoster);

loadRoster();
