import { verifyToken } from "@/configs/auth"
import connectedDB from "@/configs/db"
import CommentModel from "@/model/Comment"
import ProductModel, { ProductType } from "@/model/Product"
import Joi from "joi"
import { NextRequest, NextResponse } from "next/server"



export async function POST(req:NextRequest):Promise<NextResponse> {


    try{
        const token:string | undefined = req.cookies.get('token')?.value;
        
        if (!token) {
        return NextResponse.json({ message: 'Authorization token is required' }, { status: 401 });
        }


        const very = verifyToken(token)

         

        connectedDB()
        const body : ProductType = await req.json()

        const schema = Joi.object({
            name: Joi.string().trim().required(),
            shortDescription: Joi.string().trim().required(),
            description: Joi.string().trim().required(),
            price: Joi.number().required(),
            weight: Joi.number().required(),
            suiTableFor: Joi.array().items(Joi.string()).required(),
            smell: Joi.string().trim().required(),
            tags: Joi.array().items(Joi.string()).required(),
            score: Joi.number().optional(), 
            img: Joi.string().trim().required(),
            isAvailable: Joi.boolean().required(),
          });
          

        const {error} = schema.validate(body)

        if(error){
            return NextResponse.json({messageError : error.details[0].message},{status:402})

        }

        await ProductModel.create(body)

        return NextResponse.json({message : 'create product successfully ..'},{status : 201})

    }catch(error){

        return NextResponse.json({message : error},{status:500})
        
    }

}



export async function GET(req:NextRequest):Promise<NextResponse> {

    try{
        await connectedDB()

        const products = await ProductModel.find({},'-__v').populate({
            path: 'comments',
            model: CommentModel,
          });

        return NextResponse.json({data : products},{status:200})

    }catch(error){
        
        return NextResponse.json({message : error},{status:500})

    }


}
