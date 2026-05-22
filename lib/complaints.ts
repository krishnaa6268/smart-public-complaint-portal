import {
  Complaint,
  ComplaintCategory,
  ComplaintStatus,
} from "@/types/complaint";
import { authorityForCategory, generateReference } from "@/utils/format";

const STORAGE_KEY = "smart-public-complaints";

const safeParse = <T>(value: string | null, fallback: T) => {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

export const getComplaints = (): Complaint[] => {
  if (typeof window === "undefined") return [];
  return safeParse<Complaint[]>(localStorage.getItem(STORAGE_KEY), []);
};

export const saveComplaints = (complaints: Complaint[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
};

export const addComplaint = (
  complaint: Omit<
    Complaint,
    "id" | "reference" | "createdAt" | "status" | "authority" | "remarks"
  >,
) => {
  const existing = getComplaints();
  const newComplaint: Complaint = {
    ...complaint,
    id: crypto.randomUUID(),
    reference: generateReference(),
    createdAt: new Date().toISOString(),
    status: "Submitted",
    remarks: [
      "Your complaint has been received and is being routed to the responsible unit.",
    ],
    authority: authorityForCategory(complaint.category),
  };
  const updated = [newComplaint, ...existing];
  saveComplaints(updated);
  return newComplaint;
};

export const findComplaintByReference = (reference: string) => {
  return getComplaints().find((item) => item.reference === reference);
};

export const updateComplaint = (
  reference: string,
  update: Partial<
    Pick<Complaint, "status" | "remarks" | "image" | "title" | "description">
  >,
) => {
  const complaints = getComplaints();
  const updated = complaints.map((complaint) =>
    complaint.reference === reference ? { ...complaint, ...update } : complaint,
  );
  saveComplaints(updated);
  return updated.find((complaint) => complaint.reference === reference) ?? null;
};

export const deleteComplaint = (reference: string) => {
  const complaints = getComplaints();
  const filtered = complaints.filter(
    (complaint) => complaint.reference !== reference,
  );
  saveComplaints(filtered);
};

export const seedDemoComplaints = () => {
  if (typeof window === "undefined") return;
  const current = getComplaints();
  if (current.length > 0) return;
  const sample: Complaint[] = [
    {
      id: crypto.randomUUID(),
      reference: `CMP-${new Date().getFullYear()}-10001`,
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      fullName: "Aisha Patel",
      mobile: "+1 555 013 2244",
      email: "aisha.patel@example.com",
      address: "24 East Avenue",
      city: "Greenfield",
      state: "Pacific",
      pincode: "542301",
      title: "Water supply outage in my neighbourhood",
      description:
        "No water supply has been available for the last 48 hours in Sector 12.",
      category: "Water Issue",
      status: "In Progress",
      image: "",
      remarks: [
        "Investigation assigned to neighbourhood cell team.",
        "Repair crew scheduled tomorrow.",
      ],
      authority: authorityForCategory("Water Issue"),
    },
    {
      id: crypto.randomUUID(),
      reference: `CMP-${new Date().getFullYear()}-10002`,
      createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      fullName: "Rajesh Singh",
      mobile: "+1 555 019 7728",
      email: "rajesh.singh@example.com",
      address: "Block 5, Hill Road",
      city: "Meadowvale",
      state: "North",
      pincode: "540109",
      title: "Garbage collection missed in my street",
      description: "Overflowing dustbins have not been emptied for three days.",
      category: "Garbage",
      status: "Under Review",
      image: "",
      remarks: [
        "Complaint registered with waste management.",
        "Route supervisor notified.",
      ],
      authority: authorityForCategory("Garbage"),
    },
  ];
  saveComplaints(sample);
};
