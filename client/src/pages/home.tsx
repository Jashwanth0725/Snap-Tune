import { useState } from "react";
import Caption from "../components/ai/caption";
import { Button } from "@/components/ui/button";
import Summarize from "../components/ai/summary";

export default function Home() {
  // const [isCaption, setIsCaption] = useState(true);
  const [isSummarize, setIsSummarize] = useState(false);
  return (
    <>
      <section className="relative w-full bg-blue-500 text-white py-32 px-6 md:px-12 rounded-lg mx-auto flex justify-center items-center">
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
            Welcome to CapSum
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Transform your images into captivating AI-generated captions!
            <br></br>
            Explore the magic of instant, creative captions for your social
            media posts. Let CapSum make your content stand out effortlessly.
          </p>
          <a
            href="#generate"
            className="bg-white text-blue-500  px-8 py-3 rounded-full text-xl font-semibold hover:bg-blue-200 transition-all duration-300"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* <div className="container mx-auto flex justify-center">
        <section id="generate">
          <div className="container mx-auto mt-10">
            <Button
              className={`${
                isCaption ? "bg-blue-600" : "bg-blue-500"
              }  text-white  rounded-l-full  text-xl font-semibold hover:bg-blue-400  transition-all duration-300`}
              onClick={() => {
                setIsCaption(!isCaption);
                setIsSummarize(!isSummarize);
              }}
            >
              Caption
            </Button>
            <Button
              className={`${
                isSummarize ? "bg-blue-600" : "bg-blue-500"
              }  text-white  rounded-r-full text-xl font-semibold hover:bg-blue-400 transition-all duration-300`}
              onClick={() => {
                setIsCaption(!isCaption);
                setIsSummarize(!isSummarize);
              }}
            >
              Summarize
            </Button>
          </div>
        </section> */}
      {/* </div> */}
      <section id="generate">
        <div className="container mx-auto ">
          <Caption />
          {/* {isSummarize && <Summarize />} */}
        </div>
      </section>
    </>
  );
}
