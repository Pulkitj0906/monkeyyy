import { FaGlobeAmericas } from "react-icons/fa";
import Item from "./Item";
import Subfooter from "./subfooter";
import Typer from "./Typer";


const Body = () => {
  return (
    <div className="h-full w-full flex flex-col">
      <div className=" h-full w-full flex flex-col ">
        <div className="self-center mt-40 mb-2 items-center flex group hover:cursor-pointer">
          <FaGlobeAmericas className="text-text-color group-hover:text-this-white" />
          <p className="pl-2 text-text-color group-hover:text-this-white text-m">english</p>
        </div>
      <Typer />
      </div>
      <Subfooter />
    </div>
  )
};

export default Body;
