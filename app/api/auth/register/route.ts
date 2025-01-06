import { NextRequest, NextResponse } from "next/server";
import  connectDB from '@/configs/db'
import Joi from "joi";
import UserModel from '@/model/User'
import {generateToken, hashedPassword} from '@/configs/auth'
import { DataUser } from "../login/route";
import { headers } from "next/headers";



export async function POST(req:NextRequest):Promise<NextResponse>{
    
    try{
        await connectDB()

        const body : DataUser = await req.json()

        const schema = Joi.object({
            name: Joi.string().trim().required(),
            phone: Joi.string()
            .pattern(/^(09)(1[0-9]|2[0-2]|3[0-9]|9[0-9])-?[0-9]{3}-?[0-9]{4}$/).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
          });

        const {error} = schema.validate(body)

        if(error){
            return NextResponse.json({messageError : error.details[0].message},{status:402})
        }

        const {name,phone,email,password,role} = await body

        const passwordHashed = await hashedPassword(password as string)
        const token = await generateToken(email)

        const newUser= {
            name,
            phone,
            email,
            password:passwordHashed,
            token:token , 
            role
        }

        await UserModel.create(newUser)
        
        return NextResponse.json({message:"register user successfully ..."},    {
            status: 201,
            headers: { "Set-Cookie": `token=${token};path=/;httpOnly=true` },
          })

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
