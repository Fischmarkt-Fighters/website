import dotenv from 'dotenv';
dotenv.config();

const API_KEY = (process.env.VITE_FACEIT_API_KEY || process.env.VITE_FACEIT_KEY || "").trim();
const PLAYER_ID = 'a4b2830a-ad5c-4185-80d1-d3b5f59c3677';

async function test() {
  const url = `https://open.faceit.com/data/v4/players/${PLAYER_ID}/history?game=ow2&limit=5`;
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
  console.log(JSON.stringify(data.items[0]?.results, null, 2));
}

test();
