import connectedDB from "@/configs/db";
import SubDepartmentModel from "@/model/SubDepartment";
import { NextResponse } from "next/server";


export async function DELETE( { params }: { params: { id: string } }):Promise<NextResponse> {

    try {

        connectedDB()

        await SubDepartmentModel.findByIdAndDelete(params.id)

        return NextResponse.json({message : "delete department successfully ..."})
    } catch (error) {
        return NextResponse.json({message : error})
    }
}

export async function GET( { params }: { params: { id: string } }):Promise<NextResponse> {
    try {
        connectedDB()

        const department = await SubDepartmentModel.findById(params.id)

        return NextResponse.json({department})
    } catch (error) {
        return NextResponse.json({message : error})
    }

}