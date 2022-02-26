import React from "react";
import {Goals}from '../../../data'
const GoalsPage = () => {

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl howuse2 mb-10">
          UN Goals Goals Met
        </h2>

        <hr/>
        <div className="mt-6 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-8">
           {Goals.map((item,index)=>{
             return(
          <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50" key={index}>
              <img
              className="max-h-12"
              key={index}
              src={item.src}
              alt={item.alt}
            />
          </div>
             )
           })}
        </div>
      </div>
    </div>
  );
};

export default GoalsPage;
