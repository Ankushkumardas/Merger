import { GrAttachment } from "react-icons/gr";

function Attachment({link,onClick,key}){
    return (
      <div onClick={onClick} className=' flex w-full justify-between bg-gray-200/70 px-2 py-1 items-center rounded-md cursor-pointer'>
          <div className=' flex cursor-pointer'>
              <p > <span className='text-slate-500   cursor-pointer'>{link}</span> </p>
          </div>
          <GrAttachment size={16}/>
      </div>
    )
  };
  
  export default Attachment