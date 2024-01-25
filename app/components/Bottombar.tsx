import { FaCode, FaCodeBranch, FaCrown, FaDonate, FaEnvelope, FaFileContract, FaInfo, FaKeyboard, FaLock, FaPalette, FaShieldAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import Item from "./Item";
import { IoLogoDiscord } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";

const Bottombar = () => {
  const items = [
    {
      href: '/',
      label: 'Contact',
      icon: FaEnvelope,
      size: 12
    },
    {
      href: '/notifications',
      label: 'Support',
      icon: FaDonate,
      auth: true,
      size: 12
    },
    {
      href: '/bookmarks',
      label: 'Github',
      icon: FaCode,
      auth: true,
      size: 12
    },
    {
      href: '/adsf',
      label: 'Discord',
      icon: IoLogoDiscord,
      auth: true,
      size: 12
    },
    {
      href: '/notifications',
      label: 'Twitter',
      icon: FaXTwitter,
      auth: true,
      size: 15
    },
    {
      href: '/bookmarks',
      label: 'Terms',
      icon: FaFileContract,
      auth: true,
      size: 14
    },
    {
      href: '/adsf',
      label: 'Security',
      icon: FaShieldAlt,
      auth: true,
      size: 12
    },
    {
      href: '/adsf',
      label: 'Privacy',
      icon: FaLock,
      auth: true,
      size: 12
    }]
  const items1 = [
    {
      href: '/',
      label: 'custom',
      icon: FaPalette,
      size: 12
    },
    {
      href: '/notifications',
      label: 'v1 .0 .0',
      icon: FaCodeBranch,
      auth: true,
      size: 14
    },
  ]
  return (
    <div className="w-full flex flex-row justify-between pb-2 md:pb-6 xl:p-2">
      <div className="flex flex-wrap items-center w-2/3 md:w-3/5 lg:w-4/5">
        {items.map((item,idx) => (
          <div
            key={idx}
           className="w-20">
            <Item
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              auth={item.auth}
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
            auth={item.auth}
            size={item.size}
          />
        ))}
      </div>
    </div>
  )
};

export default Bottombar;
