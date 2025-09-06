import React from 'react';
import { UserCircle2 } from 'lucide-react';

const InstructorCard = ({ instructor }) => {
  return (
    <div className="bg-white w-[280px] h-[360px] rounded-xl shadow-md p-6 text-center border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
      
      <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 overflow-hidden ring-1 ring-gray-200 mb-4">
        {instructor.image ? (
          <img
            src={instructor.image}
            alt={instructor.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <UserCircle2 size={60} className="text-gray-400" />
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 justify-center gap-3">
        <div>
          <h3 className="text-lg font-semibold text-[#0c2247] mb-1 min-h-[36px] leading-snug">
            {instructor.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2 min-h-[40px]">{instructor.position}</p>
        </div>

        <div className="mt-2">
          <p className="text-sm text-indigo-600 font-semibold">
            IELTS Overall: <span className="text-lg font-bold">{instructor.overall}</span>
          </p>
          <p className="text-sm text-gray-700 mt-1 min-h-[40px]">
            Bằng cấp: <span className="font-medium">{instructor.degree}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;
