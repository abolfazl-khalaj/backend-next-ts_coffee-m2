import connectedDB from "@/configs/db";
import ContactModel, { ContactType } from "@/model/Contact";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest):Promise<NextResponse> {
    

    try {

        await connectedDB()

        const body:ContactType = await req.json()

        const schema = Joi.object({
             username: Joi.string().trim().required(),
             email: Joi.string().email().required(),
             phone : Joi.string().pattern(/^(09)(1[0-9]|2[0-2]|3[0-9]|9[0-9])-?[0-9]{3}-?[0-9]{4}$/).required(),
             company : Joi.string(),
             body : Joi.string().required()
           }
        );

        const {error} = schema.validate(body)

        if(error){
            return NextResponse.json({messageError : error.details[0].message},{status:402})
        }

        await ContactModel.create(body)


        return NextResponse.json({message : 'create and send contact successfully .... '},{status: 201})


    } catch (error) {

        return NextResponse.json({message : error},{status: 500})

    }


}


export async function GET(req:NextRequest):Promise<NextResponse> {
    
    try {

        await connectedDB()

        const contacts = await ContactModel.find().select('-__v')

        return NextResponse.json(contacts)

    } catch (error) {

        return NextResponse.json({message : error})

    }
}