import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data", "mock");
const CRE_FILE = path.join(DATA_DIR, "creators.json");
const INQ_FILE = path.join(DATA_DIR, "inquiries.json");

function readJSON(p: string) {
  try { return JSON.parse(fs.readFileSync(p, "utf8") || "[]"); } catch(e){ return []; }
}
function writeJSON(p: string, data: any) {
  fs.writeFileSync(p, JSON.stringify(data, null, 2), "utf8");
}

export async function POST(req: NextRequest) {
  try {
    // seed creators
    const creators = readJSON(CRE_FILE);
    if (!creators.find((c: any) => c.email === "jessica@tdstudiosagency.com")) {
      creators.push({
        id: "c-jessica",
        name: "Jessica",
        handle: "@jessica",
        email: "jessica@tdstudiosagency.com",
        filters: { minBudget: 1000, requiredKeywords: ["budget","timeline"], blockedDomains: ["gmail.com","yahoo.com"] }
      });
      writeJSON(CRE_FILE, creators);
    }

    // seed inquiries
    const inquiries = readJSON(INQ_FILE);
    // add sample if id not present
    const addIfMissing = (obj: any) => {
      if(!inquiries.find((i: any) => i.id === obj.id)) inquiries.push(obj);
    };
    addIfMissing({
      id: "inq-1",
      creator_id: "c-jessica",
      sender: "BeautyCo Partnerships <brand@beautyco.com>",
      sender_email: "brand@beautyco.com",
      subject: "UGC + Reel for Spring Drop",
      body: "Hi Jessica — we love your aesthetic. Budget $3,500 for a reel + 3 stories. Timeline 2 weeks. Net 15.",
      classification: "serious",
      status: "new",
      created_at: new Date().toISOString()
    });
    addIfMissing({
      id: "inq-2",
      creator_id: "c-jessica",
      sender: "Luxury Swim <press@luxswim.co>",
      sender_email: "press@luxswim.co",
      subject: "Story + Link collab",
      body: "2-3 posts, $1,200 flat + affiliate 10%. Timeline: next month.",
      classification: "serious",
      status: "new",
      created_at: new Date().toISOString()
    });
    addIfMissing({
      id: "inq-3",
      creator_id: "c-jessica",
      sender: "random <promo@gmail.com>",
      sender_email: "promo@gmail.com",
      subject: "Like for like?",
      body: "We can trade shoutouts",
      classification: "spam",
      status: "new",
      created_at: new Date().toISOString()
    });

    writeJSON(INQ_FILE, inquiries);

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}