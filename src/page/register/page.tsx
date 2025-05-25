import { useState } from "react";
import { useRegisterStepStore, useRegisterStore } from "../../store/register/store";
import { useNavigate } from "react-router-dom";
import { RegisterSteps, VERIFY_OTP_TOKEN } from "../../constants/constants";
import { enqueueSnackbar } from "notistack";
import ResponseLoading from "../../components/common/responseLoading/ResponseLoading";
import ValidatePhoneNumber from "../../components/page/register/ValidatePhoneNumber";
import ValidateOtp from "../../components/page/register/ValidateOtp";
import RegisterData from "../../components/page/register/RegisterData";
import SsoLogin from "../../sso/SsoLogin";

const Register = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const registerStep = useRegisterStepStore((state) => state.registerStep);
  const setRegisterStep = useRegisterStepStore((state) => state.setRegisterStep);
  const checkAuthenticated = useRegisterStore((state) => state.checkAuthenticated);
  const verifyToken = useRegisterStore((state) => state.verifyToken);
  const navigate = useNavigate();

  const handleUpdatePhoneNumber = (input: string): void => {
    setPhoneNumber(input);
  };

  const handleCompletedRegisterOrLogin = (token: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(VERIFY_OTP_TOKEN, token);
      setTimeout(() => {
        checkAuthenticated();
        navigate("/");
        enqueueSnackbar({ message: "ورود با موفقیت انجام شد", variant: "success" });
        setRegisterStep(RegisterSteps.LOGIN);
      });
    }
  };

  if (verifyToken) {
    return <ResponseLoading />;
  }

  return (
    <div className="h-[calc(100vh-68px)] flex items-center justify-center overflow-y-hidden">
      <div className={`bg-white w-[400px] min-h-[${RegisterSteps.SELECT_APPROACH ? "200px" : "420px"}] rounded-lg shadow-md flex items-center justify-between flex-col dark:bg-card`}>
        {registerStep === RegisterSteps.PHONE_NUMBER ? (
          <ValidatePhoneNumber handleUpdatePhoneNumber={handleUpdatePhoneNumber} />
        ) : registerStep === RegisterSteps.OTP ? (
          <ValidateOtp handleUpdatePhoneNumber={handleUpdatePhoneNumber} handleCompletedRegisterOrLogin={handleCompletedRegisterOrLogin} phoneNumber={phoneNumber} />
        ) : registerStep === RegisterSteps.REGISTER_DATA ? (
          <RegisterData phoneNumber={phoneNumber} handleCompletedRegisterOrLogin={handleCompletedRegisterOrLogin} />
        ) : (
          <SsoLogin />
        )}
      </div>
    </div>
  );
};

export default Register;
