export type Application = {
   id: string;
   url: string;
   dateApplied: Date;
   company: string;
   position: string;
   status: string;
   details?: string;
   dateRange?: string; // Make optional to match potential undefined values
};

export type User = {
   id: string;
   email: string;
   displayName?: string; // Optional because displayName might not always be provided
   password?: string; // Optional because some users (Google sign-in) won't have passwords
};
