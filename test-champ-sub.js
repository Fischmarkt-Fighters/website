const API_KEY = "be671b32-de8b-496d-9d06-9fd23a8c8e76";
const CHAMPIONSHIP_ID = "200c6a34-c8eb-4143-ab7f-5df3e45d2d26";
const TEAM_ID = '6ef4eae3-bcb5-41d6-9615-d724287e5699';

async function test() {
  const url = `https://open.faceit.com/data/v4/championships/${CHAMPIONSHIP_ID}/subscriptions?offset=0&limit=100`;
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Accept': 'application/json'
    }
  });
  const data = await res.json();
  const mySub = data.items?.find(i => i.team?.team_id === TEAM_ID || i.team_id === TEAM_ID);
  console.log("TEAM SUBSCRIPTION:", JSON.stringify(mySub, null, 2));
}

test();
