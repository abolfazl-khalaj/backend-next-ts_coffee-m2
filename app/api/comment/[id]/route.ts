import connectedDB from "@/configs/db";
import CommentModel from "@/model/Comment";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req:NextRequest, { params }: { params: { id: string } }):Promise<NextResponse> {
    console.log(params);
    
    try{

        await connectedDB()

        await CommentModel.findByIdAndUpdate(params.id , {isAccept : true})

        return NextResponse.json({message : 'accept comment successfully ...'})

    }catch (error){
        console.log(error);
        
        return NextResponse.json({message : error},{status:500})
    }

}