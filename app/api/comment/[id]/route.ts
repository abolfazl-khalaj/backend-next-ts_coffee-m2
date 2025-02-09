import connectedDB from "@/configs/db";
import CommentModel from "@/model/Comment";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req:NextRequest, { params }: { params: { id: string } }):Promise<NextResponse> {    
    try{
        await connectedDB()
        const comment = await CommentModel.findById(params.id)
        await CommentModel.findByIdAndUpdate(params.id , {isAccept : !comment.isAccept})

        return NextResponse.json({message : 'toggle status accept comment successfully ...'})
    }catch (error){
        console.log(error);
        
        return NextResponse.json({message : error},{status:500})
    }
}