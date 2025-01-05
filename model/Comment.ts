import mongoose, { Document, Schema, SchemaTypes } from 'mongoose';
import { SiTruenas } from 'react-icons/si';
import { ProductType } from './Product';
import { IUser } from './User';

export interface CommentProduct extends Document {
    username: string;
    description: string;
    email: string;
    score: number;
    product : ProductType[],
    user : IUser[],
    isAccept : boolean
}

const SchemaComment = new Schema<CommentProduct>({
    username: {
        type: SchemaTypes.String,
        minLength: 3,
        required: true, 
    },
    description: {
        type: SchemaTypes.String, 
        required: true, 
    },
    email: {
        type: SchemaTypes.String,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        required: true,
    },
    score: {
        type: SchemaTypes.Number,
        required: true
    },
    product: [{
        type: SchemaTypes.String,
        required: true
    }],
    user: [{
        type: SchemaTypes.String,
        required : true
    }],
    isAccept :{
        type: SchemaTypes.Boolean,
        default : false ,
        required: true
    }
}, { timestamps: true });

const CommentModel = mongoose.models.Comment || mongoose.model<CommentProduct>('Comment', SchemaComment);

export default CommentModel;
