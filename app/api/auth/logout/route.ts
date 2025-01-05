import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function POST():Promise<NextResponse> {
    try {

        (await cookies()).delete('token')

        return NextResponse.json({message : 'logout successfully ...'})
    }catch (error) {
        return NextResponse.json({message : error})
    }
}