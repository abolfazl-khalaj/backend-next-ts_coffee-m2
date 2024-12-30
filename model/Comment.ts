import mongoose, { Document, Schema, SchemaTypes } from 'mongoose';

interface IComment extends Document {
    username: string;
    description: string;
    email: string;
    score: number;
    product : string | undefined
}

const SchemaComment = new Schema<IComment>({
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
        ref : 'product',
        required: true
    },
}, { timestamps: true });

const UserModel = mongoose.models.Comment || mongoose.model<IComment>('Comment', SchemaComment);

export default UserModel;
