import authUser from "@/configs/authServer";
import connectedDB from "@/configs/db";
import TicketModel, { TicketType } from "@/model/Ticket";
import UserModel from "@/model/User";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    connectedDB();

    const body = await req.json();

    const schema = Joi.object({
      department: Joi.string().trim().required(),
      type: Joi.string().trim().required(),
      title: Joi.string().trim().required(),
      description: Joi.string().trim().required(),
      level: Joi.string().trim().required(),
    });

    const { error } = schema.validate(body);

    if (error) {
      return NextResponse.json({ messageError: error.details[0].message }, { status: 402 });
    }

    const {department , type , title , description , level} = body
    const user = await authUser();

    const ticket = await TicketModel.create({
        department ,
        type , 
        title , 
        description , 
        level , 
        user : user._id
    });

    await UserModel.findByIdAndUpdate(user._id , {
      $push: { tickets: ticket._id },
    });

    return NextResponse.json({ message: "Create ticket successfully ..." });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: error }, { status: 500 });
  }
}


export async function GET(req: NextRequest): Promise<NextResponse> {

    try {
        
        connectedDB()

        const tickets = await TicketModel.find({}).populate({
            path: 'user',
            select : 'username _id phone email'
        })

        return NextResponse.json(tickets)

    } catch (error) {
        return NextResponse.json({message : error})
    }

} 