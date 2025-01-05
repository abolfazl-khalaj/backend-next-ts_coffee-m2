import mongoose, { Mongoose, SchemaType, SchemaTypes } from "mongoose"
import { ProductType } from "./Product"
import { IUser } from "./User"
import { required } from "joi"

export interface ContactType {

    username: string,
    email: string,
    phone?: number,
    company: string
    body: string 

}


const schemaContact = new mongoose.Schema({
    
    username: {
        type: SchemaTypes.String , 
        required: true
    },
    email: {
        type: SchemaTypes.String ,
        required: true
    },
    phone : {
        type: SchemaTypes.String ,
        required: true
    },
    company: {
        type: SchemaTypes.String ,
        required: false
    },
    body: {
        type: SchemaTypes.String ,
        required: true
    }

},{timestamps:true})


const ContactModel = mongoose.models.schemaContact || mongoose.model<ContactType>('Contact' ,schemaContact);

export default ContactModel