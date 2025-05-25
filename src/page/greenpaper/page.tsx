import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type FC } from "react";
import { useBankReturnRequest, useCreateInitialInquiryRequest, useVerifyInquiryRequest } from "../../services/onlineContract/onlineContractServices";
import { useContractStore } from "../../store/contract/store";
import { useRegisterStore } from "../../store/register/store";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { greenPaperFormSchema } from "../../schema/greenPaperSchema";
import { enqueueSnackbar } from "notistack";
import { Button } from "../../components/ui/button";
import { GrFormPreviousLink } from "react-icons/gr";
import BreadCrumbComponent from "../../components/common/breadcrumb/BreadCrumbComponent";
import ResponseLoading from "../../components/common/responseLoading/ResponseLoading";
import { FaCar } from "react-icons/fa";
import { Input } from "../../components/ui/input";
import ErrorMessage from "../../components/common/errorMessage/ErrorMessage";
import { InputOTP, InputOTPSeparator, InputOTPSlot } from "../../components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

interface ILoginForm {
  greenNumber?: string | null;
  qrCodeNumber?: string | null;
  sellerNationalCode: string;
  buyerNationalCode: string;
}

const GreenPaper: FC = () => {
  const [otpValue, setOtpValue] = useState<string>("");
  const [enterOtp, setEnterOtp] = useState<boolean>(false);
  const { isPending: createPending, mutateAsync: createMutate, data: createData } = useCreateInitialInquiryRequest();
  const { isPending: bankReturnPending, mutate: bankReturnMutate } = useBankReturnRequest();
  const { isPending: verifyInquiryPending, mutate: verifyInquiryMutate } = useVerifyInquiryRequest();
  const setVerifyInquiryData = useContractStore((state) => state.setVerifyInquiryData);
  const verifyToken = useRegisterStore((state) => state.verifyToken);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: zodResolver<ILoginForm, unknown, ILoginForm>(greenPaperFormSchema),
  });

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    if (verifyToken) {
      await createMutate({
        barcode: data.qrCodeNumber ? data.qrCodeNumber : "",
        nationalCode: data.buyerNationalCode,
        ownerNationalCode: data.sellerNationalCode,
        bookletNumber: data.greenNumber ? data.greenNumber : "",
        type: 1,
      });
      setTimeout(() => {
        enqueueSnackbar({ message: "پرداخت با موفقیت انجام شد", variant: "success" });
        setTimeout(() => {
          setEnterOtp(true);
        }, 20);
      }, 1000);
    } else {
      enqueueSnackbar({ message: "لطفا وارد حساب کاربری شوید.", variant: "error" });
    }
  };

  const handleAcceptButtonClick = async () => {
    if (otpValue.length === 6 && createData) {
      bankReturnMutate(
        { initialInquiryRequestBusinessId: createData.data },
        {
          onSuccess: (data) => {
            if (data.data) {
              verifyInquiryMutate(
                { verificationCode: "11111", inquiryCode: data.data },
                {
                  onSuccess: (data) => {
                    setVerifyInquiryData(data);
                    navigate("/onlinecontract");
                  },
                }
              );
            }
          },
        }
      );
      // setTriggerModal(true)
    }
  };

  return (
    <>
      <div className="flex items-center justify-center bg-gray-50 px-3 py-2 rounded-md dark:bg-card relative mt-10">
        <Button className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2">بازگشت</Button>
        <button className="md:hidden absolute left-8 top-1/2 -translate-y-1/2" onClick={() => navigate(-1)}>
          <GrFormPreviousLink className="text-2xl" />
        </button>
        <BreadCrumbComponent
          items={[
            { label: "خانه", link: "/" },
            { label: "استعلام اطلاعات خودرو", link: "" },
          ]}
        />
      </div>
      <div className="flex items-center justify-center h-[calc(100vh-115px)] px-5">
        {/* {triggerModal && <OnlineContractModal vehicleData={verifyInquiryData} />} */}
        <ResponseLoading isPending={createPending || bankReturnPending || verifyInquiryPending} />
        {!enterOtp ? (
          <div className="bg-white w-[450px] px-8 rounded-lg shadow-md dark:bg-card">
            <div className="flex items-center gap-4 mx-8 py-8">
              <FaCar className="text-primary text-3xl" />
              <p className="text-xl text-center opacity-70 font-semibold dark:text-card-foreground">دریافت اطلاعات اصالت خودرو</p>
            </div>

            <div className="flex flex-col item-center">
              <div className="flex flex-col items-start ">
                <Input {...register("greenNumber")} className="mt-5 w-[90%] mx-auto  py-6" placeholder="شماره برگ سبز خودرو" />
                <div className="mr-7 md:mr-8">
                  <ErrorMessage error={errors.greenNumber} />
                </div>
              </div>

              <p className="text-center text-gray-300 text-lg mt-5">یا</p>

              <div className="flex flex-col items-start ">
                <Input {...register("qrCodeNumber")} className="mt-5 w-[90%] mx-auto  py-6" placeholder="بارکد کارت خودرو" />
                <div className="mr-7 md:mr-8">
                  <ErrorMessage error={errors.qrCodeNumber} />
                </div>
              </div>

              {/*<div className="w-full border-b-2 border-gray-200 border-dashed mt-5"></div>*/}

              <div className="flex flex-col items-start ">
                <Input {...register("sellerNationalCode")} className="mt-5 w-[90%] mx-auto  py-6" placeholder="کد ملی صاحب خودرو" />
                <div className="mr-7 md:mr-8">
                  <ErrorMessage error={errors.sellerNationalCode} />
                </div>
              </div>

              <div className="flex flex-col items-start ">
                <Input {...register("buyerNationalCode")} className="mt-5 w-[90%] mx-auto  py-6" placeholder="کد ملی خریدار خودرو" />
                <div className="mr-7 md:mr-8">
                  <ErrorMessage error={errors.buyerNationalCode} />
                </div>
              </div>

              <Button type="submit" onClick={handleSubmit(onSubmit)} className="bg-primary w-[90%] my-8 mr-5 py-6 hover:bg-blue-900">
                دریافت اطلاعات خودرو
              </Button>
            </div>
          </div>
        ) : (
          enterOtp && (
            <div className="bg-white w-[450px] rounded-lg shadow-md flex items-center justify-between flex-col dark:bg-card">
              <div style={{ direction: "ltr" }} className="p-5 mx-auto">
                <div className="flex items-center justify-center flex-col w-full">
                  <InputOTP
                    style={{ direction: "ltr" }}
                    onChange={(value) => !value && setOtpValue("")}
                    onComplete={(value) => setOtpValue(value)}
                    dir="ltr"
                    pattern={REGEXP_ONLY_DIGITS}
                    maxLength={6}
                  >
                    <InputOTPSlot className="!rounded-md p-5 border-l" index={0} />
                    <InputOTPSlot className="!rounded-md p-5 border-l" index={1} />
                    <InputOTPSlot className="!rounded-md p-5 border-l" index={2} />
                    <InputOTPSeparator />
                    <InputOTPSlot className="!rounded-md p-5 border-l" index={3} />
                    <InputOTPSlot className="!rounded-md p-5 border-l" index={4} />
                    <InputOTPSlot className="!rounded-md p-5 border-l" index={5} />
                  </InputOTP>
                </div>
                <p className="text-sm text-center mt-8">
                  {" "}
                  زمان باقی مانده تا ارسال مجدد کد به فروشنده - <span>1:43</span>
                </p>
              </div>
              <Button onClick={handleAcceptButtonClick} type="submit" className="bg-primary w-[90%] my-8  py-6 hover:bg-blue-900">
                تایید
              </Button>
            </div>
          )
        )}
      </div>
    </>
  );
};
export default GreenPaper;
