const API_KEY = "be671b32-de8b-496d-9d06-9fd23a8c8e76";
const MATCH_ID = '1-78f1ad37-4d1f-47f6-9a9c-9f5eab37c564';

async function test() {
  const url = `https://open.faceit.com/data/v4/matches/${MATCH_ID}`;
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Accept': 'application/json'
    }
  });
  const data = await res.json();
  console.log("MATCH COMPETITION:", JSON.stringify(data.competition_id, null, 2));
  console.log("MATCH COMPETITION TYPE:", JSON.stringify(data.competition_type, null, 2));
  console.log("MATCH COMPETITION NAME:", JSON.stringify(data.competition_name, null, 2));
}

test();
