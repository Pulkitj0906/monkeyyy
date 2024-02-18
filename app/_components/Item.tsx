import { IconType } from "react-icons";

interface ItemProps {
  label?: string;
  href?: string;
  icon?: IconType;
  onClick?: () => void;
  alert?: boolean;
  size?: number;
  topbar?: boolean;
  highlight?: boolean;
}

const Item: React.FC<ItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
  size,
  topbar,
  highlight,
}) => {
  return (
    <div onClick={onClick} className="flex flex-row items-center">
      <div
        className={`
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
      ${highlight ? "text-this-yellow" : "text-text-color"}
      ${topbar && "p-6 pl-0"}
      `}
      >
        <a href={href} className="flex items-center justify-center">
          {Icon && (
            <Icon size={size} className=" group-hover:text-this-white" />
          )}
          {label && (
            <p className="pl-2 md:pl-1 md:pr-0 pr-1 lg:pr-1 lg:pl-2 group-hover:text-this-white text-xs">
              {label}
            </p>
          )}
        </a>
      </div>
    </div>
  );
};

export default Item;
