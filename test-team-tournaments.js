const API_KEY = "be671b32-de8b-496d-9d06-9fd23a8c8e76";
const TEAM_ID = '6ef4eae3-bcb5-41d6-9615-d724287e5699';

async function test() {
  const url = `https://open.faceit.com/data/v4/teams/${TEAM_ID}/tournaments?limit=5`;
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Accept': 'application/json'
    }
  });
  if (!res.ok) {
      console.log("Error:", res.status, await res.text());
      return;
  }
  const data = await res.json();
  console.log("TEAM TOURNAMENTS:", JSON.stringify(data.items, null, 2));
}

test();
