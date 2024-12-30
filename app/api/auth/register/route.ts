import { NextRequest, NextResponse } from "next/server";
import  connectDB from '@/configs/db'
import Joi from "joi";
import UserModel from '@/model/User'
import { log } from "console";
import {generateToken, hashedPassword} from '@/configs/auth'
import { emit } from "process";
import { DataUser } from "../../../../type/DataUser.type";



export async function POST(req:NextRequest):Promise<NextResponse>{
    
    try{
        await connectDB()

        const body : DataUser = await req.json()

        const schema = Joi.object({
            username: Joi.string().trim().required(),
            phone: Joi.string()
            .pattern(/^(09)(1[0-9]|2[0-2]|3[0-9]|9[0-9])-?[0-9]{3}-?[0-9]{4}$/).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
          });

        const {error} = schema.validate(body)

        if(error){
            return NextResponse.json({messageError : error.details[0].message},{status:402})
        }

        const {username,phone,email,password,role} = body

        const passwordHashed = await hashedPassword(password as string)
        const token = generateToken(email)

        const newUser= {
            username,
            phone,
            email,
            password:passwordHashed,
            token:token , 
            role
        }

        await UserModel.create(newUser)
        
        return NextResponse.json({message:"register user successfully ..."},{status:201})

    }catch (err : any){

        if (err.name === 'MongoServerError' && err.code === 11000) {

            if (err.keyValue?.email) {
                return NextResponse.json(
                    { message: `The email '${err.keyValue.email}' is already registered.` },
                    { status: 409 }
                );
            }
    
            if (err.keyValue?.phone) {
                return NextResponse.json(
                    { message: `The phone number '${err.keyValue.phone}' is already registered.` },
                    { status: 409 }
                );
            }
            
        }

        return NextResponse.json({message : "error ==>",err})
    }

}
