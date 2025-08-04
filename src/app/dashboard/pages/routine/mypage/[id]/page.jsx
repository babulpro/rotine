"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState ,useEffect} from "react";

export default function Page(){

    const params = useParams()
    const router = useRouter()
    const id = params.id;
    const [data,setData]=useState({timeSlot:"",task:""})
    useEffect(()=>{
        (async()=>{
            try{
                const response = await fetch(`/api/user/routine/ById?id=${id}`, { cache: "no-cache" });
                if (!response.ok) {
                    throw new Error("Failed to fetch routine data");
                }
                const json = await response.json();

                setData(json.data); 
            }
            catch (error) {
                console.error("Error fetching routine data:", error);
            }
        })()
    },[])



    const inputChange=(name,value)=>{
        setData((pre)=>({
            ...pre,
            [name]:value
        }))
    }
    const formSubmit= async (e)=>{
        e.preventDefault()
        const config={
            method:"POST",
            headers:{
                "Content-type":"application/json",
            },
            body:JSON.stringify(data),
            cache:"no-cache",
        }
        const response = await fetch(`/api/user/routine/ById?id=${id}`,config);
        if(!response.ok){
            alert ("try again late")

        }
        const json = await response.json()
        if(json.status ==="success"){
            alert ("success") 
            router.push("/dashboard/pages/routine")

        }
    } 

    return(
        <div className="min-h-screen flex justify-center items-center">
            <div className="w-4/5 h-96 m-auto shadow-2xl">
                        <form onSubmit={formSubmit}>
                            <div className="mt-5 px-5 w-4/5 m-auto">
                            <div className="grid md:grid-cols-2 gap-3 md:gap-5">
                                <div>
                                <label htmlFor="timeSlot" className="mb-2 text-2xl font-medium text-gray-300">Time Slot</label><br />
                                <input
                                    type="text"
                                    value={data.timeSlot}
                                    onChange={(e) => inputChange("timeSlot", e.target.value)}
                                    className="input input-bordered w-full mb-4"
                                    placeholder="e.g., 8:00 AM - 9:00 AM"
                                    id="timeSlot"
                                />
                                </div>

                                <div>
                                <label htmlFor="task" className="mb-2 text-2xl font-medium text-gray-300">Task</label><br />
                                <input
                                    type="text"
                                    value={data.task}
                                    onChange={(e) => inputChange("task", e.target.value)}
                                    className="input input-bordered w-full mb-4"
                                    placeholder="It's time to study properly"
                                    id="task"
                                />
                                </div>
                            </div>
                            </div>
                            <div className="flex justify-center md:mt-12">

                                <input type="submit" value="Submit" className="btn btn-primary px-4 py-2 mt-4" />
                            </div>
                        </form>
            </div>
            
        </div>
    )
}