import Bottombar from "../_components/Bottombar";
import Topbar from "../_components/Topbar";
import LanguageModal from "../_modals/LanguageModal";
import Subfooter from "../_components/subfooter";
import LeaderBoardModal from "../_modals/LeaderBoardModal";
import NotificationBoardModal from "../_modals/NotifcationModal";
import SupportModal from "../_modals/SupportModal";

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
          <div className="flex h-full w-full justify-center items-center bg-black/70 rounded-md my-2">
          <p className="text-this-white animate-bounce">Beta Access Only! Coming soon...</p>
        </div>
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
