import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data", "mock");
const INQ_FILE = path.join(DATA_DIR, "inquiries.json");

export async function GET(req: NextRequest) {
  try {
    const raw = fs.readFileSync(INQ_FILE, "utf8");
    const arr = JSON.parse(raw || "[]");
    return new Response(JSON.stringify(arr), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}