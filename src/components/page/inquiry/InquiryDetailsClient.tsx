import { useEffect, type FC } from "react";

import { GrFormPreviousLink } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useGetApprovedInquiryRequestQuery } from "../../../services/onlineContract/onlineContractServices";
import { Button } from "../../ui/button";
import BreadCrumbComponent from "../../common/breadcrumb/BreadCrumbComponent";
import ResponseLoading from "../../common/responseLoading/ResponseLoading";
import InquiryDetails from "../../common/inquiryDetails/InquiryDetails";

interface IProps {
  inquiryId: string;
}

const InquiryIdDatailsPage: FC<IProps> = ({ inquiryId }) => {
  // const params = useParams<{ inquiryId: string }>();
  const navigate = useNavigate();
  const { data: inquiryData, isPending: getInquiryDataIsPendding, refetch } = useGetApprovedInquiryRequestQuery({ BusinessId: inquiryId });
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <div className="flex items-center justify-center bg-gray-50 px-3 py-2 rounded-md dark:bg-card relative mt-10">
        <Button className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2" onClick={() => navigate(-1)}>
          بازگشت
        </Button>
        <button className="md:hidden absolute left-8 top-1/2 -translate-y-1/2" onClick={() => navigate(-1)}>
          <GrFormPreviousLink className="text-2xl" />
        </button>
        <BreadCrumbComponent
          items={[
            { label: "خانه", link: "/" },
            { label: "پروفایل", link: "/profile" },
            { label: "جزئیات استعلام", link: "" },
          ]}
        />
      </div>
      {getInquiryDataIsPendding && (
        <div className="flex items-center justify-center mt-20">
          <ResponseLoading isPending={getInquiryDataIsPendding} />
        </div>
      )}
      <InquiryDetails InquiryData={inquiryData} />
    </>
  );
};
export default InquiryIdDatailsPage;
