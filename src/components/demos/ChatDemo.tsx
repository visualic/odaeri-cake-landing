"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TypingIndicator from "./TypingIndicator";
import PhoneMockup from "./PhoneMockup";
import {
  CHAT_DEMO_GREETING,
  CHAT_SCENARIOS,
  CHAT_SCENARIO_LABELS,
  CHAT_DEMO_ORDER,
} from "@/lib/constants";
import type { ChatStep } from "@/lib/types";

type DemoPhase = "init" | "greeting" | "playing" | "finished";

export default function ChatDemo() {
  const [phase, setPhase] = useState<DemoPhase>("init");
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatStep[]>([]);
  const [scriptIndex, setScriptIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [waitingForClick, setWaitingForClick] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [postOrderMessages, setPostOrderMessages] = useState<ChatStep[]>([]);
  const [depositSent, setDepositSent] = useState(false);
  const [ownerConfirmed, setOwnerConfirmed] = useState(false);
  const [inputTarget, setInputTarget] = useState("");
  const [inputDisplayed, setInputDisplayed] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  useEffect(() => () => clearTimeouts(), [clearTimeouts]);

  const schedule = useCallback((fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timeoutsRef.current.push(t);
  }, []);

  // ── Ref-based step processor ──
  const processStepRef = useRef<
    (script: ChatStep[], index: number) => void
  >(undefined);

  processStepRef.current = (currentScript, index) => {
    if (index >= currentScript.length) {
      schedule(() => setPhase("finished"), 800);
      return;
    }

    const step = currentScript[index];

    if (step.sender === "ai") {
      setIsTyping(true);
      schedule(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, step]);
        setScriptIndex(index + 1);

        if (step.quickButtons) {
          setWaitingForClick(true);
        } else if (index >= currentScript.length - 1) {
          schedule(() => setPhase("finished"), 800);
        } else {
          processStepRef.current?.(currentScript, index + 1);
        }
      }, 1000 + Math.random() * 500);
    } else if (step.autoAdvance) {
      const isImage = step.text.startsWith("📷");
      if (isImage) {
        schedule(() => {
          setMessages((prev) => [...prev, step]);
          setScriptIndex(index + 1);
          processStepRef.current?.(currentScript, index + 1);
        }, 800);
      } else {
        setInputTarget(step.text);
        schedule(() => {
          setInputTarget("");
          setMessages((prev) => [...prev, step]);
          setScriptIndex(index + 1);
          processStepRef.current?.(currentScript, index + 1);
        }, step.text.length * 30 + 600);
      }
    }
  };

  // ── Init: show greeting ──
  useEffect(() => {
    if (phase !== "init") return;
    setPhase("greeting");
    setIsTyping(true);
    schedule(() => {
      setIsTyping(false);
      setMessages([CHAT_DEMO_GREETING]);
      setWaitingForClick(true);
    }, 1200);
  }, [phase, schedule]);

  // ── Auto-scroll ──
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, postOrderMessages, isTyping]);

  // ── Input typewriter effect ──
  useEffect(() => {
    if (!inputTarget) {
      setInputDisplayed("");
      return;
    }
    let i = 0;
    setInputDisplayed("");
    const interval = setInterval(() => {
      i++;
      setInputDisplayed(inputTarget.slice(0, i));
      if (i >= inputTarget.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [inputTarget]);

  // ── Quick button handler ──
  const handleQuickButton = useCallback(
    (value: string) => {
      if (!waitingForClick) return;
      setWaitingForClick(false);

      if (phase === "greeting") {
        const scenarioScript = CHAT_SCENARIOS[value];
        if (!scenarioScript) return;
        setActiveScenario(value);
        setPhase("playing");

        const firstStep = scenarioScript[0];
        if (firstStep.autoAdvance) {
          setInputTarget(firstStep.text);
          const dur = firstStep.text.length * 30 + 600;
          const t = setTimeout(() => {
            setInputTarget("");
            setMessages((prev) => [...prev, firstStep]);
            setScriptIndex(1);
            processStepRef.current?.(scenarioScript, 1);
          }, dur);
          timeoutsRef.current.push(t);
        } else {
          setMessages((prev) => [...prev, firstStep]);
          setScriptIndex(1);
          processStepRef.current?.(scenarioScript, 1);
        }
        return;
      }

      const lastAi = [...messages]
        .reverse()
        .find((m) => m.sender === "ai" && m.branches);
      if (lastAi?.branches?.[value]) {
        const branch = lastAi.branches[value];
        setMessages((prev) => [...prev, branch[0]]);
        processStepRef.current?.(branch, 1);
        return;
      }

      const currentScript = activeScenario
        ? CHAT_SCENARIOS[activeScenario]
        : null;
      if (!currentScript) return;
      const current = currentScript[scriptIndex];
      if (current?.sender === "user") {
        setMessages((prev) => [...prev, { ...current, text: value }]);
        setScriptIndex(scriptIndex + 1);
        processStepRef.current?.(currentScript, scriptIndex + 1);
      }
    },
    [waitingForClick, phase, activeScenario, scriptIndex, messages],
  );

  // ── Order confirm handler (고객이 주문 확정) ──
  const handleOrderConfirm = useCallback(() => {
    if (orderConfirmed) return;
    setOrderConfirmed(true);

    // 1. 주문 확정 메시지 (OrderCard 아래에 표시)
    schedule(() => {
      setPostOrderMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "주문이 확정되었습니다! ✅\n예약금 입금 안내드릴게요.",
        },
      ]);
    }, 500);

    // 2. 예약금 계좌 안내
    schedule(() => setIsTyping(true), 1300);
    schedule(() => {
      setIsTyping(false);
      setPostOrderMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `🏦 예약금 입금 안내\n\n${CHAT_DEMO_ORDER.deposit.bank}\n${CHAT_DEMO_ORDER.deposit.account}\n예금주: ${CHAT_DEMO_ORDER.deposit.holder}\n\n💰 예약금: ${CHAT_DEMO_ORDER.deposit.amount}`,
        },
      ]);
    }, 2300);

    // 3. 사장님 알림톡 등장
    schedule(() => setDepositSent(true), 3800);
  }, [orderConfirmed, schedule]);

  // ── Owner confirm handler (사장님이 예약 확정) ──
  const handleOwnerConfirm = useCallback(() => {
    if (ownerConfirmed) return;
    setOwnerConfirmed(true);
  }, [ownerConfirmed]);

  // ── Restart / switch scenario ──
  const handleRestart = useCallback(() => {
    clearTimeouts();
    setMessages([]);
    setScriptIndex(0);
    setIsTyping(false);
    setWaitingForClick(false);
    setInputTarget("");
    setActiveScenario(null);
    setOrderConfirmed(false);
    setPostOrderMessages([]);
    setDepositSent(false);
    setOwnerConfirmed(false);
    setPhase("init");
  }, [clearTimeouts]);

  const handleSwitchScenario = useCallback(
    (scenarioId: string) => {
      clearTimeouts();
      setIsTyping(false);
      setWaitingForClick(false);
      setInputTarget("");
      setOrderConfirmed(false);
      setPostOrderMessages([]);
      setDepositSent(false);
      setOwnerConfirmed(false);

      const scenarioScript = CHAT_SCENARIOS[scenarioId];
      if (!scenarioScript) return;

      setMessages([CHAT_DEMO_GREETING, scenarioScript[0]]);
      setActiveScenario(scenarioId);
      setPhase("playing");
      setScriptIndex(1);

      schedule(() => {
        processStepRef.current?.(scenarioScript, 1);
      }, 400);
    },
    [clearTimeouts, schedule],
  );

  // ── Derive UI state ──
  const lastAiMsg = [...messages]
    .reverse()
    .find((m) => m.sender === "ai" && m.quickButtons);
  const activeQuickButtons =
    waitingForClick && lastAiMsg ? lastAiMsg.quickButtons : null;
  const hasOrderCard =
    activeScenario === "order" && messages.some((m) => m.isOrderCard);

  return (
    <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-center">
      <PhoneMockup>
        <div className="flex h-full flex-col bg-warm-gray-50">
          {/* Header */}
          <div className="flex items-center gap-2 bg-primary px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm">
              🎂
            </div>
            <div>
              <p className="text-sm font-bold text-white">해피케이크</p>
              <p className="text-[10px] text-white/70">AI 에이전트</p>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto px-3 py-3"
          >
            {messages.map((msg, i) => (
              <MessageBubble key={`${activeScenario}-${i}`} message={msg} />
            ))}
            {hasOrderCard && (
              <OrderCard
                onConfirm={handleOrderConfirm}
                confirmed={orderConfirmed}
              />
            )}
            {postOrderMessages.map((msg, i) => (
              <MessageBubble key={`post-${i}`} message={msg} />
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <TypingIndicator />
              </div>
            )}
          </div>

          {/* Bottom bar */}
          <div className="border-t border-warm-gray-200 bg-white px-3 py-2">
            {phase === "finished" ? (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(CHAT_SCENARIO_LABELS)
                    .filter(([id]) => id !== activeScenario)
                    .map(([id, label]) => (
                      <button
                        key={id}
                        onClick={() => handleSwitchScenario(id)}
                        className="cursor-pointer rounded-full border border-primary bg-white px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary-50"
                      >
                        {label}
                      </button>
                    ))}
                </div>
                <button
                  onClick={handleRestart}
                  className="w-full cursor-pointer rounded-xl bg-warm-gray-100 py-2 text-xs font-medium text-warm-gray-500 transition-colors hover:bg-warm-gray-200"
                >
                  처음부터 다시 보기
                </button>
              </div>
            ) : inputTarget ? (
              <div className="flex items-center gap-2 rounded-xl border border-primary bg-white px-3 py-2.5">
                <span className="flex-1 truncate text-xs text-warm-gray-800">
                  {inputDisplayed}
                  <span className="animate-pulse text-primary">|</span>
                </span>
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                  ↑
                </span>
              </div>
            ) : activeQuickButtons ? (
              <div className="flex flex-wrap gap-1.5">
                {activeQuickButtons.map((btn) => (
                  <button
                    key={btn.value}
                    onClick={() => handleQuickButton(btn.value)}
                    className="cursor-pointer rounded-full border border-primary bg-white px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary-50"
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-warm-gray-100 px-4 py-2.5 text-xs text-warm-gray-400">
                메시지를 입력하세요...
              </div>
            )}
          </div>
        </div>
      </PhoneMockup>

      {/* ── 알림톡 영역 ── */}
      <div className="flex flex-col gap-4">
        {/* 사장님 쪽: 입금 푸시 + 주문 알림톡 */}
        <AnimatePresence>
          {depositSent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-[280px] sm:w-[300px]"
            >
              <p className="mb-2 text-center text-xs font-semibold text-white/60">
                사장님 휴대폰
              </p>
              <div className="space-y-2.5">
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <DepositPush />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.5,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                >
                  <OwnerNotification
                    onConfirm={handleOwnerConfirm}
                    confirmed={ownerConfirmed}
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 고객 쪽: 예약 확정 알림톡 */}
        <AnimatePresence>
          {ownerConfirmed && (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5, ease: "easeOut" }}
              className="w-[280px] sm:w-[300px]"
            >
              <CustomerNotification />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Message Bubble ──

function MessageBubble({ message }: { message: ChatStep }) {
  const isAi = message.sender === "ai";
  const isImage = !isAi && message.text.startsWith("📷");

  if (message.isOrderCard) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isAi ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
          isAi
            ? "rounded-bl-sm bg-white text-warm-gray-800 shadow-sm"
            : "rounded-br-sm bg-primary text-white"
        }`}
      >
        {isImage && (
          <div className="mb-1.5 h-24 w-32 overflow-hidden rounded-lg bg-gradient-to-br from-pink-200 via-purple-100 to-pink-100">
            <div className="flex h-full w-full items-center justify-center text-2xl">
              🎂
            </div>
          </div>
        )}
        {message.text.split("\n").map((line, i) => (
          <p key={i} className={line === "" ? "h-2" : ""}>
            {line}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

// ── Order Card ──

function OrderCard({
  onConfirm,
  confirmed,
}: {
  onConfirm: () => void;
  confirmed: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="mx-auto w-full max-w-[90%]"
    >
      <div className="overflow-hidden rounded-2xl border border-warm-gray-200 bg-white shadow-md">
        <div className="bg-primary-50 px-4 py-2.5">
          <p className="text-sm font-bold text-primary">🎂 주문서</p>
        </div>

        {/* 고객 정보 */}
        <div className="space-y-1.5 px-4 py-2.5 text-xs">
          <div className="flex items-center gap-2 text-warm-gray-700">
            <span className="w-4 text-center">👤</span>
            <span>{CHAT_DEMO_ORDER.customer.name}</span>
          </div>
          <div className="flex items-center gap-2 text-warm-gray-700">
            <span className="w-4 text-center">📞</span>
            <span>{CHAT_DEMO_ORDER.customer.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-warm-gray-700">
            <span className="w-4 text-center">📅</span>
            <span>
              {CHAT_DEMO_ORDER.pickupDate} {CHAT_DEMO_ORDER.pickupTime}
            </span>
          </div>
        </div>

        {/* 케이크 정보 */}
        <div className="space-y-1.5 border-t border-warm-gray-100 px-4 py-2.5 text-xs">
          <div className="flex items-center gap-2 text-warm-gray-700">
            <span className="w-4 text-center">🎨</span>
            <span>
              {CHAT_DEMO_ORDER.cakeShape} · {CHAT_DEMO_ORDER.size}
            </span>
          </div>
          <div className="flex items-center gap-2 text-warm-gray-700">
            <span className="w-4 text-center">✍️</span>
            <span>{CHAT_DEMO_ORDER.lettering}</span>
          </div>
          <div className="flex items-center gap-2 text-warm-gray-700">
            <span className="w-4 text-center">🎂</span>
            <span>{CHAT_DEMO_ORDER.boardText}</span>
          </div>
        </div>

        {/* 색상 & 디자인 */}
        <div className="space-y-1.5 border-t border-warm-gray-100 px-4 py-2.5 text-xs">
          <div className="flex items-center gap-2 text-warm-gray-700">
            <span className="w-4 text-center">🎨</span>
            <span>
              배경: {CHAT_DEMO_ORDER.bgColor} · 레터링:{" "}
              {CHAT_DEMO_ORDER.letteringColor}
            </span>
          </div>
          {CHAT_DEMO_ORDER.hasDesignImage && (
            <div className="flex items-center gap-2 text-warm-gray-700">
              <span className="w-4 text-center">📷</span>
              <span>디자인 참고 이미지 첨부</span>
            </div>
          )}
        </div>

        {/* 합계 */}
        <div className="flex items-center justify-between border-t border-warm-gray-200 px-4 py-3">
          <span className="text-sm font-bold text-warm-gray-900">합계</span>
          <span className="text-base font-bold text-primary">
            {CHAT_DEMO_ORDER.total}
          </span>
        </div>
        <div className="px-4 pb-3">
          <button
            onClick={onConfirm}
            disabled={confirmed}
            className={`w-full cursor-pointer rounded-xl py-2.5 text-center text-sm font-semibold text-white transition-all ${
              confirmed
                ? "bg-success"
                : "bg-primary hover:bg-primary-dark active:scale-[0.97]"
            }`}
          >
            {confirmed ? "✅ 주문 확정 완료" : "주문 확정하기"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── 입금 푸시 알림 ──

function DepositPush() {
  return (
    <div className="flex items-center gap-2.5 rounded-2xl bg-white p-3 shadow-lg">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFCD00]">
        <span className="text-base">🏦</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-warm-gray-900">
            {CHAT_DEMO_ORDER.deposit.bank}
          </p>
          <span className="text-[10px] text-warm-gray-400">방금</span>
        </div>
        <p className="text-[11px] text-warm-gray-600">
          입금 {CHAT_DEMO_ORDER.deposit.amount} |{" "}
          {CHAT_DEMO_ORDER.deposit.depositor}
        </p>
      </div>
    </div>
  );
}

// ── 사장님 알림톡 카드 ──

function OwnerNotification({
  onConfirm,
  confirmed,
}: {
  onConfirm: () => void;
  confirmed: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
      {/* Kakao header */}
      <div className="flex items-center gap-2 bg-[#FEE500] px-4 py-2.5">
        <span className="text-sm">💬</span>
        <span className="text-sm font-bold text-[#3C1E1E]">카카오톡</span>
      </div>

      {/* Notification body */}
      <div className="p-4">
        {/* Sender info */}
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm text-white">
            📢
          </div>
          <div>
            <p className="text-sm font-bold text-warm-gray-900">오대리</p>
            <p className="text-[11px] text-warm-gray-400">알림톡</p>
          </div>
          <span className="ml-auto text-[10px] text-warm-gray-400">방금</span>
        </div>

        {/* Title */}
        <p className="mb-3 text-sm font-bold text-warm-gray-900">
          새 주문이 들어왔어요! 🎉
        </p>

        {/* Order details */}
        <div className="rounded-xl bg-warm-gray-50 p-3 text-xs">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-warm-gray-700">
              <span>👤</span>
              <span>
                {CHAT_DEMO_ORDER.customer.name} ·{" "}
                {CHAT_DEMO_ORDER.customer.phone}
              </span>
            </div>
            <div className="flex items-center gap-2 text-warm-gray-700">
              <span>📅</span>
              <span>
                {CHAT_DEMO_ORDER.pickupDate} {CHAT_DEMO_ORDER.pickupTime} 픽업
              </span>
            </div>
          </div>

          <div className="mt-2 space-y-1.5 border-t border-warm-gray-200 pt-2">
            <div className="flex items-center gap-2 text-warm-gray-700">
              <span>🎨</span>
              <span>
                {CHAT_DEMO_ORDER.cakeShape} · {CHAT_DEMO_ORDER.size}
              </span>
            </div>
            <div className="flex items-center gap-2 text-warm-gray-700">
              <span>✍️</span>
              <span>{CHAT_DEMO_ORDER.lettering}</span>
            </div>
            <div className="flex items-center gap-2 text-warm-gray-700">
              <span>🎂</span>
              <span>{CHAT_DEMO_ORDER.boardText}</span>
            </div>
            <div className="flex items-center gap-2 text-warm-gray-700">
              <span>🎨</span>
              <span>
                배경: {CHAT_DEMO_ORDER.bgColor} · 레터링:{" "}
                {CHAT_DEMO_ORDER.letteringColor}
              </span>
            </div>
            {CHAT_DEMO_ORDER.hasDesignImage && (
              <div className="flex items-center gap-2 text-warm-gray-700">
                <span>📷</span>
                <span>디자인 참고 이미지 첨부</span>
              </div>
            )}
          </div>

          <div className="mt-2 border-t border-warm-gray-200 pt-2">
            <div className="flex items-center justify-between font-bold text-warm-gray-900">
              <span>💰 합계</span>
              <span className="text-sm text-primary">
                {CHAT_DEMO_ORDER.total}
              </span>
            </div>
          </div>

          {/* 입금 확인 요청 */}
          <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1.5 text-xs font-medium text-amber-600">
            <span>💳</span>
            <span>예약금 입금 확인하셨나요?</span>
          </div>
        </div>

        {/* CTAs */}
        <button
          onClick={onConfirm}
          disabled={confirmed}
          className={`mt-3 w-full cursor-pointer rounded-xl py-2.5 text-center text-sm font-semibold text-white transition-all ${
            confirmed
              ? "bg-success"
              : "bg-primary hover:bg-primary-dark active:scale-[0.97]"
          }`}
        >
          {confirmed ? "✅ 예약 확정 완료" : "예약 확정하기"}
        </button>
        <div className="mt-2 w-full rounded-xl bg-warm-gray-100 py-2.5 text-center text-sm font-medium text-warm-gray-600">
          대시보드에서 확인하기
        </div>

        {/* Timestamp */}
        <p className="mt-3 text-center text-[10px] text-warm-gray-400">
          오대리가 자동으로 주문을 정리해서 알려드렸어요
        </p>
      </div>
    </div>
  );
}

// ── 고객 알림톡 카드 ──

function CustomerNotification() {
  return (
    <div>
      <p className="mb-2 text-center text-xs font-semibold text-white/60">
        고객 휴대폰
      </p>
      <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Kakao header */}
        <div className="flex items-center gap-2 bg-[#FEE500] px-4 py-2.5">
          <span className="text-sm">💬</span>
          <span className="text-sm font-bold text-[#3C1E1E]">카카오톡</span>
        </div>

        {/* Notification body */}
        <div className="p-4">
          {/* Sender info */}
          <div className="mb-3 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm text-white">
              🎂
            </div>
            <div>
              <p className="text-sm font-bold text-warm-gray-900">해피케이크</p>
              <p className="text-[11px] text-warm-gray-400">알림톡</p>
            </div>
            <span className="ml-auto text-[10px] text-warm-gray-400">
              방금
            </span>
          </div>

          {/* Title */}
          <p className="mb-3 text-sm font-bold text-warm-gray-900">
            예약이 확정되었어요! 🎉
          </p>

          {/* Order details */}
          <div className="rounded-xl bg-warm-gray-50 p-3 text-xs">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-warm-gray-700">
                <span>📅</span>
                <span>
                  {CHAT_DEMO_ORDER.pickupDate} {CHAT_DEMO_ORDER.pickupTime}{" "}
                  픽업
                </span>
              </div>
            </div>

            <div className="mt-2 space-y-1.5 border-t border-warm-gray-200 pt-2">
              <div className="flex items-center gap-2 text-warm-gray-700">
                <span>🎨</span>
                <span>
                  {CHAT_DEMO_ORDER.cakeShape} · {CHAT_DEMO_ORDER.size}
                </span>
              </div>
              <div className="flex items-center gap-2 text-warm-gray-700">
                <span>✍️</span>
                <span>{CHAT_DEMO_ORDER.lettering}</span>
              </div>
              <div className="flex items-center gap-2 text-warm-gray-700">
                <span>🎂</span>
                <span>{CHAT_DEMO_ORDER.boardText}</span>
              </div>
              <div className="flex items-center gap-2 text-warm-gray-700">
                <span>🎨</span>
                <span>
                  배경: {CHAT_DEMO_ORDER.bgColor} · 레터링:{" "}
                  {CHAT_DEMO_ORDER.letteringColor}
                </span>
              </div>
              {CHAT_DEMO_ORDER.hasDesignImage && (
                <div className="flex items-center gap-2 text-warm-gray-700">
                  <span>📷</span>
                  <span>디자인 참고 이미지 첨부</span>
                </div>
              )}
            </div>

            <div className="mt-2 border-t border-warm-gray-200 pt-2">
              <div className="flex items-center justify-between font-bold text-warm-gray-900">
                <span>💰 결제 금액</span>
                <span className="text-sm text-primary">
                  {CHAT_DEMO_ORDER.total}
                </span>
              </div>
            </div>
          </div>

          {/* Message from owner */}
          <div className="mt-3 rounded-xl border border-primary/20 bg-primary-50 p-3">
            <p className="text-[11px] font-medium text-primary">
              사장님 메시지
            </p>
            <p className="mt-1 text-xs text-warm-gray-700">
              정성껏 준비하겠습니다! 픽업 시간에 맞춰 방문해 주세요 😊
            </p>
          </div>

          {/* Timestamp */}
          <p className="mt-3 text-center text-[10px] text-warm-gray-400">
            해피케이크에서 보낸 알림톡이에요
          </p>
        </div>
      </div>
    </div>
  );
}
