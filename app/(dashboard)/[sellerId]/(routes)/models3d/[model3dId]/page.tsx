import prismadb from "@/lib/prismadb";

import { Model3dForm } from "./components/Model3dForm";

const Model3dPage = async ({ params }: { params: { model3dId: string } }) => {
  let model3d = null;

  if (params.model3dId !== "new") {
    model3d = await prismadb.model3d.findUnique({
      where: {
        id: params.model3dId,
      },
    });
  }
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Model3dForm initialData={model3d} />
      </div>
    </div>
  );
};

export default Model3dPage;
