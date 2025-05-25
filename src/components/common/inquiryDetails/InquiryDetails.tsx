import { FaCarSide, FaIdCard, FaIdCardAlt } from "react-icons/fa";
import { RiArticleLine } from "react-icons/ri";
import { TbReceiptTax, TbReportSearch } from "react-icons/tb";
import { GiPoliceCar } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import type { ApprovedInquiryRequest } from "../../../type/onlineContact.types";
import type { FC } from "react";
import { Input } from "../../ui/input";

interface PropsType {
  InquiryData: ApprovedInquiryRequest | null | undefined;
}

const InquiryDetails: FC<PropsType> = ({ InquiryData }) => {
  return (
    <div className="mt-20 max-w-7xl mx-auto px-5">
      {InquiryData && (
        <div className="flex items-center justify-center py-10 px-5 w-full bg-white rounded-xl shadow-md my-10 dark:bg-card">
          <div className="grid grid-cols-12 items-center space-y-4 md:space-y-0 md:gap-10 w-full md:w-[80%]">
            <div className="flex items-center gap-5 col-span-12">
              <FaCarSide className="text-primary text-4xl" />
              <p className="text-right text-2xl font-bold text-primary">اطلاعات خودرو </p>
            </div>
            {InquiryData.responseJson.vehicle ? (
              <>
                <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
                  <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">سیستم خودرو :</p>
                  <Input readOnly className="flex-1 py-2" value={InquiryData.responseJson.vehicle.system} />
                </div>
                <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
                  <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> رنگ خودرو :</p>
                  <Input readOnly className="flex-1 py-2" value={InquiryData.responseJson.vehicle.color} />
                </div>

                <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
                  <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> مدل خودرو :</p>
                  <Input readOnly className="flex-1 py-2" value={InquiryData.responseJson.vehicle.model} />
                </div>

                <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
                  <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> تیپ خودرو :</p>
                  <Input readOnly className="flex-1 py-2" value={InquiryData.responseJson.vehicle.tip} />
                </div>

                <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
                  <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> کاربری خودرو :</p>
                  <Input readOnly className="flex-1 py-2" value={InquiryData.responseJson.vehicle.usage} />
                </div>

                <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
                  <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> زیر کاربری خودرو :</p>
                  <Input readOnly className="flex-1 py-2" value={InquiryData.responseJson.vehicle.subUsage} />
                </div>

                <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
                  <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> تعداد دفعات شماره گذاری خودرو:</p>
                  <Input readOnly className="flex-1 py-2" value={InquiryData.responseJson.vehicle.countNumbering} />
                </div>

                <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
                  <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> سوخت خودرو :</p>
                  <Input readOnly className="flex-1 py-2" value={InquiryData.responseJson.vehicle.fuel} />
                </div>

                <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
                  <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> وضعیت خودرو :</p>
                  <Input readOnly className="flex-1 py-2" value={InquiryData.responseJson.status} />
                </div>

                <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
                  <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> سوخت خودرو :</p>
                  <Input readOnly className="flex-1 py-2" value={InquiryData.responseJson.vehicle.fuel} />
                </div>
              </>
            ) : (
              <p className="text-center text-gray-800 col-span-12">اطلاعات خودرو موجود نیست .</p>
            )}
            <div className="flex items-center gap-5 col-span-12">
              <FaIdCardAlt className="text-primary text-4xl" />
              <p className="text-right text-2xl font-bold col-span-12 text-primary">بیمه خودرو</p>
            </div>
            {InquiryData.responseJson.insurance ? (
              <>
                <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
                  <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">بیمه:</p>
                  <Input readOnly className="flex-1 py-2" value={InquiryData.responseJson.insurance.done ? "دارد" : "ندارد"} />
                </div>

                <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
                  <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">تاریخ شروع :</p>
                  <Input readOnly className="flex-1 py-2" value={InquiryData.responseJson.insurance.start} />
                </div>

                <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
                  <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">تاریخ پایان :</p>
                  <Input readOnly className="flex-1 py-2" value={InquiryData.responseJson.insurance.end} />
                </div>
              </>
            ) : (
              <p className="text-center text-gray-800 col-span-12">اطلاعات بیمه موجود نیست .</p>
            )}

            <div className="flex items-center gap-5 col-span-12">
              <FaIdCard className="text-primary text-4xl" />
              <p className="text-right text-2xl font-bold col-span-12 text-primary">استفاده از بیمه</p>
            </div>
            {InquiryData.responseJson.insurance.report.length > 0 ? (
              <>
                {InquiryData.responseJson.insurance.report?.map((item: any) => {
                  return (
                    <div
                      className={`grid grid-cols-12 col-span-12 items-center space-y-4 md:space-y-0 md:gap-10 ${
                        InquiryData.responseJson.insurance.report.length > 1 ? "py-5 border-b border-b-gray-300" : ""
                      }`}
                      key={item.id}
                    >
                      <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
                        <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">تاریخ استفاده :</p>
                        <Input readOnly className="flex-1 py-2" value={item.date} />
                      </div>
                      <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
                        <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">قیمت:</p>
                        <Input readOnly className="flex-1 py-2" value={item.price} />
                      </div>
                      <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
                        <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">توضیحات:</p>
                        <Input readOnly className="flex-1 py-2" value={item.message} />
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <p className="text-center text-gray-800 col-span-12">اطلاعات استفاده از بیمه موجود نیست .</p>
            )}
            <div className="flex items-center gap-5 col-span-12">
              <RiArticleLine className="text-primary text-4xl" />
              <p className="text-right text-2xl font-bold col-span-12 text-primary"> اطلاعات گارانتی</p>
            </div>
            {InquiryData.responseJson.factoryInformation.warranty ? (
              <>
                <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
                  <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">تاریخ شروع گارانتی :</p>
                  <Input readOnly className="flex-1 py-2" value={InquiryData.responseJson.factoryInformation.warranty.startDate} />
                </div>
                <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
                  <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">تاریخ پایان گارانتی :</p>
                  <Input readOnly className="flex-1 py-2" value={InquiryData.responseJson.factoryInformation.warranty.endDate} />
                </div>
                <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
                  <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">وضعیت جاری گارانتی خودرو :</p>
                  <Input readOnly className="flex-1 py-2" value={InquiryData.responseJson.factoryInformation.warranty.status} />
                </div>
              </>
            ) : (
              <p className="text-center text-gray-800 col-span-12">اطلاعات گارانتی موجود نیست .</p>
            )}

            <div className="flex items-center gap-5 col-span-12">
              <TbReportSearch className="text-primary text-4xl" />
              <p className="text-right text-2xl font-bold col-span-12 text-primary">اطلاعات عوارض آزاد راهی</p>
            </div>
            {InquiryData.responseJson.freeWayToll ? (
              <>
                <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
                  <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">مبلغ :</p>
                  <Input readOnly className="flex-1 py-2" value={InquiryData.responseJson.freeWayToll.price} />
                </div>
                <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
                  <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">وضعیت :</p>
                  <Input readOnly className="flex-1 py-2" value={InquiryData.responseJson.freeWayToll.status} />
                </div>
              </>
            ) : (
              <p className="text-center text-gray-800 col-span-12">اطلاعات عوارض آزاد راهی موجود نیست .</p>
            )}

            <div className="flex items-center gap-5 col-span-12">
              <GiPoliceCar className="text-primary text-4xl" />
              <p className="text-right text-2xl font-bold col-span-12 text-primary">اطلاعات خلافی خودرو</p>
            </div>
            {InquiryData.responseJson.infraction ? (
              <>
                <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
                  <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">مبلغ :</p>
                  <Input readOnly className="flex-1 py-2" value={InquiryData.responseJson.infraction.price} />
                </div>
                <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
                  <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">وضعیت :</p>
                  <Input readOnly className="flex-1 py-2" value={InquiryData.responseJson.infraction.status} />
                </div>
              </>
            ) : (
              <p className="text-center text-gray-800 col-span-12">اطلاعات خلافی خودرو موجود نیست .</p>
            )}

            <div className="flex items-center gap-5 col-span-12">
              <TbReceiptTax className="text-primary text-4xl" />
              <p className="text-right text-2xl font-bold col-span-12 text-primary">اطلاعات مالیات نقل و انتقال خودرو</p>
            </div>
            {InquiryData.responseJson.tax ? (
              <>
                <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
                  <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">مبلغ :</p>
                  <Input readOnly className="flex-1 py-2" value={InquiryData.responseJson.tax.price} />
                </div>
                <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
                  <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">وضعیت :</p>
                  <Input readOnly className="flex-1 py-2" value={InquiryData.responseJson.tax.status} />
                </div>
              </>
            ) : (
              <p className="text-center text-gray-800 col-span-12">اطلاعات مالیات نقل و انتقال موجود نیست .</p>
            )}

            <div className="flex items-center gap-5 col-span-12">
              <IoMdSettings className="text-primary text-4xl" />
              <p className="text-right text-2xl font-bold col-span-12 text-primary">اطلاعات معاینه فنی خودرو </p>
            </div>
            {InquiryData.responseJson.technicalDiagnosis ? (
              <>
                <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
                  <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">سیستم سوخت رسانی :</p>
                  <Input readOnly className="flex-1 py-2" value={InquiryData.responseJson.technicalDiagnosis.fuelSystem} />
                </div>
                <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
                  <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">وضعیت معاینه فنی :</p>
                  <Input readOnly className="flex-1 py-2" value={InquiryData.responseJson.technicalDiagnosis.status} />
                </div>

                <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
                  <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">تاریخ اعتبار معاینه فنی :</p>
                  <Input readOnly className="flex-1 py-2" value={InquiryData.responseJson.technicalDiagnosis.validityDate} />
                </div>
              </>
            ) : (
              <p className="text-center text-gray-800 col-span-12">اطلاعات معاینه فنی خودرو موجود نیست .</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default InquiryDetails;
