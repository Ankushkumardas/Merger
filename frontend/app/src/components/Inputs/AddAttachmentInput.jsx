import React, { useState } from 'react'
import { HiOutlineTrash } from 'react-icons/hi';
import { LuPaperclip } from 'react-icons/lu';

function AddAttachmentInput({attachments,setattachments}) {

     const [option, setOption] = useState('');
    
      const handleAddOption = () => {
        if ( option.trim()) {
          setattachments([...attachments, option.trim()]);
          setOption('');
        }
      };
    
      const handleDeleteOption = (index) => {
        const updatedArr = attachments.filter((_, idx) => idx !== index);
        setattachments(updatedArr);
      };
  return (
    <div>
      {attachments.map((item, index) => (
        <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200">
          <div className='flex gap-2'>
            <p>{item}</p>
          </div>
          <button onClick={() => handleDeleteOption(index)}>
            <HiOutlineTrash />
          </button>
        </div>
      ))}

      <div className="flex items-center space-x-2 mt-2">
        <input
          type="text"
          className="shadow-sm block w-full border border-gray-200 rounded-md px-2 py-1 outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter attachment URL or name"
          value={option} 
          onChange={({ target }) => setOption(target.value)} 
        />
        <button
          type="button"
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleAddOption}
        >
          <LuPaperclip className="h-5 w-5" /> Add
        </button>
      </div>
    </div>
  )
}

export default AddAttachmentInput
