import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function GET(
  req: Request,
  { params }: { params: { model3dId: string } }
) {
  try {
    if (!params.model3dId) {
      return new NextResponse("Model 3D id is required", { status: 400 });
    }

    const model3d = await prismadb.model3d.findUnique({
      where: {
        id: params.model3dId,
      },
    });

    return NextResponse.json(model3d);
  } catch (error) {
    console.log("[MODEL_3D2_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { model3dId: string; sellerId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.model3dId) {
      return new NextResponse("Model 3D id is required", { status: 400 });
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

    const model3d = await prismadb.model3d.delete({
      where: {
        id: params.model3dId,
      },
    });

    return NextResponse.json(model3d);
  } catch (error) {
    console.log("[MODEL_3D_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { model3dId: string; sellerId: string } }
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
    if (!params.model3dId) {
      return new NextResponse("Model 3D id is required", { status: 400 });
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

    const model3d = await prismadb.model3d.update({
      where: {
        id: params.model3dId,
      },
      data: {
        label,
        url,
        iframeUrl,
      },
    });

    return NextResponse.json(model3d);
  } catch (error) {
    console.log("[MODEL_3D_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
