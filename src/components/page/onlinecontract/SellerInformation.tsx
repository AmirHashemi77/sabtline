import { useEffect, useState, type FC } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import type { IPerson } from "../../../type/person.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { personSchema } from "../../../schema/onlineContractSchema";
import { useContractStore } from "../../../store/contract/store";
import { useAddPersonRequest, useGetPersonsByTypeQuery, useRemovePerson, useUpdatePersonRequest } from "../../../services/onlineContract/onlineContractServices";
import { ShareType } from "../../../constants/constants";
import { Button } from "../../ui/button";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import QaModal from "../../common/modal/QaModal";
import { Input } from "../../ui/input";
import ErrorMessage from "../../common/errorMessage/ErrorMessage";
import DatePickerComponent from "../../common/datePicker/DatePickerComponent";
import { DateObject } from "react-multi-date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { DataTable } from "../../ui/dataTable";

const SellerInformation: FC = () => {
  const columns = [
    {
      accessorKey: "name",
      header: "نام و نام خانوادگی",
    },
    {
      accessorKey: "nationalCode",
      header: "کد ملی",
    },
    {
      accessorKey: "fatherName",
      header: "نام پدر",
    },
    {
      accessorKey: "sharePersentage",
      header: "سهم",
    },
    {
      accessorKey: "action",
      header: "عملیات",
      cell: (tableData: any) => {
        return (
          <ActionButton
            person={{
              ...tableData?.row?.original.person,
              shareType: tableData?.row?.original?.shareType,
              share: tableData?.row?.original?.share,
              id: tableData?.row?.original?.id,
            }}
            businessIdArg={tableData?.row?.original?.person?.businessId}
          />
        );
      },
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    control,
  } = useForm<IPerson>({
    resolver: zodResolver<IPerson, unknown, IPerson>(personSchema),
  });

  const contractBusinessId = useContractStore((state) => state.contractBusinessId);
  const setHasSellerInformationData = useContractStore((state) => state.setHasSellerInformationData);

  const { isPending: personsByTypeQueryPending, data: personsByTypeQueryData, refetch: getPersonsByTypeQuery } = useGetPersonsByTypeQuery({ ContractBusinessId: contractBusinessId, Type: "Seller" });
  const { isPending: addPersonPending, mutateAsync: addPersonMutate } = useAddPersonRequest();
  const { isPending: updatePersonPending, mutateAsync: updatePersonMutate } = useUpdatePersonRequest();
  const { isPending: removePersonPending, mutateAsync: removePersonMutate } = useRemovePerson();

  const [tableData, setTableData] = useState();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [businessId, setBusinessId] = useState<string>("");

  useEffect(() => {
    if (contractBusinessId) {
      getPersonsByTypeQuery();
    }
  }, [contractBusinessId]);

  useEffect(() => {
    if (personsByTypeQueryData) {
      setTableData(
        personsByTypeQueryData.data.map((item: any) => {
          return {
            id: item.id,
            businessId: item.businessId,
            name: `${item.person.firstName} ${item.person.lastName}`,
            nationalCode: item.person.nationalCode,
            fatherName: item.person.fatherName,
            sharePersentage: `${item.sharePersentage} دانگ`,
            person: item.person,
            shareType: item.shareType,
            share: item.sharePersentage,
            action: <ActionButton person={{ ...item.person, shareType: item.shareType, share: item.share }} businessIdArg={item.person.businessId} />,
          };
        })
      );
      setHasSellerInformationData(personsByTypeQueryData.data && personsByTypeQueryData.data.length > 0);
    }
  }, [personsByTypeQueryData]);

  const onSubmit: SubmitHandler<IPerson> = async (data) => {
    const saveOrUpdateDto = {
      address: data.address,
      birthDate: data.birthDate,
      birthPlace: data.birthPlace,
      certificateIssuanceCity: data.certificateIssuanceCity,
      fatherName: data.fatherName,
      firstName: data.firstName,
      lastName: data.lastName,
      identificationNumber: data.identificationNumber,
      nationalCode: data.nationalCode,
      phoneNumber: data.phoneNumber,
      postalCode: data.postalCode,
      share: data.share,
      shareType: data.shareType,
      contractSide: "2",
      contractBusinessId: contractBusinessId ? contractBusinessId : "",
      ...(businessId && { personBusinessId: businessId }),
    };

    if (businessId) {
      await updatePersonMutate(saveOrUpdateDto);
    } else {
      await addPersonMutate(saveOrUpdateDto);
    }

    await getPersonsByTypeQuery();
    setValue("address", "");
    setValue("birthDate", "");
    setValue("birthPlace", "");
    setValue("certificateIssuanceCity", "");
    setValue("fatherName", "");
    setValue("firstName", "");
    setValue("lastName", "");
    setValue("identificationNumber", "");
    setValue("nationalCode", "");
    setValue("phoneNumber", "");
    setValue("postalCode", "");
    setValue("share", null);
    setValue("shareType", "");
    setBusinessId("");
  };

  const handlePassDataToDeleteRecord = (businessIdArg: string) => {
    setIsModalOpen(true);
    setBusinessId((businessIdArg as string) ?? businessId);
  };

  const handleDeleteRecord = async () => {
    setIsModalOpen(false);
    await removePersonMutate({
      personBusinessId: businessId,
      contractBusinessId,
    });
    await getPersonsByTypeQuery();
    setBusinessId("");

    if (personsByTypeQueryData) {
      setHasSellerInformationData(personsByTypeQueryData.data && personsByTypeQueryData.data.length > 0);
    }
  };

  const handleEditRecord = (person: IPerson) => {
    const findShareType = ShareType.find((value) => value.value === person.shareType);
    setBusinessId(person.businessId as string);
    setValue("firstName", person.firstName);
    setValue("lastName", person.lastName);
    setValue("fatherName", person.fatherName);
    setValue("identificationNumber", person.identificationNumber);
    setValue("birthPlace", person.birthPlace);
    setValue("birthDate", person.birthDate);
    setValue("certificateIssuanceCity", person.certificateIssuanceCity);
    setValue("nationalCode", person.nationalCode);
    setValue("address", person.address);
    setValue("phoneNumber", person.phoneNumber);
    setValue("postalCode", person.postalCode);
    setValue("share", person.share);
    if (findShareType) {
      setValue("shareType", findShareType!.value);
    }
  };

  const ActionButton = ({ businessIdArg, person }: { businessIdArg?: string; person: IPerson }) => (
    <div className="flex items-center justify-center gap-2">
      <Button disabled={removePersonPending} onClick={() => !removePersonPending && handlePassDataToDeleteRecord(businessIdArg as string)}>
        {removePersonPending ? "....." : <FaRegTrashAlt />}
      </Button>
      <Button onClick={() => handleEditRecord(person)}>
        <MdEdit />
      </Button>
    </div>
  );

  return (
    <>
      <QaModal onAccept={handleDeleteRecord} onCancel={() => setIsModalOpen(false)} isOpen={isModalOpen} />
      <div className="flex items-center justify-center py-10 px-5 w-full">
        <div className="grid grid-cols-12 items-center space-y-4 md:space-y-0 md:gap-10 w-full md:w-[80%]">
          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <Input {...register("firstName")} className="flex-1 py-2 " placeholder="نام" />
            <div className="h-5 mr-2">
              <ErrorMessage error={errors.firstName} />
            </div>
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <Input {...register("lastName")} className="flex-1 py-2 " placeholder="نام خانوادگی" />
            <div className="h-5 mr-2">
              <ErrorMessage error={errors.lastName} />
            </div>
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <Input {...register("fatherName")} className="flex-1 py-2 " placeholder="نام پدر" />
            <div className="h-5 mr-2">
              <ErrorMessage error={errors.fatherName} />
            </div>
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <Input {...register("nationalCode")} className="flex-1 py-2 " placeholder="کد ملی" />
            <div className="h-5 mr-2">
              <ErrorMessage error={errors.nationalCode} />
            </div>
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <Input {...register("phoneNumber")} className="flex-1 py-2 " placeholder="موبایل" />
            <div className="h-5 mr-2">
              <ErrorMessage error={errors.phoneNumber} />
            </div>
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <Input {...register("identificationNumber")} className="flex-1 py-2 " placeholder="شماره شناسنامه" />
            <div className="h-5 mr-2">
              <ErrorMessage error={errors.identificationNumber} />
            </div>
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <Input {...register("birthPlace")} className="flex-1 py-2 " placeholder="محل تولد" />
            <div className="h-5 mr-2">
              <ErrorMessage error={errors.birthPlace} />
            </div>
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <Input {...register("certificateIssuanceCity")} className="flex-1 py-2 " placeholder="محل صدور شناسنامه" />
            <div className="h-5 mr-2">
              <ErrorMessage error={errors.certificateIssuanceCity} />
            </div>
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 relative">
            <Controller
              control={control}
              name="birthDate"
              render={({ field: { onChange, value } }) => {
                return (
                  <DatePickerComponent
                    value={new DateObject({ date: new Date(value as any) }).toDate()}
                    onChange={(date) => {
                      onChange(date?.toDate().toISOString().replace("Z", ""));
                    }}
                    placeholder="تاریخ تولد"
                    maxDate={new DateObject().toDate()}
                  />
                );
              }}
            />

            <div className="h-5 mr-2">
              <ErrorMessage error={errors.birthDate} />
            </div>
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <Input {...register("postalCode")} className="flex-1 py-2 " placeholder="کد پستی" />
            <div className="h-5 mr-2">
              <ErrorMessage error={errors.postalCode} />
            </div>
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-12 lg:col-span-8">
            <Input {...register("address")} className="flex-1 py-2 " placeholder="آدرس" />
            <div className="h-5 mr-2">
              <ErrorMessage error={errors.address} />
            </div>
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-2">
            <Input {...register("share")} className="flex-1 py-2 " placeholder="سهم فروش" />
            <div className="h-5 mr-2">
              <ErrorMessage error={errors.share} />
            </div>
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-2">
            <Controller
              control={control}
              name="shareType"
              render={({ field: { onChange, value } }) => (
                <Select value={value} onValueChange={(value) => onChange(value)}>
                  <SelectTrigger dir="rtl" className="flex-1 py-2">
                    <SelectValue placeholder="نوع سهم" />
                  </SelectTrigger>
                  <SelectContent defaultValue={getValues().shareType}>
                    {ShareType.map((val) => (
                      <SelectItem dir="rtl" key={val.value} value={val.value}>
                        {val.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            <div className="h-5 mr-2">
              <ErrorMessage error={errors.shareType} />
            </div>
          </div>

          <Button disabled={addPersonPending} onClick={handleSubmit(onSubmit)} className="self-start col-span-12 md:col-span-6 lg:col-span-2">
            {addPersonPending || updatePersonPending ? "در حال ثبت" : " ثبت فروشنده"}
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-10 w-full">{personsByTypeQueryPending ? "لطفا صبر کنید..." : <DataTable data={tableData ? tableData : []} columns={columns} />}</div>
    </>
  );
};

export default SellerInformation;
