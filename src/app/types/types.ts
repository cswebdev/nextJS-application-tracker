// Enum Types
export type Status =
   | "APPLIED"
   | "INTERVIEW"
   | "OFFER"
   | "REJECTED"
   | "PENDING"
   | "ACCEPTED";

export type DateRange =
   | "ONE_DAY"
   | "ONE_WEEK"
   | "ONE_MONTH"
   | "SIX_MONTHS"
   | "ONE_YEAR";

// Application Type
export type Application = {
   id: string;
   url: string;
   dateApplied: Date;
   company: string;
   position: string;
   status: Status;
   details: string | null;
   trackedRange: DateRange | null;
   createdAt?: Date;
   updatedAt?: Date;
   userId: string | null; // Allow null here
   user?: User; // Add relation to User (optional)
};

// User Type
export type User = {
   id: string;
   email: string;
   selectedRange?: DateRange;
   applications: Application[];
   createdAt: Date;
   updatedAt: Date;
};
