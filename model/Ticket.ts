import { required } from 'joi';
import mongoose, { Document, Schema, SchemaTypes } from 'mongoose';

export interface TicketType extends Document {
  department: string;
  subDepartment: string ;
  type : string
  title: string;
  description: string;
  level: number;
  user : string
}

const SchemaTicket = new Schema<TicketType>(
  {
    department: {
      type: SchemaTypes.String,
      required: true,
    },
    subDepartment: {
      type: SchemaTypes.String ,
      ref : 'SubDepartment',
      required : true 
    },
    type: {
      type: SchemaTypes.String,
      required: true,
    },
    title: {
      type: SchemaTypes.String,
      required: true,
    },
    description : {
      type: SchemaTypes.String ,
      required: true
    },
    level: {
      type : SchemaTypes.Number,
      default : 1 ,
      enum : [1,2,3] ,
      required: true
    },
    user: {
        type : SchemaTypes.String,
        ref : 'User' ,
        required : true
    }
  },
  { timestamps: true }
);

const TicketModel = mongoose.models.Ticket || mongoose.model<TicketType>('Ticket', SchemaTicket);

export default TicketModel;
