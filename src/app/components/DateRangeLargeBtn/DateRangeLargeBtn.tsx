"use client";

interface DateRangeLargeBtnProps {
   onOptionSelect: (selectedOption: string) => void;
   active: string; // The currently selected option (for styling)
}

const DateRangeLargeBtn = ({
   onOptionSelect,
   active,
}: DateRangeLargeBtnProps) => {
   const options = [
      "One Day",
      "One Week",
      "One Month",
      "Six Months",
      "One Year",
   ];

   return (
      <div className="w-fit flex flex-row">
         {options.map((option) => {
            // Apply conditional styling based on whether the option is active
            const buttonStyle =
               option === active
                  ? "bg-blue-800 text-white border-blue-700"
                  : "bg-blue-500 text-white border-gray-300";

            return (
               <button
                  key={option}
                  onClick={() => onOptionSelect(option)} // Trigger onOptionSelect with the selected option
                  className={`px-6 py-2 ${buttonStyle} hover:bg-blue-700 rounded-none border-l-md first:rounded-bl-md first:rounded-tl-md last:rounded-br-md last:rounded-tr-md`}
               >
                  {option}
               </button>
            );
         })}
      </div>
   );
};

export default DateRangeLargeBtn;
