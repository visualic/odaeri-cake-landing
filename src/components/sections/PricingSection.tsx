import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import { PRICING } from "@/lib/constants";

export default function PricingSection() {
  return (
    <SectionWrapper id="pricing" bg="light">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-warm-gray-900 sm:text-3xl">
          심플한 요금제
        </h2>
        <p className="mx-auto mt-3 max-w-md text-warm-gray-500">
          {PRICING.dailyPrice}도 안 되는 비용으로 AI 에이전트를 고용하세요.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-sm">
        <div className="overflow-hidden rounded-2xl border-2 border-primary bg-white shadow-lg">
          <div className="bg-primary p-6 text-center text-white">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-bold">{PRICING.price}</span>
              <span className="text-lg opacity-80">{PRICING.priceUnit}</span>
            </div>
            <p className="mt-2 text-sm opacity-70">{PRICING.trialText}</p>
          </div>

          <div className="p-6">
            <ul className="space-y-3">
              {PRICING.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success/10 text-xs text-success">
                    ✓
                  </span>
                  <span className="text-warm-gray-700">{feature.text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <Button asLink="#beta-signup" size="lg" className="w-full">
                사전 등록하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
