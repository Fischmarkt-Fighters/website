const API_KEY = "be671b32-de8b-496d-9d06-9fd23a8c8e76";
const CHAMPIONSHIP_ID = "200c6a34-c8eb-4143-ab7f-5df3e45d2d26";
const TEAM_ID = '6ef4eae3-bcb5-41d6-9615-d724287e5699';

async function test() {
  // Wir probieren verschiedene Endpunkte, die Platzierungen enthalten könnten
  const endpoints = [
    `https://open.faceit.com/data/v4/championships/${CHAMPIONSHIP_ID}/leaderboard?limit=100`,
    `https://open.faceit.com/data/v4/championships/${CHAMPIONSHIP_ID}/results?limit=100`
  ];

  for (const url of endpoints) {
    console.log(`Testing: ${url}`);
    const res = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json'
      }
    });
    
    if (res.ok) {
      const data = await res.json();
      const items = data.items || data.leaderboard || [];
      const myTeam = items.find(i => 
        (i.team?.team_id === TEAM_ID) || 
        (i.team_id === TEAM_ID) || 
        (i.team?.nickname?.toLowerCase().includes('fischmarkt'))
      );
      
      if (myTeam) {
        console.log(`FOUND IN ${url}:`, JSON.stringify(myTeam, null, 2));
      } else {
        console.log(`Not found in first 100 items of ${url}`);
      }
    } else {
      console.log(`Failed: ${res.status}`);
    }
  }
}

test();
