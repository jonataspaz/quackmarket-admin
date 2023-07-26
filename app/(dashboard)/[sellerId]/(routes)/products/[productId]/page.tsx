import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/ProductForm";

const ProductPage = async ({
  params,
}: {
  params: { productId: string; sellerId: string };
}) => {
  let product = null;

  if (params.productId !== "new") {
    product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
      },
    });
  }

  const categories = await prismadb.category.findMany({});

  const models3d = await prismadb.model3d.findMany({
    where: {
      sellerId: params.sellerId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={product}
          categories={categories}
          models3d={models3d}
        />
      </div>
    </div>
  );
};

export default ProductPage;
