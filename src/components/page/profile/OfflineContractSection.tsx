import { useEffect, useState, type FC } from "react";
import { BsEyeFill } from "react-icons/bs";
import { useGetUserContractsQuery } from "../../../services/profile/profileServices";
import { Link } from "react-router-dom";
import { DataTable } from "../../ui/dataTable";

const OfflineContractSection: FC = () => {
  const [tableData, setTableData] = useState<any>();
  const [pageNumber, setPageNumber] = useState(1);
  const { data: getUserContractsData, isPending: getUserContractsIsPending } = useGetUserContractsQuery({ type: "Offline", PageNumber: pageNumber, PageSize: 10, ContractState: 0 });

  useEffect(() => {
    if (getUserContractsData) {
      const tableDataArr = getUserContractsData.data.data?.map((item) => {
        return {
          createDateTime: new Date(item.createDateTime).toLocaleString("fa"),
          typeDescription: item.typeDescription,
          contractStateDescription: item.contractStateDescription,
          amount: item.amount,
          businessId: item.businessId,
          // date: new Date(item.date).toLocaleString("fa"),
        };
      });
      setTableData(tableDataArr);
    }
  }, [getUserContractsData]);

  const columns = [
    {
      accessorKey: "createDateTime",
      header: "تاریخ",
    },
    {
      accessorKey: "typeDescription",
      header: "نوع قرارداد",
    },
    {
      accessorKey: "contractStateDescription",
      header: "وضعیت قرارداد",
    },
    {
      accessorKey: "amount",
      header: "قیمت",
    },
    /*{
            accessorKey: "date",
            header: "تاریخ",
        },*/

    {
      accessorKey: "action",
      header: "عملیات",
      cell: (data: any) => (
        <Link to={`/offlinecontractdetails/${data.row.original.businessId}`}>
          <BsEyeFill className="text-primary text-2xl text-center mx-auto" />
        </Link>
      ),
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center gap-5 mt-5">
      {getUserContractsIsPending ? (
        "در حال بارگیری..."
      ) : (
        <div className="flex items-center justify-center w-full my-10 ">
          <DataTable
            pagination={true}
            setPageNumber={setPageNumber}
            pageNumber={pageNumber}
            pageSize={10}
            totalCount={getUserContractsData?.data.totalCount}
            data={tableData ? tableData : []}
            columns={columns}
          />
        </div>
      )}
    </div>
  );
};
export default OfflineContractSection;
