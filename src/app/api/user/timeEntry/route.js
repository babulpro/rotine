import { connectToDB } from "@/app/lib/DbConnect";
import { cookies } from "next/headers";
import { DecodedJwtToken } from "@/app/lib/authFunction/JwtHelper";
import User from "@/app/models/User";
import TimeEntry from "@/app/models/TimeEntry";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    await connectToDB();

    // Auth check
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ status: "fail", msg: "Authentication required" }, { status: 401 });
    }

    const payload = await DecodedJwtToken(token);
    const email = payload?.email;
    if (!email) {
      return NextResponse.json({ status: "fail", msg: "Invalid token" }, { status: 401 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ status: "fail", msg: "User not found" }, { status: 404 });
    }

    // Convert input into total minutes
    const mobileMinutes = (data.mobileUse?.hours || 0) * 60 + (data.mobileUse?.minutes || 0);
    const productivityMinutes = (data.productivity?.hours || 0) * 60 + (data.productivity?.minutes || 0);
    const othersMinutes = (data.others?.hours || 0) * 60 + (data.others?.minutes || 0);

    // Rule: If mobile = 24 hours, productivity must be 0
    if (mobileMinutes >= 1440 && productivityMinutes > 0) {
      return NextResponse.json(
        { status: "fail", msg: "If mobile use is 24 hours, productivity must be 0" },
        { status: 400 }
      );
    }

    // Total check (must not exceed 24 hrs)
    const totalMinutes = mobileMinutes + productivityMinutes + othersMinutes;
    if (totalMinutes > 1440) {
      return NextResponse.json(
        { status: "fail", msg: "Total daily time cannot exceed 24 hours" },
        { status: 400 }
      );
    }

    // Prepare normalized data (store back in hours/minutes format)
    const normalizedData = {
      mobileUse: { hours: Math.floor(mobileMinutes / 60), minutes: mobileMinutes % 60 },
      productivity: { hours: Math.floor(productivityMinutes / 60), minutes: productivityMinutes % 60 },
      others: { hours: Math.floor(othersMinutes / 60), minutes: othersMinutes % 60 }
    };

    // Check today's entry
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingEntry = await TimeEntry.findOne({
      userId: user._id,
      date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) }
    });

    if (existingEntry) {
      // Merge existing + new in minutes
      const mergedMobile = (existingEntry.mobileUse.hours * 60 + existingEntry.mobileUse.minutes) + mobileMinutes;
      const mergedProductivity = (existingEntry.productivity.hours * 60 + existingEntry.productivity.minutes) + productivityMinutes;
      const mergedOthers = (existingEntry.others.hours * 60 + existingEntry.others.minutes) + othersMinutes;

      const mergedTotal = mergedMobile + mergedProductivity + mergedOthers;
      if (mergedTotal > 1440) {
        return NextResponse.json(
          { status: "fail", msg: "Total daily time cannot exceed 24 hours" },
          { status: 400 }
        );
      }

      // Enforce rule again: 24h mobile => 0 productivity
      if (mergedMobile >= 1440 && mergedProductivity > 0) {
        return NextResponse.json(
          { status: "fail", msg: "If mobile use is 24 hours, productivity must be 0" },
          { status: 400 }
        );
      }

      // Update entry
      const updatedEntry = await TimeEntry.findByIdAndUpdate(
        existingEntry._id,
        {
          mobileUse: { hours: Math.floor(mergedMobile / 60), minutes: mergedMobile % 60 },
          productivity: { hours: Math.floor(mergedProductivity / 60), minutes: mergedProductivity % 60 },
          others: { hours: Math.floor(mergedOthers / 60), minutes: mergedOthers % 60 }
        },
        { new: true }
      );

      return NextResponse.json({ status: "success", data: updatedEntry, msg: "Time entry updated" }, { status: 200 });
    } else {
      // Create new entry
      const newTimeEntry = await TimeEntry.create({
        ...normalizedData,
        userId: user._id,
        date: new Date()
      });

      return NextResponse.json({ status: "success", data: newTimeEntry, msg: "New time entry created" }, { status: 201 });
    }
  } catch (error) {
    console.error("Error in POST /api/time-entries:", error);
    return NextResponse.json({ status: "error", msg: error.message || "Internal server error" }, { status: 500 });
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