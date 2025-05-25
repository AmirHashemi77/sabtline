import { useEffect, useState, type FC, type SetStateAction } from "react";
import type { Dispatch } from "redux";
import { useContractStore } from "../../../store/contract/store";
import { CONTRACT_ID } from "../../../constants/constants";
import { useGetContractDataQuery } from "../../../services/onlineContract/onlineContractServices";
import { useCreateOfflineContracts, useGetCarSystemQuery, useGetCarTypeQuery, useGetColorTitleQuery } from "../../../services/offlineContract/offlineContractServices";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ICarSystemResponse, IOfflineContractCarInformation } from "../../../type/offlineContract.types";
import { carInfoSchema } from "../../../schema/offlineContractSchema";
import ResponseLoading from "../../common/responseLoading/ResponseLoading";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import ErrorMessage from "../../common/errorMessage/ErrorMessage";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
// eslint-disable-next-line camelcase
import persian_fa from "react-date-object/locales/persian_fa";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import CarLicensePlateInput from "../../common/carLicensePlateInputs/CarLicensePlateInputs";

const carDocumentHolderArr = [
  {
    title: "هیچکدام",
    value: "0",
  },
  {
    title: "خریدار",
    value: "1",
  },
  {
    title: "فروشنده",
    value: "2",
  },
];

const CarInformation: FC<{ nextTabHandler: React.Dispatch<React.SetStateAction<number>> }> = ({ nextTabHandler }) => {
  const setContractBusinessId = useContractStore((state) => state.setContractBusinessId);
  const contractBusinessId =
    typeof window !== "undefined" && JSON.parse(localStorage.getItem(CONTRACT_ID) as string)?.state?.contractBusinessId
      ? JSON.parse(localStorage.getItem(CONTRACT_ID) as string).state.contractBusinessId
      : "";

  const { isLoading: contractDataPending, refetch: getContractData, data: contractData } = useGetContractDataQuery({ BusinessId: contractBusinessId });
  const { isLoading: colorTitlePending, refetch: colorTitleRefetch, data: colorTitleData } = useGetColorTitleQuery();
  const { isLoading: carSystemPending, refetch: carSystemRefetch, data: carSystemData } = useGetCarSystemQuery();
  const { isLoading: carTypePending, refetch: carTypeRefetch, data: carTypeData } = useGetCarTypeQuery();
  const { mutateAsync: createOfflineMutate, isPending: createOfflinePending, data: createOfflineData } = useCreateOfflineContracts();
  const [plateValues, setPlateValues] = useState<any>({
    "section-one": "",
    "section-two": "",
    "section-three": "",
    "section-four": "",
  });

  useEffect(() => {
    if (createOfflineData) {
      setContractBusinessId(createOfflineData.data);
      nextTabHandler(2);
    }
  }, [createOfflineData, setContractBusinessId]);

  useEffect(() => {
    if (contractBusinessId) {
      getContractData();
    }
  }, [contractBusinessId, getContractData]);

  useEffect(() => {
    if (contractData) {
      colorTitleRefetch();
      carSystemRefetch();
      carTypeRefetch();
      setValue("carTypeBusinessId", contractData.carType.businessId);
      setValue("carSystemBusinessId", contractData.carSystem.businessId);
      setValue("carManufactureYear", contractData.carManufactureYear);
      setValue("colorBusinessId", contractData.color.businessId);
      setValue("chassisNumber", contractData.chassisNumber);
      setValue("plateNumber", "");
      setValue("motorNumber", contractData.motorNumber);
      setValue("amount", contractData.amount);
      setValue("amountInWords", contractData.amountInWords);
      setValue("damageAmount", contractData.damageAmount);
      setValue("notaryDate", contractData.notaryDate);
      setValue("notaryNumber", contractData.notaryNumber);
      setValue("notaryFeePayer", contractData.notaryFeePayer === "Buyer" ? "1" : "2");
      setValue("vehicleDeliveryDate", contractData.vehicleDeliveryDate);
      setValue("carDocumentHolder", contractData.carDocumentHolder === "Buyer" ? "1" : "2");
      setValue("description", contractData.description);
      setValue("date", contractData.date);
    }
  }, [contractData]);

  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setValue,
    register,
  } = useForm<IOfflineContractCarInformation>({
    resolver: zodResolver<IOfflineContractCarInformation, unknown, IOfflineContractCarInformation>(carInfoSchema),
  });

  const onSubmit: SubmitHandler<IOfflineContractCarInformation> = async (data) => {
    const carInformationData = {
      ...data,
      notaryNumber: String(getValues().notaryNumber),
      type: "Offline",
    };
    await createOfflineMutate(carInformationData);

    setValue("carTypeBusinessId", "");
    setValue("carSystemBusinessId", "");
    setValue("carManufactureYear", null);
    setValue("colorBusinessId", "");
    setValue("chassisNumber", "");
    setValue("plateNumber", "");
    setValue("motorNumber", "");
    setValue("amount", null);
    setValue("amountInWords", "");
    setValue("damageAmount", null);
    setValue("notaryDate", "");
    setValue("notaryNumber", null);
    setValue("notaryFeePayer", "");
    setValue("vehicleDeliveryDate", "");
    setValue("carDocumentHolder", "");
    setValue("description", "");
    setValue("date", "");

    // nextTabHandler(2)
  };

  const carSystemGetter = async (open: boolean) => {
    if (open) {
      await carSystemRefetch();
    }
  };

  const carColorGetter = async (open: boolean) => {
    if (open) {
      await colorTitleRefetch();
    }
  };

  const carTypeGetter = async (open: boolean) => {
    if (open) {
      await carTypeRefetch();
    }
  };

  const handleUpdatePlateValue = ({ inputKey, inputValue }: { inputKey: string; inputValue: string }) => {
    setPlateValues({ ...plateValues, [inputKey]: inputValue });
  };
  useEffect(() => {
    setValue("plateNumber", `${plateValues["section-one"]}${plateValues["section-two"]}${plateValues["section-three"]}${plateValues["section-four"]}`);
  }, [plateValues, setValue]);

  return (
    <>
      <div className="flex items-center justify-center py-10 px-5 w-full ">
        <ResponseLoading isPending={contractDataPending} />
        <div className="grid grid-cols-12 items-center gap-10 w-full md:w-[80%]">
          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <Controller
              control={control}
              name="carSystemBusinessId"
              render={({ field: { onChange, value } }) => (
                <Select onOpenChange={carSystemGetter} value={value} onValueChange={(value) => onChange(value)}>
                  <SelectTrigger dir="rtl" className="flex-1 py-2">
                    <SelectValue placeholder={carSystemPending ? "در حال بارگزاری..." : "سیستم خودرو"} />
                  </SelectTrigger>
                  <SelectContent defaultValue={getValues().carSystemBusinessId}>
                    {carSystemData &&
                      carSystemData.data.map((val: ICarSystemResponse, index: number) => (
                        <SelectItem dir="rtl" key={index} value={val.businessId}>
                          {val.title}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              )}
            />

            <div className="h-5 mr-2">
              <ErrorMessage error={errors.carSystemBusinessId} />
            </div>
          </div>
          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 relative">
            <Controller
              control={control}
              name="date"
              render={({ field: { onChange, value } }) => {
                return (
                  <DatePicker
                    value={new DateObject({ date: new Date(value as any) }).toDate()}
                    onChange={(date) => {
                      onChange(date?.toDate().toISOString().replace("Z", ""));
                    }}
                    className="flex-1 py-2"
                    placeholder="تاریخ قرارداد"
                    containerClassName={"w-full"}
                    inputClass={
                      "flex h-10 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-4 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-0 focus:border-[3px] focus:border-primary focus:shadow-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:border-card-foreground dark:disabled:border-card-foreground dark:disabled:border-text-foreground"
                    }
                    format="YYYY/MM/DD"
                    calendar={persian}
                    maxDate={new DateObject().toDate()}
                    /* eslint-disable-next-line camelcase */
                    locale={persian_fa}
                  />
                );
              }}
            />

            <div className="h-5 mr-2">
              <ErrorMessage error={errors.date} />
            </div>
          </div>
          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <Controller
              control={control}
              name="colorBusinessId"
              render={({ field: { onChange, value } }) => (
                <Select onOpenChange={carColorGetter} value={value} onValueChange={(value) => onChange(value)}>
                  <SelectTrigger dir="rtl" className="flex-1 py-2">
                    <SelectValue placeholder={colorTitlePending ? "در حال بارگزاری..." : "رنگ خودرو"} />
                  </SelectTrigger>
                  <SelectContent defaultValue={getValues().colorBusinessId}>
                    {colorTitleData &&
                      colorTitleData.data.map((val: ICarSystemResponse, index: number) => (
                        <SelectItem dir="rtl" key={index} value={val.businessId}>
                          {val.title}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              )}
            />

            <div className="h-5 mr-2">
              <ErrorMessage error={errors.colorBusinessId} />
            </div>
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <Controller
              control={control}
              name="carTypeBusinessId"
              render={({ field: { onChange, value } }) => (
                <Select onOpenChange={carTypeGetter} value={value} onValueChange={(value) => onChange(value)}>
                  <SelectTrigger dir="rtl" className="flex-1 py-2">
                    <SelectValue placeholder={carTypePending ? "در حال بارگزاری..." : "نوع خودرو"} />
                  </SelectTrigger>
                  <SelectContent defaultValue={getValues().carTypeBusinessId}>
                    {carTypeData &&
                      carTypeData.data.map((val: ICarSystemResponse, index: number) => (
                        <SelectItem dir="rtl" key={index} value={val.businessId}>
                          {val.title}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              )}
            />

            <div className="h-5 mr-2">
              <ErrorMessage error={errors.carTypeBusinessId} />
            </div>
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <Input {...register("carManufactureYear")} className="flex-1 py-2 " placeholder="سال ساخت خودرو" />
            <div className="h-5 mr-2">
              <ErrorMessage error={errors.carManufactureYear} />
            </div>
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <Input {...register("motorNumber")} className="flex-1 py-2 " placeholder="شماره موتور" />
            <div className="h-5 mr-2">
              <ErrorMessage error={errors.motorNumber} />
            </div>
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <Input {...register("amount")} className="flex-1 py-2 " placeholder="قیمت" />
            <div className="h-5 mr-2">
              <ErrorMessage error={errors.amount} />
            </div>
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <Input {...register("amountInWords")} className="flex-1 py-2 " placeholder="قیمت به حروف" />
            <div className="h-5 mr-2">
              <ErrorMessage error={errors.amountInWords} />
            </div>
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <Input {...register("damageAmount")} className="flex-1 py-2 " placeholder="مبلغ خسارت" />
            <div className="h-5 mr-2">
              <ErrorMessage error={errors.damageAmount} />
            </div>
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 relative">
            <Controller
              control={control}
              name="notaryDate"
              render={({ field: { onChange, value } }) => {
                return (
                  <DatePicker
                    value={new DateObject({ date: new Date(value as any) }).toDate()}
                    onChange={(date) => {
                      onChange(date?.toDate().toISOString().replace("Z", ""));
                    }}
                    className="flex-1 py-2"
                    placeholder="تاریخ محضر"
                    containerClassName={"w-full"}
                    inputClass={
                      "flex h-10 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-4 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-0 focus:border-[3px] focus:border-primary focus:shadow-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:border-card-foreground dark:disabled:border-card-foreground dark:disabled:border-text-foreground"
                    }
                    format="YYYY/MM/DD"
                    calendar={persian}
                    maxDate={new DateObject().toDate()}
                    /* eslint-disable-next-line camelcase */
                    locale={persian_fa}
                  />
                );
              }}
            />

            <div className="h-5 mr-2">
              <ErrorMessage error={errors.notaryDate} />
            </div>
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <Input {...register("notaryNumber")} className="flex-1 py-2 " placeholder="شماره محضر" />
            <div className="h-5 mr-2">
              <ErrorMessage error={errors.notaryNumber} />
            </div>
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <Input {...register("chassisNumber")} className="flex-1 py-2 " placeholder="شماره شاسی" />
            <div className="h-5 mr-2">
              <ErrorMessage error={errors.chassisNumber} />
            </div>
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 relative">
            <Controller
              control={control}
              name="notaryFeePayer"
              render={({ field: { onChange, value } }) => (
                <Select value={value} onValueChange={(value) => onChange(value)}>
                  <SelectTrigger dir="rtl" className="flex-1 py-2">
                    <SelectValue placeholder="هزینه محضر" />
                  </SelectTrigger>
                  <SelectContent defaultValue={getValues().notaryFeePayer}>
                    {carDocumentHolderArr.map((val) => (
                      <SelectItem dir="rtl" key={val.value} value={val.value}>
                        {val.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            <div className="h-5 mr-2">
              <ErrorMessage error={errors.notaryFeePayer} />
            </div>
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 relative">
            <Controller
              control={control}
              name="vehicleDeliveryDate"
              render={({ field: { onChange, value } }) => {
                return (
                  <DatePicker
                    value={new DateObject({ date: new Date(value as any) }).toDate()}
                    onChange={(date) => {
                      onChange(date?.toDate().toISOString().replace("Z", ""));
                    }}
                    className="flex-1 py-2"
                    placeholder="تاریخ تحویل"
                    containerClassName={"w-full"}
                    inputClass={
                      "flex h-10 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-4 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-0 focus:border-[3px] focus:border-primary focus:shadow-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:border-card-foreground dark:disabled:border-card-foreground dark:disabled:border-text-foreground"
                    }
                    format="YYYY/MM/DD"
                    calendar={persian}
                    minDate={new DateObject().add(1, "d").toDate()}
                    /* eslint-disable-next-line camelcase */
                    locale={persian_fa}
                  />
                );
              }}
            />

            <div className="h-5 mr-2">
              <ErrorMessage error={errors.vehicleDeliveryDate} />
            </div>
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 relative">
            <Controller
              control={control}
              name="carDocumentHolder"
              render={({ field: { onChange, value } }) => (
                <Select value={value} onValueChange={(value) => onChange(value)}>
                  <SelectTrigger dir="rtl" className="flex-1 py-2">
                    <SelectValue placeholder="مدارک تحویل ..." />
                  </SelectTrigger>
                  <SelectContent defaultValue={getValues().carDocumentHolder}>
                    {carDocumentHolderArr.map((val) => (
                      <SelectItem dir="rtl" key={val.value} value={val.value}>
                        {val.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            <div className="h-5 mr-2">
              <ErrorMessage error={errors.carDocumentHolder} />
            </div>
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <CarLicensePlateInput getFinalValue={handleUpdatePlateValue} />
            <div className="h-5 mr-2">
              <ErrorMessage error={errors.plateNumber} />
            </div>
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-8">
            <Input {...register("description")} className="flex-1 py-2 " placeholder="توضیحات" />
          </div>
          <Button onClick={handleSubmit(onSubmit)} className="self-start col-span-12 md:col-span-6 lg:col-span-2">
            {createOfflinePending ? "در حال ثبت" : "ثبت مشخصات خودرو"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default CarInformation;
