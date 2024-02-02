import { FaBell, FaBookmark, FaCrown, FaInfo, FaKeyboard, FaRegKeyboard, FaRegUser, FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { SiMonkeytype } from "react-icons/si";
import Item from "./Item";



const Topbar = () => {
    const items = [
        {
            href: '/',
            icon: FaKeyboard,
            size: 17
        },
        {
            href: '/notifications',
            icon: FaCrown,
            auth: true,
            size: 20
        },
        {
            href: '/about',
            icon: FaInfo,
            auth: true,
            size: 17
        },
        {
            href: '/settings',
            icon: IoMdSettings,
            auth: true,
            size: 18
        }
    ]
    const items2 = [
        {
            href: '/',
            icon: FaBell,
            size: 16
        },
        {
            href: '/notifications',
            icon: FaRegUser,
            auth: true,
            size: 16
        },
    ]
    return (
        <div className="flex justify-between w-full p-1 pt-6">
            <div className="flex w-2/3 ">
                <SiMonkeytype size={40} className="text-this-yellow mx-2 mr-4" />
                <div className="gap-0 relative h-8 w-48 md:block hidden ">
                    <p className=" text-text-color group-hover:text-this-white text-[0.45rem] md:block hidden">
                    monkey see <br/><span className="text-3xl text-this-white absolute top-0 font-[500] ">monkeytype</span>
                    </p>
                </div>
                {items.map((item) => (
                    <Item
                        topbar={true}
                        key={item.href}
                        href={item.href}
                        icon={item.icon}
                        auth={item.auth}
                        size={item.size}
                    />
                ))}
            </div>
            <div className=" flex flex-row ">
                {items2.map((item) => (
                    <Item
                        topbar={true}
                        key={item.href}
                        href={item.href}
                        icon={item.icon}
                        auth={item.auth}
                        size={item.size}
                    />
                ))}
            </div>
        </div>
    )
};

export default Topbar;
