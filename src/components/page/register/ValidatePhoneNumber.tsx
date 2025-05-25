import type { FC } from "react";
import { useCheckUserRegistration } from "../../../services/register/registerService";
import { useRegisterStepStore } from "../../../store/register/store";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "../../../schema/registerSchema";
import { isAxiosError, type AxiosResponse } from "axios";
import { RegisterSteps } from "../../../constants/constants";
import { enqueueSnackbar } from "notistack";
import ResponseLoading from "../../common/responseLoading/ResponseLoading";
import ContainerInput from "../../common/input/ContainerInput";
import { Input } from "../../ui/input";
import ErrorMessage from "../../common/errorMessage/ErrorMessage";
import { Button } from "../../ui/button";

interface IProps {
  handleUpdatePhoneNumber: (input: string) => void;
}

interface ILoginForm {
  phoneNumber: string;
}

const ValidatePhoneNumber: FC<IProps> = ({ handleUpdatePhoneNumber }) => {
  const { mutate, isPending } = useCheckUserRegistration();
  const setRegisterStep = useRegisterStepStore((state) => state.setRegisterStep);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: zodResolver<ILoginForm, unknown, ILoginForm>(loginFormSchema),
  });

  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    mutate(data, {
      onSuccess: (onSuccessData: AxiosResponse<{ state: number; phoneNumber: string }>) => {
        handleUpdatePhoneNumber(data.phoneNumber);
        if (onSuccessData.data && onSuccessData.data.state === 1) {
          setRegisterStep(RegisterSteps.REGISTER_DATA);
        } else if (onSuccessData.data && onSuccessData.data.state === 2) {
          setRegisterStep(RegisterSteps.OTP);
        }
      },
      onError: (error: Error) => {
        if (isAxiosError(error)) {
          enqueueSnackbar({ message: error.response?.data, variant: "error" });
        }
      },
    });
  };

  return (
    <>
      <ResponseLoading isPending={isPending} />
      <p className="text-xl text-center mt-5 opacity-70 font-semibold">
        {" "}
        سامانه رسمی معاملات خودرو <span className="text-primary">ثبت لاین</span>
      </p>

      <img src="/images/loginCar.webp" alt="login-car" width="350" height="350" className="mx-auto" />

      <ContainerInput>
        <Input {...register("phoneNumber")} className=" w-[90%] mx-auto py-6" placeholder="شماره همراه" />
        <div className="mr-5">
          <ErrorMessage error={errors.phoneNumber} />
        </div>
      </ContainerInput>

      <Button type="submit" onClick={handleSubmit(onSubmit)} className="bg-primary w-[90%] mb-5 py-6 hover:bg-blue-900">
        ورود / ثبت نام
      </Button>
    </>
  );
};

export default ValidatePhoneNumber;
