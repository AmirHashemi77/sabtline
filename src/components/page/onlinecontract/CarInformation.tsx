import { Fragment, type FC } from "react";
import { RiArticleLine } from "react-icons/ri";
import { FaCarSide, FaIdCard, FaIdCardAlt } from "react-icons/fa";
import { GiPoliceCar } from "react-icons/gi";
import { TbReceiptTax, TbReportSearch } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import { useContractStore } from "../../../store/contract/store";
import { Input } from "../../ui/input";

const CarInformation: FC = () => {
  const verifyInquiryData = useContractStore((state) => state.verifyInquiryData);
  return (
    <>
      {verifyInquiryData && verifyInquiryData.data && (
        <div className="flex items-center justify-center py-10 px-5 w-full ">
          <div className="grid grid-cols-12 items-center space-y-4 md:space-y-0 md:gap-10 w-full md:w-[80%]">
            <div className="flex items-center gap-5 col-span-12">
              <FaCarSide className="text-primary text-4xl" />
              <p className="text-right text-2xl font-bold  text-primary">اطلاعات خودرو </p>
            </div>
            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">سیستم خودرو :</p>
              <Input disabled readOnly className="flex-1 py-2" value={verifyInquiryData?.data?.inquiryResult?.vehicle?.system} />
            </div>
            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> رنگ خودرو :</p>
              <Input disabled readOnly className="flex-1 py-2" value={verifyInquiryData?.data?.inquiryResult?.vehicle?.color} />
            </div>

            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> مدل خودرو :</p>
              <Input disabled readOnly className="flex-1 py-2" value={verifyInquiryData?.data?.inquiryResult?.vehicle?.model} />
            </div>

            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> تیپ خودرو :</p>
              <Input disabled readOnly className="flex-1 py-2" value={verifyInquiryData?.data?.inquiryResult?.vehicle?.tip} />
            </div>

            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> کاربری خودرو :</p>
              <Input disabled readOnly className="flex-1 py-2" value={verifyInquiryData?.data?.inquiryResult?.vehicle?.usage} />
            </div>

            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> زیر کاربری خودرو :</p>
              <Input disabled readOnly className="flex-1 py-2" value={verifyInquiryData?.data?.inquiryResult?.vehicle?.subUsage} />
            </div>

            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> تعداد دفعات شماره گذاری خودرو:</p>
              <Input disabled readOnly className="flex-1 py-2" value={verifyInquiryData?.data?.inquiryResult?.vehicle?.countNumbering} />
            </div>

            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> سوخت خودرو :</p>
              <Input disabled readOnly className="flex-1 py-2" value={verifyInquiryData?.data?.inquiryResult?.vehicle?.fuel} />
            </div>

            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> وضعیت خودرو :</p>
              <Input disabled readOnly className="flex-1 py-2" value={verifyInquiryData?.data?.inquiryResult?.status} />
            </div>

            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> سوخت خودرو :</p>
              <Input disabled readOnly className="flex-1 py-2" value={verifyInquiryData?.data?.inquiryResult?.vehicle?.fuel} />
            </div>

            <div className="flex items-center gap-5 col-span-12">
              <FaIdCardAlt className="text-primary text-4xl" />
              <p className="text-right text-2xl font-bold col-span-12 text-primary">بیمه خودرو</p>
            </div>

            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">بیمه:</p>
              <Input disabled readOnly className="flex-1 py-2" value={verifyInquiryData?.data?.inquiryResult?.insurance?.done ? "دارد" : "ندارد"} />
            </div>

            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">تاریخ شروع :</p>
              <Input disabled readOnly className="flex-1 py-2" value={verifyInquiryData?.data?.inquiryResult?.insurance?.start} />
            </div>

            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">تاریخ پایان :</p>
              <Input disabled readOnly className="flex-1 py-2" value={verifyInquiryData?.data?.inquiryResult?.insurance?.end} />
            </div>

            <div className="flex items-center gap-5 col-span-12">
              <FaIdCard className="text-primary text-4xl" />
              <p className="text-right text-2xl font-bold col-span-12 text-primary">استفاده از بیمه</p>
            </div>
            {verifyInquiryData?.data?.inquiryResult?.insurance?.report.map((item: any) => {
              return (
                <Fragment key={item.id}>
                  <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
                    <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">تاریخ استفاده :</p>
                    <Input disabled readOnly className="flex-1 py-2" value={item.date} />
                  </div>
                  <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
                    <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">قیمت:</p>
                    <Input disabled readOnly className="flex-1 py-2" value={item.price} />
                  </div>
                  <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
                    <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">توضیحات:</p>
                    <Input disabled readOnly className="flex-1 py-2" value={item.message} />
                  </div>
                </Fragment>
              );
            })}

            <div className="flex items-center gap-5 col-span-12">
              <RiArticleLine className="text-primary text-4xl" />
              <p className="text-right text-2xl font-bold col-span-12 text-primary"> اطلاعات گارانتی</p>
            </div>
            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">تاریخ شروع گارانتی :</p>
              <Input disabled readOnly className="flex-1 py-2" value={verifyInquiryData?.data?.inquiryResult?.factoryInformation?.warranty?.startDate} />
            </div>
            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">تاریخ پایان گارانتی :</p>
              <Input disabled readOnly className="flex-1 py-2" value={verifyInquiryData?.data?.inquiryResult?.factoryInformation?.warranty?.endDate} />
            </div>
            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">وضعیت جاری گارانتی خودرو :</p>
              <Input disabled readOnly className="flex-1 py-2" value={verifyInquiryData?.data?.inquiryResult?.factoryInformation?.warranty?.status} />
            </div>

            <div className="flex items-center gap-5 col-span-12">
              <TbReportSearch className="text-primary text-4xl" />
              <p className="text-right text-2xl font-bold col-span-12 text-primary">اطلاعات عوارض آزاد راهی</p>
            </div>
            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">مبلغ :</p>
              <Input disabled readOnly className="flex-1 py-2" value={verifyInquiryData?.data?.inquiryResult?.freeWayToll?.price} />
            </div>
            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">وضعیت :</p>
              <Input disabled readOnly className="flex-1 py-2" value={verifyInquiryData?.data?.inquiryResult?.freeWayToll?.status} />
            </div>

            <div className="flex items-center gap-5 col-span-12">
              <GiPoliceCar className="text-primary text-4xl" />
              <p className="text-right text-2xl font-bold col-span-12 text-primary">اطلاعات خلافی خودرو</p>
            </div>
            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">مبلغ :</p>
              <Input disabled readOnly className="flex-1 py-2" value={verifyInquiryData?.data?.inquiryResult?.infraction?.price} />
            </div>
            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">وضعیت :</p>
              <Input disabled readOnly className="flex-1 py-2" value={verifyInquiryData?.data?.inquiryResult?.infraction?.status} />
            </div>

            <div className="flex items-center gap-5 col-span-12">
              <TbReceiptTax className="text-primary text-4xl" />
              <p className="text-right text-2xl font-bold col-span-12 text-primary">اطلاعات مالیات نقل و انتقال خودرو</p>
            </div>
            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">مبلغ :</p>
              <Input disabled readOnly className="flex-1 py-2" value={verifyInquiryData?.data?.inquiryResult?.tax?.price} />
            </div>
            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">وضعیت :</p>
              <Input disabled readOnly className="flex-1 py-2" value={verifyInquiryData?.data?.inquiryResult?.tax?.status} />
            </div>

            <div className="flex items-center gap-5 col-span-12">
              <IoMdSettings className="text-primary text-4xl" />
              <p className="text-right text-2xl font-bold col-span-12 text-primary">اطلاعات معاینه فنی خودرو </p>
            </div>
            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">مبلغ :</p>
              <Input disabled readOnly className="flex-1 py-2" value={verifyInquiryData?.data?.inquiryResult?.technicalDiagnosis?.fuelSystem} />
            </div>
            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">وضعیت معاینه فنی :</p>
              <Input disabled readOnly className="flex-1 py-2" value={verifyInquiryData?.data?.inquiryResult?.technicalDiagnosis?.status} />
            </div>

            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">تاریخ اعتبار معاینه فنی :</p>
              <Input disabled readOnly className="flex-1 py-2" value={verifyInquiryData?.data?.inquiryResult?.technicalDiagnosis?.validityDate} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CarInformation;
