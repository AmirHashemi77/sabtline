import { useEffect, type FC } from "react";
import OfflineContractDetails from "./../../components/common/contractDetails/OfflineContractDetails";
import { useNavigate } from "react-router-dom";
import { useFinalConfirmRequest } from "../../services/onlineContract/onlineContractServices";
import { useContractStore } from "../../store/contract/store";
import { useGetContractDataQuery } from "../../services/offlineContract/offlineContractServices";
import { CONTRACT_ID } from "../../constants/constants";
import ResponseLoading from "../../components/common/responseLoading/ResponseLoading";

const ShowOfflineContractPage: FC = () => {
  const navigate = useNavigate();
  const { isPending: finalConfirmPending, mutateAsync: finalConfirmMutate } = useFinalConfirmRequest();
  const contractBusinessId = useContractStore((state) => state.contractBusinessId);
  //   const setContractBusinessId = useContractStore((state) => state.setContractBusinessId);

  const { refetch: getContractDataFetch, data: contractData, isPending } = useGetContractDataQuery({ BusinessId: contractBusinessId });
  const finalConfirmHandler = async () => {
    await finalConfirmMutate({ BusinessId: contractData ? contractData.businessId : "" });
    if (typeof window !== "undefined") {
      localStorage.removeItem(CONTRACT_ID);
    }
    navigate("/profile");
  };

  useEffect(() => {
    getContractDataFetch();
  }, []);

  return (
    <>
      {isPending && (
        <div className="flex items-center justify-center h-screen w-full">
          <ResponseLoading isPending={isPending} />
        </div>
      )}
      <OfflineContractDetails ContractData={contractData} finalConfirmPending={finalConfirmPending} finalConfirmHandler={finalConfirmHandler} />
    </>
  );
};
export default ShowOfflineContractPage;
