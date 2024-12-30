import { NextRequest, NextResponse } from "next/server";

export default async function GET(req: NextRequest):Promise<NextResponse> {
    console.log(req)
    return NextResponse.json({ message: "Request received" });
}