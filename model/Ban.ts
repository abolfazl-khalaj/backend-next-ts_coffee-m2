import mongoose, { Mongoose, SchemaType, SchemaTypes } from "mongoose"
export interface BanType {
    phone:{
        type: string 
    },
    email: {
        type: string
    }
}


const SchemaBan = new mongoose.Schema({
    
    phone: {
        type: SchemaTypes.String , 
        required: false
    },
    email: {
        type: SchemaTypes.String ,
        required: false
    }
    

},{timestamps:true})


const BanModel = mongoose.models.Ban || mongoose.model<BanType>('Ban' ,SchemaBan);

export default BanModel