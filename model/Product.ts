import mongoose, { Document, Schema, SchemaTypes } from 'mongoose';
import { ICommentProduct } from '@/type/Comment.type';

// تعریف تایپ محصول
interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  score: number;
  img: string;
  isAvailable: boolean;
  comments: ICommentProduct[];
}

// تعریف اسکیمای محصول
const SchemaProduct = new Schema<IProduct>(
  {
    title: {
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
    score: {
      type: SchemaTypes.Number,
      required: true,
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
