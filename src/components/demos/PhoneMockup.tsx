"use client";

interface PhoneMockupProps {
  children: React.ReactNode;
}

export default function PhoneMockup({ children }: PhoneMockupProps) {
  return (
    <div className="relative mx-auto w-[280px] sm:w-[320px] md:w-[360px]">
      {/* Phone frame */}
      <div className="rounded-[2.5rem] border-[6px] border-warm-gray-800 bg-white shadow-2xl">
        {/* Notch */}
        <div className="mx-auto mt-2 h-6 w-28 rounded-full bg-warm-gray-800" />

        {/* Screen */}
        <div className="mx-2 mt-2 mb-2 h-[480px] sm:h-[520px] md:h-[560px] overflow-hidden rounded-b-[2rem]">
          {children}
        </div>

        {/* Home indicator */}
        <div className="mx-auto mb-2 h-1 w-28 rounded-full bg-warm-gray-300" />
      </div>
    </div>
  );
}
