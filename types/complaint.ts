export type ComplaintStatus =
  | "Submitted"
  | "Under Review"
  | "In Progress"
  | "Resolved"
  | "Rejected";

export type ComplaintCategory =
  | "Water Issue"
  | "Electricity"
  | "Garbage"
  | "Road Damage"
  | "Internet Issue"
  | "Corruption"
  | "Public Safety"
  | "Other";

export interface AuthorityInfo {
  name: string;
  phone: string;
  office: string;
  eta: string;
}

export interface Complaint {
  id: string;
  reference: string;
  createdAt: string;
  fullName: string;
  mobile: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  status: ComplaintStatus;
  image?: string;
  remarks: string[];
  authority: AuthorityInfo;
}
