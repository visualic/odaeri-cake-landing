"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DASHBOARD_ORDER_STATS,
  DASHBOARD_REVENUE_STATS,
  DASHBOARD_ORDERS,
  DASHBOARD_NEW_ORDER,
} from "@/lib/constants";

type OrderStatus = "new" | "pending" | "confirmed" | "done";

const STATUS_MAP: Record<OrderStatus, { label: string; cls: string }> = {
  new: { label: "새 주문", cls: "bg-accent/10 text-accent" },
  pending: { label: "대기 중", cls: "bg-amber-50 text-amber-600" },
  confirmed: { label: "확정", cls: "bg-primary-50 text-primary" },
  done: { label: "완료", cls: "bg-success/10 text-success" },
};

export default function DashboardDemo() {
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timerRef.current.push(setTimeout(() => setShowNewOrder(true), 2500));
    return () => timerRef.current.forEach(clearTimeout);
  }, []);

  const handleConfirm = () => {
    if (confirmed) return;
    setConfirmed(true);
  };

  return (
    <div className="mx-auto mt-10 max-w-2xl">
      {/* Browser frame */}
      <div className="overflow-hidden rounded-2xl border border-warm-gray-200 bg-white shadow-lg">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-warm-gray-100 bg-warm-gray-50 px-4 py-2.5">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-warm-gray-300" />
            <div className="h-3 w-3 rounded-full bg-warm-gray-300" />
            <div className="h-3 w-3 rounded-full bg-warm-gray-300" />
          </div>
          <div className="mx-auto rounded-lg bg-white px-4 py-1 text-[11px] text-warm-gray-400">
            odaeri.com/dashboard
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-warm-gray-900 sm:text-lg">
                해피케이크
              </h3>
              <p className="text-xs text-warm-gray-400">2월 15일 (토) 주문 현황</p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm text-white">
              🎂
            </div>
          </div>

          {/* Order stats */}
          <div className="mb-3 grid grid-cols-4 gap-2">
            {DASHBOARD_ORDER_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-warm-gray-50 p-2.5 text-center sm:p-3"
              >
                <span className="text-base sm:text-lg">{stat.icon}</span>
                <p className="mt-0.5 text-sm font-bold text-warm-gray-900 sm:text-base">
                  {stat.value}
                </p>
                <p className="text-[10px] text-warm-gray-400 sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Revenue stats */}
          <div className="mb-5 grid grid-cols-2 gap-2">
            {DASHBOARD_REVENUE_STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 rounded-xl bg-warm-gray-50 px-4 py-3"
              >
                <span className="text-lg">{stat.icon}</span>
                <div>
                  <p className="text-[10px] text-warm-gray-400 sm:text-xs">
                    {stat.label}
                  </p>
                  <p className="text-sm font-bold text-warm-gray-900 sm:text-base">
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* New order notification */}
          <AnimatePresence>
            {showNewOrder && !confirmed && (
              <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mb-4 overflow-hidden rounded-xl border-2 border-accent/30 bg-accent/5"
              >
                <div className="flex items-center gap-3 px-4 py-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm text-white">
                    🔔
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-warm-gray-900">
                      새 주문이 들어왔어요!
                    </p>
                    <p className="truncate text-[11px] text-warm-gray-500">
                      {DASHBOARD_NEW_ORDER.customer} ·{" "}
                      {DASHBOARD_NEW_ORDER.item} ·{" "}
                      {DASHBOARD_NEW_ORDER.price}
                    </p>
                  </div>
                  <button
                    onClick={handleConfirm}
                    className="shrink-0 cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-accent/90 active:scale-95"
                  >
                    확인
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Order table */}
          <div className="overflow-hidden rounded-xl border border-warm-gray-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-warm-gray-50">
                <tr>
                  <th className="px-3 py-2.5 font-semibold text-warm-gray-500">
                    주문번호
                  </th>
                  <th className="px-3 py-2.5 font-semibold text-warm-gray-500">
                    고객
                  </th>
                  <th className="hidden px-3 py-2.5 font-semibold text-warm-gray-500 sm:table-cell">
                    메뉴
                  </th>
                  <th className="px-3 py-2.5 font-semibold text-warm-gray-500">
                    픽업
                  </th>
                  <th className="px-3 py-2.5 text-right font-semibold text-warm-gray-500">
                    상태
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* New order row */}
                <AnimatePresence>
                  {showNewOrder && confirmed && (
                    <motion.tr
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="border-t border-warm-gray-100 bg-accent/5"
                    >
                      <td className="px-3 py-2.5 font-medium text-warm-gray-800">
                        {DASHBOARD_NEW_ORDER.id}
                      </td>
                      <td className="px-3 py-2.5 text-warm-gray-700">
                        {DASHBOARD_NEW_ORDER.customer}
                      </td>
                      <td className="hidden px-3 py-2.5 text-warm-gray-600 sm:table-cell">
                        {DASHBOARD_NEW_ORDER.item}
                      </td>
                      <td className="px-3 py-2.5 text-warm-gray-600">
                        {DASHBOARD_NEW_ORDER.pickup}
                      </td>
                      <td className="px-3 py-2.5 text-right">
                        <StatusBadge status="pending" />
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>

                {DASHBOARD_ORDERS.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t border-warm-gray-100 transition-colors hover:bg-warm-gray-50/50"
                  >
                    <td className="px-3 py-2.5 font-medium text-warm-gray-800">
                      {order.id}
                    </td>
                    <td className="px-3 py-2.5 text-warm-gray-700">
                      {order.customer}
                    </td>
                    <td className="hidden px-3 py-2.5 text-warm-gray-600 sm:table-cell">
                      {order.item}
                    </td>
                    <td className="px-3 py-2.5 text-warm-gray-600">
                      {order.pickup}
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const { label, cls } = STATUS_MAP[status];
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${cls}`}
    >
      {label}
    </span>
  );
}
