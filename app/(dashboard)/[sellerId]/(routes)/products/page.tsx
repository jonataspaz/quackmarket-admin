import prismadb from "@/lib/prismadb";

import { format } from "date-fns";
import { ProductClient } from "./components/Client";
import { ProductColumn } from "./components/Columns";
import { formatter } from "@/lib/utils";

const ProductsPage = async ({ params }: { params: { sellerId: string } }) => {
  const products = await prismadb.product.findMany({
    where: {
      sellerId: params.sellerId,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    category: item.category.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price),
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
