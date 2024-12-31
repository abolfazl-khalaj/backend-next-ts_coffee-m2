import { verifyToken } from "@/configs/auth";
import connectedDB from "@/configs/db";
import CommentModel, { CommentProduct } from "@/model/Comment";
import ProductModel from "@/model/Product";
import UserModel from "@/model/User";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req:NextRequest):Promise<NextResponse>{

    
    try{

        await connectedDB()

        const body:CommentProduct = await req.json()

        const schema = Joi.object({
             username: Joi.string().trim().required(),
             description: Joi.string().trim().required(),
             email: Joi.string().email().required(),
             score: Joi.number().required(),
             product: Joi.string().required(),
             user : Joi.string().trim().required()
           }
        )

        const {error} = schema.validate(body)

        if(error){
            return NextResponse.json({messageError : error.details[0].message},{status:402})
        }


        const comment = await CommentModel.create(body)

        const {product} = body 

        await ProductModel.findByIdAndUpdate(product,{
            $push : {
                comments : comment._id
            }
        })

        const {user} = body

        await UserModel.findOneAndUpdate({_id:user},{
            $push: {
                comments : comment._id
            }
        })


        return NextResponse.json({message : 'create comment successfully ...'})

    }catch(error){

        return NextResponse.json({message : error},{status:500})

    }



}


export async function GET(): Promise<NextResponse> {
    try {

        await connectedDB();

        const comments = await CommentModel.find()
            .populate({
                path: 'product',
                model: ProductModel,
                select: 'name description price img comments createdAt',
                populate: {
                    path: 'comments', 
                    model: CommentModel,
                    select: 'username description email score createdAt',
                },
            })
            .populate({
                path: 'user',
                model: UserModel,
                select: 'username phone email createdAt comments ',
                populate: {
                    path: 'comments', 
                    model: CommentModel,
                    select: 'username description email score createdAt',
                },
            });

        return NextResponse.json({ comments }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
