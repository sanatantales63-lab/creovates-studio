export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  project_type: string;
  budget_currency: string;
  budget_range: string;
  timeline: string | null;
  description: string;
  referral_source: string | null;
  links: string | null;
  status: "new" | "reviewed" | "in_progress" | "closed";
  created_at: string;
};
