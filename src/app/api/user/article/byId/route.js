import { connectToDB } from "@/app/lib/DbConnect";
import Articles from "@/app/models/Articles";
import { NextResponse } from "next/server";

export async function GET(req){
    try{
        await connectToDB()
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const data = await Articles.findById(id).populate("userId","name")
      
       return NextResponse.json({status:"success",data:data})
       

    }
    catch(e){
        return NextResponse.json({status:"fail",msg:"something went wrong"})
    }
}