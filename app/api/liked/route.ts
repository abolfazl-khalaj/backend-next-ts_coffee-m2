import connectedDB from "@/configs/db";
import LikedModel, { LikedType } from "@/model/Liked";
import ProductModel from "@/model/Product";
import UserModel from "@/model/User";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req:NextRequest):Promise<NextResponse> {
    
    try {

        connectedDB()

        const body:LikedType = await req.json()

        const schema = Joi.object({
            user: Joi.string().trim().required(),
            product: Joi.string().trim().required()
          });

        const {error} = schema.validate(body) 

        if(error){
            return NextResponse.json({messageError : error.details[0].message},{status:402})
        }

        await LikedModel.create(body)

        return NextResponse.json({message : 'kone laget'})

    }
    catch (error){
        return NextResponse.json({message : error})
    }

}



export async function GET():Promise<NextResponse> {

    try {

        await connectedDB()

        const likedItems = await LikedModel.find()
        .populate({ path: 'user', model: UserModel })
        .populate({ path: 'product', model: ProductModel });

        return NextResponse.json({likedItems})

    }catch (error){
        return NextResponse.json({message : error})
    }

}
