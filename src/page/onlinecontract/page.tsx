import { useEffect, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateEmptyRequest } from "../../services/onlineContract/onlineContractServices";
import { useContractStore } from "../../store/contract/store";
import { enqueueSnackbar } from "notistack";
import { CONTRACT_ID } from "../../constants/constants";
import { Button } from "../../components/ui/button";
import { GrFormPreviousLink } from "react-icons/gr";
import BreadCrumbComponent from "../../components/common/breadcrumb/BreadCrumbComponent";
import Stepper from "../../components/common/stepper/Stepper";
import Step from "../../components/common/stepper/Step";
import CarInformation from "../../components/page/onlinecontract/CarInformation";
import SellerInformation from "../../components/page/onlinecontract/SellerInformation";
import BuyerInformation from "../../components/page/onlinecontract/BuyerInformation";
import ContractInformation from "../../components/page/onlinecontract/ContractInformation";

const OnlineContract: FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const navigate = useNavigate();
  const { isPending: createEmptyPending, mutate: createEmptyMutate, data: createEmptyData } = useCreateEmptyRequest();
  const setContractBusinessId = useContractStore((state) => state.setContractBusinessId);
  const contractBusinessId = useContractStore((state) => state.contractBusinessId);
  const hasBuyerInformationData = useContractStore((state) => state.hasBuyerInformationData);
  const hasSellerInformationData = useContractStore((state) => state.hasSellerInformationData);
  const verifyInquiryData = useContractStore((state) => state.verifyInquiryData);

  const [isSetPrice, setIsSetPrice] = useState(false);

  const handleUpdateIsSetPrice = (state: boolean) => {
    setIsSetPrice(state);
  };

  useEffect(() => {
    createEmptyMutate({ approvedInquiryRequestBusinessId: verifyInquiryData ? verifyInquiryData.data.approvedInquiryRequestBusinessId : "" });
  }, [verifyInquiryData]);

  useEffect(() => {
    if (createEmptyData) {
      setContractBusinessId(createEmptyData.data);
    }
  }, [createEmptyData, setContractBusinessId]);

  const handleNextTab = () => {
    if ((activeTab === 2 && !hasSellerInformationData) || (activeTab === 3 && !hasBuyerInformationData)) {
      return enqueueSnackbar({ message: "اطلاعات خریدار یا فروشنده یا وارد نمائید", variant: "error" });
    }

    /*  if (activeTab === 1 && !contractBusinessId) {
              createEmptyMutate({approvedInquiryRequestBusinessId: verifyInquiryData ? verifyInquiryData.data.approvedInquiryRequestBusinessId : ""});
          }*/

    if (activeTab === 4) {
      return;
    } else {
      setActiveTab((prev) => prev + 1);
    }
  };
  const handlePrevTab = () => {
    if (activeTab === 1) {
      return;
    } else {
      setActiveTab((prev) => prev - 1);
    }
  };

  const createContract = async () => {
    if (contractBusinessId) {
      enqueueSnackbar({ message: "قرار داد با موفقیت ایجاد شد", variant: "success" });
      navigate(`/contractdetails/${contractBusinessId}`);
    }
  };
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem(CONTRACT_ID);
        setContractBusinessId("");
      }
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-5">
      <div className="flex items-center justify-center bg-gray-50 px-3 py-[18px] rounded-md dark:bg-card relative mt-10">
        <Button className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2" onClick={() => navigate(-1)}>
          بازگشت
        </Button>
        <button className="md:hidden absolute left-8 top-1/2 -translate-y-1/2" onClick={() => navigate(-1)}>
          <GrFormPreviousLink className="text-2xl" />
        </button>
        <BreadCrumbComponent
          items={[
            { label: "خانه", link: "/" },
            { label: "قول نامه آنلاین", link: "" },
          ]}
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full md:h-[90%] h-full overflow-hidden bg-white my-8 dark:bg-card">
        <Stepper>
          <Step active={activeTab === 1} title="مشخصات خودرو" />
          <Step active={activeTab === 2} title="اطلاعات فروشنده" />
          <Step active={activeTab === 3} title="اطلاعات خریدار" />
          <Step active={activeTab === 4} title="مشخصات قرارداد" />
        </Stepper>

        <div className="w-full h-[70vh] overflow-auto custom-scrollbar-contract-modal dark:bg-card ">
          {activeTab === 1 && <CarInformation />}
          {activeTab === 2 && <SellerInformation />}
          {activeTab === 3 && <BuyerInformation />}
          {activeTab === 4 && <ContractInformation handleUpdateIsSetPrice={handleUpdateIsSetPrice} isSetPrice={isSetPrice} setIsSetPrice={setIsSetPrice} />}
        </div>

        {/* buttons */}
        <div className="flex items-center justify-between w-[90%] mx-auto py-6 px-8 border-t border-t-gray-200">
          <Button onClick={handlePrevTab}>قبلی</Button>

          {activeTab !== 4 && (
            <Button disabled={createEmptyPending} onClick={handleNextTab}>
              بعدی
            </Button>
          )}
          {activeTab === 4 && (
            <Button disabled={!isSetPrice} onClick={() => isSetPrice && createContract()}>
              ایجاد قرارداد
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default OnlineContract;
