import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import type { FC } from "react";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { FaCarSide, FaHandshake } from "react-icons/fa";
import { MdOutlinePayment, MdPerson } from "react-icons/md";
import { Button } from "../../ui/button";
import type { ContractResponse } from "@/type/onlineContact.types";

interface PropsType {
  ContractData: ContractResponse | null | undefined;
  finalConfirmPending?: boolean;
  finalConfirmHandler: () => Promise<void | never>;
}

const OfflineContractDetails: FC<PropsType> = ({ ContractData, finalConfirmHandler, finalConfirmPending }) => {
  const RenderCarData = () => {
    if (ContractData && ContractData.contract) {
      return (
        <>
          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">سیستم خودرو :</p>
            <Input disabled readOnly className="flex-1 py-2" value={ContractData.contract.carSystem.title ? ContractData.contract.carSystem.title : ""} />
          </div>
          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> رنگ خودرو :</p>
            <Input disabled readOnly className="flex-1 py-2" value={ContractData.contract.color.title ? ContractData.contract.color.title : ""} />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> سال ساخت خودرو :</p>
            <Input disabled readOnly className="flex-1 py-2" value={ContractData.contract.carManufactureYear} />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> نوع خودرو :</p>
            <Input disabled readOnly className="flex-1 py-2" value={ContractData.contract.carType.title ? ContractData.contract.carType.title : ""} />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> تاریخ قرار داد :</p>
            <Input disabled readOnly className="flex-1 py-2" value={new Date(ContractData.contract.date).toLocaleString("fa", { dateStyle: "short" })} />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground">شماره موتور:</p>
            <Input disabled readOnly className="flex-1 py-2" value={ContractData.contract.motorNumber} />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> قیمت:</p>
            <Input disabled readOnly className="flex-1 py-2" value={ContractData.contract.amount} />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> قیمت به حروف :</p>
            <Input disabled readOnly className="flex-1 py-2" value={ContractData.contract.amountInWords} />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> مبلغ خسارت :</p>
            <Input disabled readOnly className="flex-1 py-2" value={ContractData.contract.damageAmount} />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> تاریخ محضر :</p>
            <Input disabled readOnly className="flex-1 py-2" value={new Date(ContractData.contract.notaryDate).toLocaleString("fa", { dateStyle: "short" })} />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> شماره محضر :</p>
            <Input disabled readOnly className="flex-1 py-2" value={ContractData.contract.notaryNumber} />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> شماره شاسی :</p>
            <Input disabled readOnly className="flex-1 py-2" value={ContractData.contract.chassisNumber} />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> هزینه محضر :</p>
            <Input disabled readOnly className="flex-1 py-2" value={ContractData.contract.notaryFeePayerDescription} />
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> تاریخ تحویل :</p>
            <Input disabled readOnly className="flex-1 py-2" value={new Date(ContractData.contract.vehicleDeliveryDate).toLocaleString("fa", { dateStyle: "short" })} />
          </div>
          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> مدارک تحویل :</p>
            <Input disabled readOnly className="flex-1 py-2" value={ContractData.contract.carDocumentHolderDescription} />
          </div>
          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> پلاک :</p>
            <Input disabled readOnly className="flex-1 py-2" value={ContractData.contract.plateNumber} />
          </div>
          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 ">
            <p className="text-gray-800 text-center text-sm text-nowrap p-2 dark:text-card-foreground"> توضیحات :</p>
            <Textarea disabled readOnly className="flex-1 py-2" value={ContractData.contract.description} />
          </div>
        </>
      );
    }
    return <p className="text-center text-gray-800 col-span-12">اطلاعات خودرو موجود نیست .</p>;
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
              <Input disabled readOnly value={item.typeDescription} className="flex-1 py-2" />
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
    (ContractData && !ContractData.contract);
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
export default OfflineContractDetails;
