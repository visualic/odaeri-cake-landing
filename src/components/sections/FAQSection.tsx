import SectionWrapper from "@/components/ui/SectionWrapper";
import Accordion from "@/components/ui/Accordion";
import { FAQS } from "@/lib/constants";

export default function FAQSection() {
  return (
    <SectionWrapper id="faq">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-warm-gray-900 sm:text-3xl">
            자주 묻는 질문
          </h2>
        </div>

        <div className="mt-10">
          {FAQS.map((faq, i) => (
            <Accordion key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
