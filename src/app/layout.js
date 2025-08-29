import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; 
import Navbar from "@/app/lib/utilityCom/Navbar";
import MainNavbar from "@/app/lib/utilityCom/MainNavbar";
import Footer from "@/app/lib/utilityCom/Footer"
import { cookies } from 'next/headers'
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Routine App – Plan Your Day, Build Better Habits, and Boost Productivity",
  description: "Organize your day with Routine App – the daily planner that tracks habits, manages tasks, and saves time. Stay focused, cut distractions, and achieve your goals with smart reminders.",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value 
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div>

              <div>
                {
                  token?<MainNavbar/>:<Navbar/>
                } 
              </div>                                 
              
              {children}
              <div>
                <Footer/>
              </div>
        </div>
         
      </body>
    </html>
  );
}
