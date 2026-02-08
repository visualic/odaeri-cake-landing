import SectionWrapper from "@/components/ui/SectionWrapper";
import ChatDemo from "@/components/demos/ChatDemo";
import { SOLUTION_TITLE, SOLUTION_DESCRIPTION } from "@/lib/constants";

export default function SolutionSection() {
  return (
    <SectionWrapper bg="primary">
      <div className="text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">
          {SOLUTION_TITLE}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-lg text-white/80">
          {SOLUTION_DESCRIPTION}
        </p>
      </div>

      <div className="mt-12 flex justify-center">
        <ChatDemo />
      </div>
    </SectionWrapper>
  );
}
