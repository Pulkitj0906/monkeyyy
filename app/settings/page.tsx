import Bottombar from "../components/Bottombar";
import Topbar from "../components/Topbar";
import Subfooter from "../components/subfooter";
import LeaderBoardModal from "../modals/LeaderBoardModal";

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
          Settings
          <div className="w-full space-y-2">
            <Subfooter/>
            <Bottombar />
          </div>
        </div>
      </div>
      <LeaderBoardModal/>
    </>
  );
};

export default page;
