"use client";
import { FaChevronRight, FaGlobeAmericas } from "react-icons/fa";

import Item from "./Item";
import Subfooter from "./subfooter";
import Typer from "../Typer";
import Test from "../hooks/useTest";
import Timer from "./Timer";
import ResultPage from "../hooks/useShowResult";
import Result from "./Result";
import ResultElements from "./ResultElements";

const Body = () => {
  const TestCtrl = Test();
  const showResult = ResultPage();

  if (showResult.isShow === true) {
    return (
      <div className="h-full w-full  flex flex-col gap-3">
        <div className="grow flex flex-col items-center">
          <div className="flex  mt-20">
            <div className="flex flex-col gap-2">
              <ResultElements title="wpm" label="29" />
              <ResultElements title="acc" label="29%" />
            </div>
            <div className="">
              <img src="/screenshot.png" alt="" />
            </div>
          </div>
          <div className="flex w-full justify-between flex-wrap gap-5">
            <ResultElements title="testype" label="time hindi 15" small />
            <ResultElements title="other" label="invalid(accuracy)" small />
            <ResultElements title="raw" label="59" small />
            <ResultElements title="characters" label="0/12/34/12" small />
            <ResultElements title="consistency" label="40%" small />
            <ResultElements title="tiems" label="15sec" small />
          </div>
          <div className="flex mt-4 text-text-color">
            <a href="/">
              <FaChevronRight size={24} />
            </a>
          </div>
        </div>
        <Subfooter />
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col">
      <div className=" h-full w-full flex flex-col">
        <Timer />
        <Typer />
      </div>
      {!TestCtrl.hasStarted && <Subfooter />}
    </div>
  );
};

export default Body;
