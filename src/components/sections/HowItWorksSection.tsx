import SectionWrapper from "@/components/ui/SectionWrapper";
import SetupDemo from "@/components/demos/SetupDemo";

export default function HowItWorksSection() {
  return (
    <SectionWrapper id="how-it-works">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-warm-gray-900 sm:text-3xl">
          10분이면 끝나는 세팅
        </h2>
        <p className="mx-auto mt-3 max-w-md text-warm-gray-500">
          사진 3장이면 AI 에이전트가 만들어져요.
        </p>
      </div>

      <SetupDemo />
    </SectionWrapper>
  );
}
