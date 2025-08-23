 
import Image from 'next/image';
import Link from 'next/link';
 



 
 
export default function Home() {
  
 
 
  return (
       

        <div className="font-Geist ">
                <div className='p-3 '>
                    {/* //hero part */}
                    <div className="grid lg:grid-cols-2 md:gap-5 shadow-2xl pb-5">
                            <div className="">
                                <Image
                                    src={`/news.jpg`}
                                    alt="Hero Image"
                                    width={500}
                                    height={400}
                                    quality={100}
                                    className="rounded-lg p-2"
                                />

                            
                            </div>
                            <div className=" text-center text-slate-300  flex justify-center items-center py-14">
                                    
                                    <div>
                                        <h1 className="text-xl lg:text-2xl capitalize underline">Take Control of Your Time, Unlock Your Potential</h1>
                                            <h2 className="capitalize ">🌟Master Your Day, Shape Your Future</h2>
                                            <div className="mt-2 text-sm">
                                                    <p> Your day deserves more than chaos—our personalized routine  
                                                    <br />planner helps you stay productive,
                                                    <br /> balanced, and stress-free.
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

                    {/* // Task and Schedule */}
 
                    
                    <div className="mx-auto w-full text-white p-6 md:p-8 shadow-2xl mt-10">
                        <div>
                                <h2 className="text-2xl md:text-3xl font-bold md:mb-10 mb-2 underline text-center">
                                   Why Planning Your Tasks & Schedule Matters
                                </h2>
                                <p className="text-slate-200/90 mb-6 ">
                                    A clear plan turns busy days into meaningful progress. Prioritize what matters,
                                    reduce decision fatigue, and stay consistent.
                                </p>
                        </div>

                        {/* Key benefits */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        <div className="rounded-lg bg-white/10 p-4">
                            <h3 className="font-semibold mb-1">Boost Productivity</h3>
                            <p className="text-sm text-slate-200/80">
                            Focus on high-impact tasks first and avoid time sinks.
                            </p>
                        </div>
                        <div className="rounded-lg bg-white/10 p-4">
                            <h3 className="font-semibold mb-1">Reduce Stress</h3>
                            <p className="text-sm text-slate-200/80">
                            Know what’s next at a glance—no more last-minute rush.
                            </p>
                        </div>
                        <div className="rounded-lg bg-white/10 p-4">
                            <h3 className="font-semibold mb-1">Build Consistency</h3>
                            <p className="text-sm text-slate-200/80">
                            Turn small daily actions into lasting habits.
                            </p>
                        </div>
                        <div className="rounded-lg bg-white/10 p-4">
                            <h3 className="font-semibold mb-1">Protect Your Time</h3>
                            <p className="text-sm text-slate-200/80">
                            Block distractions and keep your calendar realistic.
                            </p>
                        </div>
                        </div>

                        {/* Practical bullets */}
                        <div className="mb-6">
                        <h4 className="font-semibold mb-2">Practical Tips</h4>
                            <div  className="grid md:grid-cols-2 md:gap-5 md:min-h-64 min-h-80">
                                <div>                                    
                                    <ul className="list-disc pl-5 space-y-1 text-slate-100/90">
                                        <li>Plan tomorrow the night before (3–5 priorities).</li>
                                        <li>Time-block deep work and breaks.</li>
                                        <li>Group similar tasks to maintain flow.</li>
                                        <li>Leave buffer time—life happens.</li>
                                        <li>Review & adjust at the end of the day.</li>
                                    </ul>
                                </div>
                                <div className="w-full h-32">
                                      <Image
                                            src={`/home2.jpg`}
                                            alt="Hero Image"
                                            width={500}
                                            height={400}
                                            quality={100}
                                            className="rounded-lg p-2"
                                        />

                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="flex flex-wrap items-center gap-3 mt-10">
                        <Link className="btn bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2" href={"/dashboard/pages/routine/addRoutine"}>
                            Plan Your Day Now
                        </Link>
                        <span className="text-slate-200/80 text-sm">
                            It takes 2 minutes to set up your schedule.
                        </span>
                        </div>
                    </div>
                    </div>










                    {/* // Habit Page */}

            <div className="mx-auto w-full text-white p-6 md:p-12 shadow-2xl mt-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl">
            {/* Heading */}
            <h2 className="text-2xl md:text-3xl font-bold md:mb-10 mb-4 underline text-center">
                Build Habits That Shape Your Future
            </h2>
            <p className="text-slate-200/90 mb-10 text-center max-w-3xl mx-auto">
                Small habits compound into big results. By staying consistent every day, you create
                a lifestyle that works for you, not against you.
            </p>

            {/* Alternating Layout */}
            <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
                {/* Left: Image */}
                <div className="w-full h-64">
                <Image
                    src={`/habit.jpg`}
                    alt="Healthy Habit"
                    width={500}
                    height={400}
                    quality={100}
                    className="rounded-xl shadow-lg object-cover h-full w-full"
                />
                </div>

                {/* Right: Content */}
                <div>
                <h3 className="text-xl font-semibold mb-3">Why Habits Matter</h3>
                <p className="text-slate-300 mb-4">
                    Success is built on routines, not random bursts of effort. Habits free your
                    mental energy and make progress automatic.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-slate-100/90">
                    <li>Turn goals into repeatable actions.</li>
                    <li>Reduce decision fatigue & build momentum.</li>
                    <li>Stay consistent even on low-energy days.</li>
                    <li>Create a system that keeps you accountable.</li>
                </ul>
                </div>
            </div>

            {/* Reversed Alternating Layout */}
            <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
                {/* Left: Content */}
                <div>
                <h3 className="text-xl font-semibold mb-3">Practical Habit Tips</h3>
                <p className="text-slate-300 mb-4">
                    Building habits doesn’t need motivation, it needs structure. Here’s how to
                    start:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-slate-100/90">
                    <li>Start with one habit at a time.</li>
                    <li>Attach new habits to existing routines.</li>
                    <li>Track your habits daily—visual progress motivates.</li>
                    <li>Reward yourself for staying consistent.</li>
                    <li>Focus on progress, not perfection.</li>
                </ul>
                </div>

                {/* Right: Image */}
                <div className="w-full h-64">
                <Image
                    src={`/habit1.webp`}
                    alt="Tracking Habits"
                    width={500}
                    height={400}
                    quality={100}
                    className="rounded-xl shadow-lg object-cover h-full w-full"
                />
                </div>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col items-center mt-12">
                <Link
                href={"/dashboard/pages/habit/addHabit"}
                className="btn bg-green-600 hover:bg-green-700 text-white rounded-lg px-6 py-3 text-lg shadow-lg transition"
                >
                Start Your First Habit
                </Link>
                <span className="text-slate-200/80 text-sm mt-3">
                Consistency is the bridge between goals and results.
                </span>
            </div>
            </div>



            {/* time tracker */}

            <div className="mx-auto w-full text-slate-900 p-6 md:p-12 shadow-2xl mt-10 bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-50 rounded-xl">
                    {/* Heading */}
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold md:mb-10 mb-4 text-center text-indigo-900">
                            Take Control of Your Time ⏳
                        </h2>
                        <p className="text-slate-700 mb-10 text-center max-w-3xl mx-auto">
                            Every moment counts. With smart tracking, you’ll discover where your hours
                            go, improve focus, and turn wasted time into growth.
                        </p>
                    </div>

                    {/* Alternating Layout */}
                    <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
                        {/* Left: Content */}
                        <div>
                        <h3 className="text-xl font-semibold mb-3 text-indigo-800">
                            Why Track Your Time?
                        </h3>
                        <p className="text-slate-600 mb-4">
                            Awareness is the first step to mastery. Time tracking helps you
                            understand patterns and take control of your day.
                        </p>
                        <ul className="space-y-2 text-slate-700">
                            <li className="flex items-start">
                            <span className="text-blue-600 font-bold mr-2">✔</span>
                            Eliminate distractions before they eat your day.
                            </li>
                            <li className="flex items-start">
                            <span className="text-blue-600 font-bold mr-2">✔</span>
                            See where your energy peaks and dips.
                            </li>
                            <li className="flex items-start">
                            <span className="text-blue-600 font-bold mr-2">✔</span>
                            Build a realistic schedule around your actual habits.
                            </li>
                            <li className="flex items-start">
                            <span className="text-blue-600 font-bold mr-2">✔</span>
                            Gain clarity with daily & weekly summaries.
                            </li>
                        </ul>
                        </div>

                        {/* Right: Image */}
                        <div className="w-full h-64">
                        <Image
                            src={`/tracker.jpeg`}
                            alt="Time Tracking Dashboard"
                            width={500}
                            height={400}
                            quality={100}
                            className="rounded-xl shadow-lg object-cover h-full w-full"
                        />
                        </div>
                    </div>

                    {/* Reversed Alternating Layout */}
                    <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
                        {/* Left: Image */}
                        <div className="w-full h-64">
                        <Image
                            src={`/tracker1.jpg`}
                            alt="Analyzing Time Usage"
                            width={500}
                            height={400}
                            quality={100}
                            className="rounded-xl shadow-lg object-cover h-full w-full"
                        />
                        </div>

                        {/* Right: Content */}
                        <div>
                        <h3 className="text-xl font-semibold mb-3 text-indigo-800">
                            Practical Time Tracking Tips
                        </h3>
                        <p className="text-slate-600 mb-4">
                            It’s not about micromanaging every second—it’s about building awareness
                            and flow:
                        </p>
                        <ul className="space-y-2 text-slate-700">
                            <li className="flex items-start">
                            <span className="text-blue-600 font-bold mr-2">⏱</span>
                            Track in blocks, not minutes—focus matters more.
                            </li>
                            <li className="flex items-start">
                            <span className="text-blue-600 font-bold mr-2">📊</span>
                            Review weekly charts to spot wasted hours.
                            </li>
                            <li className="flex items-start">
                            <span className="text-blue-600 font-bold mr-2">🌙</span>
                            Reflect at day’s end to plan a smarter tomorrow.
                            </li>
                            <li className="flex items-start">
                            <span className="text-blue-600 font-bold mr-2">🎯</span>
                            Balance work, rest & personal growth time.
                            </li>
                        </ul>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="flex flex-col items-center mt-12">
                        <Link
                        href={"/dashboard/pages/time/addDailyTime"}
                        className="btn bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-6 py-3 text-lg shadow-lg transition"
                        >
                        Start Tracking Time
                        </Link>
                        <span className="text-slate-600 text-sm mt-3">
                        Awareness today leads to mastery tomorrow.
                        </span>
                    </div>
                    </div>

                    {/* flow chart */}

                    <div className="mx-auto w-full text-white p-6 md:p-12 shadow-2xl mt-10 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-xl">
  {/* Heading */}
  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-teal-400">
    Your Time Insights 📊
  </h2>
  <p className="text-slate-300 mb-10 text-center max-w-3xl mx-auto">
    See the bigger picture. Understand where your hours flow, uncover
    productivity trends, and transform insights into action.
  </p>

  {/* Chart Section (Placeholder for Flow/Chart) */}
  <div className="bg-slate-800/50 rounded-xl shadow-lg p-6 mb-12">
    <h3 className="text-lg font-semibold mb-4 text-teal-300 text-center">
      Weekly Time Distribution
    </h3>
    <div className="flex justify-center items-center h-64">
      {/* Replace this with your chart library (Recharts/Chart.js etc.) */}
      <div className="text-slate-400 italic">
        <div className="w-full h-64">
                        <Image
                            src={`/time1.jpeg`}
                            alt="Time Tracking Dashboard"
                            width={500}
                            height={400}
                            quality={100}
                            className="rounded-xl shadow-lg object-cover h-full w-full"
                        />
                        </div>
      </div>
    </div>
  </div>

  {/* Insights Grid */}
  <div className="grid md:grid-cols-3 gap-6 mb-12">
    <div className="bg-gradient-to-br from-red-600 to-red-500 rounded-lg p-5 shadow-md text-center">
      <h4 className="font-bold text-xl">6.5 hrs</h4>
      <p className="text-sm text-slate-100">Average Mobile Usage</p>
    </div>
    <div className="bg-gradient-to-br from-indigo-600 to-indigo-500 rounded-lg p-5 shadow-md text-center">
      <h4 className="font-bold text-xl">3 hrs</h4>
      <p className="text-sm text-slate-100">Average Productivity Time</p>
    </div>  
    <div className="bg-gradient-to-br from-green-600 to-pink-500 rounded-lg p-5 shadow-md text-center">
      <h4 className="font-bold text-xl">1.5 hrs</h4>
      <p className="text-sm text-slate-100">Distraction Time</p>
    </div>
  </div>

  {/* Motivational Section */}
  <div className="text-center max-w-2xl mx-auto mb-12">
    <h3 className="text-xl font-semibold mb-3 text-teal-300">
      What Your Numbers Mean
    </h3>
    <p className="text-slate-300">
      You’re averaging <span className="font-bold text-teal-400">6.5 hours</span> of Mobile user daily.
      Keep refining your schedule and you’ll gain back over{" "}
      <span className="font-bold text-pink-400">200 hours</span> every month!
    </p>
  </div>

  {/* CTA */}
  <div className="flex flex-col items-center">
    <Link
      href={"/dashboard/pages/time"}
      className="btn bg-teal-600 hover:bg-teal-700 text-white rounded-lg px-6 py-3 text-lg shadow-lg transition"
    >
      Optimize Your Next Week
    </Link>
    <span className="text-slate-400 text-sm mt-3">
      Tracking is just the start—analysis leads to growth.
    </span>
  </div>
</div>



                
        </div>
  );
}
