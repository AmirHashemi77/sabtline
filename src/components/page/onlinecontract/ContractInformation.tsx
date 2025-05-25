import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, type FC } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { contractInfoSchema, pledgeInfoSchema } from "../../../schema/onlineContractSchema";
import { useContractStore } from "../../../store/contract/store";
import { useAddPaymentRequest, useGetPaymentsQuery, useLastStepUpdateRequest, useRemovePaymentRequest } from "../../../services/onlineContract/onlineContractServices";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
// eslint-disable-next-line camelcase
import persian_fa from "react-date-object/locales/persian_fa";
import { Button } from "../../ui/button";
import { FaRegTrashAlt } from "react-icons/fa";
import QaModal from "../../common/modal/QaModal";
import { Input } from "../../ui/input";
import ErrorMessage from "../../common/errorMessage/ErrorMessage";
import DatePickerComponent from "../../common/datePicker/DatePickerComponent";
import { Textarea } from "../../ui/textarea";
import { DataTable } from "../../ui/dataTable";

interface IContract {
  amount: string;
  date: string;
  description: string;
}

interface Ipledge {
  pledgeAmount: string;
  pledgeDate: string;
  description: string;
}

const ContractInformation: FC<{
  setIsSetPrice: React.Dispatch<React.SetStateAction<boolean>>;
  isSetPrice: boolean;
  handleUpdateIsSetPrice: (state: boolean) => void;
}> = ({ isSetPrice, setIsSetPrice, handleUpdateIsSetPrice }) => {
  const columns = [
    {
      accessorKey: "amount",
      header: "مبلغ(ریال)",
    },
    {
      accessorKey: "payDate",
      header: "تاریخ پرداخت",
    },
    {
      accessorKey: "type",
      header: "نوع پرداخت",
    },

    {
      accessorKey: "action",
      header: "عملیات",
      cell: (tableData: any) => <ActionButton businessIdArg={tableData?.row?.original.businessId} />,
    },
  ];

  const {
    register: contractRegister,
    handleSubmit: contractSubmit,
    formState: { errors: contractErrors },
    control: contractControl,
    setValue: contractSetValue,
  } = useForm<IContract>({
    resolver: zodResolver<IContract, unknown, IContract>(contractInfoSchema),
  });

  const {
    register: pledgeRegister,
    handleSubmit: pledgeSubmit,
    reset: resetPledgeForm,
    formState: { errors: pledgeErrors },
    control: contractPledge,
  } = useForm<Ipledge>({
    resolver: zodResolver<Ipledge, unknown, Ipledge>(pledgeInfoSchema),
  });

  const [tableData, setTableData] = useState();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [contractPaymentBusinessId, setContractPaymentBusinessId] = useState<string>("");

  const contractBusinessId = useContractStore((state) => state.contractBusinessId);

  const { isPending: LastStepPending, mutateAsync: LastStepMutate, data: lastStepData } = useLastStepUpdateRequest();
  const { isPending: AddPaymentPending, mutateAsync: AddPaymentMutate } = useAddPaymentRequest();
  const { isPending: removePaymentPending, mutateAsync: removePaymentMutate } = useRemovePaymentRequest();
  const { isPending: getPaymentPending, refetch: getPaymentFetch, data: paymentsData } = useGetPaymentsQuery({ ContractBusinessId: contractBusinessId });

  const contractOnSubmit: SubmitHandler<IContract> = async (data) => {
    await LastStepMutate({
      amount: data.amount,
      date: data.date,
      description: data.description,
      businessId: contractBusinessId,
    });
    contractSetValue("amount", "");
    contractSetValue("description", "");
    contractSetValue("date", "");
  };

  const pledgeOnSubmit: SubmitHandler<Ipledge> = async (data) => {
    await AddPaymentMutate({
      amount: data.pledgeAmount,
      contractBusinessId: contractBusinessId,
      payDate: data.pledgeDate,
      description: data.description,
      type: "1",
    });
    await getPaymentFetch();
    handleUpdateIsSetPrice(paymentsData && paymentsData.data && paymentsData.data.length > 0);
    resetPledgeForm();
  };

  useEffect(() => {
    if (lastStepData && lastStepData.status === 201) {
      setIsSetPrice(true);
    }
  }, [lastStepData, setIsSetPrice]);

  useEffect(() => {
    if (contractBusinessId) {
      getPaymentFetch();
    }
  }, [getPaymentFetch, contractBusinessId]);

  useEffect(() => {
    if (paymentsData) {
      setTableData(
        paymentsData.data.map((item: any) => {
          return {
            amount: item.amount.toLocaleString(),
            // contractBusinessId: item.contractBusinessId,
            businessId: item.businessId,
            // eslint-disable-next-line camelcase
            payDate: new DateObject({ calendar: persian, locale: persian_fa, date: item.payDate }),
            type: item.type === "FullyPaid" ? "پرداخت کامل" : "",
            action: <ActionButton businessIdArg={item.businessId} />,
          };
        })
      );
      handleUpdateIsSetPrice(paymentsData && paymentsData.data && paymentsData.data.length > 0);
    }
  }, [paymentsData]);

  const handleDeleteRecord = async () => {
    setIsModalOpen(false);
    await removePaymentMutate({
      contractPaymentBusinessId,
      contractBusinessId,
    });
    await getPaymentFetch();
    setContractPaymentBusinessId("");
  };

  const handlePassDataToDeleteRecord = (businessIdArg: string) => {
    setIsModalOpen(true);
    setContractPaymentBusinessId(businessIdArg as string);
  };

  const ActionButton = ({ businessIdArg }: { businessIdArg: string }) => (
    <div className="flex items-center justify-center gap-2">
      <Button disabled={removePaymentPending} onClick={() => handlePassDataToDeleteRecord(businessIdArg)}>
        <FaRegTrashAlt />
      </Button>
    </div>
  );

  return (
    <>
      <QaModal onAccept={handleDeleteRecord} onCancel={() => setIsModalOpen(false)} isOpen={isModalOpen} />
      <div className="flex items-center justify-center py-10 px-5 w-full">
        <div className="grid grid-cols-12 items-center space-y-4 md:space-y-0 md:gap-10 w-[80%]">
          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
            <Input disabled={isSetPrice} readOnly={isSetPrice} {...contractRegister("amount")} className="flex-1 py-2" placeholder="مبلغ (ریال)" />
            <div className="h-5 mr-3">
              <ErrorMessage error={contractErrors.amount} />
            </div>
          </div>

          <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 relative">
            <Controller
              control={contractControl}
              name="date"
              render={({ field: { onChange, value } }) => {
                return (
                  <DatePickerComponent
                    value={new DateObject({ date: new Date(value as any) }).toDate()}
                    onChange={(date) => {
                      onChange(date?.toDate().toISOString().replace("Z", ""));
                    }}
                    placeholder="تاریخ"
                    maxDate={new DateObject().toDate()}
                  />
                );
              }}
            />
            <div className="h-5 mr-2">
              <ErrorMessage error={contractErrors.date} />
            </div>
          </div>

          <div className="flex flex-col items-start col-span-12  lg:col-span-8">
            <Textarea disabled={isSetPrice} readOnly={isSetPrice} {...contractRegister("description")} className="flex-1 py-2" placeholder="توضیحات" />
            <div className="h-5 mr-3">
              <ErrorMessage error={contractErrors.description} />
            </div>
          </div>

          <Button disabled={LastStepPending || isSetPrice} onClick={contractSubmit(contractOnSubmit)} className="self-start col-span-12 md:col-span-6 lg:col-span-2">
            {LastStepPending ? "در حال ثبت کردن" : "ثبت کردن"}
          </Button>

          {isSetPrice && (
            <>
              <p className="text-right text-2xl font-bold col-span-12">اطلاعات نحوه پرداخت</p>

              <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4">
                <Input {...pledgeRegister("pledgeAmount")} className="flex-1 py-2" placeholder="مبلغ" />
                <div className="h-5 mr-3">
                  <ErrorMessage error={pledgeErrors.pledgeAmount} />
                </div>
              </div>

              <div className="flex flex-col items-start col-span-12 md:col-span-6 lg:col-span-4 relative">
                <Controller
                  control={contractPledge}
                  name="pledgeDate"
                  render={({ field: { onChange, value } }) => {
                    return (
                      <DatePickerComponent
                        value={new DateObject({ date: new Date(value as any) }).toDate()}
                        onChange={(date) => {
                          onChange(date?.toDate().toISOString().replace("Z", ""));
                        }}
                        placeholder="تاریخ"
                        maxDate={new DateObject().toDate()}
                      />
                    );
                  }}
                />
                <div className="h-5 mr-2">
                  <ErrorMessage error={pledgeErrors.pledgeDate} />
                </div>
              </div>

              <div className="flex flex-col items-start col-span-12  lg:col-span-8">
                <Textarea {...pledgeRegister("description")} className="flex-1 py-2" placeholder="توضیحات" />
                <div className="h-5 mr-3">
                  <ErrorMessage error={pledgeErrors.description} />
                </div>
              </div>

              <Button disabled={LastStepPending || AddPaymentPending || getPaymentPending} onClick={pledgeSubmit(pledgeOnSubmit)} className="self-start col-span-12 md:col-span-6 lg:col-span-2">
                {AddPaymentPending ? "در حال اضافه کردن" : "اضافه کردن "}
              </Button>
            </>
          )}
        </div>
      </div>
      {isSetPrice && (
        <div className="flex flex-col items-center justify-center py-10 w-full ">{getPaymentPending ? "لطفا صبر کنید..." : <DataTable data={tableData ? tableData : []} columns={columns} />}</div>
      )}
    </>
  );
};

export default ContractInformation;
