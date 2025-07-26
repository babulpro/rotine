 
import Link from "next/link";
import React from "react";
import { cookies } from "next/headers";
 
 
 
 

const MainNavbar =async () => {
      const handleLogout = async () => {
    "use server"; 
        try {     
      cookies().delete('token');  
    
   
    } catch (error) {
      console.error('Logout failed:', error);
      throw new Error('Logout failed');
    }
  };

    return (
        <div className="">
            <div className="navbar bg-base-100 shadow-sm fixed top-0 z-50">
                <div className="navbar-start">
                     <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                         </div>
                            <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                             <li> <Link href={'/dashboard/pages/routine'}>Routine</Link></li>
                              <li> <Link href={'/dashboard/pages/place'}>Place</Link></li>
                              <li> <Link href={'/dashboard/pages/'}>Work</Link></li>
                                 
                            <li><a>Item 3</a></li>
                            </ul>
                     </div>
                     <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                    <li><Link href={'/dashboard/pages/routine'}>Routine</Link></li>
                    <li><Link href={'/dashboard/pages/place'}>Place</Link></li>
                    <li><Link href={'/dashboard/pages/'}>Work</Link></li>
                     
                    <li><a>Item 3</a></li>
                    </ul>
                </div>
                 <div className="navbar-end">
                  <form action={handleLogout}>
                <button 
                    type="submit"
                    className="btn btn-ghost">
                    Logout
                </button>
                </form>
                </div>
            </div>
        </div>
    );
};

export default MainNavbar;
