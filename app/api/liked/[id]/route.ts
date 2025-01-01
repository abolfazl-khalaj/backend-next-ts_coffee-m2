import connectedDB from "@/configs/db";
import LikedModel from "@/model/Liked";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(req:NextRequest, { params }: { params: { id: string } }):Promise<NextResponse> {
    
    try{

        await connectedDB()

        await LikedModel.findByIdAndDelete(params.id)

        return NextResponse.json({message : 'delete product liked successfully ...'})

    }catch (error){
        return NextResponse.json({message : error},{status:500})
    }

}