'use client'
import { FaGlobeAmericas } from "react-icons/fa";


import Item from "./Item";
import Subfooter from "./subfooter";
import Typer from "./Typer";
import Test from "../hooks/useTest";
import Timer from "./Timer";
import ResultPage from "../hooks/useShowResult";
import Result from "./Result";


const Body = () => {
  const TestCtrl = Test();
  const showResult = ResultPage()

  return (
    <div className="h-full w-full flex flex-col">
      <div className=" h-full w-full flex flex-col ">
      <Timer />
      {showResult.isShow ? <Result/> : <Typer />}
      </div>
      {!TestCtrl.hasStarted && <Subfooter />}
    </div>
  )
};

export default Body;
