const API_KEY = "be671b32-de8b-496d-9d06-9fd23a8c8e76";
const CHAMPIONSHIP_ID = "200c6a34-c8eb-4143-ab7f-5df3e45d2d26";
const TEAM_ID = '6ef4eae3-bcb5-41d6-9615-d724287e5699';

async function test() {
  const url = `https://open.faceit.com/data/v4/championships/${CHAMPIONSHIP_ID}/rankings?offset=0&limit=100`;
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Accept': 'application/json'
    }
  });
  console.log("STATUS:", res.status);
  if (res.ok) {
    const data = await res.json();
    console.log("RESULTS:", data);
  } else {
      console.log("Error:", await res.text());
  }
}

test();
