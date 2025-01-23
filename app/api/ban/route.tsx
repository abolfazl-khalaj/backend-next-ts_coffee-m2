import connectedDB from "@/configs/db";
import BanModel, { BanType } from "@/model/Ban";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest):Promise<NextResponse> {

    try {
        const body = await req.json()

        if(
            !body.email?.length &&
            !body.phone?.length            
        ){
            return NextResponse.json({message : 'data not valid .. '})
        }

        connectedDB()

        await BanModel.create(body)

        return NextResponse.json({message : 'ban user success fully ...'})

    } catch (error) {
        return NextResponse.json({message: error})
    }
}