import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import { FINAL_CTA } from "@/lib/constants";

export default function FinalCTASection() {
  return (
    <SectionWrapper bg="primary">
      <div className="text-center">
        <h2 className="whitespace-pre-line text-2xl font-bold sm:text-3xl md:text-4xl">
          {FINAL_CTA.title}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-white/80">
          {FINAL_CTA.subtitle}
        </p>
        <div className="mt-8 flex justify-center">
          <Button
            asLink="#beta-signup"
            size="lg"
            className="bg-white! text-primary! hover:bg-warm-gray-100!"
          >
            웨이팅리스트 등록하기
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
