// src/app/page.tsx

import ApplicationsPage from "./application/page";

export default function Home() {
   return (
      <div className="h-full flex justify-center items-center">
         <div className="">
            <ApplicationsPage />
         </div>
      </div>
   );
}
