import connectedDB from "@/configs/db";
import UserModel from "@/model/User";
import { NextResponse } from "next/server";

export async function DELETE({ params }: { params: { id: string } }):Promise<NextResponse> {
    
    try {

        connectedDB()

        await UserModel.findByIdAndDelete(params.id)
        return NextResponse.json({message : 'delete user success fully..'})
    } catch (error) {
        return NextResponse.json({error})
    }
}