import connectedDB from "@/configs/db";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest):Promise<NextResponse> {
    
    try {

        connectedDB()

        const users = await UserModel.find()
        return NextResponse.json({users})
    } catch (error) {
        return NextResponse.json({error})
    }
}