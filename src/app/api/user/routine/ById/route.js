import { connectToDB } from "@/app/lib/DbConnect"
import Routine from "@/app/models/Routine"
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
        let findRoutine = await Routine.findById(id)
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



export async function DELETE(req){
    try{
        await connectToDB()
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const data = await Routine.findByIdAndDelete(id)
      
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
        const data = await Routine.findById(id)
      
       return NextResponse.json({status:"success",data:data})
       

    }
    catch(e){
        return NextResponse.json({status:"fail",msg:"something went wrong"})
    }
}