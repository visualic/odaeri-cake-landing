import SectionWrapper from "@/components/ui/SectionWrapper";
import DashboardDemo from "@/components/demos/DashboardDemo";

export default function DashboardSection() {
  return (
    <SectionWrapper id="dashboard" className="-mt-14 md:-mt-20">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-warm-gray-900 sm:text-3xl">
          한눈에 보는 주문 현황
        </h2>
        <p className="mx-auto mt-3 max-w-md text-warm-gray-500">
          오늘 들어온 주문, 매출, 상태를 대시보드에서 바로 확인하세요.
        </p>
      </div>

      <DashboardDemo />
    </SectionWrapper>
  );
}
