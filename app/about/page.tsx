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
          <div
            className="
                flex
                flex-col
                text-center
                text-text-color
                text-lg
            "
          >
            <p>
              Created with love by{" "}
              <span className="text-this-yellow">Pulkit</span> and{" "}
              <span className="text-this-yellow">Farzad</span>
            </p>
            <p className="">
              Inspired from <span> </span>
              <a
                className="underline decoration-this-yellow underline-offset-4"
                href="https://monkeytype.com/"
              >
                MonkeyType
              </a>
            </p>
            <p>Launched on 14th of Feb, 2024.</p>
          </div>
          <div className="w-full space-y-2">
            <Subfooter />
            <Bottombar />
          </div>
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
