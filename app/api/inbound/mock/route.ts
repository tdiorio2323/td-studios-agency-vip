import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data", "mock");
const INQ_FILE = path.join(DATA_DIR, "inquiries.json");

function readJSON(p: string){ try { return JSON.parse(fs.readFileSync(p,"utf8")||"[]"); } catch(e){ return []; } }
function writeJSON(p: string, data: any){ fs.writeFileSync(p, JSON.stringify(data, null, 2), "utf8"); }

export async function POST(req: NextRequest) {
  try {
    const json = await req.json().catch(()=> ({}));
    // expected shape: { recipient, sender, subject, body }
    const recipient = (json.recipient||'jessica@tdstudiosagency.com').toLowerCase();
    const sender = json.sender || 'unknown <unknown@example.com>';
    const subject = json.subject || '(no subject)';
    const body = json.body || '';

    const inquiries = readJSON(INQ_FILE);
    const rec = {
      id: `inq-${Date.now()}`,
      creator_id: "c-jessica",
      sender,
      sender_email: (sender.match(/<([^>]+)>/)?.[1] ?? "").toLowerCase(),
      subject,
      body,
      classification: /\$|budget|paid|retainer|net|sponsor|collab/i.test(subject + " " + body) ? "serious" : "spam",
      status: "new",
      created_at: new Date().toISOString()
    };
    inquiries.unshift(rec);
    writeJSON(INQ_FILE, inquiries);
    return new Response(JSON.stringify({ ok: true, record: rec }), { status: 200 });
  } catch (err:any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}