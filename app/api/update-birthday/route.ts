import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId, apiKey } = await request.json();

    if (!userId || !apiKey) {
      return NextResponse.json(
        { error: "Missing userId or apiKey" },
        { status: 400 }
      );
    }

    // Roblox Cloud API v2 Account endpoint
    // Documentation: https://create.roblox.com/docs/cloud/reference/features/accounts
    const url = `https://apis.roblox.com/cloud/v2/accounts/${userId}`;

    const payload = {
      birthday: {
        year: 2015,
        month: 1,
        day: 21
      }
    };

    const response = await fetch(`${url}?updateMask=birthday`, {
      method: "PATCH",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to update birthday" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error updating birthday:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
