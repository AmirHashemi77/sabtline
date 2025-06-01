import { useEffect, useState } from "react";
import { MdWbSunny } from "react-icons/md";
import { useRegisterStore } from "../../../store/register/store";
import { useThemeStore } from "../../../store/theme/store";
import HeaderLogo from "./HeaderLogo";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../../ui/button";
import { FaBars, FaMoon } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { TbLogin2 } from "react-icons/tb";
import NavigateEffect from "../../../provider/NavigateEffectProvider";
import Sidebar from "../sidebar/Sidebar";

const headerLinkData = [
  {
    id: 1,
    title: "خانه",
    link: "/",
  },
  {
    id: 2,
    title: "خدمات",
    link: "/services",
  },
  {
    id: 3,
    title: "راهنما",
  },
  {
    id: 4,
    title: "قوانین و مقررات",
  },
  {
    id: 5,
    title: "مجله تخصصی",
  },
  {
    id: 6,
    title: "تماس با ما",
    link: "/aboutUs",
  },
];

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const verifyToken = useRegisterStore((state) => state.verifyToken);
  const isAuthChecking = useRegisterStore((state) => state.isAuthChecking);
  const setIsAuthChecking = useRegisterStore((state) => state.setIsAuthChecking);
  const { theme, toggleTheme } = useThemeStore();
  const location = useLocation();
  // const {data: userData, isPending: getUserPendding, refetch: getUserDataRefetch} = useGetUserDataQuery();

  useEffect(() => {
    setIsAuthChecking(false);
  }, [isAuthChecking, setIsAuthChecking]);

  /* useEffect(() => {
         if (verifyToken) {
             getUserDataRefetch();
         }
     }, [verifyToken, isAuthChecking]);*/

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);
  return (
    <>
      <div className="w-full fixed bg-white dark:bg-[#252525] shadow-sm py-4 z-50">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-center justify-between">
            <HeaderLogo />

            {/* header links */}
            <ul className="hidden items-center justify-center gap-4 md:flex ">
              {headerLinkData.map((item) => {
                return (
                  <li key={item.id}>
                    <Link className="text-gray-600 hover:text-gray-800 transition-all text-sm dark:text-white" to={item.link ?? "#"}>
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* buttons header container */}
            <div className="flex items-center justify-center gap-5">
              <Button onClick={toggleTheme} className="flex ">
                {theme === "dark" ? <MdWbSunny /> : <FaMoon />}
              </Button>
              {!isAuthChecking && verifyToken && (
                <Button asChild className="hidden md:flex">
                  <Link to="/profile">
                    <IoPersonOutline size={40} />
                  </Link>
                </Button>
              )}
              {/* register Button */}
              {isAuthChecking && !verifyToken ? (
                <Button asChild className="hidden md:flex cursor-no-drop">
                  <img src="/images/loading33.svg" alt="spiner" width="30" height="30" />
                </Button>
              ) : !isAuthChecking && !verifyToken ? (
                <Button asChild className="hidden md:flex">
                  <Link to="/register">
                    {" "}
                    ورود / ثبت نام
                    <TbLogin2 size={40} />
                  </Link>
                </Button>
              ) : null}

              {/* menuSm button */}

              <button onClick={() => setSidebarOpen(true)} className=" flex md:hidden items-center justify-center px-4 py-2 gap-2 hover:scale-95 transition-all ">
                <FaBars className=" text-black text-lg dark:text-white" />
              </button>
            </div>
          </div>
        </div>
        <NavigateEffect />
      </div>
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
    </>
  );
};

export default Header;
