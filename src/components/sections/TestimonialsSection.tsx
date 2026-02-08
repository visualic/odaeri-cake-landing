import SectionWrapper from "@/components/ui/SectionWrapper";
import { TESTIMONIALS } from "@/lib/constants";

export default function TestimonialsSection() {
  return (
    <SectionWrapper>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-warm-gray-900 sm:text-3xl">
          사장님들의 이야기
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-warm-gray-400">
          먼저 사용해 본 사장님들의 솔직한 후기
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            className="rounded-2xl border border-warm-gray-200 bg-white p-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-sm font-bold text-primary">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-warm-gray-800">
                  {t.name}
                </p>
                <p className="text-xs text-warm-gray-400">{t.business} · {t.location}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-warm-gray-600">
              &ldquo;{t.text}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
