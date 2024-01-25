import { Bs0Square, BsBellFill, BsChatDots, BsHouseFill } from "react-icons/bs";
import { BsDot } from "react-icons/bs";
import {
  FaAt,
  FaBell,
  FaBookmark,
  FaClock,
  FaCrown,
  FaFont,
  FaHashtag,
  FaInfo,
  FaKeyboard,
  FaMountain,
  FaQuoteLeft,
  FaRegKeyboard,
  FaRegUser,
  FaTools,
  FaUser,
  FaWrench,
} from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { SiMonkeytype } from "react-icons/si";
import ControlBarItem from "./Item";
import { FaA } from "react-icons/fa6";
import { AiFillTool } from "react-icons/ai";
import { FiTool } from "react-icons/fi";
import Item from "./Item";
import Test from "../hooks/useTest";
import TimeLimit from "../hooks/useTimer";

const Controlbar = () => {
  const {seconds, setSeconds} = TimeLimit();
  const items1 = [
    {
      label: "punctuation",
      href: "/",
      icon: FaAt,
      size: 12,
    },
    {
      label: "numbers",
      href: "/notifications",
      icon: FaHashtag,
      auth: true,
      size: 12,
    },
  ];
  const items2 = [
    {
      label: "time",
      href: "/",
      icon: FaClock,
      size: 12,
    },
    {
      label: "words",
      href: "/notifications",
      icon: FaFont,
      auth: true,
      size: 12,
    },
    {
      label: "quote",
      href: "/bookmarks",
      icon: FaQuoteLeft,
      auth: true,
      size: 12,
    },
    {
      label: "zen",
      icon: FaMountain,
      href: "/profile",
      auth: true,
      size: 14,
    },
    {
      label: "custom",
      icon: FaWrench,
      href: "/profile",
      auth: true,
      size: 14,
    },
  ];
  const items3 = [
    {
      label: "15",
      href: "/",
      size: 12,
    },
    {
      label: "30",
      href: "/notifications",
      auth: true,
      size: 12,
    },
    {
      label: "60",
      href: "/bookmarks",
      auth: true,
      size: 20,
    },
    {
      label: "120",
      onclick: () => (
        setSeconds(120),

        console.log(seconds)
      ),
      href: "/profile",
      auth: true,
      size: 20,
    },
    {
      icon: FaTools,
      href: "/profile",
      auth: true,
      size: 13,
    },
  ];
  const TestCtrl = Test();
  return (
    <>
      {/* <div className=""> */}
      <div
        className={`flex ${
          TestCtrl.hasStarted && `opacity-0`
        } justify-between md:w-4/5 lg:w-3/5 mt-5 flex-col p-2 md:flex-row w-11/12 bg-sub-alt rounded-lg`}
      >
        <div className="flex flex-row items-center justify-center">
          {items1.map((item) => (
            <Item
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              auth={item.auth}
              size={item.size}
            />
          ))}
        </div>
        <div className="h-6 w-1 self-center bg-text-color/20 rounded-lg md:block hidden"></div>
        <div className="flex flex-row items-center justify-center">
          {items2.map((item) => (
            <Item
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              auth={item.auth}
              size={item.size}
            />
          ))}
        </div>
        <div className="h-6 w-1 self-center bg-text-color/20 rounded-lg md:block hidden"></div>
        <div className="flex flex-row items-center justify-center">
          {items3.map((item) => (
            <Item
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              auth={item.auth}
              size={item.size}
              onClick={item.onclick}
            />
          ))}
        </div>
        </div>
      {/* </div> */}
    </>
  );
};

export default Controlbar;
