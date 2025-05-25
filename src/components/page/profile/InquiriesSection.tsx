import { useEffect, useState, type FC } from "react";
import { useGetUserApprovedInquiry } from "../../../services/profile/profileServices";
import { Link } from "react-router-dom";
import { BsEyeFill } from "react-icons/bs";
import { Button } from "../../ui/button";
import { DataTable } from "../../ui/dataTable";

const InquiriesSection: FC = () => {
  const [tableData, setTableData] = useState<any>();
  const [pageNumber, setPageNumber] = useState(1);
  const { data: getUserApprovedInquiryData, isPending: getUserApprovedInquiryIsPending } = useGetUserApprovedInquiry({ PageNumber: pageNumber, PageSize: 10 });

  useEffect(() => {
    if (getUserApprovedInquiryData) {
      const tableDataArr = getUserApprovedInquiryData.data.data?.map((item) => {
        return {
          createDate: new Date(item.createDate).toLocaleString("fa"),
          businessId: item.businessId,
        };
      });
      setTableData(tableDataArr);
    }
  }, [getUserApprovedInquiryData]);

  const columns = [
    {
      accessorKey: "createDate",
      header: "تاریخ",
    },

    {
      accessorKey: "action",
      header: "عملیات",
      cell: (data: any) => (
        <Link to={`/inquirydetails/${data.row.original.businessId}`}>
          <BsEyeFill className="text-primary text-2xl text-center mx-auto" />
        </Link>
      ),
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center gap-5 mt-5">
      <Button asChild>
        <Link to="/greenpaper">دریافت اصالت جدید</Link>
      </Button>
      {getUserApprovedInquiryIsPending ? (
        "در حال بارگیری..."
      ) : (
        <div className="flex items-center justify-center w-full my-10 ">
          <DataTable
            pagination={true}
            setPageNumber={setPageNumber}
            pageNumber={pageNumber}
            pageSize={10}
            totalCount={getUserApprovedInquiryData?.data.totalCount}
            data={tableData ? tableData : []}
            columns={columns}
          />
        </div>
      )}
    </div>
  );
};
export default InquiriesSection;
