import React, { useEffect, useState } from "react";
import CommonPageHeader from "./CommonPageHeader";
import FreeTools from "./FreeTools";
import WebTools from "./WebTools";
import CopyToClipboard from "react-copy-to-clipboard";

function BiographyTitle({ title, title1 }) {
  const [copyText, setCopyText] = useState(false);
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const fetchData = async () => {
    try {
      if (text) {
        const url = new URL("https://en.wikipedia.org/w/api.php");
        const params = {
          action: "query",
          format: "json",
          titles: text,
          prop: "extracts",
          origin: "*",
          exintro: true,
          explaintext: true,
        };
        Object.keys(params).forEach((key) =>
          url.searchParams.append(key, params[key])
        );

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error fetching data from Wikipedia");
        }

        const data = await response.json();
        const page = data.query.pages;
        const pageId = Object.keys(page)[0];
        const pageContent = page[pageId].extract;
        if (!pageContent) {
          alert("No Data Found");
          setCopyText(false);
          setText("");
          setResult(null);
        } else {
          setResult(pageContent);
        }
      }
    } catch (err) {
      console.log("Error fetching data from Wikipedia:", err);
    }
  };

  useEffect(() => {
    if (copyText) {
      alert("Copied to clipboard.");
      setCopyText(false);
    }
  }, [copyText]);

  const handleReset = () => {
    setText("");
    setResult(null);
  };

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
            onClick={fetchData}
            type="button"
            className={`${
              !text ? "bg-gray500" : "bg-lightBlue"
            } px-6 py-3 text-white rounded-lg`}
          >
            Submit
          </button>
          {result && (
            <>
              <div
                className="mt-1 block w-full"
                dangerouslySetInnerHTML={{ __html: result }}
              ></div>
              <div className="flex justify-center items-center gap-5">
                <CopyToClipboard
                  text={JSON.stringify(result)}
                  onCopy={() => setCopyText(true)}
                >
                  <button
                    className={`bg-lightBlue px-6 py-3 text-white rounded-lg`}
                  >
                    Copy
                  </button>
                </CopyToClipboard>
                <button
                  className={`bg-lightBlue px-6 py-3 text-white rounded-lg`}
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </>
          )}
        </div>
        <FreeTools />
        <WebTools />
      </div>
    </>
  );
}

export default BiographyTitle;
