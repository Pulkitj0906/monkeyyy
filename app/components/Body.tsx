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
import TypingSpeed from "../hooks/useWpm";
import TimeLimit from "../hooks/useTimer";

const Body = () => {
  const TestCtrl = Test();
  const showResult = ResultPage();
  const Wpm = TypingSpeed()
  const Time=TimeLimit()

  if (showResult.isShow === true) {
    return (
      <div className="h-full w-full  flex flex-col gap-3">
        <div className="grow flex flex-col items-center">
          <div className="flex  mt-20">
            <div className="flex flex-col gap-2">
              <ResultElements title="wpm" label={((Wpm.NoOfWords)/(Time.seconds)*60).toString()} />
              <ResultElements title="acc" label={((Wpm.accuracy).toFixed(0))+'%'} />
            </div>
            <div className="">
              <img src="/screenshot.png" alt="" />
            </div>
          </div>
          <div className="flex w-full justify-between flex-wrap gap-5">
            <ResultElements title="test type" label={<><span>time 15</span><br />hindi</>} small medium />
            <ResultElements title="raw" label={((Wpm.NoOfChars)/(Time.seconds)*60).toString()} small />
            <ResultElements title="characters" label="0/12/34/12" small />
            <ResultElements title="consistency" label="40%" small />
            <ResultElements title="time" label={(Time.seconds).toString()} small />
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
