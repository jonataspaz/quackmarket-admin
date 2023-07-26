import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import { MainNav } from "@/components/MainNav";
import { ModeToggle } from "./ThemeToggle";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const sellers = await prismadb.seller.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b flex justify-center">
      <div className="flex h-16 px-4 w-full justify-between">
        <div />
        <MainNav className="mx-6" />
        <div className="flex items-center gap-4">
          <UserButton afterSignOutUrl="/" />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
