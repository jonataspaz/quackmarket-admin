"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/DataTable";
import { Heading } from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";

import { columns, Model3dColumn } from "./columns";

interface Models3dClientProps {
  data: Model3dColumn[];
}

export const Models3dClient: React.FC<Models3dClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Models 3D (${data.length})`}
          description="Manage models 3D for your products"
        />
        <Button onClick={() => router.push(`/${params.sellerId}/models3d/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
    </>
  );
};
