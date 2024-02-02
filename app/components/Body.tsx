"use client";

import Subfooter from "./subfooter";
import Typer from "../Typer";
import Test from "../hooks/useTest";
import Timer from "./Timer";
import ResultPage from "../hooks/useShowResult";
import TypingSpeed from "../hooks/useWpm";
import TimeLimit from "../hooks/useTimer";
import useMode from "../hooks/useMode";
import useLangModal from "../hooks/useLangModal";
import Result from "./Result";

const Body = () => {
  const TestCtrl = Test();
  const showResult = ResultPage();
  const Wpm = TypingSpeed()
  const Time=TimeLimit()
  const Mode = useMode()
  const Lang = useLangModal()

  if (showResult.isShow === true) {
    return (
      <Result/>
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
