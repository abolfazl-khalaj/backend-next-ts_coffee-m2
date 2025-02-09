import mongoose, { SchemaTypes } from "mongoose";
import { ProductType } from "./Product";

export interface DiscountType {
    code : string 
    percent : ProductType
    maxUse: number
    uses: number
}

const SchemaDiscount = new mongoose.Schema({
    code: {
        type : SchemaTypes.String , 
        required : true
    },
    percent: {
        type: SchemaTypes.ObjectId ,
        ref: 'Product',
        required: true
    },
    maxUse: {
        type: SchemaTypes.Number ,
        required : true
    },
    uses: {
        type: SchemaTypes.Number , 
        default: 0
    }
},{timestamps: true})

const DiscountModel = mongoose.models.Discount || mongoose.model<DiscountType>('Discount', SchemaDiscount)

export default DiscountModel