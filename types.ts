
export interface ProfileLink {
  label: string;
  url: string;
}

export interface UserState {
  name: string;
  email: string;
  wallet: string;
  points: number;
  memories: number;
  referralCode: string;
  isLoggedIn: boolean;
  avatar?: string;
  links: ProfileLink[];
}

export interface MemoryBlock {
  id: number;
  timestamp: number;
  data: string;
  owner: string;
  prevHash: string;
  hash: string;
  aiVerification?: string;
  humanityScore?: number;
}

export interface OnboardingStep {
  id: number;
  title: string;
  reward: number;
  completed: boolean;
}
