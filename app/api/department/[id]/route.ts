import connectedDB from "@/configs/db";
import DepartmentModel from "@/model/Department";
import { NextResponse } from "next/server";


export async function DELETE( { params }: { params: { id: string } }):Promise<NextResponse> {

    try {

        connectedDB()

        await DepartmentModel.findByIdAndDelete(params.id)

        return NextResponse.json({message : "delete department successfully ..."})
    } catch (error) {
        return NextResponse.json({message : error})
    }

}