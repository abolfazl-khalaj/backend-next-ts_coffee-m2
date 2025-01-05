import { verifyToken } from "@/configs/auth";
import connectedDB from "@/configs/db";
import UserModel from "@/model/User";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { DataUser } from "../login/route";
import { Verification } from "next/dist/lib/metadata/types/metadata-types";
import { string } from "joi";


export async function GET(req:NextRequest):Promise<NextResponse> {
    
    try{
        await connectedDB()

        const token = (await cookies()).get('token')?.value
        let user = null
        console.log(token);
        
        if(token){

            const tokenPayload:DataUser|unknown = verifyToken(token)

            if(tokenPayload){
                user = await UserModel.findOne({email : (tokenPayload as DataUser).email},'-__v -password')
            }else{

                return NextResponse.json({message : 'token not valid ..'},{status:401})

            }
            
        }



        return NextResponse.json(user)
    }catch (error){
        return NextResponse.json({message : error},{status:500})
    }
}