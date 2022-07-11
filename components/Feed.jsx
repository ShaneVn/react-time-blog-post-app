import { SparklesIcon } from "@heroicons/react/outline";
import React from "react";
import Input from "./Input"

function Feed() {
  return (
    <div className="border-l border-r sm:ml-[73px] lg:ml-[370px] border-gray-700 flex-grow max-w-2xl">
      <div
        className="border-b flex sm:justify-between items-center text-[#d9d9d9]
    py-3 px-3 sticky top-0 z-50"
      >
        <h1 className="  font-bold text-lg sm:text-xl">Home</h1>

        <SparklesIcon className="h-5 text-white" />
      </div>

      <Input/>
    </div>
  );
}

export default Feed;
