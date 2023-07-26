import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { sellerId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { label, url, iframeUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }
    if (!params.sellerId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const sellerByUserId = await prismadb.seller.findFirst({
      where: {
        id: params.sellerId,
        userId,
      },
    });

    if (!sellerByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const model3d = await prismadb.model3d.create({
      data: {
        label,
        url,
        iframeUrl,
        sellerId: params.sellerId,
      },
    });

    return NextResponse.json(model3d);
  } catch (error) {
    console.log("[SIZES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { sellerId: string } }
) {
  try {
    if (!params.sellerId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const models3d = await prismadb.model3d.findMany({
      where: {
        sellerId: params.sellerId,
      },
    });

    return NextResponse.json(models3d);
  } catch (error) {
    console.log("[SIZES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
