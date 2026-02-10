import { NextResponse } from "next/server";
import type { BetaSignupData, BetaSignupResponse } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body: BetaSignupData = await request.json();

    if (!body.name?.trim() || !body.storeName?.trim() || !body.phone?.trim() || !body.email?.trim()) {
      return NextResponse.json<BetaSignupResponse>(
        { success: false, message: "성함, 가게명, 연락처, 이메일을 모두 입력해주세요." },
        { status: 400 }
      );
    }

    const payload = {
      timestamp: new Date().toISOString(),
      name: body.name,
      storeName: body.storeName,
      phone: body.phone,
      email: body.email,
      businessType: body.businessType ?? "",
      featureRequest: body.featureRequest ?? "",
    };

    // Google Sheets 저장 (Apps Script 웹앱 경유)
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        console.log("[Beta Signup] Webhook URL:", webhookUrl);
        console.log("[Beta Signup] Payload:", JSON.stringify(payload, null, 2));

        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        console.log("[Beta Signup] Response status:", response.status);
        const responseText = await response.text();
        console.log("[Beta Signup] Response body:", responseText);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${responseText}`);
        }

        console.log("[Beta Signup] ✅ Google Sheets 저장 성공");
      } catch (err) {
        console.error("[Beta Signup] ❌ Google Sheets 저장 실패:");
        console.error("Error details:", err);
        // 에러가 발생해도 사용자 경험을 위해 성공으로 처리하지만 로그는 남김
      }
    } else {
      console.warn("[Beta Signup] ⚠️ GOOGLE_SHEET_WEBHOOK_URL 미설정 — 로그만 기록합니다.");
      console.log("[Beta Signup]", payload);
    }

    return NextResponse.json<BetaSignupResponse>({
      success: true,
      message: "웨이팅리스트 등록이 완료되었습니다!",
    });
  } catch {
    return NextResponse.json<BetaSignupResponse>(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
