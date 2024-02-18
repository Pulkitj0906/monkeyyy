"use client";
import Subfooter from "./subfooter";
import Typer from "./Typer";
import Test from "../_hooks/useTest";
import Timer from "./Timer";
import ResultPage from "../_hooks/useShowResult";
import Result from "./Result";

const Body = () => {
  const TestCtrl = Test();
  const showResult = ResultPage();

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
