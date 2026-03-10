const API_KEY = "be671b32-de8b-496d-9d06-9fd23a8c8e76";
const CHAMPIONSHIP_ID = "200c6a34-c8eb-4143-ab7f-5df3e45d2d26";

async function test() {
  const url = `https://open.faceit.com/data/v4/championships/${CHAMPIONSHIP_ID}/results?offset=0&limit=100`;
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Accept': 'application/json'
    }
  });
  const data = await res.json();
  // Check if any team contains "Fischmarkt"
  const myTeam = data.items?.find(i => i.team?.nickname?.toLowerCase().includes('fischmarkt'));
  console.log("TEAM RESULT SEARCH:", JSON.stringify(myTeam, null, 2));
}

test();
