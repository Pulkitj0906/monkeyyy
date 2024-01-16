import { IconType } from "react-icons";
import { useCallback } from "react";
import { userAgent } from "next/server";
import { useRouter } from "next/router";
import { on } from "stream";
import { BsDot } from "react-icons/bs";

interface ItemProps {
  label?: string;
  href?: string;
  icon?: IconType
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
  size?: number
  topbar?: boolean
}

const Item: React.FC<ItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
  auth,
  alert,
  size,
  topbar
}) => {

  return (
    <div onClick={onClick} className="flex flex-row items-center">
      <div className={`
      relative
      rounded-full
      p-1
      pt-1
      pb-1
      flex
      items-center
      justify-center
      cursor-pointer
      group
      ${topbar && 'p-6 pl-0'}
      `}>
        {Icon && <Icon size={size} className="text-text-color group-hover:text-this-white" />}
        {label && <p className=" text-text-color pl-2 md:pl-1 md:pr-0 pr-1 lg:pr-1 lg:pl-2 group-hover:text-this-white text-xs">
          {label}
        </p>}
      </div>

    </div>
  )
};

export default Item;
