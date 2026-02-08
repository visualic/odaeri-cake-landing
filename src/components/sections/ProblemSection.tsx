import SectionWrapper from "@/components/ui/SectionWrapper";
import { PROBLEMS } from "@/lib/constants";

export default function ProblemSection() {
  return (
    <SectionWrapper>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-warm-gray-900 sm:text-3xl">
          이런 하루, 익숙하시죠?
        </h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROBLEMS.map((problem, i) => (
            <div
              key={i}
              className="rounded-2xl border border-warm-gray-200 bg-white p-6 text-center transition-shadow hover:shadow-md"
            >
              <span className="text-4xl">{problem.emoji}</span>
              <p className="mt-3 text-sm font-medium text-warm-gray-700 leading-relaxed">
                {problem.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
