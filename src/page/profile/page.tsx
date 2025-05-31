import { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterStore } from "../../store/register/store";
import { useContractStore } from "../../store/contract/store";
import { autoLogout } from "../../sso/ssoUtils";
import { enqueueSnackbar } from "notistack";
import { Button } from "../../components/ui/button";
import { GrFormPreviousLink } from "react-icons/gr";
import BreadCrumbComponent from "../../components/common/breadcrumb/BreadCrumbComponent";
import { IoPerson } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MdCreateNewFolder, MdWifiTethering } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { RiWifiOffLine } from "react-icons/ri";
import { GiExitDoor } from "react-icons/gi";
import InquiriesSection from "../../components/page/profile/InquiriesSection";
import OfflineContractSection from "../../components/page/profile/OfflineContractSection";
import UserData from "../../components/page/profile/UserData";
import { shareData } from "../../sso/shareData";
import OnlineContractSection from "../../components/page/profile/OnlineContractSection";

const tilteArr = ["ایجاد قرار داد", "لیست استعلامات", "قرارداد های آنلاین شما", "قرارداد های آفلاین شما", "اطلاعات کاربری"];

const ProfilePage: FC = () => {
  const navigate = useNavigate();
  const userData = typeof window !== "undefined" && localStorage.getItem(shareData.SSO_SABT_LINE) && JSON.parse(localStorage.getItem(shareData.SSO_SABT_LINE) as string)?.profile;
  const [activeItem, setActiveItem] = useState(2);
  const checkAuthenticated = useRegisterStore((state) => state.checkAuthenticated);
  const setContractBusinessId = useContractStore((state) => state.setContractBusinessId);

  // const {data: userData, refetch: getUserDataRefetch} = useGetUserDataQuery();

  /*useEffect(() => {
          getUserDataRefetch();
      }, []);*/

  const signOut = () => {
    autoLogout();
    checkAuthenticated();
    setContractBusinessId("");
    enqueueSnackbar({ message: "شما از حساب کاربری خود خارج شدید", variant: "success" });
    // window.location.assign('https://sso.sabtline.ir/Account/Logout?returnTo=http://localhost:3000');
  };
  return (
    <>
      <div className="mt-20 mx-auto max-w-7xl md:px-5 px-0">
        <div className="flex items-center justify-center bg-gray-50 px-3 max-md:py-2 py-[18px] rounded-md dark:bg-card relative mt-10">
          <Button className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2" onClick={() => navigate(-1)}>
            بازگشت
          </Button>
          <button className="md:hidden absolute left-8 top-1/2 -translate-y-1/2" onClick={() => navigate(-1)}>
            <GrFormPreviousLink className="text-2xl" />
          </button>
          <BreadCrumbComponent
            items={[
              { label: "خانه", link: "/" },
              { label: "پروفایل", link: "" },
            ]}
          />
        </div>

        <div className="flex items-center justify-center w-full my-20">
          <div className="grid grid-cols-12 items-start gap-8 w-full">
            {/* sidebar */}
            <div className="col-span-12  lg:col-span-3 bg-white rounded-xl p-5 dark:bg-card">
              <div className="flex items-center gap-3 border-b-2 border-b-gray-500 pb-4">
                <IoPerson className="text-gray-800 text-4xl dark:text-card-foreground" />
                <span>
                  {userData.firstName} {userData.lastName}
                </span>
                {/*    {userData?.data.firstName && userData?.data.lastName &&
                                    <p className="text-gray-800 text-2xl ">{`${userData?.data.firstName} ${userData?.data.lastName}`}</p>}*/}
              </div>
              <ul className="flex flex-col gap-4 items-start py-3">
                <Link
                  to="/greenpaper"
                  onClick={() => setActiveItem(1)}
                  className={`flex items-center gap-2 p-3 rounded-md hover:bg-primary hover:text-white w-full transition-all cursor-pointer ${
                    activeItem === 1 ? "text-white bg-primary dark:bg-background dark:text-card-foreground" : "bg-gray-50 text-gray-800 dark:bg-[#383838] dark:text-card-foreground"
                  } dark:hover:bg-background dark:hover:text-card-foreground`}
                >
                  <MdCreateNewFolder className="text-2xl" />
                  ایجاد قرارداد
                </Link>
                <li
                  onClick={() => setActiveItem(2)}
                  className={`flex items-center gap-2 p-3 rounded-md hover:bg-primary hover:text-white w-full transition-all cursor-pointer ${
                    activeItem === 2 ? "text-white bg-primary dark:bg-background dark:text-card-foreground" : "bg-gray-50 text-gray-800 dark:bg-[#383838] dark:text-card-foreground"
                  } dark:hover:bg-background dark:hover:text-card-foreground `}
                >
                  <CiBoxList className="text-2xl" />
                  لیست استعلامات
                </li>
                <li
                  onClick={() => setActiveItem(3)}
                  className={`flex items-center gap-2 p-3 rounded-md hover:bg-primary hover:text-white w-full transition-all cursor-pointer ${
                    activeItem === 3 ? "text-white bg-primary dark:bg-background dark:text-card-foreground" : "bg-gray-50 text-gray-800 dark:bg-[#383838] dark:text-card-foreground"
                  } dark:hover:bg-background dark:hover:text-card-foreground`}
                >
                  <MdWifiTethering className="text-2xl" />
                  قرارداد های آنلاین شما
                </li>
                <li
                  onClick={() => setActiveItem(4)}
                  className={`flex items-center gap-2 p-3 rounded-md hover:bg-primary hover:text-white w-full transition-all cursor-pointer ${
                    activeItem === 4 ? "text-white bg-primary dark:bg-background dark:text-card-foreground" : "bg-gray-50 text-gray-800 dark:bg-[#383838] dark:text-card-foreground"
                  } dark:hover:bg-background dark:hover:text-card-foreground`}
                >
                  <RiWifiOffLine className="text-2xl" />
                  قرارداد های آفلاین شما
                </li>
                <li
                  onClick={() => setActiveItem(5)}
                  className={`flex items-center gap-2 p-3 rounded-md hover:bg-primary hover:text-white w-full transition-all cursor-pointer ${
                    activeItem === 5 ? "text-white bg-primary dark:bg-background dark:text-card-foreground" : "bg-gray-50 text-gray-800 dark:bg-[#383838] dark:text-card-foreground"
                  } dark:hover:bg-background dark:hover:text-card-foreground`}
                >
                  <IoPerson className="text-2xl " />
                  اطلاعات کاربری
                </li>
                <li
                  onClick={signOut}
                  className="flex items-center gap-2 p-3 bg-gray-50 text-gray-800  rounded-md hover:bg-primary hover:text-white w-full transition-all cursor-point dark:bg-[#383838] dark:text-card-foreground dark:hover:bg-background dark:hover:text-card-foreground "
                >
                  <GiExitDoor className="text-2xl" />
                  خروج
                </li>
              </ul>
            </div>
            {/* content */}
            <div className="col-span-12 lg:col-span-9 bg-white rounded-xl p-5 dark:bg-card">
              <p className="text-gray-800 text-2xl border-b-2 border-b-gray-500 pb-4 dark:text-card-foreground">{tilteArr[activeItem - 1]}</p>
              {activeItem === 2 && <InquiriesSection />}
              {activeItem === 3 && <OnlineContractSection />}
              {activeItem === 4 && <OfflineContractSection />}
              {activeItem === 5 && <UserData />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfilePage;
