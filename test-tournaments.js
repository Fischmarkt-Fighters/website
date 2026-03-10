const API_KEY = "be671b32-de8b-496d-9d06-9fd23a8c8e76";
const PLAYER_ID = 'a4b2830a-ad5c-4185-80d1-d3b5f59c3677';

async function test() {
  const url = `https://open.faceit.com/data/v4/players/${PLAYER_ID}/tournaments?limit=5`;
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
  console.log("TOURNAMENTS:", JSON.stringify(data.items, null, 2));
}

test();
