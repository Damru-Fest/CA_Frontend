import React from "react";
import Link from "next/link";

const ActionButton = () => {
  return (
    <div>
      <Link
        href="/apply"
        className="
              inline-flex items-center justify-center
              h-10 w-[137px]
              gap-2.5 rounded-[30px]
              bg-white px-5 py-2.5
              font-semibold text-black
              shadow-[0px_5px_0px_0px_#FF931E]
              transition-all duration-150
              hover:shadow-[0px_4px_0px_0px_#FF931E]
              active:translate-y-1 active:shadow-[0px_2px_0px_0px_#FF931E]
            "
      >
        Apply Now!
      </Link>
    </div>
  );
};

export default ActionButton;
