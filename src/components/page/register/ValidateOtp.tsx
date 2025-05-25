import { useEffect, useState, type FC } from "react";
import { useRegisterStepStore } from "../../../store/register/store";
import { useGenerateToken, useVerifyOtp } from "../../../services/register/registerService";
import { isAxiosError, type AxiosResponse } from "axios";
import { enqueueSnackbar } from "notistack";
import ResponseLoading from "../../common/responseLoading/ResponseLoading";
import { RegisterSteps } from "../../../constants/constants";
import { LiaEdit } from "react-icons/lia";
import { InputOTP, InputOTPSeparator, InputOTPSlot } from "../../ui/input-otp";
import { Button } from "../../ui/button";
import { REGEXP_ONLY_DIGITS } from "input-otp";

interface IProps {
  phoneNumber: string;
  handleCompletedRegisterOrLogin: (token: string) => void;
  handleUpdatePhoneNumber: (value: string) => void;
}

interface IGenerateTokenResponse {
  protect_token: string;
  expiration_time: Date;
}

const ValidateOtp: FC<IProps> = ({ handleCompletedRegisterOrLogin, phoneNumber, handleUpdatePhoneNumber }) => {
  const setRegisterStep = useRegisterStepStore((state) => state.setRegisterStep);
  const [otpValue, setOtpValue] = useState<string>("");
  const [generateTokenResponse, setGenerateTokenResponse] = useState<IGenerateTokenResponse>({
    protect_token: "",
    expiration_time: new Date(),
  });
  const { isPending, mutate } = useGenerateToken();
  const { isPending: verifyOtpPending, mutate: verifyOtpMutate } = useVerifyOtp();

  const onCompleteOtp = (): void => {
    if (!otpValue || (otpValue && otpValue.length < 6)) {
      return;
    }

    verifyOtpMutate(
      {
        phoneNumber,
        protectedToken: generateTokenResponse.protect_token,
        verifyToken: otpValue,
      },
      {
        onSuccess: (data: AxiosResponse<{ token: string }>) => {
          handleCompletedRegisterOrLogin(data.data.token);
        },
        onError: (error: Error) => {
          if (isAxiosError(error)) {
            enqueueSnackbar({
              message: typeof error.response?.data === "string" ? error.response?.data : error.response?.data?.title,
              variant: "error",
            });
          }
        },
      }
    );
  };

  useEffect(() => {
    if (phoneNumber) {
      mutate(
        { phoneNumber },
        {
          onSuccess: (data: AxiosResponse<IGenerateTokenResponse>) => {
            setGenerateTokenResponse(data.data);
          },
          onError: (error) => {
            if (isAxiosError(error)) {
              enqueueSnackbar({ message: error.response?.data, variant: "error" });
            }
          },
        }
      );
    }
  }, []);

  return (
    <>
      <ResponseLoading isPending={isPending || verifyOtpPending} />

      <p className="text-xl text-center mt-5 opacity-70 font-semibold">
        {" "}
        سامانه رسمی معاملات خودرو <span className="text-primary">ثبت لاین</span>
      </p>

      <div>
        <p className="text-sm text-center opacity-70 mt-2">
          کد تایید به شماره همراه وارد شده پیامک شد{" "}
          <span
            onClick={() => {
              handleUpdatePhoneNumber("");
              setRegisterStep(RegisterSteps.PHONE_NUMBER);
            }}
            className="text-sm text-center opacity-70 flex items-center justify-center cursor-pointer mt-3"
          >
            {phoneNumber}
            <LiaEdit />
          </span>
        </p>
      </div>

      <div style={{ direction: "ltr" }} className="p-5 mx-auto">
        <InputOTP style={{ direction: "ltr" }} onChange={(value) => !value && setOtpValue("")} onComplete={(value) => setOtpValue(value)} dir="ltr" pattern={REGEXP_ONLY_DIGITS} maxLength={6}>
          <InputOTPSlot className="!rounded-md p-5 border-l" index={0} />
          <InputOTPSlot className="!rounded-md p-5 border-l" index={1} />
          <InputOTPSlot className="!rounded-md p-5 border-l" index={2} />
          <InputOTPSeparator />
          <InputOTPSlot className="!rounded-md p-5 border-l" index={3} />
          <InputOTPSlot className="!rounded-md p-5 border-l" index={4} />
          <InputOTPSlot className="!rounded-md p-5 border-l" index={5} />
        </InputOTP>
      </div>

      <Button onClick={onCompleteOtp} className="bg-primary w-[90%] mb-5 py-6 hover:bg-blue-900">
        تایید
      </Button>
    </>
  );
};

export default ValidateOtp;
