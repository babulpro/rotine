 
import Navbar from "@/app/lib/utilityCom/Navbar";
import Footer from "@/app/lib/utilityCom/Footer"
import Home from "@/app/lib/utilityCom/Home"

export default function Page(){
   
    
 
    return(
       <div>
            <div className="mb-1">
                <Navbar/>
            </div>            

            <div className=" bg-slate-700 py-10 px-5 flex justify-center items-center ">
                <div className=" container m-auto shadow-xl md:p-10  p-2">
                  <Home/>
    
                </div>
            </div>
            <div>
                <Footer/>
            </div>

       </div>

    )
}