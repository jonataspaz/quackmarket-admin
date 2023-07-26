import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const seller = await prismadb.seller.findFirst({
    where: {
      userId,
    },
  });

  if (seller) {
    redirect(`/${seller.id}`);
  }

  return <>{children}</>;
}
