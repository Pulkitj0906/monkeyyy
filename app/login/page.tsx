import Body from "./components/Body";
import Bottombar from "../_components/Bottombar";
import Topbar from "../_components/Topbar";
import Subfooter from "../_components/subfooter";
import LeaderBoardModal from "../_modals/LeaderBoardModal";
import SupportModal from "../_modals/SupportModal";
import LanguageModal from "../_modals/LanguageModal";
import NotificationBoardModal from "../_modals/NotifcationModal";

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
        "
        >
          
          <Topbar />
          <Body/>
          <div className="w-full space-y-2">
            <Bottombar />
          </div>
        </div>
      </div>
      <LanguageModal />
      <LeaderBoardModal />
      <NotificationBoardModal />
      <SupportModal/>
    </>
  );
};

export default page;
