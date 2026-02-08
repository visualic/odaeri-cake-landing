export interface BetaSignupData {
  name: string;
  storeName: string;
  phone: string;
  email: string;
  businessType: string;
  featureRequest: string;
  marketingConsent: boolean;
}

export interface BetaSignupResponse {
  success: boolean;
  message: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

export interface ProblemCard {
  emoji: string;
  text: string;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface PricingFeature {
  text: string;
  included: boolean;
}

// Demo types
export interface QuickButton {
  label: string;
  value: string;
}

export interface ChatStep {
  sender: "ai" | "user";
  text: string;
  quickButtons?: QuickButton[];
  autoAdvance?: boolean;
  isOrderCard?: boolean;
  branches?: Record<string, ChatStep[]>;
}

export interface SetupSearchResult {
  name: string;
  address: string;
  hours: string;
  phone: string;
}

export interface DemoMenuItem {
  name: string;
  price: string;
  sizes: string;
  toppings: string;
}
