import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import Navbar from "@/components/Navbar";
import prismadb from "@/lib/prismadb";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const seller = await prismadb.seller.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!seller) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
