"use client";

import TempTypingSpeed from "@/app/hooks/useTempWords";
import TypingSpeed from "@/app/hooks/useWpm";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import "@/app/styles/monkey.css";


const Race = () => {
  const { NoOfWords } = TempTypingSpeed();
  const monkeyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(NoOfWords);
    if (monkeyRef.current) {
      const newPosition = ((NoOfWords / 50) * 76)+8;
      monkeyRef.current.style.left = `${newPosition}%`;
      console.log("new:", newPosition);
    }
  }, [NoOfWords]);

  return (
    <div className=" w-full text-text-color ">
      <div className="w-full h-96 relative ">
        <Image
          src="/branch.png"
          alt="sdfg"
          className="object-fill h-full w-full"
          width={9999}
          height={9999}
        />
        <div className="absolute w-full top-36 -z-10">
          <div className="h-2 bg-[#6c4423] w-full relative" style={{backgroundImage: 'url("/images.jpeg")' }}>
            <div
              ref={monkeyRef}
              style={{
                transition: "left 0.1s ease-in-out", // Smooth transition for left and top properties
              }}
              className="w-20 absolute monkeymovement -z-10"
            >
              <Image
                src="/monkey (1).png"
                alt=";ljk"
                className="h-16 absolute monkeyleft -top-1 w-10 mix-blend-color-multiply"
                height={999}
                width={999}
              />
              <Image
                src="/monkey both.png"
                alt=";ljk"
                className="h-16 absolute monkeyboth -top-1 w-10 mix-blend-color-multiply"
                height={999}
                width={999}
              />
            </div>
          </div>
        </div>
        <div className="h-4 absolute top-50 bg-black"></div>
      </div>
    </div>
  );
};

export default Race;
