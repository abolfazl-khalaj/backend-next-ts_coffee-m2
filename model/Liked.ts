import mongoose, { Mongoose, SchemaType, SchemaTypes } from "mongoose"
import { ProductType } from "./Product"
import { IUser } from "./User"

export interface LikedType {

    user:{
        type : IUser[]
        required: true 
    },
    product: {
        type: ProductType[]
        required: true
    }
}


const SchemaLiked = new mongoose.Schema({
    
    user: [
        {
            type: SchemaTypes.ObjectId , 
            ref : 'User'
        }
    ],
    product: [
        {
            type : SchemaTypes.ObjectId ,
            ref : 'Product'
        }
    ]

})


const LikedModel = mongoose.models.Liked || mongoose.model<LikedType>('Liked' ,SchemaLiked);

export default LikedModel