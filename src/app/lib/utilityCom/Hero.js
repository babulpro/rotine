 
import Image from 'next/image';
import Link from 'next/link';
 



 
 
export default function Hero() {
  
 
 
  return (
       

        <div className="bg-base-100 py-16 font-Geist ">
                <div className='m-auto p-3 '>
                    <div className="grid lg:grid-cols-2 gap-5 min-h-1/2 ">
                            <div className="  shadow-xl">
                                <Image
                                    src={`/hero.jpg`}
                                    alt="Hero Image"
                                    width={500}
                                    height={400}
                                    quality={100}
                                    className="rounded-lg p-2"
                                />

                                {/* Overlay */}
                                {/* <div className="absolute inset-0 bg-slate-900 opacity-50 rounded-lg p-2"></div>
                                </div>
                         */}
                            </div>
                            <div className=" text-center text-slate-300 shadow-xl flex justify-center items-center py-14">
                                    
                                    <div>
                                        <h1 className="text-2xl lg:text-3xl capitalize underline">Plan Your Day - Own Your Time</h1>
                                            <h2 className="capitalize  underline">Part Of Education Center</h2>
                                            <div className="mt-2 text-sm">
                                                    <p> Stay productive, balanced, and stress-free with your personalized daily routine planner. 
                                                    <br />Track tasks, build healthy habits, and make
                                                    <br /> every moment count
                                                    </p>
                                            </div>
                                            
                                                <div className="mt-4 font-bold text-green-900 capitalize lg:mt-8 lg:mr-8">
                                                <Link
                                                    className="w-20 px-3 py-1 bg-green-200 rounded-lg lg:w-40 hover:bg-transparent hover:text-white hover:border"
                                                    href="/dashboard/pages/routine/addRoutine"
                                                >Get Started Today →
                                                </Link>
                                            </div>
                                            
                                        </div>
                            </div>
                    </div>
                </div>
        </div>
  );
}
