"use client";
import Topbar from "./_components/Topbar";
import Bottombar from "./_components/Bottombar";
import Body from "./_components/Body";
import ControlBar from "./_components/Controlbar";
import Test from "./_hooks/useTest";
import LanguageModal from "./_modals/LanguageModal";
import ResultPage from "./_hooks/useShowResult";
import LeaderBoardModal from "./_modals/LeaderBoardModal";
import NotificationBoardModal from "./_modals/NotifcationModal";
import SupportModal from "./_modals/SupportModal";

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
      <LeaderBoardModal />
      <NotificationBoardModal />
      <SupportModal />
    </>
  );
}
