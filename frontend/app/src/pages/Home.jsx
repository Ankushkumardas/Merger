import React from 'react'

function Home() {
  return (
    <div className='min-h-screen bg-neutral-200'>
      <div className='mx-auto'>
        {/* navbar */}
        <div className=' pt-2 flex justify-between px-10 ' >
          <h1>Merger.</h1>
          <div className=' flex gap-2 '>

            <button className=' px-2 py-1 rounded-md border border-slate-300'>LogIn</button>
            <button className=' px-2 py-1 rounded-md border border-slate-300'>SignUp</button>
          </div>
        </div>
        <div className=' flex justify-center bg-white mx-auto md:w-2/6 sm:w-1/2 w-1/4'>
          HomePage
        </div>
      </div>
    </div>
  )
}

export default Home
