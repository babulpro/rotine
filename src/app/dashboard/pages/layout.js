 "use client"
import Footer from "@/app/lib/utilityCom/Footer";
import MainNavbar from "@/app/lib/utilityCom/MainNavbar";

export default function layout({children}){
    return(
        <div>
            <div className="mb-16">
                <MainNavbar/>
                 
            </div>
            {children}
            <div>
                 <Footer/>
            </div>
        </div>
    )
}