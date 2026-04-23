import React, { useState } from "react";
import CommonPageHeader from "./CommonPageHeader";
import FreeTools from "./FreeTools";
import WebTools from "./WebTools";

function Questiongenrated({ title, title1 }) {
  const [text, setText] = useState("");
  return (
    <>
      <div className="mt-[72px] dark:bg-[#0f172a]">
        <CommonPageHeader />
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white">
          {title}
        </h1>
        <p className="text-center text-gray-500 my-5">{title1}</p>
        <div className="w-[90%] sm:w-[80%] mx-auto flex flex-wrap justify-start items-center gap-5">
          <textarea
            rows={3}
            value={text}
            onChange={(e) => {
              setText(e?.target?.value);
            }}
            className="w-full border-2 outline-none border-[#1A8FE3] p-3 px-5 rounded-lg text-black dark:text-white dark:bg-[#0f172a]. dark:border-white"
          ></textarea>
          <button
            disabled={!text}
            type="button"
            className={`${
              !text ? "bg-gray-500" : "bg-[#1A8FE3]"
            } px-6 py-3 text-white rounded-lg`}
          >
            Submit
          </button>
        </div>
        <FreeTools />
        <WebTools />
      </div>
    </>
  );
}

export default Questiongenrated;
