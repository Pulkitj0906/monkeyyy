import Bottombar from "../_components/Bottombar";
import Topbar from "../_components/Topbar";
import FinishModal from "../_modals/FinishModal";
import JoinJungleModal from "../_modals/JoinJungleModal";
import LeaderBoardModal from "../_modals/LeaderBoardModal";
import NotificationBoardModal from "../_modals/NotifcationModal";
import SupportModal from "../_modals/SupportModal";
import Race from "./_components/Race";
import RaceTyper from "./_components/RaceTyper";

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
          <JoinJungleModal/>
          <Topbar />
          <Race />
          <RaceTyper />
          <Bottombar />
        </div>
        <LeaderBoardModal />
        <NotificationBoardModal />
        <SupportModal />
        <FinishModal/>
      </div>
    </>
  );
};

export default page;
