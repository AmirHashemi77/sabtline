import BenefitsCard from "./BenefitsCard";
import { RxLapTimer } from "react-icons/rx";
import { PiBuildingApartmentLight } from "react-icons/pi";
import { AiOutlineAlert, AiOutlineSafety } from "react-icons/ai";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const benefitsCardData = [
  {
    id: 1,
    title: "جلوگیری از کلاهبرداری و سو استفاده در فرایند معامله",
    icon: <AiOutlineAlert className="w-8 h-8 md:w-20 md:h-20 lg:w-8 lg:h-8 text-white" />,
    subTitle: "خدمات آنلاین ثبت لاین  با بهره‌گیری از سیستم‌های امنیتی پیشرفته، از هرگونه کلاهبرداری و سوءاستفاده در معاملات خودرو جلوگیری می‌کند.",
  },
  {
    id: 2,
    title: "کاهش مراجعات حضوری به دستگاه‌ها و ادارات مربوطه",
    icon: <PiBuildingApartmentLight className="w-8 h-8 md:w-20 md:h-20 lg:w-8 lg:h-8 text-white" />,
    subTitle: "پلتفرم ثبت لاین  با ارائه خدمات آنلاین، نیاز به مراجعات حضوری به دستگاه‌ها و ادارات مختلف را به حداقل می‌رساند.",
  },
  {
    id: 3,
    title: "سهولت و تسریع در فرایند معامله",
    icon: <RxLapTimer className="w-8 h-8 md:w-20 md:h-20 lg:w-8 lg:h-8 text-white" />,
    subTitle: "ثبت لاین  با فراهم کردن یک بستر آنلاین کارآمد، فرآیند خرید و فروش خودرو را ساده‌تر و سریع‌تر می‌سازد.",
  },
  {
    id: 4,
    title: "ایجاد اطمینان خاطر بیشتر برای خریدار و فروشنده",
    icon: <AiOutlineSafety className="w-8 h-8 md:w-20 md:h-20 lg:w-8 lg:h-8 text-white" />,
    subTitle: "با تضمین امنیت و شفافیت در معاملات، ثبت لاین  اطمینان خاطر بیشتری را برای خریداران و فروشندگان فراهم می‌کند.",
  },
];

const BenefitsSection = () => {
  return (
    <div className="md:w-[65%] w-full md:h-[700px] h-[800px] bg-primary p-5 rounded-lg mx-auto md:mt-10 mt-40 flex items-center justify-between relative flex-col md:flex-row dark:bg-card">
      <div className="h-full flex flex-col justify-evenly items-center gap-2 md:px-6 px-0 bg-primary w-full md:w-auto dark:bg-card">
        <h4 className="md:text-xl text-lg text-center text-bold text-white flex md:ml-3 ml-0 md:w-auto w-full">
          مزایای استفاده از سامانه قولنامه آنلاین ثبت لاین <IoCheckmarkDoneCircle className="w-8 h-8 md:w-20 md:h-20 lg:w-8 lg:h-8 text-white order-[-1] mb-6 md:mb-0" />
        </h4>
        {benefitsCardData.map((item) => (
          <BenefitsCard key={item.id} title={item.title} subTitle={item.subTitle} icon={item.icon} />
        ))}
      </div>
      <div className="flex items-center flex-col justify-between max-md:!w-[300px] max-md:!h-[300px]">
        <img alt="kia-car" src="/images/kia-car.png" width={600} height={600} />
      </div>
      {/*<Image alt='wave' src={theme === 'light' ? '/images/wave.svg' : "/images/wave-dark.svg"} width={600}
                   height={600}
                   className='absolute !w-full md:bottom-[-65px] bottom-[-20px] left-0 '/>*/}
      {/*<div className="grid grid-cols-1 md:grid-cols-2  items-center gap-8 px-6 bg-primary">*/}
    </div>
    /* <div className="flex flex-col items-center gap-20 w-full py-10 max-w-7xl mx-auto px-5">
             <h4 className="text-3xl text-center text-bold self-start text-gray-800">
                 مزایای استفاده از سامانه قولنامه آنلاین <span
                 className="text-3xl text-center text-bold self-start text-primary font-bold">ثبت لاین</span>
             </h4>
             <div className="grid grid-cols-1 md:grid-cols-2  items-center gap-8 px-6 bg-primary">
                     {benefitsCardData.map((item) => (
         <BenefitsCard key={item.id} title={item.title} subTitle={item.subTitle} icon={item.icon}/>

         ))}
             </div>
         </div>*/
  );
};
export default BenefitsSection;
