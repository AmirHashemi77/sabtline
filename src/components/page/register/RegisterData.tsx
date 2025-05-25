import type { FC } from "react";
import { useGenerateOtpAndRegister } from "../../../services/register/registerService";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerDataSchema } from "../../../schema/registerSchema";
import { isAxiosError, type AxiosResponse } from "axios";
import { enqueueSnackbar } from "notistack";
import ResponseLoading from "../../common/responseLoading/ResponseLoading";
import ContainerInput from "../../common/input/ContainerInput";
import { Input } from "../../ui/input";
import ErrorMessage from "../../common/errorMessage/ErrorMessage";
import { Button } from "../../ui/button";

interface IProps {
  handleCompletedRegisterOrLogin: (token: string) => void;
  phoneNumber: string;
}

interface IRegisterForm {
  firstName: string;
  lastName: string;
  nationalCode: string;
}

interface IResponse {
  protect_token: string;
  expiration_time: Date;
}

const RegisterData: FC<IProps> = ({ phoneNumber, handleCompletedRegisterOrLogin }) => {
  const { isPending, mutate } = useGenerateOtpAndRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({
    resolver: zodResolver<IRegisterForm, unknown, IRegisterForm>(registerDataSchema),
  });

  const onSubmit: SubmitHandler<IRegisterForm> = (data) => {
    mutate(
      { ...data, phoneNumber },
      {
        onSuccess: (successData: AxiosResponse<IResponse>) => {
          handleCompletedRegisterOrLogin(successData?.data?.protect_token);
        },
        onError: (error: Error) => {
          if (isAxiosError(error)) {
            enqueueSnackbar({ message: error.response?.data, variant: "error" });
          }
        },
      }
    );
  };

  return (
    <>
      <ResponseLoading isPending={isPending} />
      <p className="text-xl text-center mt-5 opacity-70 font-semibold">
        {" "}
        سامانه رسمی معاملات خودرو <span className="text-primary">ثبت لاین</span>
      </p>

      <div className="flex items-start justify-between w-full flex-col">
        <ContainerInput>
          <Input {...register("firstName")} className="mt-5 w-[90%] mx-auto  py-6" placeholder="نام" />
          <div className="mr-5">
            <ErrorMessage error={errors.firstName} />
          </div>
        </ContainerInput>

        <ContainerInput>
          <Input {...register("lastName")} className="mt-5 w-[90%] mx-auto  py-6" placeholder="نام خانوادگی" />
          <div className="mr-5">
            <ErrorMessage error={errors.lastName} />
          </div>
        </ContainerInput>

        <ContainerInput>
          <Input {...register("nationalCode")} className="mt-5 w-[90%] mx-auto  py-6" placeholder="کد ملی" />
          <div className="mr-5">
            <ErrorMessage error={errors.nationalCode} />
          </div>
        </ContainerInput>
      </div>

      <Button type="submit" onClick={handleSubmit(onSubmit)} className="bg-primary w-[90%] py-6 mb-5 hover:bg-blue-900">
        تکمیل ثبت نام
      </Button>
    </>
  );
};

export default RegisterData;
