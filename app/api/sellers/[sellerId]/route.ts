import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { sellerId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.sellerId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const store = await prismadb.seller.updateMany({
      where: {
        id: params.sellerId,
        userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[SELLER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { sellerId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.sellerId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const store = await prismadb.seller.deleteMany({
      where: {
        id: params.sellerId,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[SELLER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
