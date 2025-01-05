import connectedDB from "@/configs/db";
import TicketModel from "@/model/Ticket";
import { NextRequest, NextResponse } from "next/server";



export async function DELETE(req:NextRequest, { params }: { params: { id: string } }):Promise<NextResponse> {
 
    try {

        connectedDB()

        await TicketModel.findByIdAndDelete(params.id)

        return NextResponse.json({message : 'delete ticket successfully ... '})

    } catch (error) {
        return NextResponse.json({message : error})
    }
}