import { NextRequest, NextResponse } from "next/server";
import  connectDB from '@/configs/db'
import Joi from "joi";
import UserModel from '@/model/User'
import { log } from "console";
import {generateToken, hashedPassword, verifyPassword} from '@/configs/auth'
import { emit } from "process";
import BanModel from "@/model/Ban";

export interface DataUser {
    name:string,
    phone : number ,
    email : string ,
    role? : {
        type : String,
        default : 'USER'
    } ,
    password ?: string,
}                   


interface DataRequestBody {
    username:string,
    password? : string ,
}
type DataUserWithToken = DataUser & { token: string };


export async function POST(req:NextRequest):Promise<NextResponse>{
    
    try{
        await connectDB()

        const body : DataRequestBody = await req.json()

        const schema = Joi.object({
            name: Joi.alternatives().try(
                Joi.string()
                    .pattern(/^(09)(1[0-9]|2[0-2]|3[0-9]|9[0-9])-?[0-9]{3}-?[0-9]{4}$/)
                    .message("Invalid phone number format. Expected Iranian phone number format."),
                Joi.string()
                    .email() 
                    .message("Invalid email format.")
            )
            .required(),
            password: Joi.string().min(8).required(),
          });

        const {error} = schema.validate(body)

        if(error){
            return NextResponse.json({messageError : error.details[0].message},{status:402})
        }



        const {username,password} : DataRequestBody = body

        const isBanUser = await BanModel.find({
            $or : [{email: username},{phone:username}]
        })

        if(isBanUser){
            return NextResponse.json({message: 'this is user ban !!!!'})
        }

        const validUser : DataUserWithToken[] | undefined = await UserModel.find({
            $or :[ {email:username},{phone:username}]
        })

        
        if(!validUser[0]){
            return NextResponse.json({message : 'not find user match ...'},{status : 404})
        }

        const payloadPassword = await verifyPassword(password as string ,validUser[0].password as string)

        if(!payloadPassword){
            return NextResponse.json({message : 'email / phone or password not valid .. !!'},{status:404})
        }
        


        
        return NextResponse.json({validUser},
            {
                status:200,
                headers: { "Set-Cookie": `token=${validUser[0].token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400` }
            }
        )

    }catch (err){
        return NextResponse.json({message : err})
    }

}
