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
    const token = sign({data},"process.env.SECRETORPRIVATEKEY_TOKEN",{
        expiresIn : '120s'
    })
    return token 
}

const verifyToken = (token:string):string | unknown => {

    try{

        const payload = verify(token , process.env.SECRETORPRIVATEKEY_TOKEN )
        return payload

    }catch (error){
        return error
    }
}

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