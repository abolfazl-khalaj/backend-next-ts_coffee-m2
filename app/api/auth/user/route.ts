import authUser  from "@/configs/authServer";
import connectedDB from "@/configs/db";
import UserModel from "@/model/User";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest):Promise<NextResponse> {
    
    try {

        connectedDB()

        const users = await UserModel.find()
        return NextResponse.json({users})
    } catch (error) {
        return NextResponse.json({error})
    }
}

export async function POST(req:NextRequest):Promise<NextResponse> {
    
    try {

        connectedDB()
        const body = await req.json()

        const schema = Joi.object({
            username: Joi.string().trim().required(),
            phone: Joi.string()
            .pattern(/^(09)(1[0-9]|2[0-2]|3[0-9]|9[0-9])-?[0-9]{3}-?[0-9]{4}$/).required(),
            email: Joi.string().email().required(),
            });
            
        const {error} = schema.validate(body)

        if(error){
            return NextResponse.json({messageError : error.details[0].message},{status:402})
        }

        const user = await authUser()
        const {username , phone , email } = body 

        await UserModel.findByIdAndUpdate(user._id , {
            $set : {
                username ,
                phone ,
                email
            }
        })


        return NextResponse.json({message : 'updata data user successfully ....'})


    } catch (error) {
        return NextResponse.json({message : error},{status : 500})
    }
}

export async function PUT(req:NextRequest):Promise<NextResponse> {
    
    try {
        connectedDB()

        const body = await req.json()
        const { id } = body

        const user = await UserModel.findById(id)

        await UserModel.findByIdAndUpdate(id , {
            $set : {role : user.role == "USER" ? "ADMIN" : "USER"}
        })

        return NextResponse.json({message: 'update user successfully ..'})
    }catch (error){
        return NextResponse.json({message: error})
    }
}

export async function DELETE(req:NextRequest):Promise<NextResponse> {
    
    try {
        connectedDB()

        const body = await req.json()
        const { id } = body

        await UserModel.findByIdAndDelete(id)

        return NextResponse.json({message: 'delete user successfully ..'})
    }catch (error){
        return NextResponse.json({message: error})
    }
}