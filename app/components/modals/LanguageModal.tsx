import useLangModal from "@/app/hooks/useLangModal";
import React, { useState } from "react";
import { FaCheck, FaSearch } from "react-icons/fa";

const LanguageModal = () => {
  const LangList = ["hinglish", "english", "spanish"];
  const [filterTxt, setFilterTxt] = useState("");

  const filterList = LangList.filter((lang) => lang.includes(filterTxt));
  const LangModal = useLangModal();

  const handleOnClick = (language: string) => {
    LangModal.setLang(language);
    LangModal.onClose();
  };
  if (!LangModal.isOpen) {
    return null;
  }
  return (
    <div
      onClick={LangModal.onClose}
      className="bg-black/80 absolute top-0 h-full w-full flex justify-center "
    >
      <div className="text-text-color mt-20 bg-background-color h-min w-1/3 rounded-xl">
        <div className="flex items-center gap-3 p-3 ">
          <FaSearch />
          <input
            autoFocus
            placeholder="Type to Search"
            onChange={(e) => setFilterTxt(e.target.value)}
            value={filterTxt}
            type="text"
            className="text-this-white placeholder:text-text-color text-lg bg-transparent outline-none w-full caret-this-yellow"
          />
        </div>
        {filterList.map((language, idx) => (
          <div
            key={idx}
            onClick={() => handleOnClick(language)}
            className="
            flex
            hover:bg-this-white
            text-text-color
            p-1
            items-center
            cursor-pointer
            default:hover:bg-this-white
            "
          >
            <div className="w-8 flex justify-end p-2">
              {LangModal.lang === language && (
                <FaCheck size={15} className="" />
              )}
            </div>
            {language}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageModal;
