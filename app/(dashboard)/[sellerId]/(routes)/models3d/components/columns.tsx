"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./CellAction";

export type Model3dColumn = {
  id: string;
  label: string;
  url: string;
  iframeUrl: string;
  createdAt: string;
};
export const columns: ColumnDef<Model3dColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
