import React, { useRef, useState, useEffect } from 'react';
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

function ProfilephotoSelector({ image, setimage }) {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // ✅ Corrected from file[0] to files[0]
    if (file) {
      setimage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setimage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  // Clean up preview URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="flex flex-col items-center gap-2">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="flex flex-col items-center gap-2">
          <LuUser className="text-5xl text-gray-400" />
          <button
            type="button"
            className="px-4 py-2 rounded-full bg-blue-500 text-white flex items-center gap-2"
            onClick={onChooseFile}
          >
            <LuUpload /> Upload Photo
          </button>
        </div>
      ) : (
        <div className="relative flex flex-col items-center gap-2">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-24 h-24 object-cover rounded-full border"
          />
          <button
            onClick={handleRemoveImage}
            className="h-8 w-8 flex items-center justify-center bg-red-500 text-white rounded-full"
            title="Remove"
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilephotoSelector;
