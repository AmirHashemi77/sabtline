import { useEffect, useState, type FC } from "react";
import { BsEyeFill } from "react-icons/bs";
import { useGetUserContractsQuery } from "../../../services/profile/profileServices";
import { Link } from "react-router-dom";
import { DataTable } from "../../ui/dataTable";

const contractStateObj = {
  Draft: "موقت",
  Pendding: "در انتظار امضای طرفین",
  Signed: "امضا شده",
  Canceld: "لغو شده",
};

const OnlineContractSection: FC = () => {
  const [activeFilter, setActiveFilter] = useState(0);
  const [tableData, setTableData] = useState<any>();
  const [pageNumber, setPageNumber] = useState(1);
  const { data: getUserContractsData, isPending: getUserContractsIsPending } = useGetUserContractsQuery({
    type: "Online",
    PageNumber: pageNumber,
    PageSize: 10,
    ContractState: activeFilter,
  });

  useEffect(() => {
    if (getUserContractsData) {
      const tableDataArr = getUserContractsData.data.data?.map((item) => {
        return {
          createDateTime: new Date(item.createDateTime).toLocaleString("fa"),
          type: item.type === "Online" ? "آنلاین" : "آفلاین",
          contractState: contractStateObj[item.contractState],
          amount: item.amount,
          contractBusinessId: item.businessId,
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
      accessorKey: "type",
      header: "نوع قرارداد",
    },
    {
      accessorKey: "contractState",
      header: "وضعیت قرارداد",
    },
    {
      accessorKey: "amount",
      header: "قیمت",
    },
    /* {
           accessorKey: "date",
           header: "تاریخ",
         },*/

    {
      accessorKey: "action",
      header: "عملیات",
      cell: (data: any) => (
        <Link to={`/contractdetails/${data.row.original.contractBusinessId}`}>
          <BsEyeFill className="text-primary text-2xl text-center mx-auto" />
        </Link>
      ),
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center gap-5 mt-5">
      <div className="flex items-center justify-between gap-4 w-full px-10 flex-wrap">
        <p
          onClick={() => {
            setActiveFilter(0);
            setPageNumber(1);
          }}
          className={`text-gray-800 py-2 text-center cursor-pointer border-b-2 border-b-gray-200 hover:border-b-primary hover:text-primary ${
            activeFilter === 0 ? "border-b-primary text-primary font-bold dark:text-primary dark:border-b-primary" : ""
          } dark:text-card-foreground dark:border-b-card-foreground`}
        >
          همه
        </p>
        <p
          onClick={() => {
            setActiveFilter(1);
            setPageNumber(1);
          }}
          className={`text-gray-800 py-2 text-center cursor-pointer border-b-2 border-b-gray-200 hover:border-b-primary hover:text-primary ${
            activeFilter === 1 ? "border-b-primary text-primary font-bold dark:text-primary dark:border-b-primary" : ""
          } dark:text-card-foreground dark:border-b-card-foreground`}
        >
          موقت
        </p>
        <p
          onClick={() => {
            setActiveFilter(2);
            setPageNumber(1);
          }}
          className={`text-gray-800 py-2 text-center cursor-pointer border-b-2 border-b-gray-200 hover:border-b-primary hover:text-primary ${
            activeFilter === 2 ? "border-b-primary text-primary font-bold dark:text-primary dark:border-b-primary" : ""
          } dark:text-card-foreground dark:border-b-card-foreground`}
        >
          در انتظار امضای طرفین
        </p>
        <p
          onClick={() => {
            setActiveFilter(3);
            setPageNumber(1);
          }}
          className={`text-gray-800 py-2 text-center cursor-pointer border-b-2 border-b-gray-200 hover:border-b-primary hover:text-primary ${
            activeFilter === 3 ? "border-b-primary text-primary font-bold dark:text-primary dark:border-b-primary" : ""
          } dark:text-card-foreground dark:border-b-card-foreground`}
        >
          امضا شده
        </p>
        <p
          onClick={() => {
            setActiveFilter(4);
            setPageNumber(1);
          }}
          className={`text-gray-800 py-2 text-center cursor-pointer border-b-2 border-b-gray-200 hover:border-b-primary hover:text-primary ${
            activeFilter === 4 ? "border-b-primary text-primary font-bold dark:text-primary dark:border-b-primary" : ""
          } dark:text-card-foreground dark:border-b-card-foreground`}
        >
          لغو شده
        </p>
      </div>
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
export default OnlineContractSection;
