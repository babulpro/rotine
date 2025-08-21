import { connectToDB } from "@/app/lib/DbConnect";
import { cookies } from "next/headers";
import { DecodedJwtToken } from "@/app/lib/authFunction/JwtHelper";
import User from "@/app/models/User";
import TimeEntry from "@/app/models/TimeEntry";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // 1. Validate and parse request body
    const data = await req.json();
    
    // 2. Connect to database
    await connectToDB();

    // 3. Verify authentication
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { status: "fail", msg: "Authentication required" },
        { status: 401 }
      );
    }

    // 4. Verify and decode JWT
    const payload = await DecodedJwtToken(token);
    const email = payload['email'];
    
    if (!email) {
      return NextResponse.json(
        { status: "fail", msg: "Invalid token" },
        { status: 401 }
      );
    }

    // 5. Find user
    const user = await User.findOne({ email });
    
    if (!user) {
      return NextResponse.json(
        { status: "fail", msg: "User not found" },
        { status: 404 }
      );
    }

    // Get today's date at midnight for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 6. Check if entry exists for today
    const existingEntry = await TimeEntry.findOne({
      userId: user._id,
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      }
    });

    if (existingEntry) {
      // Update existing entry by adding new time values
      const updatedEntry = await TimeEntry.findByIdAndUpdate(
        existingEntry._id,
        {
          $inc: {
            'mobileUse.hours': data.mobileUse?.hours || 0,
            'mobileUse.minutes': data.mobileUse?.minutes || 0,
            'productivity.hours': data.productivity?.hours || 0,
            'productivity.minutes': data.productivity?.minutes || 0,
            'others.hours': data.others?.hours || 0,
            'others.minutes': data.others?.minutes || 0
          }
        },
        { new: true }
      );

      return NextResponse.json(
        { status: "success", data: updatedEntry, msg: "Time entry updated" },
        { status: 200 }
      );
    } else {
      // Create new entry
      const timeEntryData = {
        ...data,
        userId: user._id,
        date: new Date()
      };

      const newTimeEntry = await TimeEntry.create(timeEntryData);
      
      if (!newTimeEntry) {
        throw new Error("Failed to create time entry");
      }

      return NextResponse.json(
        { status: "success", data: newTimeEntry, msg: "New time entry created" },
        { status: 201 }
      );
    }

  } catch (error) {
    console.error("Error in POST /api/time-entries:", error);
    return NextResponse.json(
      { status: "error", msg: error.message || "Internal server error" },
      { status: 500 }
    );
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
        const data = await TimeEntry.find({userId:user._id}) 

        return NextResponse.json({status:"success",msg:"data get found",data:data},{status:200})
        

    }
    catch(e){
        return NextResponse.json({status:"fail",msg:"User not fount"},{satatus:404})
    }
}