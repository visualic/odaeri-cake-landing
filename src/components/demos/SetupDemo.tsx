"use client";

import { useState, useEffect, useCallback, useRef, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import {
  SETUP_SEARCH_QUERY,
  SETUP_SEARCH_RESULTS,
  SETUP_MENU_ITEMS,
  SETUP_GENERATED_LINK,
  SETUP_OWNER_PARKING,
  SETUP_BLOG_URL,
  SETUP_QA_ITEMS,
} from "@/lib/constants";

type SetupStep = 1 | 2 | 3 | 4;

const STEP_META = [
  { label: "가게 검색", icon: "🔍", desc: "가게 이름만 검색하면 자동 입력" },
  { label: "메뉴판", icon: "📷", desc: "사진 한 장이면 AI가 분석" },
  { label: "Q&A", icon: "💬", desc: "블로그 주소면 AI가 초안 작성" },
  { label: "링크 배포", icon: "🔗", desc: "붙여넣기, 끝!" },
];

export default function SetupDemo() {
  const [step, setStep] = useState<SetupStep>(1);
  const [isActive, setIsActive] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<SetupStep>>(
    new Set(),
  );

  const allDone = completedSteps.size === 4;

  const handleNextStep = useCallback((completedStep: SetupStep) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      next.add(completedStep);
      return next;
    });
    if (completedStep < 4) {
      setStep((completedStep + 1) as SetupStep);
      setIsActive(false);
    }
  }, []);

  const goToStep = useCallback((s: SetupStep) => {
    setStep(s);
    setIsActive(false);
  }, []);

  const handleReset = useCallback(() => {
    setStep(1);
    setIsActive(false);
    setCompletedSteps(new Set());
  }, []);

  return (
    <div className="mt-12">
      {/* ── Visual Stepper ── */}
      <div className="mx-auto flex max-w-md items-start justify-center">
        {STEP_META.map((meta, i) => {
          const s = (i + 1) as SetupStep;
          const isActiveStep = step === s;
          const isCompleted = completedSteps.has(s);

          return (
            <Fragment key={s}>
              {i > 0 && (
                <div className="mt-5 flex-1 px-1">
                  <div
                    className={`h-0.5 w-full rounded-full transition-colors duration-500 ${
                      completedSteps.has(i as SetupStep)
                        ? "bg-primary"
                        : "bg-warm-gray-200"
                    }`}
                  />
                </div>
              )}
              <button
                onClick={() => goToStep(s)}
                className="flex w-16 cursor-pointer flex-col items-center gap-1.5 sm:w-20"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-lg transition-all duration-300 ${
                    isActiveStep
                      ? "scale-110 bg-primary text-white shadow-lg shadow-primary/30"
                      : isCompleted
                        ? "bg-success text-white"
                        : "bg-warm-gray-100 text-warm-gray-400"
                  }`}
                >
                  {isCompleted && !isActiveStep ? "✓" : meta.icon}
                </div>
                <span
                  className={`text-[11px] font-semibold transition-colors sm:text-xs ${
                    isActiveStep
                      ? "text-primary"
                      : isCompleted
                        ? "text-success"
                        : "text-warm-gray-400"
                  }`}
                >
                  {meta.label}
                </span>
              </button>
            </Fragment>
          );
        })}
      </div>

      {/* ── Demo Panel ── */}
      <div className="mx-auto mt-6 max-w-lg overflow-hidden rounded-2xl border border-warm-gray-200 bg-white shadow-sm">
        <div className="border-b border-warm-gray-100 bg-warm-gray-50/50 px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
              {step}
            </span>
            <p className="text-sm font-semibold text-warm-gray-700">
              {STEP_META[step - 1].desc}
            </p>
          </div>
        </div>

        <div className="min-h-[280px] p-5">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <Step1Panel
                key="step1"
                isActive={isActive}
                onActivate={() => setIsActive(true)}
                onClickNext={() => handleNextStep(1)}
              />
            )}
            {step === 2 && (
              <Step2Panel
                key="step2"
                isActive={isActive}
                onActivate={() => setIsActive(true)}
                onClickNext={() => handleNextStep(2)}
              />
            )}
            {step === 3 && (
              <Step3Panel
                key="step3"
                isActive={isActive}
                onActivate={() => setIsActive(true)}
                onClickNext={() => handleNextStep(3)}
              />
            )}
            {step === 4 && (
              <Step4Panel
                key="step4"
                onComplete={() => handleNextStep(4)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── All done celebration ── */}
      <AnimatePresence>
        {allDone && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center"
          >
            <span className="inline-block rounded-full bg-success/10 px-5 py-2.5 text-sm font-semibold text-success">
              🎉 세팅 완료! 이제 주문을 받을 준비가 됐어요
            </span>
            <button
              onClick={handleReset}
              className="mx-auto mt-3 block cursor-pointer text-xs text-warm-gray-400 transition-colors hover:text-warm-gray-600"
            >
              처음부터 다시 보기
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Next Button ──

function NextButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-5 flex justify-end"
    >
      <button
        onClick={onClick}
        className="cursor-pointer rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark active:scale-[0.97]"
      >
        다음으로 →
      </button>
    </motion.div>
  );
}

// ── Step 1: 가게 검색 ─────────────────────────────────────

function Step1Panel({
  isActive,
  onActivate,
  onClickNext,
}: {
  isActive: boolean;
  onActivate: () => void;
  onClickNext: () => void;
}) {
  const { displayed: searchText, done: searchDone } = useTypewriter(
    SETUP_SEARCH_QUERY,
    isActive,
    80,
  );
  const [showResults, setShowResults] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [infoChecks, setInfoChecks] = useState<number[]>([]);
  const [ownerEditStarted, setOwnerEditStarted] = useState(false);

  const { displayed: parkingText, done: parkingDone } = useTypewriter(
    SETUP_OWNER_PARKING,
    ownerEditStarted,
    35,
  );

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timeoutsRef.current.forEach(clearTimeout), []);

  useEffect(() => {
    if (searchDone && !showResults) {
      const t = setTimeout(() => setShowResults(true), 400);
      timeoutsRef.current.push(t);
    }
  }, [searchDone, showResults]);

  const handleSelectResult = useCallback(() => {
    setShowResults(false);
    setShowInfo(true);
    [0, 1, 2].forEach((i) => {
      const t = setTimeout(
        () => setInfoChecks((prev) => [...prev, i]),
        400 + i * 500,
      );
      timeoutsRef.current.push(t);
    });
    const t = setTimeout(() => setOwnerEditStarted(true), 2200);
    timeoutsRef.current.push(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Search input */}
      <div
        className={`relative flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-sm transition-colors ${
          isActive
            ? "border-primary bg-white"
            : "cursor-pointer border-warm-gray-200 bg-warm-gray-50 hover:border-warm-gray-300"
        }`}
        onClick={!isActive ? onActivate : undefined}
      >
        <span className="text-warm-gray-400">🔍</span>
        <span
          className={isActive ? "text-warm-gray-800" : "text-warm-gray-400"}
        >
          {isActive ? (
            <>
              {searchText}
              {!searchDone && (
                <span className="animate-pulse text-primary">|</span>
              )}
            </>
          ) : (
            "클릭해서 가게 검색..."
          )}
        </span>
      </div>

      {/* Search results dropdown */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-1 overflow-hidden rounded-xl border border-warm-gray-200 bg-white shadow-lg"
          >
            {SETUP_SEARCH_RESULTS.map((result) => (
              <button
                key={result.name}
                onClick={handleSelectResult}
                className="w-full cursor-pointer px-4 py-3 text-left transition-colors hover:bg-primary-50"
              >
                <p className="text-sm font-semibold text-warm-gray-900">
                  {result.name}
                </p>
                <p className="text-xs text-warm-gray-400">{result.address}</p>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auto-filled info */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 rounded-xl bg-primary-50/50 p-4"
          >
            <p className="mb-3 text-xs font-semibold text-primary">
              자동으로 채워졌어요!
            </p>
            <div className="space-y-2.5">
              {[
                { label: "주소", value: SETUP_SEARCH_RESULTS[0].address },
                { label: "영업시간", value: SETUP_SEARCH_RESULTS[0].hours },
                { label: "전화번호", value: SETUP_SEARCH_RESULTS[0].phone },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2.5 text-sm"
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold transition-all duration-300 ${
                      infoChecks.includes(i)
                        ? "bg-success text-white"
                        : "bg-warm-gray-200"
                    }`}
                  >
                    {infoChecks.includes(i) ? "✓" : ""}
                  </span>
                  <span className="w-14 text-warm-gray-400">{item.label}</span>
                  <span
                    className={`font-medium transition-all duration-300 ${
                      infoChecks.includes(i)
                        ? "text-warm-gray-700"
                        : "text-warm-gray-300"
                    }`}
                  >
                    {infoChecks.includes(i) ? item.value : "—"}
                  </span>
                </div>
              ))}
            </div>

            {/* Owner direct input */}
            {ownerEditStarted && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 border-t border-primary/10 pt-3"
              >
                <p className="mb-2 text-xs font-semibold text-amber-600">
                  ✏️ 사장님 직접 입력
                </p>
                <div className="flex items-start gap-2.5 text-sm">
                  <span className="mt-0.5 w-14 shrink-0 text-warm-gray-400">
                    기타 안내
                  </span>
                  <span className="font-medium text-warm-gray-700">
                    {parkingText}
                    {!parkingDone && (
                      <span className="animate-pulse text-primary">|</span>
                    )}
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {parkingDone && <NextButton onClick={onClickNext} />}
    </motion.div>
  );
}

// ── Step 2: 메뉴판 올리기 ─────────────────────────────────

function Step2Panel({
  isActive,
  onActivate,
  onClickNext,
}: {
  isActive: boolean;
  onActivate: () => void;
  onClickNext: () => void;
}) {
  const [phase, setPhase] = useState<
    "idle" | "uploaded" | "analyzing" | "done"
  >("idle");
  // editStep: 0=none, 1=highlight, 2=strikethrough, 3=new value, 4=ready
  const [editStep, setEditStep] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase("uploaded"), 300));
    timers.push(setTimeout(() => setPhase("analyzing"), 800));
    timers.push(setTimeout(() => setPhase("done"), 2800));
    timers.push(setTimeout(() => setEditStep(1), 3800));
    timers.push(setTimeout(() => setEditStep(2), 4400));
    timers.push(setTimeout(() => setEditStep(3), 5000));
    timers.push(setTimeout(() => setEditStep(4), 5600));
    return () => timers.forEach(clearTimeout);
  }, [isActive]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      {phase === "idle" && (
        <div
          onClick={onActivate}
          className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-warm-gray-300 py-12 text-warm-gray-400 transition-colors hover:border-primary hover:text-primary"
        >
          <span className="text-4xl">📷</span>
          <span className="text-sm font-medium">
            클릭해서 메뉴판 업로드
          </span>
          <span className="text-xs text-warm-gray-300">JPG, PNG, HEIC</span>
        </div>
      )}

      {phase === "uploaded" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 rounded-xl bg-warm-gray-50 px-4 py-8"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warm-gray-200 text-2xl">
            🖼️
          </div>
          <div>
            <p className="text-sm font-medium text-warm-gray-700">
              menu_photo.jpg
            </p>
            <p className="text-xs text-warm-gray-400">1.2 MB</p>
          </div>
          <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-success text-[10px] text-white">
            ✓
          </span>
        </motion.div>
      )}

      {phase === "analyzing" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-xl bg-warm-gray-50 px-4 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warm-gray-200 text-xl">
              🖼️
            </div>
            <div>
              <p className="text-sm font-medium text-warm-gray-700">
                menu_photo.jpg
              </p>
              <p className="text-xs text-warm-gray-400">1.2 MB</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-primary">AI 분석 중...</p>
            <p className="mt-1 text-xs text-warm-gray-400">
              메뉴, 가격, 옵션을 자동으로 추출하고 있어요
            </p>
          </div>
          <div className="mx-auto h-2 max-w-xs overflow-hidden rounded-full bg-warm-gray-200">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
        </div>
      )}

      {phase === "done" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success text-[10px] text-white">
              ✓
            </span>
            <span className="text-sm font-medium text-success">
              3개 메뉴 분석 완료!
            </span>
          </div>
          <div className="overflow-hidden rounded-xl border border-warm-gray-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-warm-gray-50">
                <tr>
                  <th className="px-3 py-2 font-semibold text-warm-gray-600">
                    메뉴
                  </th>
                  <th className="px-3 py-2 font-semibold text-warm-gray-600">
                    가격
                  </th>
                  <th className="hidden px-3 py-2 font-semibold text-warm-gray-600 sm:table-cell">
                    사이즈
                  </th>
                  <th className="hidden px-3 py-2 font-semibold text-warm-gray-600 sm:table-cell">
                    토핑
                  </th>
                </tr>
              </thead>
              <tbody>
                {SETUP_MENU_ITEMS.map((item, i) => {
                  const isEditTarget = i === 2;
                  const isHighlighted = isEditTarget && editStep >= 1;
                  return (
                    <motion.tr
                      key={item.name}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className={`border-t border-warm-gray-100 transition-colors ${
                        isHighlighted ? "bg-amber-50" : ""
                      }`}
                    >
                      <td className="px-3 py-2.5 font-medium text-warm-gray-800">
                        {item.name}
                      </td>
                      <td className="px-3 py-2.5 text-warm-gray-600">
                        {isEditTarget && editStep >= 2 ? (
                          <span>
                            <span className="text-warm-gray-300 line-through">
                              {item.price}
                            </span>
                            {editStep >= 3 && (
                              <span className="ml-1.5 font-medium text-primary">
                                32,000원~
                              </span>
                            )}
                          </span>
                        ) : (
                          item.price
                        )}
                      </td>
                      <td className="hidden px-3 py-2.5 text-warm-gray-500 sm:table-cell">
                        {item.sizes}
                      </td>
                      <td className="hidden px-3 py-2.5 text-warm-gray-500 sm:table-cell">
                        {item.toppings}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {editStep >= 1 && editStep < 4 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-xs font-medium text-amber-600"
            >
              ✏️ 사장님이 가격을 수정하고 있어요...
            </motion.p>
          )}

          {editStep >= 4 && <NextButton onClick={onClickNext} />}
        </motion.div>
      )}
    </motion.div>
  );
}

// ── Step 3: Q&A 작성 ──────────────────────────────────────

function Step3Panel({
  isActive,
  onActivate,
  onClickNext,
}: {
  isActive: boolean;
  onActivate: () => void;
  onClickNext: () => void;
}) {
  const { displayed: urlText, done: urlDone } = useTypewriter(
    SETUP_BLOG_URL,
    isActive,
    40,
  );
  const [phase, setPhase] = useState<
    "idle" | "urlTyping" | "analyzing" | "qaDone"
  >("idle");
  // editStep: 0=none, 1=highlight, 2=strikethrough, 3=new answer, 4=ready
  const [editStep, setEditStep] = useState(0);

  useEffect(() => {
    if (isActive && phase === "idle") {
      setPhase("urlTyping");
    }
  }, [isActive, phase]);

  useEffect(() => {
    if (!urlDone) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase("analyzing"), 500));
    timers.push(setTimeout(() => setPhase("qaDone"), 2500));
    timers.push(setTimeout(() => setEditStep(1), 3500));
    timers.push(setTimeout(() => setEditStep(2), 4100));
    timers.push(setTimeout(() => setEditStep(3), 4700));
    timers.push(setTimeout(() => setEditStep(4), 5300));
    return () => timers.forEach(clearTimeout);
  }, [urlDone]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Blog URL input */}
      <div
        className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-sm transition-colors ${
          isActive
            ? "border-primary bg-white"
            : "cursor-pointer border-warm-gray-200 bg-warm-gray-50 hover:border-warm-gray-300"
        }`}
        onClick={!isActive ? onActivate : undefined}
      >
        <span className="text-warm-gray-400">🔗</span>
        <span
          className={isActive ? "text-warm-gray-800" : "text-warm-gray-400"}
        >
          {isActive ? (
            <>
              {urlText}
              {!urlDone && (
                <span className="animate-pulse text-primary">|</span>
              )}
            </>
          ) : (
            "클릭해서 블로그 주소 입력..."
          )}
        </span>
      </div>

      {/* AI analyzing */}
      {phase === "analyzing" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 space-y-3"
        >
          <div className="text-center">
            <p className="text-sm font-medium text-primary">
              AI가 블로그를 분석하고 있어요...
            </p>
            <p className="mt-1 text-xs text-warm-gray-400">
              자주 묻는 질문을 자동으로 추출 중
            </p>
          </div>
          <div className="mx-auto h-2 max-w-xs overflow-hidden rounded-full bg-warm-gray-200">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}

      {/* Q&A items */}
      {phase === "qaDone" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success text-[10px] text-white">
              ✓
            </span>
            <span className="text-sm font-medium text-success">
              {SETUP_QA_ITEMS.length}개 Q&A 초안 완료!
            </span>
          </div>
          <div className="space-y-2">
            {SETUP_QA_ITEMS.map((qa, i) => {
              const isEditTarget = i === 0;
              const isHighlighted = isEditTarget && editStep >= 1;
              return (
                <motion.div
                  key={qa.question}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className={`rounded-xl border p-3 transition-colors ${
                    isHighlighted
                      ? "border-amber-300 bg-amber-50"
                      : "border-warm-gray-200 bg-warm-gray-50"
                  }`}
                >
                  <p className="text-xs font-semibold text-warm-gray-700">
                    Q. {qa.question}
                  </p>
                  <div className="mt-1 text-xs text-warm-gray-600">
                    {isEditTarget && editStep >= 2 ? (
                      <>
                        <span className="text-warm-gray-300 line-through">
                          {qa.aiAnswer}
                        </span>
                        {editStep >= 3 && (
                          <p className="mt-1 font-medium text-primary">
                            {qa.ownerAnswer}
                          </p>
                        )}
                      </>
                    ) : (
                      <span>A. {qa.aiAnswer}</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {editStep >= 1 && editStep < 4 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-xs font-medium text-amber-600"
            >
              ✏️ 사장님이 답변을 수정하고 있어요...
            </motion.p>
          )}

          {editStep >= 4 && <NextButton onClick={onClickNext} />}
        </motion.div>
      )}
    </motion.div>
  );
}

// ── Step 4: 링크 배포 ─────────────────────────────────────

function Step4Panel({ onComplete }: { onComplete: () => void }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = setTimeout(onComplete, 2000);
    return () => clearTimeout(t);
  }, [onComplete]);

  const handleCopy = useCallback(() => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Generated link */}
      <div className="flex items-center gap-2 rounded-xl border-2 border-primary bg-primary-50 px-4 py-3">
        <span className="text-primary">🔗</span>
        <span className="flex-1 truncate text-sm font-medium text-primary">
          {SETUP_GENERATED_LINK}
        </span>
        <button
          onClick={handleCopy}
          className={`shrink-0 cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
            copied
              ? "bg-success text-white"
              : "bg-primary text-white hover:bg-primary-dark"
          }`}
        >
          {copied ? "복사됨!" : "복사"}
        </button>
      </div>

      {/* Usage guide */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-5 space-y-3"
      >
        <div className="flex items-start gap-3 rounded-xl bg-warm-gray-50 p-4">
          <span className="mt-0.5 text-lg">📱</span>
          <div>
            <p className="text-sm font-medium text-warm-gray-700">
              인스타 프로필에 링크 붙여넣기
            </p>
            <p className="mt-0.5 text-xs text-warm-gray-400">
              프로필 편집 → 웹사이트 → 링크 붙여넣기
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl bg-warm-gray-50 p-4">
          <span className="mt-0.5 text-lg">✨</span>
          <div>
            <p className="text-sm font-medium text-warm-gray-700">
              고객이 링크를 열면 바로 AI 상담 시작
            </p>
            <p className="mt-0.5 text-xs text-warm-gray-400">
              24시간 자동 응대, 주문서 자동 생성
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
