"use client";

import {
  FaCode,
  FaCodeBranch,
  FaDonate,
  FaEnvelope,
  FaFileContract,
  FaLock,
  FaPalette,
  FaShieldAlt,
} from "react-icons/fa";
import Item from "./Item";
import { IoLogoDiscord } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import useSupportModal from "../_hooks/useSupportModal";

const Bottombar = () => {
  const SupportModal = useSupportModal();
  const items = [
    {
      href: "mailto: pulkitjain10000@gmail.com",
      label: "Contact",
      icon: FaEnvelope,
      size: 12,
    },
    {
      label: "Support",
      onclick: SupportModal.OnOpen,
      icon: FaDonate,
      size: 12,
    },
    {
      href: "https://github.com/Pulkitj0906/monkeyyy",
      label: "Github",
      icon: FaCode,
      size: 12,
    },
    {
      href: "https://discord.gg/RgghWebY8a",
      label: "Discord",
      icon: IoLogoDiscord,
      size: 12,
    },
    {
      href: "https://twitterc-nu.vercel.app/",
      label: "Twitter",
      icon: FaXTwitter,
      size: 15,
    },
    {
      href: "https://monkeytype.com/terms-of-service",
      label: "Terms",
      icon: FaFileContract,
      size: 14,
    },
    {
      href: "https://monkeytype.com/security-policy",
      label: "Security",
      icon: FaShieldAlt,
      size: 12,
    },
    {
      href: "https://monkeytype.com/privacy-policy",
      label: "Privacy",
      icon: FaLock,
      size: 12,
    },
  ];
  const items1 = [
    {
      href: "/",
      label: "custom",
      icon: FaPalette,
      size: 12,
    },
    {
      href: "/notifications",
      label: "v1 .0 .0",
      icon: FaCodeBranch,
      size: 14,
    },
  ];
  return (
    <div className="w-full flex flex-row justify-between pb-2 md:pb-6 xl:p-2">
      <div className="flex flex-wrap items-center w-2/3 md:w-3/5 lg:w-4/5">
        {items.map((item, idx) => (
          <div key={idx} className="w-20">
            <Item
              key={item.href}
              onClick={item.onclick}
              href={item.href}
              label={item.label}
              icon={item.icon}
              size={item.size}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col lg:flex-row w-1/4 md:pb-0 lg:bg-transparent lg:items-start lg:justify-end items-end">
        {items1.map((item) => (
          <Item
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            size={item.size}
          />
        ))}
      </div>
    </div>
  );
};

export default Bottombar;
