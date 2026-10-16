export type CandidateStatus =
    | "Invited"
    | "Draft"
    | "Submitted"
    | "Needs Correction"
    | "Approved"
    | "Provisioning"
    | "Day-1 Ready";

export type Department = "Agency" | "Bancassurance" | "Head Office" | "Other";
export type EmploymentType = "Permanent" | "Contract" | "Probation";
export type Decision = "Approve" | "Return for modification";

export interface Candidate {
    id: string;
    name: string;
    department: Department;
    position: string;
    status: CandidateStatus;
    completion: number;
    submittedOn?: string;
    startDate: string;
    email: string;
    phone: string;
    manager: string;
    employmentType: EmploymentType;
    offerReference?: string;
    notes?: string;
    createEmail?: boolean;
    prepareLaptop?: boolean;
    software?: string[];
}

export interface OfferFormValues {
    name: string;
    email: string;
    phone: string;
    position: string;
    department: Department | "";
    manager: string;
    employmentType: EmploymentType | "";
    startDate: string;
    offerReference: string;
    files: File[];
}

export interface DecisionValues {
    decision: Decision;
    notes: string;
    joinDate: string;
    createEmail: boolean;
    prepareLaptop: boolean;
    software: string[];
}

export const DEPARTMENTS: Department[] = [
    "Agency",
    "Bancassurance",
    "Head Office",
    "Other",
];

export const CANDIDATE_STATUSES: CandidateStatus[] = [
    "Invited",
    "Draft",
    "Submitted",
    "Needs Correction",
    "Approved",
    "Provisioning",
    "Day-1 Ready",
];
