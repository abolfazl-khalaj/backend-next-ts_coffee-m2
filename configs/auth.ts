import { DataUser } from "@/app/api/auth/login/route"
import connectedDB from "./db"
import { cookies } from "next/headers"
import UserModel from "@/model/User"

const { compare , hash } = require("bcryptjs") 
const { sign , verify } = require('jsonwebtoken')


const hashedPassword = async (password:string):Promise<string> => {
    const passwordHashed = await hash(password,12)
    return passwordHashed
}

const verifyPassword = async (password:string , hashedPassword:string):Promise<string> => {
    const isValid = await compare(password , hashedPassword)
    return isValid
}

const generateToken = (data:string):string => {
    const token = sign({data},process.env.SECRETORPRIVATEKEY_TOKEN,{
        expiresIn : '1h'
    })
    return token 
}

const verifyToken = async (token: string) => {
    try {
        const payload = await verify(token, process.env.SECRETORPRIVATEKEY_TOKEN);
        return payload;
        
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            console.log('Token has expired.');
        } else {
            console.log('Token verification failed:', error);
        }
        return null;
    }
};

const refreshToken = (data:string): string => {
    const token = sign({data},process.env.SECRETORPRIVATEKEY_REFRESHTOKEN,{
        expiresIn : '15d'
    })
    return token 
}


export {
    hashedPassword,
    verifyPassword,
    generateToken,
    verifyToken,
    refreshToken
}