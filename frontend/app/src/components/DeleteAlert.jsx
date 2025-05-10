import React from 'react'

function DeleteAlert({content,onDelete}) {
  return (
    <div className=' flex gap-2 items-center'>
      <p>{content}</p>
      <button onClick={onDelete} className=' bg-red-100 text-red-500 px-2 py-1 rounded-md'>Delete Task</button>
    </div>
  )
}

export default DeleteAlert
