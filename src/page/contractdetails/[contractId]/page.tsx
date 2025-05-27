import { useEffect, type FC } from "react";
import { GrFormPreviousLink } from "react-icons/gr";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import BreadCrumbComponent from "../../../components/common/breadcrumb/BreadCrumbComponent";
import ResponseLoading from "../../../components/common/responseLoading/ResponseLoading";
import ContractDetails from "../../../components/common/contractDetails/ContractDetails";
import { useFinalConfirmRequest, useGetContractDataQuery } from "../../../services/onlineContract/onlineContractServices";

const ContractDetailsPage: FC = () => {
  const params = useParams<{ contractId: string }>();
  const navigate = useNavigate();
  const { data: contractData, isPending: getContractDataIsPendding, refetch: getContractData } = useGetContractDataQuery({ BusinessId: params.contractId ? params.contractId : "" });
  const { isPending: finalConfirmPending, mutateAsync: finalConfirmMutate } = useFinalConfirmRequest();

  const finalConfirmHandler = async () => {
    await finalConfirmMutate({ BusinessId: contractData?.contract.businessId ? contractData?.contract.businessId : "" });
    redirect("/profile");
  };
  useEffect(() => {
    getContractData();
  }, [getContractData]);

  return (
    <>
      <div className="flex items-center justify-center bg-gray-50 px-3 py-[18px] rounded-md dark:bg-card relative ">
        <button className="md:hidden absolute left-8 top-1/2 -translate-y-1/2" onClick={() => navigate(-1)}>
          <GrFormPreviousLink className="text-2xl" />
        </button>
        <Button className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2" onClick={() => navigate(-1)}>
          بازگشت
        </Button>
        <BreadCrumbComponent
          items={[
            { label: "خانه", link: "/" },
            { label: "جزئیات قرار داد", link: "" },
          ]}
        />
      </div>
      {getContractDataIsPendding && (
        <div className="flex items-center justify-center mt-20">
          <ResponseLoading isPending={getContractDataIsPendding} />
        </div>
      )}
      {contractData !== undefined && <ContractDetails ContractData={contractData} finalConfirmPending={finalConfirmPending} finalConfirmHandler={finalConfirmHandler} />}
    </>
  );
};
export default ContractDetailsPage;
