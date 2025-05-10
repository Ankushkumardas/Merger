import React from 'react'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { RiAttachment2 } from "react-icons/ri";
import merger from '../assets/screenshot.png';
import admin from '../assets/admin-dashboard.png';
import member from '../assets/mytasks.png';
import ak from '../assets/updatetask.png';
import { LuLinkedin } from "react-icons/lu";
import { LuGithub } from "react-icons/lu";
import { LuMail } from "react-icons/lu";

function Home() {
  return (
    <div className='min-h-screen bg-neutral-100 pb-20'>
      <div className='mx-auto'>
        {/* navbar */}
        <div className=' pt-4 flex justify-between px-10 items-center' >
          <div className=' flex items-center gap-1'>

            <h1 className=' text-lg flex items-center justify-center gap-1'>
              <RiAttachment2 size={20} />
              Merger.</h1>
          </div>

          <div className=' flex gap-2 '>

            <button className=' px-2 py-1 rounded-md border border-slate-300'>
              <Link to="/login">
                LogIn
              </Link>
            </button>
            <button className=' px-2 py-1 rounded-md border border-slate-300'>
              <Link to="/signup">
                SignUp
              </Link>
            </button>
          </div>
        </div>

        <div className=' flex justify-center  mx-auto w-1/2 md:w-6/9 md:mt-30 mt-30'>
          <div
            className='flex flex-col justify-center items-center 
             [animation:slide-up_0.6s_ease-out_forwards] opacity-0'>
            <h1 className='flex gap-1 text-3xl justify-center items-center text-center [animation:slide-up_0.6s_ease-out_forwards] opacity-0'>
              <RiAttachment2 size={25} /> Merger Collaborative Tool Simplify teamwork.
            </h1>

            <h1 className='md:w-5/8 text-md text-center tracking-tighter mt-3 text-slate-600 [animation:slide-up_0.6s_ease-out_forwards] opacity-0'>
              Transform how you manage work with a smart collaborative task platform built to streamline workflows, align teams, amplify tasks and drive results with clarity.
            </h1>

            <div className='mt-4 flex gap-3'>
              <button className="border border-blue-300 px-3 py-1 rounded-lg text-blue-600 bg-blue-100 hover:bg-blue-200 transition duration-300 ease-in-out">
                <Link to="/" className="flex gap-1 items-center">
                  Learn More.
                </Link>
              </button>
              <button className="border border-green-300 px-3 py-1 rounded-lg text-green-600 bg-green-100 hover:bg-green-200 transition duration-300 ease-in-out">
                <Link to="/signup" className="flex gap-1 items-center">
                  Join Merger
                </Link>
              </button>
            </div>
          </div>

        </div>

        <div className='mx-auto flex justify-center items-center mt-30 [animation:slide-up_0.6s_ease-out_forwards] opacity-0'>
          <img src={merger} alt="" className='w-1/1 max-w-4xl object-contain border sm:min-w-2xl border-slate-300 rounded-lg p-2' />
        </div>


        <div className='mx-auto flex justify-center items-center mt-30 [animation:slide-up_0.6s_ease-out_forwards] opacity-0 '>
          <h1 className='md:w-5/8 text-lg text-center tracking-tighter mt-3 text-slate-600 [animation:slide-up_0.6s_ease-out_forwards] opacity-0'>
            The power of 'we' in every deal. Our tool empowers collaborative mergers that drive lasting value.Navigate complexity, conquer the chaos. Your central hub for a streamlined merger process.
          </h1>
        </div>


        <div className='mx-auto flex justify-center items-center mt-10 [animation:slide-up_0.6s_ease-out_forwards] opacity-0 flex-col gap-6'>

          <div className=' flex gap-6'>
            <img src={admin} alt="" className='w-1/1 max-w-xl object-contain border sm:min-w-lg border-slate-300 rounded-lg p-2' />
            <img src={member} alt="" className='w-1/1 max-w-xl object-contain border sm:min-w-lg border-slate-300 rounded-lg p-2' />
          </div>

          <img src={ak} alt="" className='w-1/1 max-w-xl object-contain border sm:min-w-lg border-slate-300 rounded-lg p-2' />

        </div>


      </div>

      <div className=' footer mt-10'>
         <footer className="mt-10 bg-neutral-100 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-600 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Left Side */}
        <div className="text-center md:text-left">
          <p>© {new Date().getFullYear()} TaskFlow. All rights reserved.</p>
          <p className="text-xs text-gray-400">Built with 💻 by Ankush Kumar Das</p>
        </div>

        {/* Right Side */}
        <div className="flex gap-4 text-gray-500">
          <a href="mailto:ankush@example.com" className="hover:text-blue-500" title="Email">
            <LuMail size={18} />
          </a>
          <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer" className="hover:text-black" title="GitHub">
            <LuGithub size={18} />
          </a>
          <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600" title="LinkedIn">
            <LuLinkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
      </div>
    </div>
  )
}

export default Home
