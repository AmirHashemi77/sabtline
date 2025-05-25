import { BsArrowRight } from "react-icons/bs";
import { HiOutlineStatusOffline, HiOutlineStatusOnline } from "react-icons/hi";
import { GiConfirmed } from "react-icons/gi";
import type { FC } from "react";
import { Link } from "react-router-dom";
// import Image from "next/image";

export const services = [
  {
    title: "قولنامه انلاین",
    icon: <HiOutlineStatusOnline className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-white text-xl" />,
    link: "/greenpaper",
    description: "ایجاد قرار انلاین بر اساس استعلام معتبر و مشخصات طرفین قولنامه",
  },
  {
    title: "قولنامه افلاین",
    icon: <HiOutlineStatusOffline className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-white text-xl" />,
    link: "/offlinecontract",
    description: "ایجاد قرار افلاین بر اساس استعلام معتبر و مشخصات طرفین قولنامه",
  },
  {
    title: "تائیدیه اصالت خودرو",
    icon: <GiConfirmed className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-white text-xl" />,
    link: "#",
    description: "تائیدیه اصالت خودرو بر اساس وب سرویس فراجا و  راهور",
  },
];

const AllServices: FC = () => {
  return (
    <div className="flex items-center flex-col mt-28 relative">
      <p className="w-full text-center text-4xl">
        خدمات <span className="text-center text-3xl md:text-4xl lg:text-3xl my-8 font-bold text-primary"> ثبت لاین</span>
      </p>
      <div className="w-full flex items-center justify-center gap-10 my-20 flex-wrap">
        {services.map((service, index) => (
          <div
            key={index}
            className="transition-all hover:shadow-md md:w-[350px] w-[340px] md:h-[250px] h-[240px] p-8 flex items-center justify-center flex-col bg-white shadow-sm relative rounded dark:bg-card"
          >
            <div className="absolute -left-3 -top-3 flex items-center">
              <span className="w-3 h-3 p-4 bg-primary rounded-full absolute left-1 top-1 z-40">{service.icon}</span>
              <span className="w-3 h-3 p-5 bg-blue-500 rounded-full absolute left-0 top-0 z-30 opacity-30 " />
              <span className="w-3 h-3 p-6 bg-background rounded-full  absolute left-[-5px] top-[-5px]" />
            </div>
            <p className="text-right w-full text-xl">{service.title}</p>
            <p className="text-gray-500 text-tight text-wrap text-sm mt-10">{service.description}</p>
            <Link className="flex items-center gap-1 text-xs text-primary self-end mt-auto font-bold" to={service.link}>
              <BsArrowRight className="font-normal" size={15} /> دریافت خدمت{" "}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllServices;
