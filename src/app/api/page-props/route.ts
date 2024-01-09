import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { getByPlatform } from "@/server/handlers/socials/getByPlatform";

export const GET = async (req: NextRequest) => {
  const cookieJar = cookies();
  const socials = await getByPlatform("twitter", "github", "linkedin");

  if (!socials) {
    throw new Error("No socials found");
  }

  return NextResponse.json({
    socials,
    cookies: {
      theme: cookieJar.get("theme"),
    },
  });
};
