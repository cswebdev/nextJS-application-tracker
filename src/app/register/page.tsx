// src/app/register/page.tsx

import RegisterForm from "../components/AuthForm/RegisterForm";

export default function RegisterPage() {
   return (
      <div className="flex justify-center items-center h-screen bg-[url('/background.svg')] bg-cover bg-center bg-no-repeat">
         <div className="w-full max-w-5xl py-8 rounded-lg bg-white flex flex-row justify-center ">
            <div className="w-2/4 p-auto p-4">
               <div className="flex flex-col h-full justify-center">
                  <div className="flex  align-middle items-center py-2 ">
                     <h1 className="font-semibold text-xl">
                        Simplify Your Job Search
                     </h1>
                  </div>

                  <ul>
                     <li className="my-2">
                        Keep track of your applications effortlessly
                     </li>
                     <li className="my-2">
                        Gain insights with personalized analytics
                     </li>
                     <li className="my-2">Set and achieve job hunt goals</li>
                     <li className="my-2">Land your dream role</li>
                  </ul>
               </div>
               {/* <h2 className="text-2xl font-semibold text-center mb-6">
                  Create an Account
               </h2> */}
            </div>
            <div className="w-3/4 ">
               <RegisterForm />
            </div>
         </div>
      </div>
   );
}
