const API_KEY = "be671b32-de8b-496d-9d06-9fd23a8c8e76";
const CHAMPIONSHIP_ID = "200c6a34-c8eb-4143-ab7f-5df3e45d2d26";

async function test() {
  const url = `https://open.faceit.com/data/v4/championships/${CHAMPIONSHIP_ID}/results?offset=0&limit=50`;
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Accept': 'application/json'
    }
  });
  const data = await res.json();
  const myTeam = data.items?.find(i => i.team.team_id === '6ef4eae3-bcb5-41d6-9615-d724287e5699');
  console.log("CHAMPIONSHIP RESULT FOR TEAM:", JSON.stringify(myTeam, null, 2));
}

test();
