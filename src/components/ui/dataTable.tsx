import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
import { useEffect, useState, type SetStateAction } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: boolean;
  totalCount?: number;
  pageNumber?: number;
  pageSize?: number;
  setPageNumber?: React.Dispatch<SetStateAction<number>>;
}

export function DataTable<TData, TValue>({ columns, data, pagination = false, totalCount, pageNumber, setPageNumber, pageSize }: DataTableProps<TData, TValue>) {
  const [ceil, setCeil] = useState<number>(0);

  useEffect(() => {
    if (totalCount && pageSize) {
      setCeil(Math.ceil(totalCount / pageSize));
    }
  }, [totalCount, pageSize]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const prevHandler = () => {
    if (setPageNumber && pageNumber && pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  };

  const nextHandler = () => {
    if (setPageNumber && pageNumber && totalCount && pageSize && pageNumber < Math.ceil(totalCount / pageSize)) {
      setPageNumber((prev) => prev + 1);
    }
  };

  return (
    <div className="rounded-md border w-[80%] dark:border-gray-500">
      <Table className="">
        <TableHeader>
          {table.getHeaderGroups() &&
            table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="dark:border-b-gray-500" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-center" key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel() && table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow className="dark:border-b-gray-500" key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell className="text-center" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                رکوردی موجود نیست.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {pagination && totalCount && pageSize && setPageNumber && pageNumber && totalCount > 0 ? (
        <div className="flex justify-center w-full border-t border-t-gray-200 p-5 dark:border-t-gray-500">
          <div className="flex items-center gap-3">
            <button onClick={() => setPageNumber && setPageNumber(1)} className="text-gray-800 dark:text-white font-bold h-7 w-7 bg-primary rounded-full flex items-center justify-center">
              <FaAngleDoubleRight className="text-white" />
            </button>
            <button onClick={prevHandler} className="text-gray-800 dark:text-white font-bold h-7 w-7 bg-primary rounded-full flex items-center justify-center">
              <FaAngleRight className="text-white" />
            </button>
            <span className="text-gray-800 dark:text-white ">
              {pageNumber} از {ceil}
            </span>
            <button onClick={nextHandler} className="text-gray-800 dark:text-white font-bold h-7 w-7 bg-primary rounded-full flex items-center justify-center">
              <FaAngleLeft className="text-white" />
            </button>
            <button
              onClick={() => {
                if (totalCount && pageSize && setPageNumber) {
                  setPageNumber(Math.ceil(totalCount / pageSize));
                }
              }}
              className="text-gray-800 font-bold h-7 w-7 bg-primary rounded-full flex items-center justify-center"
            >
              <FaAngleDoubleLeft className="text-white" />
            </button>
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}
