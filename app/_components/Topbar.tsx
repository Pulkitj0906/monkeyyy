"use client";
import {
  FaBell,
  FaCrown,
  FaInfo,
  FaKeyboard,
  FaRegUser,
} from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { BsKeyboard } from "react-icons/bs";
import Item from "./Item";
import useLeaderModal from "../_hooks/useLeaderModal";
import useNotificationModal from "../_hooks/useNotificationModal";
import { GiRaceCar } from "react-icons/gi";
import { SiSurveymonkey } from "react-icons/si";

const Topbar = () => {
  const LeaderModal = useLeaderModal();
  const NotiModal = useNotificationModal();
  const items = [
    {
      href: "/",
      icon: FaKeyboard,
      size: 17,
    },
    {
      onclick: LeaderModal.OnOpen,
      icon: FaCrown,
      size: 20,
    },
    {
      href: "/about",
      icon: FaInfo,
      size: 17,
    },
    { 
      href: "/settings",
      icon: IoMdSettings,
      size: 18,
    },
    {
      href: "/race",
      icon: GiRaceCar,
      size: 30,
    },
  ];
  const items2 = [
    {
      icon: FaBell,
      onclick: NotiModal.OnOpen,
      size: 16,
    },
    {
      href: "/login",
      icon: FaRegUser,
      size: 16,
    },
  ];
  return (
    <div className="flex justify-between w-full p-1 pt-6">
      <div className="flex w-2/3 ">
        <div  className="relative w-14">
        <BsKeyboard size={40} className="text-this-yellow mx-2 mr-4 absolute" />
        <SiSurveymonkey size={25} className="text-this-yellow mx-2 mr-4 absolute -top-3 left-2" />
        </div>
        <div className="gap-0 relative h-8 w-48 md:block hidden ">
          <p className="ml-3 text-text-color group-hover:text-this-white text-[0.45rem] md:block hidden">
            ping pong <br />
          </p>
            <span className="text-3xl text-this-white absolute top-0 font-[500] ">
              keynkong
            </span>
        </div>
        {items.map((item, idx) => (
          <Item
            topbar={true}
            key={idx}
            href={item.href}
            icon={item.icon}
            size={item.size}
            onClick={item.onclick}
          />
        ))}
      </div>
      <div className=" flex flex-row ">
        {items2.map((item, idx) => (
          <Item
            topbar={true}
            key={idx}
            href={item.href}
            icon={item.icon}
            size={item.size}
            onClick={item.onclick}
          />
        ))}
      </div>
    </div>
  );
};

export default Topbar;
