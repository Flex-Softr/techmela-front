import config from "@/config/config";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);

    const key = searchParams.get("key");
    const secret = searchParams.get("secret");

    if (!secret) {
      return NextResponse.json(
        { status: "ERROR", message: "Authentication failed." },
        { status: 401 }
      );
    }

    if (secret !== config.revalidate_secret) {
      return NextResponse.json(
        { status: "ERROR", message: "Authentication failed." },
        { status: 401 }
      );
    }

    if (!key) {
      return NextResponse.json(
        { status: "ERROR", message: "Revalidate key is required." },
        { status: 400 }
      );
    }

    revalidateTag(key);

    return NextResponse.json({ status: "OK", key, secret }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { status: "ERROR", message: "Internal server error." },
      { status: 500 }
    );
  }
};
