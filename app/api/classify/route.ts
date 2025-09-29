import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { subject = "", body = "" } = await req.json();
    const text = `${subject} ${body}`.toLowerCase();
    const seriousKeywords = ["budget", "$", "paid", "partner", "paid", "net", "retainer", "collab", "sponsor"];
    const has = seriousKeywords.some(k => text.includes(k));
    const classification = has ? "serious" : "spam";
    return new Response(JSON.stringify({ classification }), { status: 200 });
  } catch (err:any) {
    return new Response(JSON.stringify({ classification: "unknown", error: err.message }), { status: 500 });
  }
}