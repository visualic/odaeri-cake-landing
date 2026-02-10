"use client";

import { useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import { BUSINESS_TYPES } from "@/lib/constants";
import type { BetaSignupData } from "@/lib/types";

export default function BetaSignupSection() {
  const [form, setForm] = useState<BetaSignupData>({
    name: "",
    storeName: "",
    phone: "",
    email: "",
    businessType: "케이크",
    featureRequest: "",
    marketingConsent: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.storeName.trim() || !form.phone.trim() || !form.email.trim()) {
      setErrorMsg("성함, 가게명, 연락처, 이메일을 모두 입력해주세요.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/beta-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        setErrorMsg(data.message || "신청 중 오류가 발생했습니다.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="mx-auto max-w-md px-4 text-center">
          <div className="text-7xl">🎉</div>
          <h2 className="mt-6 text-3xl font-bold text-warm-gray-900 sm:text-4xl">
            등록 완료!
          </h2>
          <p className="mt-4 text-lg text-warm-gray-600">
            출시되면 가장 먼저 알려드릴게요.
            <br />
            관심 가져주셔서 감사합니다!
          </p>
          <Button
            onClick={() => window.location.reload()}
            size="lg"
            className="mt-8"
          >
            처음으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <SectionWrapper id="beta-signup" bg="white">
      <div className="mx-auto max-w-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-warm-gray-900 sm:text-3xl">
            웨이팅리스트 등록하기
          </h2>
          <p className="mt-3 text-sm text-warm-gray-500">
            2026년 1분기 중 출시 예정
          </p>
          <p className="mt-3 inline-block rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2 text-base font-bold text-white shadow-md">
            선착순 20개 매장 — 1년 무료 + 평생 50% 할인
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-warm-gray-700">
              성함
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="홍길동"
              className="mt-1 w-full rounded-xl border border-warm-gray-300 px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label htmlFor="storeName" className="block text-sm font-medium text-warm-gray-700">
              가게 이름
            </label>
            <input
              id="storeName"
              type="text"
              value={form.storeName}
              onChange={(e) => setForm({ ...form, storeName: e.target.value })}
              placeholder="예: 해피케이크"
              className="mt-1 w-full rounded-xl border border-warm-gray-300 px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-warm-gray-700">
              연락처
            </label>
            <input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="010-0000-0000"
              className="mt-1 w-full rounded-xl border border-warm-gray-300 px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-warm-gray-700">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="example@email.com"
              className="mt-1 w-full rounded-xl border border-warm-gray-300 px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label htmlFor="businessType" className="block text-sm font-medium text-warm-gray-700">
              업종
            </label>
            <select
              id="businessType"
              value={form.businessType}
              onChange={(e) => setForm({ ...form, businessType: e.target.value })}
              className="mt-1 w-full rounded-xl border border-warm-gray-300 px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              {BUSINESS_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="featureRequest" className="block text-sm font-medium text-warm-gray-700">
              이런 기능이 있다면? <span className="font-normal text-warm-gray-400">(선택)</span>
            </label>
            <textarea
              id="featureRequest"
              value={form.featureRequest}
              onChange={(e) => setForm({ ...form, featureRequest: e.target.value })}
              placeholder="오대리한테 바라는 점이 있다면 자유롭게 적어주세요!"
              rows={2}
              className="mt-1 w-full resize-none rounded-xl border border-warm-gray-300 px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-error">{errorMsg}</p>
          )}

          <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
            {status === "loading" ? "등록 중..." : "웨이팅리스트 등록하기"}
          </Button>

          <p className="text-center text-xs text-warm-gray-400">
            등록 정보는 출시 안내 목적으로만 사용됩니다.
          </p>
        </form>
      </div>
    </SectionWrapper>
  );
}
