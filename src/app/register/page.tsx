// src/app/register/page.tsx

import RegisterForm from "../components/AuthForm/RegisterForm";

export default function RegisterPage() {
   return (
      <div className="flex justify-center items-center h-screen bg-[url('/background.svg')] bg-cover bg-center bg-no-repeat">
         <div className="w-full max-w-5xl py-3 rounded-lg bg-white flex flex-row gap-0">
            <div className="flex flex-row  bg-white w-1/4ç">
               <div className="flex justify-center items-center">
                  <h1>get started tracking your applications like a pro</h1>
               </div>
               {/* <h2 className="text-2xl font-semibold text-center mb-6">
                  Create an Account
               </h2> */}
            </div>
            <div className="w-3/4">
               <RegisterForm />
            </div>
         </div>
      </div>
   );
}
