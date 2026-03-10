const API_KEY = "be671b32-de8b-496d-9d06-9fd23a8c8e76";
const CHAMPIONSHIP_ID = "200c6a34-c8eb-4143-ab7f-5df3e45d2d26";

async function test() {
  const url = `https://open.faceit.com/data/v4/championships/${CHAMPIONSHIP_ID}/leaderboard?offset=0&limit=100`;
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Accept': 'application/json'
    }
  });
  console.log("LEADERBOARD STATUS:", res.status);
  if (res.ok) {
    const data = await res.json();
    console.log("LEADERBOARD DATA:", JSON.stringify(data, null, 2));
  }
}

test();
