 
const { NextResponse } = require("next/server")

 export async function GET(req,res){
    return NextResponse.json({status: "success", message: "Hello from the user API route!"})
 }