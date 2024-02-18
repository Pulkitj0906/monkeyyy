const Subfooter = () => {
  return (
    <footer className="self-end flex flex-col gap-2 items-center w-full text-sm pb-5 whitespace-break-spaces">
      <p className="text-text-color text-[10px]">
        <span className="bg-text-color whitespace-pre-wrap px-2 rounded-md text-this-grey mr-1 ">
          tab
        </span>
        - restart test
      </p>
      {/* <p className="text-text-color text-[10px]">
        <span className="bg-text-color  px-2 rounded-md text-this-grey mr-2">
          esc
        </span>
        or
        <span className="bg-text-color  px-2 rounded-md text-this-grey mx-2">
          ctrl
        </span>
        +
        <span className="bg-text-color  px-2 rounded-md text-this-grey mx-2">
          shift
        </span>
        +
        <span className="bg-text-color px-2 rounded-md text-this-grey mx-2">
          p
        </span>
        - command line
      </p> */}
    </footer>
  );
};

export default Subfooter;
