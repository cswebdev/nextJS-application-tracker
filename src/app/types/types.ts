export type Application = {
   //temporary id as number. change to string once uuid
   id: number;
   url: string;
   date: Date;
   company: string;
   position: string;
   status:
      | "applied"
      | "interview"
      | "offer"
      | "accepted"
      | "waiting"
      | "rejected";
   details?: string;
};
