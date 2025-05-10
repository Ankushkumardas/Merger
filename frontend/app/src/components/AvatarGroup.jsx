import React from 'react'

function AvatarGroup({avatars,maxVisible}) {
  return (
    <div className="flex items-center">
      {avatars.slice(0, maxVisible).map((avatar, index) => (
        <img
          key={index}
          src={avatar}
          alt={`Avatar ${index}`}
          className={`w-9 h-9 rounded-full border-2 border-white ${index > 0 ? '-ml-3' : 'ml-0'} first:ml-0`}
        />
      ))}
      {avatars.length > maxVisible && (
        <div className="w-9 h-9 rounded-full border-2 border-white -ml-3 flex items-center justify-center bg-gray-200 text-gray-500 text-xs font-semibold">
          +{avatars.length - maxVisible}
        </div>
      )}
    </div>
  )
}

export default AvatarGroup
