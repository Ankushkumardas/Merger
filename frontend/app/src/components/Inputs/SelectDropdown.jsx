import React, { useState } from 'react';
import { LuChevronDown } from 'react-icons/lu';

const SelectDropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <button
        className="w-full flex justify-between items-center border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value ? 
          options.find((opt) => opt.value === value)?.label: placeholder}
          <span>
          {isOpen? 
            <LuChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />:<LuChevronDown/>}
          </span>
        
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer ${
                value === option.value ? 'bg-gray-100 font-semibold' : ''
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;