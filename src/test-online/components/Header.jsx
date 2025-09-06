import React from "react";

const Header = ({ title, durationMinutes }) => {
  return (
    <header className="bg-indigo-600 text-white py-4 shadow-md fixed w-full top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">{title}</h1>
        <span className="text-sm font-medium">Thời gian: {durationMinutes} phút</span>
      </div>
    </header>
  );
};

export default Header;
