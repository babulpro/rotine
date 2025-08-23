import { NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/DbConnect" ;
import { DecodedJwtToken } from "@/app/lib/authFunction/JwtHelper"
import { cookies } from "next/headers"
import User from "@/app/models/User";
import Articles from "@/app/models/Articles";

export async function POST(req){
    try{
        await connectToDB();
        const data = await req.json();
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        

        if(!token){
            return NextResponse.json({status:"fail",msg:"No token found"},{status:401})
        }

        const payload = await DecodedJwtToken(token);
        const email = payload['email'];

        const user = await User.findOne({email:email})
        if(!user){
            return NextResponse.json({status:"fail",msg:"User not Found"},{status:404})
        }
        data.userId = user._id
        const newArticle = await Articles.create(data)
        return NextResponse.json({status:"success",data:newArticle})




    }
    catch(e){
         console.error("API Error:", e)
            return NextResponse.json(
              { status: "fail", msg: e.message },
              { status: e.statusCode || 500 })
    }
}



export async function GET(req,res){
    try{
         await connectToDB()
         const storeCookies = await cookies()
         const token =await storeCookies.get('token')?.value
         if(!token){
            return NextResponse.json({status:"fail",msg:"something went wrong"})
         }
          
        const payload = await DecodedJwtToken(token)           
        const user = await User.findOne({_id:payload['id']}) 
        const data = await Articles.find() 

        return NextResponse.json({status:"success",msg:"data get found",data:data},{status:200})
        

    }
    catch(e){
        return NextResponse.json({status:"fail",msg:"User not fount"},{satatus:404})
    }
}