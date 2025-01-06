import connectedDB from "@/configs/db";
import DepartmentModel, { DepartmentType } from "@/model/Department";
import SubDepartmentModel from "@/model/SubDepartment";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest):Promise<NextResponse> {

    try {

        const body:DepartmentType = await req.json()

        const schema = Joi.object({
            title: Joi.string().trim().required(),
          });

        const {error} = schema.validate(body) 

        if(error){
            return NextResponse.json({messageError : error.details[0].message},{status:402})
        }

        connectedDB()
        await DepartmentModel.create(body)

        return NextResponse.json({message : 'create department successfully ...'})
    } catch (error) {
        return NextResponse.json({message : error})
    }
    
}

export async function GET():Promise<NextResponse> {
    
    try {

        connectedDB()
        const department = await DepartmentModel.find().populate({
            path:'subdepartment',
            model: SubDepartmentModel
        })

        return NextResponse.json(department)
    } catch (error) {        
        return NextResponse.json({message : error})
    }
}