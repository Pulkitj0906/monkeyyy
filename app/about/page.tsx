import Bottombar from "../components/Bottombar";
import Topbar from "../components/Topbar";
import Subfooter from "../components/subfooter";

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
            <p>Created with love by <span className="text-this-yellow">Pulkit</span> and <span className="text-this-yellow">Farzad</span></p>
            <p className="">Inspired from <span> </span> 
              <a className="underline decoration-this-yellow underline-offset-4" href="https://monkeytype.com/">MonkeyType</a>
            </p>
            <p>Launched on 1st of Feb, 2024.</p>
          </div>
          <div className="w-full space-y-2">
            <Subfooter />
            <Bottombar />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
