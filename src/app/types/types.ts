export type Application = {
   //temporary id as number. change to string once uuid
   id: number;
   url: string;
   date: Date;
   company: string;
   position: string;
   status: string;
   details?: string;
};
