import React from "react";
import { FaCrown } from "react-icons/fa";

interface LeaderBoardItemsProps {
  id: number;
  name: string;
  wpm: number;
  accuracy: number;
}

const LeaderBoardItems: React.FC<LeaderBoardItemsProps> = ({
  id,
  accuracy,
  name,
  wpm,
}) => {
  return (
    <div className={`flex justify-between ${id % 2 !== 0 && "bg-sub-alt"} px-2 py-1`}>
      <div className="flex items-center gap-5">
        {id === 1 ? <FaCrown size={16} /> : <p className="ml-2">{id}</p>}
        <p>{name}</p>
      </div>
      <div className="flex flex-col items-end">
        <p>{wpm}</p>
        <p className="text-text-color">{accuracy}%</p>
      </div>
    </div>
  );
};

export default LeaderBoardItems;
