import SectionWrapper from "@/components/ui/SectionWrapper";
import { FEATURES } from "@/lib/constants";

export default function FeaturesSection() {
  return (
    <SectionWrapper id="features" bg="light">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-warm-gray-900 sm:text-3xl">
          오대리가 해드리는 일
        </h2>
        <p className="mx-auto mt-3 max-w-md text-warm-gray-500">
          사장님은 만들기에만 집중하세요.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {FEATURES.map((feature, i) => (
          <div
            key={i}
            className="rounded-2xl border border-warm-gray-200 bg-white p-6 transition-shadow hover:shadow-md sm:p-8"
          >
            <span className="text-3xl">{feature.icon}</span>
            <h3 className="mt-4 text-lg font-bold text-warm-gray-900">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-warm-gray-500">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
