import React, { useState } from "react";
import { FaCheck, FaSearch } from "react-icons/fa";

const LanguageModal = () => {
  const LangList = ["hindi", "english", "spanish"];
  const [filterTxt, setFilterTxt] = useState('');
  const filterList = LangList.filter((lang) => lang.includes(filterTxt))
  console.log(filterList)
  return (
    <div className="bg-black/80 absolute top-0 h-full w-full flex justify-center ">
      <div className="text-white mt-20 bg-this-grey h-min w-1/3 rounded-xl">
        <div className="flex items-center gap-3 p-3 ">
          <FaSearch />
          <input
            autoFocus
            placeholder="Type to Search"
            onChange={e => setFilterTxt(e.target.value)}
            value={filterTxt}
            type="text"
            className="text-black bg-transparent outline-none w-full caret-yellow-400"
          />
        </div>
        {filterList.map((language, idx) => (
          <div
            key={idx}
            className="
            flex
            hover:bg-text-color
            text-white
            p-1
            items-center
            "
          >
            <div className="p-2 pl-4"> 
              <FaCheck size={10} className="" />
            </div>
            {language}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageModal;
