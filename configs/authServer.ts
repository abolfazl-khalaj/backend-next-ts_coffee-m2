import { cookies } from "next/headers";
import connectedDB from "./db";
import { verifyToken } from "./auth";
import UserModel from "@/model/User";

const authUser = async () => {
  const token = (await cookies()).get("token");

  if (token) {
      const tokenPayload = await verifyToken(token.value);      

      if (tokenPayload) {
          await connectedDB();
          let user = await UserModel.findOne({ email: tokenPayload.data });
          return user;
      } else {
          console.log("Invalid or expired token.");
      }
  }

  return false;
};


export default authUser