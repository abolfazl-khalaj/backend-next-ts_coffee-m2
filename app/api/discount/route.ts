import connectedDB from "@/configs/db";
import DiscountModel, { DiscountType } from "@/model/Discount";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest):Promise<NextResponse>{

    try{
        connectedDB()

        const body:DiscountType = await req.json()
        
        const schema = Joi.object({
            code: Joi.string().trim().required(),
            percent: Joi.string().required(),
            maxUse: Joi.number().required(),
            uses: Joi.number().required(),
        });

        const {error} = schema.validate(body)

        if(error){
            return NextResponse.json({messageError : error.details[0].message},{status:402})
        }

        await DiscountModel.create(body)

        return NextResponse.json({message: 'create discount successfully ..'})
    }catch(error){
        return NextResponse.json({messageError: error})
    }

}