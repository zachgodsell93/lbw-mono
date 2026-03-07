"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Database } from "@/types/supabase.types";
import { useAdmin } from "@/providers/admin-provider";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export type RecentResults =
  Database["public"]["Views"]["order_results_details"]["Row"];

export const columns: ColumnDef<RecentResults>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "race_name",
    header: () => <div className="text-left">Race</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.getValue("race_name")}</div>
      );
    },
  },
  {
    accessorKey: "selection_name",
    header: () => <div className="text-left">Selection</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.getValue("selection_name")}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "order_price",
    header: () => <div className="text-left">Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("order_price"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "result",
    header: () => <div className="text-left">Result</div>,
    cell: ({ row }) => {
      const res = row.getValue("result");
      if (!res) return null;
      return (
        <Badge
          variant="outline"
          className={cn(
            "text-md rounded-sm",
            res === "WON" ? "border-green-500" : "border-red-500"
          )}
        >
          {/* @ts-ignore */}
          {res}
        </Badge>
      );
    },
  },
  {
    accessorKey: "side",
    header: () => <div className="text-left">Side</div>,
    cell: ({ row }) => {
      return (
        <Badge
          variant="outline"
          className={cn(
            "text-md rounded-sm",
            row.getValue("side") === "BACK"
              ? "border-blue-500"
              : "border-pink-500"
          )}
        >
          {row.getValue("side")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "order_placed_time",
    header: () => <div className="text-right">Placed Time</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {moment(row.getValue("order_placed_time")).format(
            "ddd DD MMM h:mm A"
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "order_settled_time",
    header: () => <div className="text-right">Settled Time</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {moment(row.getValue("order_settled_time")).format("h:mm A")}
        </div>
      );
    },
  },
  {
    accessorKey: "order_stake",
    header: () => <div className="text-right">Stake</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("order_stake"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "profit_with_comm",
    header: () => <div className="text-right">Profit</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("profit_with_comm"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
    footer: ({ table }) => {
      const total = table.getRowModel().rows.reduce(
        (total, row) =>
          total +
          parseFloat(
            // @ts-ignore
            row.getValue("profit_with_comm")
              ? row.getValue("profit_with_comm")
              : 0
          ),
        0
      );

      return (
        <div className="text-right font-medium">
          Total:{" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(total)}
        </div>
      );
    },
  },
];

export function RecentOrdersTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 25,
    });

  const { userRecentOrders } = useAdmin();

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const table = useReactTable({
    data: userRecentOrders ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    pageCount: Math.ceil((userRecentOrders?.length ?? 0) / pageSize),
    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (!userRecentOrders) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 py-4">
        <Input
          placeholder="Filter selections...."
          value={
            (table.getColumn("selection_name")?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table
              .getColumn("selection_name")
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
          <TableFooter>
            {table.getFooterGroups().map((footerGroup) => (
              <TableRow key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableFooter>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
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
