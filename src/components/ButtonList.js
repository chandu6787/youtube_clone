import React from "react";

const ButtonList = () => {
  return (
   <div className="flex overflow-x-auto scrollbar-hide gap-2 px-3 py-2 whitespace-nowrap">
  {["All","Music","Games","Movies","Sports","Politics"].map(label => (
    <button key={label} className="px-4 py-2 rounded-lg bg-gray-200 shrink-0 text-sm">
      {label}
    </button>
  ))}
</div>
  );
};

export default ButtonList;
