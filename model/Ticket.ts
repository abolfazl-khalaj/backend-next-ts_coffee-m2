import { required } from 'joi';
import mongoose, { Document, Schema, SchemaTypes } from 'mongoose';

export interface TicketType extends Document {
  department: string;
  subDepartment: string ;
  type : string
  title: string;
  description: string;
  level: number;
  user : string;
  hasAnswer?: boolean;
  idAnswer? : string
}

const SchemaTicket = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    department: {
      type: mongoose.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    subDepartment: {
      type: mongoose.Types.ObjectId,
      ref: "subDepartment",
      required: true,
    },
    priority: {
      type: Number,
      default: 1,
      enum: [1, 2, 3],
    },
    hasAnswer: {
      type: Boolean,
      default: false,
    },
    isAnswer: {
      type: Boolean,
      default: false,
    },
    mainTicket: {
      type: mongoose.Types.ObjectId,
      ref: "Ticket",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const TicketModel = mongoose.models.Ticket || mongoose.model<TicketType>('Ticket', SchemaTicket);

export default TicketModel;
