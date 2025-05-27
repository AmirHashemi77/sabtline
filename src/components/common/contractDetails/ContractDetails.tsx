import type { FC } from "react";
import type { ContractResponse } from "../../../type/onlineContact.types";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { FaCarSide, FaHandshake, FaIdCard, FaIdCardAlt } from "react-icons/fa";
import { RiArticleLine } from "react-icons/ri";
import { TbReceiptTax, TbReportSearch } from "react-icons/tb";
import { GiPoliceCar } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { MdOutlinePayment, MdPerson } from "react-icons/md";
import { Button } from "../../ui/button";

interface PropsType {
  ContractData: ContractResponse | null | undefined;
  finalConfirmPending?: boolean;
  finalConfirmHandler: () => Promise<void | never>;
}

const ContractDetails: FC<PropsType> = ({ ContractData, finalConfirmHandler, finalConfirmPending }) => {
  const RenderCarData = () => {
    if (ContractData && ContractData.approvedInquiryRequest && ContractData.approvedInquiryRequest.responseJson && ContractData.approvedInquiryRequest.responseJson.vehicle) {
      return (
        <>
          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">سیستم خودرو :</p>
            <Input disabled readOnly className="flex-1 py-2" value={ContractData.approvedInquiryRequest.responseJson.vehicle.system} />
          </div>
          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> رنگ خودرو :</p>
            <Input disabled readOnly className="flex-1 py-2" value={ContractData.approvedInquiryRequest.responseJson.vehicle.color} />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> مدل خودرو :</p>
            <Input disabled readOnly className="flex-1 py-2" value={ContractData.approvedInquiryRequest.responseJson.vehicle.model} />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> تیپ خودرو :</p>
            <Input disabled readOnly className="flex-1 py-2" value={ContractData.approvedInquiryRequest.responseJson.vehicle.tip} />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> کاربری خودرو :</p>
            <Input disabled readOnly className="flex-1 py-2" value={ContractData.approvedInquiryRequest.responseJson.vehicle.usage} />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> زیر کاربری خودرو :</p>
            <Input disabled readOnly className="flex-1 py-2" value={ContractData.approvedInquiryRequest.responseJson.vehicle.subUsage} />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> تعداد دفعات شماره گذاری خودرو:</p>
            <Input disabled readOnly className="flex-1 py-2" value={ContractData.approvedInquiryRequest.responseJson.vehicle.countNumbering} />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> سوخت خودرو :</p>
            <Input disabled readOnly className="flex-1 py-2" value={ContractData.approvedInquiryRequest.responseJson.vehicle.fuel} />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> وضعیت خودرو :</p>
            <Input disabled readOnly className="flex-1 py-2" value={ContractData.approvedInquiryRequest.responseJson.status} />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> سوخت خودرو :</p>
            <Input disabled readOnly className="flex-1 py-2" value={ContractData.approvedInquiryRequest.responseJson.vehicle.fuel} />
          </div>
        </>
      );
    }
    return <p className="text-center text-gray-800 col-span-12">اطلاعات خودرو موجود نیست .</p>;
  };
  const RenderInsuranceData = () => {
    if (ContractData && ContractData.approvedInquiryRequest && ContractData.approvedInquiryRequest.responseJson && ContractData.approvedInquiryRequest.responseJson.insurance) {
      return (
        <>
          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">بیمه:</p>
            <Input disabled readOnly className="flex-1 py-2" value={ContractData.approvedInquiryRequest.responseJson.insurance.done ? "دارد" : "ندارد"} />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">تاریخ شروع :</p>
            <Input disabled readOnly className="flex-1 py-2" value={new Date(ContractData.approvedInquiryRequest.responseJson.insurance.start).toLocaleDateString("fa-ir")} />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">تاریخ پایان :</p>
            <Input disabled readOnly className="flex-1 py-2" value={new Date(ContractData.approvedInquiryRequest.responseJson.insurance.end).toLocaleString("fa")} />
          </div>
        </>
      );
    }
    return <p className="text-center text-gray-800 col-span-12">اطلاعات بیمه موجود نیست .</p>;
  };
  const RenderInsuranceUsedData = () => {
    if (
      ContractData &&
      ContractData.approvedInquiryRequest &&
      ContractData.approvedInquiryRequest.responseJson &&
      ContractData.approvedInquiryRequest.responseJson.insurance &&
      ContractData.approvedInquiryRequest.responseJson.insurance.report.length > 0
    ) {
      return ContractData!.approvedInquiryRequest.responseJson.insurance.report?.map((item: any) => (
        <div
          className={`grid grid-cols-12 col-span-12 items-center space-y-4 md:space-y-0 md:gap-10 ${
            ContractData.approvedInquiryRequest.responseJson.insurance.report.length > 1 ? "py-5 border-b border-b-gray-300" : ""
          }`}
          key={item.id}
        >
          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">تاریخ استفاده :</p>
            <Input disabled readOnly className="flex-1 py-2" value={new Date(item.date).toLocaleString("fa")} />
          </div>
          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">قیمت:</p>
            <Input disabled readOnly className="flex-1 py-2" value={item.price} />
          </div>
          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">توضیحات:</p>
            <Input disabled readOnly className="flex-1 py-2" value={item.message} />
          </div>
        </div>
      ));
    }
    return <p className="text-center text-gray-800 col-span-12">اطلاعات استفاده از بیمه موجود نیست .</p>;
  };
  const RenderWarrantyData = () => {
    if (
      ContractData &&
      ContractData.approvedInquiryRequest &&
      ContractData.approvedInquiryRequest.responseJson &&
      ContractData.approvedInquiryRequest.responseJson.factoryInformation &&
      ContractData.approvedInquiryRequest.responseJson.factoryInformation.warranty
    ) {
      return (
        <>
          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">تاریخ شروع گارانتی :</p>
            <Input disabled readOnly className="flex-1 py-2" value={new Date(ContractData.approvedInquiryRequest.responseJson.factoryInformation.warranty.startDate).toLocaleString("fa")} />
          </div>
          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">تاریخ پایان گارانتی :</p>
            <Input disabled readOnly className="flex-1 py-2" value={new Date(ContractData.approvedInquiryRequest.responseJson.factoryInformation.warranty.endDate).toLocaleString("fa")} />
          </div>
          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">وضعیت جاری گارانتی خودرو :</p>
            <Input disabled readOnly className="flex-1 py-2" value={ContractData.approvedInquiryRequest.responseJson.factoryInformation.warranty.status} />
          </div>
        </>
      );
    }
    return <p className="text-center text-gray-800 col-span-12">اطلاعات گارانتی موجود نیست .</p>;
  };
  const RenderFreeWayTolData = () => {
    if (
      ContractData &&
      ContractData.approvedInquiryRequest &&
      ContractData.approvedInquiryRequest.responseJson &&
      ContractData.approvedInquiryRequest.responseJson.freeWayToll &&
      ContractData.approvedInquiryRequest.responseJson.freeWayToll
    ) {
      return (
        <>
          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">مبلغ :</p>
            <Input disabled readOnly className="flex-1 py-2" value={ContractData.approvedInquiryRequest.responseJson.freeWayToll.price} />
          </div>
          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">وضعیت :</p>
            <Input disabled readOnly className="flex-1 py-2" value={ContractData.approvedInquiryRequest.responseJson.freeWayToll.status} />
          </div>
        </>
      );
    }
    return <p className="text-center text-gray-800 col-span-12">اطلاعات عوارض آزاد راهی موجود نیست .</p>;
  };
  const RenderInfractionData = () => {
    if (ContractData && ContractData.approvedInquiryRequest && ContractData.approvedInquiryRequest.responseJson && ContractData.approvedInquiryRequest.responseJson.infraction) {
      return (
        <>
          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">مبلغ :</p>
            <Input disabled readOnly className="flex-1 py-2" value={ContractData.approvedInquiryRequest.responseJson.infraction.price} />
          </div>
          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">وضعیت :</p>
            <Input disabled readOnly className="flex-1 py-2" value={ContractData.approvedInquiryRequest.responseJson.infraction.status} />
          </div>
        </>
      );
    }
    return <p className="text-center text-gray-800 col-span-12">اطلاعات خلافی خودرو موجود نیست .</p>;
  };
  const RenderTaxData = () => {
    if (ContractData && ContractData.approvedInquiryRequest && ContractData.approvedInquiryRequest.responseJson && ContractData.approvedInquiryRequest.responseJson.tax) {
      return (
        <>
          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">مبلغ :</p>
            <Input disabled readOnly className="flex-1 py-2" value={ContractData.approvedInquiryRequest.responseJson.tax.price} />
          </div>
          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">وضعیت :</p>
            <Input disabled readOnly className="flex-1 py-2" value={ContractData.approvedInquiryRequest.responseJson.tax.status} />
          </div>
        </>
      );
    }
    return <p className="text-center text-gray-800 col-span-12">اطلاعات مالیات نقل و انتقال موجود نیست .</p>;
  };
  const RenderTechnicalData = () => {
    if (ContractData && ContractData.approvedInquiryRequest && ContractData.approvedInquiryRequest.responseJson && ContractData.approvedInquiryRequest.responseJson.technicalDiagnosis) {
      return (
        <>
          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">سیستم سوخت رسانی :</p>
            <Input disabled readOnly className="flex-1 py-2" value={ContractData.approvedInquiryRequest.responseJson.technicalDiagnosis.fuelSystem} />
          </div>
          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">وضعیت معاینه فنی :</p>
            <Input disabled readOnly className="flex-1 py-2" value={ContractData.approvedInquiryRequest.responseJson.technicalDiagnosis.status} />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">تاریخ اعتبار معاینه فنی :</p>
            <Input disabled readOnly className="flex-1 py-2" value={new Date(ContractData.approvedInquiryRequest.responseJson.technicalDiagnosis.validityDate).toLocaleString("fa")} />
          </div>
        </>
      );
    }
    return <p className="text-center text-gray-800 col-span-12">اطلاعات معاینه فنی خودرو موجود نیست .</p>;
  };
  const RenderSellersData = () => {
    if (ContractData && ContractData.contractSellers && ContractData.contractSellers.length > 0) {
      return ContractData.contractSellers.map((item) => (
        <div
          className={`grid grid-cols-12 col-span-12 items-center space-y-4 md:space-y-0 md:gap-10 py-5  ${ContractData.contractSellers.length > 1 ? "py-5 border-b border-b-gray-300" : ""}`}
          key={item.id}
        >
          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">نام :</p>
            <Input disabled readOnly value={item.person.firstName} className="flex-1 py-2" />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> نام خانوادگی :</p>
            <Input disabled readOnly value={item.person.lastName} className="flex-1 py-2" />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">نام پدر :</p>
            <Input disabled readOnly value={item.person.fatherName} className="flex-1 py-2" />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">کد ملی :</p>
            <Input disabled readOnly value={item.person.nationalCode} className="flex-1 py-2" />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">موبایل :</p>
            <Input disabled readOnly value={item.person.phoneNumber} className="flex-1 py-2" />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">شماره شناسنامه :</p>
            <Input disabled readOnly value={item.person.identificationNumber} className="flex-1 py-2" />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">محل تولد :</p>
            <Input disabled readOnly value={item.person.birthPlace} className="flex-1 py-2" />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">محل صدور شناسنامه :</p>
            <Input disabled readOnly value={item.person.certificateIssuanceCity} className="flex-1 py-2" />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">تاریخ تولد :</p>
            <Input disabled readOnly value={new Date(item.person.birthDate).toLocaleDateString("fa-ir")} className="flex-1 py-2" />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">کد پستی :</p>
            <Input disabled readOnly value={item.person.postalCode} className="flex-1 py-2" />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-12 lg:col-span-8">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">آدرس :</p>
            <Input disabled readOnly value={item.person.address} className="flex-1 py-2" />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">سهم فروش :</p>
            <Input disabled readOnly value={item.sharePersentage} className="flex-1 py-2" />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">نوع سهم :</p>
            <Input disabled readOnly value={item.shareTypeDescription} className="flex-1 py-2" />
          </div>
        </div>
      ));
    }
    return <p className="text-center text-gray-800 col-span-12">اطلاعات فروشنده موجود نیست .</p>;
  };
  const RenderBuyerData = () => {
    if (ContractData && ContractData.contractBuyers && ContractData.contractBuyers.length > 0) {
      return ContractData.contractBuyers.map((item) => {
        return (
          <div
            className={`grid grid-cols-12 col-span-12 items-center space-y-4 md:space-y-0 md:gap-10 py-5 ${ContractData.contractBuyers.length > 1 ? "py-5 border-b border-b-gray-300" : ""}`}
            key={item.id}
          >
            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">نام :</p>
              <Input disabled readOnly value={item.person.firstName} className="flex-1 py-2" />
            </div>

            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> نام خانوادگی :</p>
              <Input disabled readOnly value={item.person.lastName} className="flex-1 py-2" />
            </div>

            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">نام پدر :</p>
              <Input disabled readOnly value={item.person.fatherName} className="flex-1 py-2" />
            </div>

            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">کد ملی :</p>
              <Input disabled readOnly value={item.person.nationalCode} className="flex-1 py-2" />
            </div>

            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">موبایل :</p>
              <Input disabled readOnly value={item.person.phoneNumber} className="flex-1 py-2" />
            </div>

            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">شماره شناسنامه :</p>
              <Input disabled readOnly value={item.person.identificationNumber} className="flex-1 py-2" />
            </div>

            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">محل تولد :</p>
              <Input disabled readOnly value={item.person.birthPlace} className="flex-1 py-2" />
            </div>

            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">محل صدور شناسنامه :</p>
              <Input disabled readOnly value={item.person.certificateIssuanceCity} className="flex-1 py-2" />
            </div>

            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">تاریخ تولد :</p>
              <Input disabled readOnly value={new Date(item.person.birthDate).toLocaleDateString("fa-ir")} className="flex-1 py-2" />
            </div>

            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">کد پستی :</p>
              <Input disabled readOnly value={item.person.postalCode} className="flex-1 py-2" />
            </div>

            <div className="flex flex-col items-start col-span-12 md:col-span-12 lg:col-span-8">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">آدرس :</p>
              <Input disabled readOnly value={item.person.address} className="flex-1 py-2" />
            </div>

            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">سهم فروش :</p>
              <Input disabled readOnly value={item.sharePersentage} className="flex-1 py-2" />
            </div>

            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">نوع سهم :</p>
              <Input disabled readOnly value={item.shareTypeDescription} className="flex-1 py-2" />
            </div>
          </div>
        );
      });
    }
    return <p className="text-center text-gray-800 col-span-12">اطلاعات خریدار موجود نیست .</p>;
  };
  const RenderContractData = () => {
    if (ContractData && ContractData.contract) {
      return (
        <>
          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">مبلغ (ریال) :</p>
            <Input disabled readOnly value={ContractData.contract.amount.toLocaleString()} className="flex-1 py-2" />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">تاریخ محضر :</p>
            <Input disabled readOnly value={new Date(ContractData.contract.date).toLocaleDateString("fa-ir")} className="flex-1 py-2" />
          </div>

          <div className="flex flex-col items-start col-span-12  lg:col-span-8">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">توضیحات :</p>
            <Textarea disabled readOnly value={ContractData.contract.description} className="flex-1 py-2" />
          </div>
        </>
      );
    }
    return <p className="text-center text-gray-800 col-span-12">اطلاعات قرارداد موجود نیست .</p>;
  };
  const RenderPaymentData = () => {
    if (ContractData && ContractData.contractPayments && ContractData.contractPayments.length > 0) {
      return ContractData.contractPayments.map((item) => {
        return (
          <div
            className={`grid grid-cols-12 col-span-12 items-center space-y-4 md:space-y-0 md:gap-10 ${ContractData.contractPayments.length > 1 ? "py-5 border-b border-b-gray-300" : ""}`}
            key={item.id}
          >
            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">مبلغ (ریال) :</p>
              <Input disabled readOnly value={item.amount.toLocaleString()} className="flex-1 py-2" />
            </div>

            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">تاریخ پرداخت :</p>
              <Input disabled readOnly value={new Date(item.payDate).toLocaleDateString("fa-ir")} className="flex-1 py-2" />
            </div>

            <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> نوع پرداخت :</p>
              <Input disabled readOnly value={item.type} className="flex-1 py-2" />
            </div>

            <div className="flex flex-col items-start col-span-12  lg:col-span-8">
              <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">توضیحات :</p>
              <Textarea disabled readOnly value={item.description} className="flex-1 py-2" />
            </div>
          </div>
        );
      });
    }
    return <p className="text-center text-gray-800 col-span-12">اطلاعات نحوه پرداخت موجود نیست .</p>;
  };

  const isDisabledFinalAcceptButton =
    (ContractData && !ContractData.contractPayments) ||
    (ContractData && ContractData.contractPayments && ContractData.contractPayments.length === 0) ||
    (ContractData && !ContractData.contractSellers) ||
    (ContractData && ContractData.contractSellers.length === 0) ||
    (ContractData && !ContractData.contractBuyers) ||
    (ContractData && ContractData.contractBuyers.length === 0) ||
    (ContractData && !ContractData.approvedInquiryRequest);
  return (
    <div className="mt-20 max-w-7xl mx-auto px-5">
      {ContractData && (
        <>
          {ContractData?.contract?.contractState === "Signed" && (
            <div className="bg white border border-green-600 flex items-center justify-start p-5 rounded-md bg-green-100">
              <IoCheckmarkDoneCircleOutline className="text-green-600 text-2xl" />
              <p className="mr-3 text-green-600">قرارداد ثبت نهایی شده است</p>
            </div>
          )}
          <div className="flex items-center justify-center py-10 px-5 w-full bg-white rounded-xl shadow-md my-10 dark:bg-card">
            <div className="grid grid-cols-12 items-center space-y-4 md:space-y-0 md:gap-10 w-full md:w-[80%]">
              <div className="flex items-center gap-5 col-span-12">
                <FaCarSide className="text-primary text-4xl" />
                <p className="text-right text-2xl font-bold  text-primary">اطلاعات خودرو </p>
              </div>
              <RenderCarData />
              <div className="flex items-center gap-5 col-span-12">
                <FaIdCardAlt className="text-primary text-4xl" />
                <p className="text-right text-2xl font-bold col-span-12 text-primary">بیمه خودرو</p>
              </div>
              <RenderInsuranceData />
              <div className="flex items-center gap-5 col-span-12">
                <FaIdCard className="text-primary text-4xl" />
                <p className="text-right text-2xl font-bold col-span-12 text-primary">استفاده از بیمه</p>
              </div>
              <RenderInsuranceUsedData />
              <div className="flex items-center gap-5 col-span-12">
                <RiArticleLine className="text-primary text-4xl" />
                <p className="text-right text-2xl font-bold col-span-12 text-primary"> اطلاعات گارانتی</p>
              </div>
              <RenderWarrantyData />
              <div className="flex items-center gap-5 col-span-12">
                <TbReportSearch className="text-primary text-4xl" />
                <p className="text-right text-2xl font-bold col-span-12 text-primary">اطلاعات عوارض آزاد راهی</p>
              </div>
              <RenderFreeWayTolData />
              <div className="flex items-center gap-5 col-span-12">
                <GiPoliceCar className="text-primary text-4xl" />
                <p className="text-right text-2xl font-bold col-span-12 text-primary">اطلاعات خلافی خودرو</p>
              </div>
              <RenderInfractionData />
              <div className="flex items-center gap-5 col-span-12">
                <TbReceiptTax className="text-primary text-4xl" />
                <p className="text-right text-2xl font-bold col-span-12 text-primary">اطلاعات مالیات نقل و انتقال خودرو</p>
              </div>
              <RenderTaxData />
              <div className="flex items-center gap-5 col-span-12">
                <IoMdSettings className="text-primary text-4xl" />
                <p className="text-right text-2xl font-bold col-span-12 text-primary">اطلاعات معاینه فنی خودرو </p>
              </div>
              <RenderTechnicalData />
              <div className="flex items-center gap-5 col-span-12">
                <MdPerson className="text-primary text-4xl" />
                <p className="text-right text-2xl font-bold col-span-12 text-primary">اطلاعات فروشنده</p>
              </div>
              <RenderSellersData />
              <div className="flex items-center gap-5 col-span-12">
                <MdPerson className="text-primary text-4xl" />
                <p className="text-right text-2xl font-bold col-span-12 text-primary">اطلاعات خریدار</p>
              </div>
              <RenderBuyerData />
              <div className="flex items-center gap-5 col-span-12">
                <FaHandshake className="text-primary text-4xl" />
                <p className="text-right text-2xl font-bold col-span-12 text-primary">اطلاعات قرارداد</p>
              </div>
              <RenderContractData />
              <div className="flex items-center gap-5 col-span-12">
                <MdOutlinePayment className="text-primary text-4xl" />
                <p className="text-right text-2xl font-bold col-span-12 text-primary">اطلاعات نحوه پرداخت</p>
              </div>
              <RenderPaymentData />
              {ContractData?.contract?.contractState === "Draft" && !isDisabledFinalAcceptButton && (
                <Button disabled={finalConfirmPending} onClick={finalConfirmHandler} className="self-start col-span-12 md:col-span-6 lg:col-span-4">
                  {finalConfirmPending ? "در حال ثبت..." : "ثبت نهایی قولنامه"}
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default ContractDetails;
