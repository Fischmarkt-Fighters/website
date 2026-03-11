import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import pathModule from 'path';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = pathModule.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Email Konfiguration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.strato.de',
  port: parseInt(process.env.EMAIL_PORT || '465'),
  secure: process.env.EMAIL_SECURE !== 'false', 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS  
  },
  tls: { rejectUnauthorized: false }
});

// Konfiguration
const API_KEY = process.env.VITE_FACEIT_API_KEY;
const TEAM_ID = '6ef4eae3-bcb5-41d6-9615-d724287e5699';
const GAME = 'ow2';

// Cache-Speicher
let cachedMatches = [];
let cachedChampionship = null;
let cachedRoster = [];
let lastFetch = 0;

app.use(cors());
app.use(express.json());

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

const heroIcons = {};
async function getHeroIcon(heroKey) {
    if (heroIcons[heroKey]) return heroIcons[heroKey];
    try {
        const res = await fetch(`https://overfast-api.tekrop.fr/heroes/${heroKey}`);
        if (res.ok) {
            const data = await res.json();
            heroIcons[heroKey] = data.portrait;
            return data.portrait;
        }
    } catch (err) {}
    return null;
}

// Suchfunktion für unvollständige Battletags
async function resolveBattletag(name) {
  if (name.includes('#')) return name;
  try {
    const res = await fetch(`https://overfast-api.tekrop.fr/players?name=${encodeURIComponent(name)}&limit=1`);
    if (!res.ok) return null;
    const searchResults = await res.json();
    if (searchResults.results && searchResults.results.length > 0) {
      return searchResults.results[0].player_id.replace('-', '#');
    }
  } catch (err) {
    console.error(`Search error for ${name}:`, err);
  }
  return null;
}

async function overfastFetch(battletag) {
  const formattedId = battletag.replace('#', '-');
  try {
    const summaryRes = await fetch(`https://overfast-api.tekrop.fr/players/${encodeURIComponent(formattedId)}/summary`);
    const summary = summaryRes.ok ? await summaryRes.json() : null;
    
    // Saisonale Stats (Current) via Career Endpoint
    // Ohne season Parameter liefert Blizzard/Overfast oft die "Current Season" 
    // oder die letzte aktive Auswahl. Um sicherzugehen, nutzen wir hier die Standard-Abfrage.
    const fetchSeasonStats = async (mode) => {
        try {
            const res = await fetch(`https://overfast-api.tekrop.fr/players/${encodeURIComponent(formattedId)}/stats/career?gamemode=${mode}&platform=pc`);
            if (!res.ok) return null;
            const careerStats = await res.json();
            return processCareerData(careerStats);
        } catch (e) { return null; }
    };

    // Lifetime Stats (Aggregiert)
    // Bei Blizzard/Overfast ist 'quickplay' meist inhärent Lifetime.
    // Für 'competitive' Lifetime müssen wir oft sicherstellen, dass die aggregierten Daten kommen.
    // Der Summary-Endpunkt OHNE Saison-Angabe aggregiert laut Doku alle Saisons.
    const fetchLifetimeStats = async (mode) => {
        try {
            // Wir nutzen hier den Summary-Endpunkt ohne den fehlerhaften 'season=all' Parameter
            const res = await fetch(`https://overfast-api.tekrop.fr/players/${encodeURIComponent(formattedId)}/stats/summary?gamemode=${mode}&platform=pc`);
            if (!res.ok) return null;
            const data = await res.json();
            if (!data.general) return null;

            const heroesList = [];
            if (data.heroes) {
                for (const [name, heroData] of Object.entries(data.heroes)) {
                    if (heroData.time_played) heroesList.push({ name, playtime: heroData.time_played });
                }
            }
            heroesList.sort((a, b) => b.playtime - a.playtime);
            const enrichedHeroes = {};
            for (const hero of heroesList.slice(0, 3)) {
                enrichedHeroes[hero.name] = { playtime: hero.playtime, icon: await getHeroIcon(hero.name) };
            }

            return {
                winrate: data.general.games_played > 0 ? (data.general.winrate || 0) / 100 : 0,
                gamesWon: data.general.games_won || 0,
                gamesPlayed: data.general.games_played || 0,
                kda: (data.general.kda || 0).toFixed(2),
                topHeroes: enrichedHeroes
            };
        } catch (e) { return null; }
    };

    // Hilfsfunktion zur Verarbeitung von Career-Daten (wird für Season genutzt)
    const processCareerData = async (careerStats) => {
        const allHeroes = careerStats['all-heroes'];
        if (!allHeroes) return null;
        const totalWins = allHeroes.game?.games_won || 0;
        const totalPlayed = allHeroes.game?.games_played || 0;
        const elims = allHeroes.combat?.eliminations || 0;
        const assists = allHeroes.assists?.assists || 0;
        const deaths = allHeroes.combat?.deaths || 0;
        const kda = deaths > 0 ? (elims + (assists / 2)) / deaths : (elims + (assists / 2));
        const topHeroesList = [];
        for (const key of Object.keys(careerStats)) {
            if (key !== 'all-heroes' && careerStats[key]?.game?.time_played) {
                topHeroesList.push({ name: key, playtime: careerStats[key].game.time_played });
            }
        }
        topHeroesList.sort((a, b) => b.playtime - a.playtime);
        const enrichedHeroes = {};
        for (const hero of topHeroesList.slice(0, 3)) {
            enrichedHeroes[hero.name] = { playtime: hero.playtime, icon: await getHeroIcon(hero.name) };
        }
        return { winrate: totalPlayed > 0 ? (totalWins / totalPlayed) : 0, gamesWon: totalWins, gamesPlayed: totalPlayed, kda: kda.toFixed(2), topHeroes: enrichedHeroes };
    };

    const competitive_season = await fetchSeasonStats('competitive');
    const quickplay_lifetime = await fetchLifetimeStats('quickplay');

    return { summary, competitive_season, quickplay_lifetime };
  } catch (err) { return null; }
}

async function updateData() {
  try {
    console.log("Updating all cached data...");
    const tagsEnv = process.env.VITE_ROSTER_TAGS || "";
    const leaderTag = process.env.VITE_LEADER_TAG || "";
    const tags = tagsEnv.split(',').map(t => t.trim()).filter(t => t.length > 0);
    
    const rosterData = [];
    for (const item of tags) {
      const [tagPart, rolesPart] = item.split(':');
      let battletag = tagPart.trim();
      const customRoles = rolesPart ? rolesPart.split('/').map(r => r.trim().toLowerCase()) : ['flex'];

      if (!battletag.includes('#')) {
          const resolved = await resolveBattletag(battletag);
          if (resolved) battletag = resolved;
      }

      if (!battletag.includes('#')) continue;

      console.log(`Loading player: ${battletag}...`);
      const data = await overfastFetch(battletag);
      if (!data) continue;

      let bestRank = null;
      if (data?.summary?.competitive?.pc) {
          const ranks = data.summary.competitive.pc;
          const roles = ['tank', 'damage', 'support', 'open'];
          let highestTierValue = -1;
          const tierValues = { 'bronze': 1, 'silver': 2, 'gold': 3, 'platinum': 4, 'diamond': 5, 'master': 6, 'grandmaster': 7, 'champion': 8 };

          roles.forEach(role => {
              if (ranks[role]) {
                  const currentTierValue = tierValues[ranks[role].division] || 0;
                  if (currentTierValue > highestTierValue) {
                      highestTierValue = currentTierValue;
                      bestRank = ranks[role];
                  }
              }
          });
      }

      rosterData.push({
        nickname: battletag.split('#')[0],
        battletag: battletag,
        avatar: data?.summary?.avatar || null,
        roles: customRoles,
        isLeader: battletag === leaderTag || item === leaderTag,
        bestRank,
        endorsement: data?.summary?.endorsement || { level: 1 },
        stats: {
            competitive_season: data.competitive_season,
            quickplay_lifetime: data.quickplay_lifetime
        }
      });
      await sleep(500); 
    }
    cachedRoster = rosterData;

    // Faceit Matches
    if (API_KEY) {
        const teamDetails = await faceitFetch(`https://open.faceit.com/data/v4/teams/${TEAM_ID}`);
        if (teamDetails) {
            const playerIds = teamDetails.members?.map(m => m.user_id) || [];
            const historyPromises = playerIds.map(id => faceitFetch(`https://open.faceit.com/data/v4/players/${id}/history?game=${GAME}&limit=5`));
            const results = await Promise.all(historyPromises);
            const allMatches = results.filter(r => r).flatMap(r => r.items || []);
            const filteredMatches = allMatches.filter(m => m && m.teams && (m.teams.faction1?.team_id === TEAM_ID || m.teams.faction2?.team_id === TEAM_ID));
            const uniqueMatches = Array.from(new Map(filteredMatches.map(m => [m.match_id, m])).values()).sort((a, b) => (b.started_at || 0) - (a.started_at || 0));
            const detailedMatches = await Promise.all(uniqueMatches.slice(0, 10).map(async (m) => {
              const details = await faceitFetch(`https://open.faceit.com/data/v4/matches/${m.match_id}`);
              return details ? { ...m, results: details.results || m.results } : m;
            }));
            cachedMatches = detailedMatches;
            const champMatch = detailedMatches.find(m => m.competition_type === 'championship');
            if (champMatch) {
              const champDetails = await faceitFetch(`https://open.faceit.com/data/v4/championships/${champMatch.competition_id}`);
              if (champDetails) {
                cachedChampionship = { id: champDetails.id, name: champDetails.name, status: champDetails.status, faceit_url: champDetails.faceit_url?.replace('{lang}', 'en'), cover_image: champDetails.cover_image };
              }
            }
        }
    }
    lastFetch = Date.now();
    console.log(`Update successful. Matches: ${cachedMatches.length}, Roster: ${cachedRoster.length}`);
  } catch (error) { console.error("Update failed:", error); }
}

updateData();
setInterval(updateData, 60 * 1000); 

app.get('/api/faceit/matches', (req, res) => res.json({ matches: cachedMatches, lastUpdate: lastFetch }));
app.get('/api/faceit/latest-championship', (req, res) => res.json(cachedChampionship));
app.get('/api/faceit/roster', (req, res) => res.json(cachedRoster));

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'Alle Felder müssen ausgefüllt sein.' });
  try {
    await transporter.sendMail({
      from: `"FF Webseite" <${process.env.EMAIL_USER}>`, 
      replyTo: email, 
      to: "contact@fischmarktfighters.de",
      subject: `Neue Kontaktanfrage von ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nNachricht:\n${message}`,
      html: `<h3>Neue Kontaktanfrage</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Nachricht:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`
    });
    res.json({ success: true });
  } catch (error) { res.status(500).json({ error: 'Fehler' }); }
});

app.use(express.static(pathModule.join(__dirname, 'dist')));
app.get('*', (req, res) => res.sendFile(pathModule.join(__dirname, 'dist', 'index.html')));
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
