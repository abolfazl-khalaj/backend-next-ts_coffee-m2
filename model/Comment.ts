import { ICommentProduct } from '@/type/Comment.type';
import mongoose, { Document, Schema, SchemaTypes } from 'mongoose';

const SchemaComment = new Schema<ICommentProduct>({
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
    product: {
        type: SchemaTypes.ObjectId,
        ref : 'Product',
        required: true
    },
}, { timestamps: true });

const UserModel = mongoose.models.Comment || mongoose.model<ICommentProduct>('Comment', SchemaComment);

export default UserModel;
