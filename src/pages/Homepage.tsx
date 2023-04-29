import React from 'react';
import Sidebar from '../component/Sidebar';

const Homepage: React.FC = () => {
  return (
    <div className="container w-full flex flex-col  justify-center items-center mx-auto max-w-none">
      {/* <h1 className="text-3xl font-bold text-emerald-600  bg-lime-500 w-full p-4 text-center">
        Home Page
      </h1> */}
      <div className="w-full h-full flex">
        <h1 className="text-3xl font-bold text-orange-300 w-full h-full flex justify-center">
          Welcome to Taiyo.ai.
        </h1>
      </div>
    </div>
  );
};

export default Homepage;
