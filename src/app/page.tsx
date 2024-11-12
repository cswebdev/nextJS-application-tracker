// src/app/page.tsx

import Sidebar from "./components/SideBar/Sidebar";
import ApplicationsPage from "./application/page";

// This page is a React server component, and Sidebar will handle fetching data from the API

export default function Home() {
   return (
      <div className=" h-full">
         <main className="h-full">
            <section className="grid grid-cols-5 h-full ">
               {/* Sidebar */}
               <div className="flex justify-start bg-slate-200 col-span-1 h-full">
                  <Sidebar />
               </div>

               {/* Application List */}
               <div className="col-span-4 max-h-screen overflow-hidden">
                  <div className="h-full overflow-y-auto">
                     <ApplicationsPage />
                  </div>
               </div>
            </section>
         </main>
      </div>
   );
}
