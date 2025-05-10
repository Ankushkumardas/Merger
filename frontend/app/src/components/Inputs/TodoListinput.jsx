
import React, { useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import { HiMiniPlus } from "react-icons/hi2";

function TodoListinput({ todolist, setTodolist }) {
  const [option, setOption] = useState('');

  // Function to handle adding an option
  const handleAddOption = () => {
    if ( option.trim()) {
      setTodolist([...todolist, option.trim()]);
      setOption('');
    }
  };

  // Function to handle deleting an option
  const handleDeleteOption = (index) => {
    const updatedArr = todolist.filter((_, idx) => idx !== index);
    setTodolist(updatedArr);
  };

  return (
    <div>
      {todolist.map((item, index) => (
        <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200">
          <p className=' text-sm'>
            <span className=' text-slate-400'>
              {index < 9 ? `0${index + 1}` : index + 1}
            </span>{" "}
            {item}
          </p>

          <button onClick={() => handleDeleteOption(index)}>
            <HiOutlineTrash className='text-red-500' />
          </button>
        </div>
      ))}

      <div className="flex items-center space-x-2 mt-4"> {/* Added a container for the input and add button */}
        <input
          type="text"
          placeholder='task to be added'
          value={option}
          onChange={({ target }) => setOption(target.value)}
          className='shadow-sm border border-slate-200 block w-full sm:text-sm rounded-md px-2.5 py-1 outline-0' // Added some basic styling
        />
        <button
          onClick={handleAddOption}
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none " // Added some basic styling
        >
          <HiMiniPlus /> AddTask
        </button>
      </div>
    </div>
  );
}

export default TodoListinput;