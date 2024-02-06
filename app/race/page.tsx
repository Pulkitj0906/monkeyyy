import Typer from "../Typer";
import Bottombar from "../components/Bottombar";
import Topbar from "../components/Topbar";
import LanguageModal from "../components/modals/LanguageModal";
import Subfooter from "../components/subfooter";
import LeaderBoardModal from "../modals/LeaderBoardModal";
import NotificationBoardModal from "../modals/NotifcationModal";
import SupportModal from "../modals/SupportModal";
import Race from "./components/Race";
import RaceTyper from "./components/RaceTyper";

const page = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <div
          className="
        flex
        flex-col
        justify-between
        h-screen
        w-screen
        items-center
        p-2
        xl:w-4/5
        md:p-6
        md:pt-2
        overflow-hidden
        "
        >
          <Topbar />
          <Race />
          <RaceTyper />
          <Bottombar />
        </div>
        <LanguageModal />
        <LeaderBoardModal />
        <NotificationBoardModal />
        <SupportModal />
      </div>
    </>
  );
};

export default page;
