// "use client";
import { Button } from "../../../components/ui/button";
import { useGetApprovedInquiryRequestQuery } from "../../../services/onlineContract/onlineContractServices";
import { useEffect, type FC } from "react";
import { GrFormPreviousLink } from "react-icons/gr";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumbComponent from "../../../components/common/breadcrumb/BreadCrumbComponent";
import ResponseLoading from "../../../components/common/responseLoading/ResponseLoading";
import InquiryDetails from "../../../components/common/inquiryDetails/InquiryDetails";

const InquiryIdDatailsPage: FC = () => {
  const params = useParams<{ inquiryId: string }>();
  const navigate = useNavigate();
  const { data: inquiryData, isPending: getInquiryDataIsPendding, refetch } = useGetApprovedInquiryRequestQuery({ BusinessId: params.inquiryId ? params.inquiryId : "" });
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
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
