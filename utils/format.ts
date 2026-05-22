import { ComplaintCategory, ComplaintStatus } from "@/types/complaint";

export const formatDate = (value: string) => {
  const date = new Date(value);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
};

export const generateReference = () => {
  const random = Math.floor(10000 + Math.random() * 90000);
  const year = new Date().getFullYear();
  return `CMP-${year}-${random}`;
};

export const authorityForCategory = (category: ComplaintCategory) => {
  const common = {
    name: "Smart City Service Desk",
    phone: "+1 (555) 012-7821",
    office: "City Citizen Support Center, Hall 7",
  };

  switch (category) {
    case "Water Issue":
      return {
        ...common,
        name: "Water & Sanitation Authority",
        eta: "2–3 business days",
      };
    case "Electricity":
      return {
        ...common,
        name: "Electrical Services Unit",
        eta: "1–2 business days",
      };
    case "Garbage":
      return {
        ...common,
        name: "Waste Management Division",
        eta: "3–4 business days",
      };
    case "Road Damage":
      return {
        ...common,
        name: "Public Works Department",
        eta: "4–5 business days",
      };
    case "Internet Issue":
      return {
        ...common,
        name: "City Broadband Office",
        eta: "2–3 business days",
      };
    case "Corruption":
      return {
        ...common,
        name: "Public Integrity Bureau",
        eta: "5–7 business days",
      };
    case "Public Safety":
      return {
        ...common,
        name: "Safety & Emergency Services",
        eta: "1–2 business days",
      };
    default:
      return {
        ...common,
        name: "Citizen Support Center",
        eta: "3–4 business days",
      };
  }
};

export const statusOrder: ComplaintStatus[] = [
  "Submitted",
  "Under Review",
  "In Progress",
  "Resolved",
  "Rejected",
];

export const statusColor = (status: ComplaintStatus) => {
  switch (status) {
    case "Submitted":
      return "bg-sky-100 text-sky-700";
    case "Under Review":
      return "bg-amber-100 text-amber-700";
    case "In Progress":
      return "bg-blue-100 text-blue-700";
    case "Resolved":
      return "bg-emerald-100 text-emerald-700";
    case "Rejected":
      return "bg-rose-100 text-rose-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
};

export const categories: ComplaintCategory[] = [
  "Water Issue",
  "Electricity",
  "Garbage",
  "Road Damage",
  "Internet Issue",
  "Corruption",
  "Public Safety",
  "Other",
];
