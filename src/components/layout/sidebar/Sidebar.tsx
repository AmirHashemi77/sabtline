import type { FC, SetStateAction } from "react";
import { useRegisterStore } from "../../../store/register/store";
import { FaCar, FaHome, FaPhoneAlt } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { RiArticleFill, RiLoginBoxFill } from "react-icons/ri";
import { IoIosHelpCircle } from "react-icons/io";
import { MdArticle, MdClose } from "react-icons/md";
import HeaderLogo from "../header/HeaderLogo";
import SideBarItem from "./SliderBarItem";

interface Iprops {
  isSidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<SetStateAction<boolean>>;
}

const Sidebar: FC<Iprops> = ({ isSidebarOpen, setSidebarOpen }) => {
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth >= 1024) {
  //       setSidebarOpen(true);
  //     } else {
  //       setSidebarOpen(false);
  //     }
  //   };

  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  const verifyToken = useRegisterStore((state) => state.verifyToken);

  const data = [
    {
      href: "#",
      icon: <FaHome className="text-primary" />,
      title: "خانه",
      dropdownItems: [],
    },
    {
      href: verifyToken ? "/profile" : "/register",
      icon: verifyToken ? <IoPersonSharp className="text-primary" /> : <RiLoginBoxFill className="text-primary" />,
      title: verifyToken ? "پروفایل" : "ورود / ثبت نام",
      dropdownItems: [],
    },
    {
      href: "#",
      icon: <FaCar className="text-primary" />,
      title: "خدمات",
      dropdownItems: [],
    },
    {
      href: "#",
      icon: <IoIosHelpCircle className="text-primary" />,
      title: "راهنما",
      dropdownItems: [],
    },
    {
      href: "#",
      icon: <MdArticle className="text-primary" />,
      title: "قوانین و مقررات",
      dropdownItems: [],
    },
    {
      href: "#",
      icon: <RiArticleFill className="text-primary" />,
      title: "مجله تخصصی",
      dropdownItems: [],
    },
    {
      href: "#",
      icon: <FaPhoneAlt className="text-primary" />,
      title: "تماس ما",
      dropdownItems: [],
    },
  ];

  return (
    <>
      {isSidebarOpen && <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setSidebarOpen(false)} />}
      <div className={`md:hidden fixed top-0 right-0 z-50 w-72 shadow-md rounded-md h-screen transition-transform duration-700 transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} `}>
        <div className="h-full px-3 py-4 bg-white z-[1000003] dark:bg-card">
          <MdClose className="md:hidden cursor-pointer text-primary w-5 h-5 fixed left-3 top-5" onClick={() => setSidebarOpen(false)} />
          <div className="fixed right-3 top-4">
            <HeaderLogo />
          </div>
          <div className="w-full mt-14 flex flex-col items-center">
            {data.map((item, index) => (
              <SideBarItem key={index} href={item.href} icon={item.icon} title={item.title} dropdownItems={item.dropdownItems} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
