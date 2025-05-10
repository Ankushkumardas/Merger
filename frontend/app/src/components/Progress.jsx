import React from 'react'

function Progress({progress,status}) {
    const getColor = () => {
        switch (status) {
            case "In Progress": return "text-slate-400 bg-cyan-50 border border-salte-200 ";
            case "Completed": return "text-slate-400 bg-cyan-50 border border-salte-200 ";
            default: return "text-slate-400 bg-cyan-50 border border-salte-200 ";
        }
    };
  return (
    <div className=' w-full rounded-full bg-white h-2'>
      <div className={`${getColor()} h-2 rounded-full text-center text-sm `} style={{width:`${progress}%`}}></div>
    </div>
  )
}

export default Progress
