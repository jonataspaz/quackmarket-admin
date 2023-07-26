import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { Model3dColumn } from "./components/columns";
import { Models3dClient } from "./components/client";

const Models3dPage = async ({ params }: { params: { sellerId: string } }) => {
  const models3d = await prismadb.model3d.findMany({
    where: {
      sellerId: params.sellerId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedModels3d: Model3dColumn[] = models3d.map((item) => ({
    id: item.id,
    label: item.label,
    iframeUrl: item.iframeUrl,
    url: item.url,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Models3dClient data={formattedModels3d} />
      </div>
    </div>
  );
};

export default Models3dPage;
