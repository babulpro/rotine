import { DecodedJwtToken } from "@/app/lib/authFunction/JwtHelper"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { connectToDB } from "@/app/lib/DbConnect"
import User from "@/app/models/User"
import Routine from "@/app/models/Routine"

export async function POST(req) {
  try {
    const data = await req.json()
    // 1. Connect to database
    await connectToDB()

    // 2. Get cookies (no need for await)
    const cookieStore =await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
      return NextResponse.json(
        { status: "fail", msg: "No token found" },
        { status: 401 }
      )
    }

    // 3. Verify token
    const payload = await DecodedJwtToken(token) 
     const email = payload['email']
     //veryfy user4
     const user = await User.findOne({email:email})
    if (!user) {
      return NextResponse.json(
        { status: "fail", msg: "User not found" },
        { status: 404 }
      )     }

      data.userId = user._id
    // 4. Create new routine
    const newRoutine = await Routine.create(data)
    return NextResponse.json({
      status: "success",
      data: newRoutine
    })

    
  } catch (e) {
    console.error("API Error:", e)
    return NextResponse.json(
      { status: "fail", msg: e.message },
      { status: e.statusCode || 500 }
    )
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
        const data = await Routine.find({userId:user._id}) 

        return NextResponse.json({status:"success",msg:"data get found",data:data},{status:200})
        

    }
    catch(e){
        return NextResponse.json({status:"fail",msg:"User not fount"},{satatus:404})
    }
}