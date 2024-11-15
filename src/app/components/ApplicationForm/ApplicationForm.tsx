"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const ApplicationForm = () => {
   const router = useRouter();
   const [url, setUrl] = useState("");
   const [company, setCompany] = useState("");
   const [position, setPosition] = useState("");
   const [status, setStatus] = useState("");
   const [details, setDetails] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [success, setSuccess] = useState(false);

   const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
         const response = await fetch("/api/applications", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ url, company, position, status, details }),
         });

         if (response.ok) {
            setSuccess(true);
            setUrl("");
            setCompany("");
            setPosition("");
            setDetails("");

            router.push("/");
         } else {
            const data = await response.json();
            setError(data.error || "Failed to submit application");
         }
      } catch (error) {
         setError("An error occurred while submitting the application");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="w-4/12 mx-auto p-4 border rounded-md shadow-md">
         {success && (
            <div className="text-green-600 mb-4">
               Your application has been submitted!
            </div>
         )}
         {error && <div className="text-red-600 mb-4">{error}</div>}

         <form onSubmit={handleSubmit}>
            <div className="mb-4 ">
               <label
                  htmlFor="company"
                  className="block text-sm font-medium mb-2"
               >
                  Company name:
               </label>
               <input
                  type="text"
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                  className="w-full p-2 border rounded-md"
               />
            </div>
            <div className="mb-4">
               <label htmlFor="url" className="block text-sm font-medium mb-2">
                  Url:
               </label>
               <input
                  type="text"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  className="w-full p-2 border rounded-md"
               />
            </div>
            <div className="mb-4">
               <label
                  htmlFor="position"
                  className="block text-sm font-medium mb-2"
               >
                  Position:
               </label>
               <input
                  type="text"
                  id="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  required
                  className="w-full p-2 border rounded-md"
               />
            </div>
            <div className="mb-4">
               <label
                  htmlFor="status"
                  className="block text-sm font-medium mb-2"
               >
                  Status
               </label>
               <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                  className="w-full p-2 border rounded-md"
               >
                  <option value="">Please choose</option>
                  <option value="applied">applied</option>
                  <option value="waiting">waiting</option>
               </select>
            </div>
            <div className="mb-4">
               <label
                  htmlFor="details"
                  className="block text-sm font-medium mb-2"
               >
                  Details:
               </label>
               <input
                  type="text"
                  id="details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  required
                  className="w-full p-2 border rounded-md"
               />
            </div>
            <div className="flex justify-end">
               <button
                  type="submit"
                  className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
                     loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
               >
                  {loading ? "Submitting..." : "Submit Application"}
               </button>
            </div>
         </form>
      </div>
   );
};
export default ApplicationForm;
