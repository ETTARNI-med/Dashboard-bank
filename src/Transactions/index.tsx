import { useEffect, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
// Importing data from JSON file
import DataBank from '../Data/DataBank.json';

interface Transaction {
  id: number;
  type: string;
  amount: number;
  date: string;
  recipient?: string;
  recipient_account?: string;
}

export default function TransactionsPage() {
  // Fetching data
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Transaction[]>([]);

  useEffect(() => {
    setIsLoading(true); // Set loading state to true initially

    // Simulate fetching data from the JSON file
    setTimeout(() => {
      setData(DataBank.bank_account.transactions); // Set data from JSON file
      setIsLoading(false); // Set loading state to false after data is fetched
    }, 1000); // Simulate a delay of 1 second (1000 milliseconds)
  }, []);

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => row.getValue("type"),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => row.getValue("amount"),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => row.getValue("date"),
    },
    {
      accessorKey: "recipient",
      header: "Recipient",
      cell: ({ row }) => row.getValue("recipient") || "-",
    },
    {
      accessorKey: "recipient_account",
      header: "Recipient Account",
      cell: ({ row }) => row.getValue("recipient_account") || "-",
    },
  ];

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [table, setTable] = useState(
    useReactTable<Transaction>({
      data,
      columns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
      },
    })
  );

  useEffect(() => {
    setTable((prevTable) => ({
      ...prevTable,
      data: data,
    }));
  }, [data]);

  return (
    <div className="w-[95vw]">
      {/* Table controllers */}
      <div className="hidden xsm:flex items-center py-4 ml-0 mr-4">
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-1 lg:ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="rounded-md border ml-0 mr-6 xsm:mr-4">
        <Table className="">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    className="sm:text-xs lg:text-base"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <>
                {Array.from({ length: 10 }).map((_, i) => (
                  <TableRow key={i} className="h-12">
                    {Array.from({ length: columns.length }).map((_, index) => (
                      <TableCell key={index}>
                        <Skeleton className="h-7 w-auto" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className="sm:text-xs lg:text-base"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4 mr-6">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
