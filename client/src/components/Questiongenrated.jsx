import React, { useState } from "react";
import CommonPageHeader from "./CommonPageHeader";
import FreeTools from "./FreeTools";
import WebTools from "./WebTools";

function Questiongenrated({ title, title1 }) {
  const [text, setText] = useState("");
  return (
    <>
      <div className="mt-[72px] dark:bg-darkBlue">
        <CommonPageHeader />
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-5 dark:text-white">
          {title}
        </h1>
        <p className="text-center text-gray500 my-5">{title1}</p>
        <div className="w-[90%] sm:w-[80%] mx-auto flex flex-wrap justify-start items-center gap-5">
          <textarea
            rows={3}
            value={text}
            onChange={(e) => {
              setText(e?.target?.value);
            }}
            className="w-full border-2 outline-none border-lightBlue p-3 px-5 rounded-lg text-black dark:text-white dark:bg-darkBlue dark:border-white"
          ></textarea>
          <button
            disabled={!text}
            type="button"
            className={`${
              !text ? "bg-gray500" : "bg-lightBlue"
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
