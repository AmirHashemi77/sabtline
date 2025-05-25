import { enqueueSnackbar } from "notistack";
import { useEffect, useState, type FC } from "react";
import { GrFormPreviousLink } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useContractStore } from "../../store/contract/store";
import { CONTRACT_ID } from "../../constants/constants";
import { Button } from "../../components/ui/button";
import BreadCrumbComponent from "../../components/common/breadcrumb/BreadCrumbComponent";
import Stepper from "../../components/common/stepper/Stepper";
import Step from "../../components/common/stepper/Step";
import CarInformation from "../../components/page/offlineContract/CarInformation";
import SellerInformation from "../../components/page/onlinecontract/SellerInformation";
import BuyerInformation from "../../components/page/onlinecontract/BuyerInformation";
import ContractInformation from "../../components/page/onlinecontract/ContractInformation";

const OfflineContract: FC = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<number>(1);
  const [isSetPrice, setIsSetPrice] = useState(false);
  const contractBusinessId = useContractStore((state) => state.contractBusinessId);
  const hasBuyerInformationData = useContractStore((state) => state.hasBuyerInformationData);
  const hasSellerInformationData = useContractStore((state) => state.hasSellerInformationData);
  const setContractBusinessId = useContractStore((state) => state.setContractBusinessId);

  const handleUpdateIsSetPrice = (state: boolean) => {
    setIsSetPrice(state);
  };

  const handleNextTab = () => {
    if ((activeTab === 2 && !hasSellerInformationData) || (activeTab === 3 && !hasBuyerInformationData)) {
      return enqueueSnackbar({ message: "اطلاعات خریدار و فروشنده را وارد نمائید", variant: "error" });
    }

    if (activeTab === 1 && !contractBusinessId) {
      return enqueueSnackbar({ message: "مشخصات خودرو را ثبت نمائید", variant: "error" });
    }

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

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem(CONTRACT_ID);
      }
      setContractBusinessId("");
    };
  }, []);

  const createContract = async () => {
    if (contractBusinessId) {
      enqueueSnackbar({ message: "قرار داد با موفقیت ایجاد شد", variant: "success" });
      navigate(`/offlinecontractdetails/${contractBusinessId}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-5">
      <div className="flex items-center justify-center bg-gray-50 px-3 py-2 rounded-md dark:bg-card relative mt-10">
        <Button className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2">بازگشت</Button>
        <button className="md:hidden absolute left-8 top-1/2 -translate-y-1/2" onClick={() => navigate(-1)}>
          <GrFormPreviousLink className="text-2xl" />
        </button>
        <BreadCrumbComponent
          items={[
            { label: "خانه", link: "/" },
            { label: "قول نامه آفلاین", link: "" },
          ]}
        />
      </div>
      <div className="flex flex-col items-center justify-center md:h-[80vh] h-full w-full bg-white dark:bg-card mx-auto my-14 overflow-hidden rounded-lg">
        <Stepper>
          <Step active={activeTab === 1} title="مشخصات خودرو" />
          <Step active={activeTab === 2} title="اطلاعات فروشنده" />
          <Step active={activeTab === 3} title="اطلاعات خریدار" />
          <Step active={activeTab === 4} title="مشخصات قرارداد" />
        </Stepper>
        <div className="w-full h-[70vh] overflow-auto custom-scrollbar-contract-modal dark:bg-card">
          {activeTab === 1 && <CarInformation nextTabHandler={setActiveTab} />}
          {activeTab === 2 && <SellerInformation />}
          {activeTab === 3 && <BuyerInformation />}
          {activeTab === 4 && <ContractInformation handleUpdateIsSetPrice={handleUpdateIsSetPrice} isSetPrice={isSetPrice} setIsSetPrice={setIsSetPrice} />}
        </div>

        {/* buttons */}
        <div className="flex flex-col-reverse md:flex-row gap-6 mt-5 items-center justify-between w-[90%] mx-auto py-6 px-8 border-t border-t-gray-200">
          <Button onClick={handlePrevTab}>قبلی</Button>
          {activeTab !== 4 && <Button onClick={handleNextTab}>بعدی</Button>}

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

export default OfflineContract;
