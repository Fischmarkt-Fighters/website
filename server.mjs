import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Faceit Konfiguration
const API_KEY = process.env.VITE_FACEIT_API_KEY;
const TEAM_ID = '6ef4eae3-bcb5-41d6-9615-d724287e5699';
const PLAYERS = [
  'a4b2830a-ad5c-4185-80d1-d3b5f59c3677',
  '117a4690-1185-45f6-a432-861bb01cc92d'
];
const GAME = 'ow2';

// Cache-Speicher
let cachedMatches = [];
let cachedChampionship = null;
let lastFetch = 0;

app.use(cors());
app.use(express.json());

// Hilfsfunktion für Faceit Requests
async function faceitFetch(url) {
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Accept': 'application/json'
    }
  });
  if (!res.ok) return null;
  return res.json();
}

// Hintergrund-Update Funktion (Alle 60 Sekunden)
async function updateData() {
  if (!API_KEY) {
    console.error("VITE_FACEIT_API_KEY fehlt in der .env!");
    return;
  }

  try {
    console.log("Updating Faceit data...");
    
    // 1. Alle Matches laden
    const historyPromises = PLAYERS.map(id => 
      faceitFetch(`https://open.faceit.com/data/v4/players/${id}/history?game=${GAME}&limit=10`)
    );
    const results = await Promise.all(historyPromises);
    const allMatches = results.filter(r => r).flatMap(r => r.items || []);
    
    const filteredMatches = allMatches.filter(m => 
      m && m.teams && (m.teams.faction1?.team_id === TEAM_ID || m.teams.faction2?.team_id === TEAM_ID)
    );

    const uniqueMatches = Array.from(new Map(
      filteredMatches.map(m => [m.match_id, m])
    ).values()).sort((a, b) => (b.started_at || 0) - (a.started_at || 0));

    // Details für Top Matches laden (für echte Scores)
    const detailedMatches = await Promise.all(uniqueMatches.slice(0, 10).map(async (m) => {
      const details = await faceitFetch(`https://open.faceit.com/data/v4/matches/${m.match_id}`);
      return details ? { ...m, results: details.results || m.results } : m;
    }));

    cachedMatches = detailedMatches;

    // 2. Letztes Turnier finden
    const champMatch = detailedMatches.find(m => m.competition_type === 'championship');
    if (champMatch) {
      const champDetails = await faceitFetch(`https://open.faceit.com/data/v4/championships/${champMatch.competition_id}`);
      if (champDetails) {
        cachedChampionship = {
          id: champDetails.id,
          name: champDetails.name,
          status: champDetails.status,
          faceit_url: champDetails.faceit_url?.replace('{lang}', 'en'),
          cover_image: champDetails.cover_image
        };
      }
    }

    lastFetch = Date.now();
    console.log(`Update successful. Found ${cachedMatches.length} matches.`);
  } catch (error) {
    console.error("Update failed:", error);
  }
}

// Initialer Fetch und Intervall
updateData();
setInterval(updateData, 60 * 1000); // Jede Minute

// API Endpunkte für das Frontend
app.get('/api/faceit/matches', (req, res) => {
  res.json({ matches: cachedMatches, lastUpdate: lastFetch });
});

app.get('/api/faceit/latest-championship', (req, res) => {
  res.json(cachedChampionship);
});

// Statische Dateien aus Vite-Build ausliefern (Produktion)
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
