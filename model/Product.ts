import mongoose, { Document, Schema, SchemaTypes } from 'mongoose';
import { ICommentProduct } from './Comment';

export interface IProduct extends Document {
  name: string;
  shortDescription: string
  description: string;
  price: number;
  weight:number
  suiTableFor:string[]
  smell:string
  tags: string[]
  score ?: number;
  img: string;
  isAvailable: boolean;
  comments: ICommentProduct[];
}

const SchemaProduct = new Schema<IProduct>(
  {
    name: {
      type: SchemaTypes.String,
      minLength: 3,
      required: true,
    },
    description: {
      type: SchemaTypes.String,
      required: true,
    },
    price: {
      type: SchemaTypes.Number,
      required: true,
    },
    weight : {
      type: SchemaTypes.Number ,
      required: true
    },
    suiTableFor: {
      type : [SchemaTypes.String],
      required: true
    },
    smell : {
      type: SchemaTypes.String,
      required: true
    },
    tags: {
      type: [SchemaTypes.String],
      required: true
    },
    score: {
      type: SchemaTypes.Number,
      default: 5,
    },
    img: {
      type: SchemaTypes.String,
      required: true,
    },
    isAvailable: {
      type: SchemaTypes.Boolean,
      default: true,
    },
    comments: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true }
);

// تعریف مدل محصول
const ProductModel = mongoose.models.Product || mongoose.model<IProduct>('Product', SchemaProduct);

export default ProductModel;
