import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { SettingsForm } from "./components/SettingsForm";

const SettingsPage = async ({ params }: { params: { sellerId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const seller = await prismadb.seller.findFirst({
    where: {
      id: params.sellerId,
      userId,
    },
  });

  if (!seller) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={seller} />
      </div>
    </div>
  );
};

export default SettingsPage;
