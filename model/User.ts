import mongoose, { Document, Schema, SchemaTypes } from 'mongoose';
import { CommentProduct } from './Comment';
import { TicketType } from './Ticket';

export interface IUser extends Document {
    username: string;
    phone: string;
    email?: string;
    password?: string;
    role: 'USER' | 'ADMIN' | 'SUPPORT';
    token?: string;
    refreshToken?: string;
    comments : CommentProduct[],
    tickets? : TicketType[]
}

const SchemaUser = new Schema<IUser>({
    username: {
        type: SchemaTypes.String,
        minLength: 3,
        required: true, 
    },
    phone: {
        type: SchemaTypes.String, 
        match: /^(09)(1[0-9]|2[0-2]|3[0-9]|9[0-9])-?[0-9]{3}-?[0-9]{4}$/,
        required: true, 
        unique: true
    },
    email: {
        type: SchemaTypes.String,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        required: false,
        unique: true
    },
    password: {
        type: SchemaTypes.String,
        min: 8,
        required: false
    },
    role: {
        type: SchemaTypes.String,
        default: 'USER',
        enum: ['USER', 'ADMIN', 'SUPPORT']
    },
    token: {
        type: SchemaTypes.String,
    },
    refreshToken: {
        type: SchemaTypes.String
    },
    comments :[
        {
            type: SchemaTypes.ObjectId,
            ref: 'Comment'
        }
    ],
    tickets :[
        {
            type: SchemaTypes.ObjectId,
            ref: 'Ticket'
        }
    ]
}, { timestamps: true });

SchemaUser.post('save', function(error: any, doc: any, next: any) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        next(new Error('Duplicate email or phone detected.'));
    } else {
        next(error);
    }
});

const UserModel = mongoose.models.User || mongoose.model<IUser>('User', SchemaUser);

export default UserModel;
