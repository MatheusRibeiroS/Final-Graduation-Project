import * as fs from "fs";

export async function GET(request: Request) {
  const credentials = fs.readFileSync("credentials.json", "utf8");
  return new Response(credentials);
}

export async function POST(request: Request) {
  return new Response("Hello world!");
}
