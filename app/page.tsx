"use client";
import Image from "next/image";
import Topbar from "./components/Topbar";
import Bottombar from "./components/Bottombar";
import Body from "./components/Body";
import ControlBar from "./components/Controlbar";
import Test from "./hooks/useTest";
import LanguageModal from "./components/modals/LanguageModal";
import ResultPage from "./hooks/useShowResult";

export default function Home() {
  const TestCtrl = Test();
  const Result = ResultPage();
  return (
    <>
      <div className="flex justify-center items-center">
        <div
          className="
        flex
        flex-col
        h-screen
        w-screen
        items-center
        p-2
        xl:w-4/5
        md:p-6
        md:pt-2
        "
        >
          <Topbar />
          {!Result.isShow && (
            <div className="w-full flex items-center justify-center h-20">
              {!TestCtrl.hasStarted && <ControlBar />}
            </div>
          )}
          <div className="flex-grow w-full">
            <Body />
          </div>
          {!TestCtrl.hasStarted && <Bottombar />}
        </div>
      </div>
      <LanguageModal />
    </>
  );
}
