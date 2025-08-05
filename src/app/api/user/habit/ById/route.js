import { connectToDB } from "@/app/lib/DbConnect"
import Routine from "@/app/models/Routine"
import Habit from "@/app/models/Habit"
import { NextResponse } from "next/server"

export async function POST(req,res){
    try{
        await connectToDB()
        let data = await req.json() 
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if(!id){
            return NextResponse.json({status:"fail",msg:"id is required"},{status:404})
        }
        let findRoutine = await Habit.findById(id)
        if(!findRoutine){
            return NextResponse.json({status:"fail",msg:"routine not found"},{status:404})
        }
        let updateRoutine = await Routine.findByIdAndUpdate(id,data)
        if(!updateRoutine){
            return NextResponse.json({status:"fail",msg:"routine not updated"},{status:404})
        }
        return NextResponse.json({status:"success",msg:"routine updated successfully"},{status:200})
    }
    catch(e){
        return NextResponse.json({status:"fail",msg:"someting went wrong"},{status:404})
    }

}



 export async function PUT(req) {
  try {
    await connectToDB();

    // Extract ID from query parameters
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    // Validate ID
    if (!id) {
      return NextResponse.json(
        { status: "fail", message: "ID is required" },
        { status: 400 }
      );
    }

    // Parse request body
    const data = await req.json();

    // Check if habit exists
    const existingHabit = await Habit.findById(id);
    if (!existingHabit) {
      return NextResponse.json(
        { status: "fail", message: "Habit not found" },
        { status: 404 }
      );
    }

    // Update habit
    const updatedHabit = await Habit.findByIdAndUpdate(
      id,
      data,
      { new: true } // Return the updated document
    );

    if (!updatedHabit) {
      return NextResponse.json(
        { status: "fail", message: "Failed to update habit" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        status: "success", 
        message: "Habit updated successfully",
        data: updatedHabit 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error updating habit:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
 


export async function DELETE(req){
    try{
        await connectToDB()
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const data = await Habit.findByIdAndDelete(id)
      
       return NextResponse.json({status:"success"})
       

    }
    catch(e){
        return NextResponse.json({status:"fail",msg:"something went wrong"})
    }
}


export async function GET(req){
    try{
        await connectToDB()
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const data = await Habit.findById(id)
      
       return NextResponse.json({status:"success",data:data})
       

    }
    catch(e){
        return NextResponse.json({status:"fail",msg:"something went wrong"})
    }
}