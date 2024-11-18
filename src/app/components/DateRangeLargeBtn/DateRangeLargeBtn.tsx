"use client";

interface DateRangeLargeBtnProps {
   onOptionSelect: (selectedOption: string) => void; // Callback when an option is selected
}

const DateRangeLargeBtn = ({ onOptionSelect }: DateRangeLargeBtnProps) => {
   const options = [
      "One Day",
      "One Week",
      "One Month",
      "Six Months",
      "One Year",
   ];

   return (
      <div className="w-fit flex flex-row">
         {options.map((option) => (
            <button
               key={option}
               onClick={() => onOptionSelect(option)}
               className="px-6 py-2 bg-blue-500 text-white hover:bg-blue-700 rounded-none border-l-md first:rounded-bl-md first:rounded-tl-md last:rounded-br-md last:rounded-tr-md"
            >
               {option}
            </button>
         ))}
      </div>
   );
};

export default DateRangeLargeBtn;
