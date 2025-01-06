import connectedDB from "@/configs/db";
import DepartmentModel from "@/model/Department";
import SubDepartmentModel, { SubDepartmentType } from "@/model/SubDepartment";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest):Promise<NextResponse> {

    try {

        const body:SubDepartmentType = await req.json()

        const schema = Joi.object({
            department: Joi.string().trim().required(),
            title: Joi.string().trim().required(),
          });

        const {error} = schema.validate(body) 

        if(error){
            return NextResponse.json({messageError : error.details[0].message},{status:402})
        }
        const {department} = body
        connectedDB()
        const subDepartment = await SubDepartmentModel.create(body)
        await DepartmentModel.findByIdAndUpdate(department , {
            $push : {subdepartment : subDepartment._id}
        })

        return NextResponse.json({message : 'create department successfully ...'})
    } catch (error) {

        return NextResponse.json({message : error})
    }
    
}

export async function GET():Promise<NextResponse> {
    
    try {
        await connectedDB()
        const subDepartment: SubDepartmentType[] = await SubDepartmentModel.find({}).populate('department')

        return NextResponse.json({subDepartment})
    } catch (error) {
        return NextResponse.json({message : error})
    }
}