import { required } from 'joi';
import mongoose, { Document, Schema, SchemaTypes } from 'mongoose';

export interface TicketType extends Document {
  department: string;
  type : string
  title: string;
  description: string;
  level: string;
  user : string
}

const SchemaTicket = new Schema<TicketType>(
  {
    department: {
      type: SchemaTypes.String,
      required: true,
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
      type : SchemaTypes.String,
      required: true
    },
    user: {
        type : SchemaTypes.String,
        required : true
    }
  },
  { timestamps: true }
);

const TicketModel = mongoose.models.Ticket || mongoose.model<TicketType>('Ticket', SchemaTicket);

export default TicketModel;
