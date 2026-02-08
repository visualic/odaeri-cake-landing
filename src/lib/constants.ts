import type {
  FAQItem,
  FeatureCard,
  ProblemCard,
  HowItWorksStep,
  PricingFeature,
  ChatStep,
  SetupSearchResult,
  DemoMenuItem,
} from "./types";

export const SITE = {
  name: "오대리",
  tagline: "사장님의 알잘딱깔센 AI 주문상담 에이전트",
  description:
    "인스타 DM 대신 AI가 상담하고, 견적 내고, 주문까지 받습니다. 사진 3장이면 10분 만에 AI 에이전트가 만들어져요.",
  url: "https://odaeri.com",
} as const;

export const HERO_ROTATING_ITEMS = [
  { question: "주차 되나요?", punch: "이제 AI가 답합니다.", color: "#7c5cfc" },
  { question: "가격이 얼마예요?", punch: "하루에 몇 번 답하세요?", color: "#ff7f6e" },
  { question: "내일 픽업 되나요?", punch: "새벽 2시에도 옵니다.", color: "#f59e0b" },
  { question: "레터링 가능한가요?", punch: "또 같은 답장 하실 건가요?", color: "#10b981" },
  { question: "당일 주문 되나요?", punch: "케이크 만들다 폰 잡으셨죠?", color: "#ec4899" },
  { question: "보관은 어떻게 해요?", punch: "AI가 대신 답합니다.", color: "#7c5cfc" },
  { question: "어떤 맛 있어요?", punch: "메뉴판 보내는 것도 지치셨죠?", color: "#3b82f6" },
  { question: "사진이랑 똑같이 되나요?", punch: "인스타 캡처, 오늘만 세 번째.", color: "#ff7f6e" },
  { question: "카드 되나요?", punch: "같은 질문, 같은 답, 매일 반복.", color: "#8b5cf6" },
  { question: "입금했는데 확인해주세요", punch: "케이크 만들다 또 폰 잡으셨죠?", color: "#10b981" },
  { question: "몇 호가 몇 인분이에요?", punch: "사이즈 설명, 하루에 다섯 번.", color: "#f59e0b" },
  { question: "디자인 수정 가능한가요?", punch: "확정 후에도 끝이 아닙니다.", color: "#ec4899" },
  { question: "초 같이 주시나요?", punch: "사소한 질문이 제일 많습니다.", color: "#3b82f6" },
] as const;

export const HERO_SUBTITLE =
  "사장님의 알잘딱깔센 AI 주문상담 에이전트, 오대리.";

export const PROBLEMS: ProblemCard[] = [
  { emoji: "😮‍💨", text: "같은 질문 DM 하루 100개" },
  { emoji: "😴", text: '새벽 2시 "내일 픽업 되나요?"' },
  { emoji: "😵", text: "카톡 뒤져서 주문 내역 보고 또 보고" },
  { emoji: "📱", text: "케이크 만들다 답장하러 폰 잡기" },
];

export const SOLUTION_TITLE = "상담, 견적, 주문접수까지, AI가 알아서.";
export const SOLUTION_DESCRIPTION =
  "사장님은 만드는 데만 집중하세요. 나머지는 오대리가 합니다.";

export const HOW_IT_WORKS: HowItWorksStep[] = [
  {
    step: 1,
    title: "가게 검색",
    description: "가게 이름만 검색하면 주소, 영업시간이 자동으로 입력돼요.",
    icon: "🔍",
  },
  {
    step: 2,
    title: "메뉴판 올리기",
    description: "메뉴판 사진 찍어 올리면 AI가 메뉴와 가격을 자동 정리해요.",
    icon: "📷",
  },
  {
    step: 3,
    title: "링크 배포",
    description: "인스타 프로필에 링크 붙여넣기, 끝! 바로 주문 받을 수 있어요.",
    icon: "🔗",
  },
];

export const FEATURES: FeatureCard[] = [
  {
    icon: "🤖",
    title: "AI 24시간 상담",
    description:
      "새벽에도, 주말에도 AI가 고객 질문에 답합니다. 주차, 영업시간, 메뉴 질문까지 자동 응대.",
  },
  {
    icon: "💰",
    title: "자동 견적 계산",
    description:
      "사이즈, 토핑, 레터링... 옵션 고르면 자동으로 가격이 계산됩니다. 실수 없이 정확하게.",
  },
  {
    icon: "📋",
    title: "주문서 자동 생성",
    description:
      "AI가 대화로 주문 정보를 수집하고, 깔끔한 주문서를 자동으로 만들어드려요.",
  },
  {
    icon: "📊",
    title: "대시보드 한눈에",
    description:
      "카톡 뒤져서 주문 찾을 필요 없어요. 대시보드에서 모든 주문을 한눈에 관리하세요.",
  },
];

export const PRICING = {
  price: "29,900",
  priceUnit: "원/월",
  dailyPrice: "하루 1,000원",
  trialDays: 14,
  trialText: "14일 무료 체험",
  features: [
    { text: "AI 상담 무제한", included: true },
    { text: "자동 견적 + 주문서", included: true },
    { text: "주문 관리 대시보드", included: true },
    { text: "카카오 알림톡 (월 300건)", included: true },
    { text: "24시간 AI 응대", included: true },
    { text: "카드 등록 없이 시작", included: true },
  ] as PricingFeature[],
};

export const TESTIMONIALS = [
  {
    name: "윤** 사장님",
    business: "케이크 가게",
    location: "서울 마포구",
    text: "새벽에 들어오는 주문 문의에 더 이상 잠 설칠 필요가 없어졌어요. AI가 알아서 답변하고 주문서까지 만들어줍니다.",
  },
  {
    name: "한** 사장님",
    business: "디저트 가게",
    location: "대전 유성구",
    text: "DM으로 같은 질문에 매일 답하던 시간이 절반 이상 줄었어요. 그 시간에 케이크를 더 만들 수 있게 됐습니다.",
  },
  {
    name: "조** 사장님",
    business: "플라워 가게",
    location: "부산 해운대구",
    text: "견적 내는 게 제일 귀찮았는데, 옵션만 고르면 자동으로 계산되니까 실수도 없고 너무 편해요.",
  },
];

export const FAQS: FAQItem[] = [
  {
    question: "카카오톡 채널이 있는데 어떻게 하나요?",
    answer:
      "카카오톡 채널에도 오대리 링크를 등록할 수 있어요! 채널 프로필 메뉴나 자동응답에 링크를 넣으면, 카카오톡으로 들어오는 고객도 AI 상담을 받을 수 있습니다. 인스타와 카카오톡 동시 운영도 가능해요.",
  },
  {
    question: "세팅이 어렵지 않나요?",
    answer:
      "메뉴판 사진 찍어서 올리면 AI가 자동으로 정리해요. 가게 정보도 검색하면 자동 입력. 대부분 10분이면 세팅이 끝납니다.",
  },
  {
    question: "AI가 정말 주문을 제대로 받을 수 있나요?",
    answer:
      "네! 오대리 AI는 사장님이 등록한 메뉴, 옵션, 가격 정보를 기반으로 정확하게 상담합니다. 복잡한 요청은 사장님에게 바로 전달하고, 주문서는 사장님이 최종 확인 후 확정돼요. 출시 버전에서는 버튼 선택뿐 아니라 고객이 자유롭게 메시지를 보내도 AI가 대화 맥락을 이해하고 자연스럽게 응대합니다. 마치 사장님이 직접 톡을 주고받는 것처럼요!",
  },
  {
    question: "어떤 업종에서 사용할 수 있나요?",
    answer:
      "케이크, 디저트, 꽃, 풍선장식, 캘리그라피 등 커스텀 주문을 받는 모든 1인 가게에서 사용할 수 있어요. 현재 케이크 가게 중심으로 서비스 중이며, 다른 업종도 순차 확장 중입니다.",
  },
  {
    question: "무료 체험 후 자동 결제되나요?",
    answer:
      "아니요! 카드 등록 없이 14일 무료 체험이 가능합니다. 체험 후 마음에 드시면 그때 구독하시면 돼요. 자동 결제되지 않습니다.",
  },
  {
    question: "고객 개인정보는 안전한가요?",
    answer:
      "네, 개인정보는 암호화되어 안전하게 관리됩니다. 주문 완료 후 1년 뒤 자동 삭제되며, 개인정보처리방침에 따라 엄격히 운영합니다.",
  },
  {
    question: "출시일이 언제예요?",
    answer:
      "2026년 1분기 중 출시 예정이에요! 웨이팅리스트에 등록해주시면 출시 즉시 가장 먼저 알려드립니다.",
  },
];

export const FINAL_CTA = {
  title: "사장님의 알잘딱깔센\nAI 주문상담 에이전트, 오대리.",
  subtitle: "사장님은 만드는 데만 집중하세요. 나머지는 오대리가 합니다.",
};

export const BUSINESS_TYPES = [
  "케이크",
  "디저트",
  "꽃 (플로리스트)",
  "풍선장식",
  "캘리그라피",
  "캔들/향수",
  "떡케이크",
  "기타",
] as const;

export const NAV_LINKS = [
  { label: "기능", href: "#features" },
  { label: "작동 방식", href: "#how-it-works" },
  { label: "가격", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

// ── Setup Demo Data ──────────────────────────────────────────

export const SETUP_SEARCH_QUERY = "해피케이크";

export const SETUP_SEARCH_RESULTS: SetupSearchResult[] = [
  {
    name: "해피케이크 (Happy Cake)",
    address: "서울 마포구 연남동 223-12",
    hours: "10:00 - 20:00 (월 휴무)",
    phone: "02-1234-5678",
  },
];

export const SETUP_MENU_ITEMS: DemoMenuItem[] = [
  {
    name: "생크림 케이크",
    price: "35,000원~",
    sizes: "미니 / 1호 / 2호 / 3호",
    toppings: "딸기, 블루베리, 초코",
  },
  {
    name: "초코 케이크",
    price: "37,000원~",
    sizes: "미니 / 1호 / 2호 / 3호",
    toppings: "오레오, 가나슈, 딸기",
  },
  {
    name: "당근 케이크",
    price: "33,000원~",
    sizes: "미니 / 1호 / 2호",
    toppings: "크림치즈, 피칸, 호두",
  },
];

export const SETUP_OWNER_PARKING =
  "주차 2대 가능, 만차 시 연남 공영주차장(도보 3분)";

export const SETUP_GENERATED_LINK = "odaeri.com/chat/happy-cake";

export const SETUP_BLOG_URL = "blog.naver.com/happy-cake-story";

export const SETUP_QA_ITEMS = [
  {
    question: "예약 없이 방문해도 되나요?",
    aiAnswer: "네, 당일 방문 가능합니다.",
    ownerAnswer:
      "당일 방문도 가능하지만, 인기 케이크는 2일 전 예약을 추천드려요!",
  },
  {
    question: "결제는 어떻게 하나요?",
    aiAnswer: "카드, 현금, 계좌이체 모두 가능합니다.",
    ownerAnswer: null,
  },
  {
    question: "케이크 보관은 어떻게 하나요?",
    aiAnswer: "냉장 보관 시 3일까지 가능합니다.",
    ownerAnswer: null,
  },
];

// ── Dashboard Demo Data ───────────────────────────────────────

export const DASHBOARD_ORDER_STATS = [
  { label: "오늘 주문", value: "5건", icon: "📋" },
  { label: "대기중", value: "2건", icon: "⏳" },
  { label: "확정", value: "2건", icon: "✅" },
  { label: "완료", value: "1건", icon: "🎉" },
];

export const DASHBOARD_REVENUE_STATS = [
  { label: "일매출", value: "245,000원", icon: "💰" },
  { label: "월매출", value: "3,820,000원", icon: "📊" },
];

export const DASHBOARD_ORDERS = [
  {
    id: "0215-001",
    customer: "이수진",
    item: "레터링 케이크 2호",
    pickup: "오늘 14:00",
    status: "confirmed" as const,
    price: "45,000원",
  },
  {
    id: "0215-002",
    customer: "김하윤",
    item: "초코 케이크 1호",
    pickup: "오늘 16:00",
    status: "pending" as const,
    price: "37,000원",
  },
  {
    id: "0215-003",
    customer: "정서연",
    item: "생크림 케이크 3호",
    pickup: "내일 12:00",
    status: "confirmed" as const,
    price: "55,000원",
  },
  {
    id: "0215-004",
    customer: "박지호",
    item: "당근 케이크 미니",
    pickup: "내일 15:00",
    status: "done" as const,
    price: "28,000원",
  },
];

export const DASHBOARD_NEW_ORDER = {
  id: "0215-005",
  customer: "최은서",
  item: "플라워 케이크 2호",
  pickup: "2/16 (일) 11:00",
  status: "new" as const,
  price: "52,000원",
};

// ── Chat Demo Data ────────────────────────────────────────────

export const CHAT_DEMO_GREETING: ChatStep = {
  sender: "ai",
  text: "안녕하세요! 해피케이크입니다 😊\n무엇을 도와드릴까요?",
  quickButtons: [
    { label: "🎂 주문", value: "order" },
    { label: "ℹ️ 가게정보", value: "info" },
    { label: "💬 문의", value: "cs" },
  ],
};

export const CHAT_SCENARIO_LABELS: Record<string, string> = {
  order: "🎂 주문",
  info: "ℹ️ 가게정보",
  cs: "💬 문의",
};

export const CHAT_SCENARIOS: Record<string, ChatStep[]> = {
  // ── 주문 시나리오 (자유 대화형) ──
  order: [
    { sender: "user", text: "생일 케이크 주문하고 싶어요", autoAdvance: true },
    {
      sender: "ai",
      text: "생일 케이크 주문이시군요! 🎂\n성함과 연락처를 알려주세요!",
    },
    { sender: "user", text: "이수진이요, 010-9876-5432", autoAdvance: true },
    {
      sender: "ai",
      text: "이수진님 반갑습니다! 😊\n픽업 날짜와 시간을 알려주세요!",
    },
    {
      sender: "user",
      text: "2/15 토요일 오후 2시에 갈게요",
      autoAdvance: true,
    },
    {
      sender: "ai",
      text: "2/15 (토) 14:00 픽업 잡을게요! ✅\n케이크 모양과 사이즈를 알려주세요!",
    },
    { sender: "user", text: "레터링 케이크 2호 사이즈요", autoAdvance: true },
    {
      sender: "ai",
      text: "레터링 케이크 2호! 👍\n레터링 문구와 케이크 판 문구를 알려주세요!",
    },
    {
      sender: "user",
      text: "생일 축하해 민지야 🎉 판 문구는 Happy Birthday Minji",
      autoAdvance: true,
    },
    {
      sender: "ai",
      text: "예쁜 문구네요! ✨\n배경 색상과 레터링 색상도 알려주세요!",
    },
    { sender: "user", text: "배경은 핑크, 레터링은 골드요", autoAdvance: true },
    {
      sender: "ai",
      text: "핑크에 골드 조합! 🎨\n참고할 디자인 이미지가 있으면 보내주세요!",
    },
    { sender: "user", text: "📷 이미지를 보냈습니다", autoAdvance: true },
    { sender: "ai", text: "주문 정리해 드릴게요!", isOrderCard: true },
  ],

  // ── 가게정보 시나리오 ──
  info: [
    { sender: "user", text: "ℹ️ 가게정보" },
    {
      sender: "ai",
      text: "해피케이크 매장 안내드려요! 😊\n\n📍 서울 마포구 연남동 223-12\n🕐 10:00 ~ 20:00 (월 휴무)\n📞 02-1234-5678\n🅿️ 가게 앞 2대 주차 가능",
      quickButtons: [
        { label: "🅿️ 주차 안내", value: "주차 안내" },
        { label: "🎂 주문하기", value: "주문 전환" },
      ],
      branches: {
        "주차 안내": [
          { sender: "user", text: "🅿️ 주차 안내" },
          {
            sender: "ai",
            text: "가게 바로 앞에 2대 주차 가능해요! 🚗\n\n만차 시 도보 3분 거리 연남 공영주차장을 이용해 주세요.\n방문 시 영수증 보여주시면 1시간 무료 처리해 드립니다 😊\n\n더 궁금한 게 있으시면 편하게 물어보세요!",
          },
        ],
        "주문 전환": [
          { sender: "user", text: "🎂 주문하기" },
          {
            sender: "ai",
            text: "주문 도와드릴게요! 🎂\n\n생크림, 초코, 당근 케이크 중 골라주세요.\n아래 '🎂 주문' 버튼으로 바로 시작할 수 있어요 😊",
          },
        ],
      },
    },
  ],

  // ── CS 문의 시나리오 ──
  cs: [
    { sender: "user", text: "💬 문의" },
    {
      sender: "ai",
      text: "어떤 것이 궁금하세요? 😊",
      quickButtons: [
        { label: "🍰 보관 방법", value: "보관 방법" },
        { label: "📦 배달 가능?", value: "배달" },
        { label: "✏️ 주문 변경", value: "주문 변경" },
      ],
      branches: {
        "보관 방법": [
          { sender: "user", text: "🍰 보관 방법" },
          {
            sender: "ai",
            text: "케이크 보관 안내드릴게요! 🍰\n\n🧊 수령 후 바로 냉장 보관해 주세요\n⏰ 냉장 30분 후 드시면 가장 맛있어요\n📅 냉장 보관 시 3일까지 가능해요\n❄️ 냉동은 식감이 변해서 비추천!\n\n맛있게 드세요! 😊",
          },
        ],
        "배달": [
          { sender: "user", text: "📦 배달 가능?" },
          {
            sender: "ai",
            text: "배달 관련 안내드릴게요! 📦\n\n현재 매장 픽업만 가능해요.\n하지만 퀵서비스 이용 시 배달도 가능합니다!\n\n🏪 픽업: 주문 시 원하시는 시간 선택\n🚀 퀵서비스: 고객님 부담 (약 5,000~8,000원)\n\n픽업이 어려우시면 퀵서비스 연결 도와드릴게요 😊",
          },
        ],
        "주문 변경": [
          { sender: "user", text: "✏️ 주문 변경" },
          {
            sender: "ai",
            text: "주문 변경 안내드릴게요! ✏️\n\n📅 픽업 2일 전까지: 무료 변경 가능\n📅 픽업 1일 전: 레터링만 변경 가능\n⚠️ 픽업 당일: 변경 불가\n\n변경이 필요하시면 주문번호와 함께 말씀해 주세요 😊",
          },
        ],
      },
    },
  ],
};

export const CHAT_DEMO_ORDER = {
  customer: {
    name: "이수진",
    phone: "010-9876-5432",
  },
  pickupDate: "2/15 (토)",
  pickupTime: "14:00",
  cakeShape: "레터링",
  size: "2호",
  lettering: "생일 축하해 민지야 🎉",
  boardText: "Happy Birthday Minji",
  bgColor: "핑크",
  letteringColor: "골드",
  hasDesignImage: true,
  total: "45,000원",
  deposit: {
    bank: "카카오뱅크",
    account: "3333-12-3456789",
    holder: "해피케이크",
    amount: "10,000원",
    depositor: "이수진",
  },
};
