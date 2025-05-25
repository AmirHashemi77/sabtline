import type { ReactNode } from "react";

const BenefitsCard = ({ title, subTitle, icon }: { title: string; subTitle: string; icon: ReactNode }) => {
  return (
    /* <div
             className="w-[250px] h-[250px] flex flex-col items-center gap-4 px-3 py-4 rounded-sm bg-white cursor-pointer hover:scale-105 transition-all">
             <div className="flex items-center justify-center rounded-full  w-8 h-8">
                 {icon}
             </div>
             <p className="text-center text-gray-800">{title}</p>
             <p className="text-center text-gray-500 mt-6 text-sm">
                 {subTitle}
             </p>
         </div>*/
    <div className="flex  flex-col w-full dark:bg-card">
      <div className="flex items-center justify-center self-baseline">
        {icon}
        <p className="text-white mx-3 text-sm">{title}</p>
      </div>
      <p className="text-xs text-white/25 md:w-52 w-72 mr-12">{subTitle}</p>
    </div>
  );
};
export default BenefitsCard;
