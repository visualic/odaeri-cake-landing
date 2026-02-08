import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-warm-gray-200 bg-warm-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <span className="text-lg font-bold text-primary">{SITE.name}</span>
            <p className="mt-1 text-sm text-warm-gray-500">
              {SITE.tagline}
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 text-sm text-warm-gray-400 md:items-end">
            <div className="flex gap-4">
              <a href="#" className="transition-colors hover:text-warm-gray-600">
                이용약관
              </a>
              <a href="#" className="transition-colors hover:text-warm-gray-600">
                개인정보처리방침
              </a>
            </div>
            <p>&copy; {new Date().getFullYear()} 오대리. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
