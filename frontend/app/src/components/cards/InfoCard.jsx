import React from 'react';

const InfoCard = ({ icon, label, value, bgcolor, textcolor }) => {
  return (
    <div className="flex items-center gap-3 bg-white rounded-md border border-slate-200 p-4">
      <div className={`w-2 h-2 md:w-2 md:h-2 flex items-center justify-center rounded-full ${bgcolor} ${textcolor}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs md:text-sm text-gray-500">{label}</p>
        <span className="text-sm md:text-xl font-semibold text-black">{value}</span>
      </div>
    </div>
  );
};

export default InfoCard;
