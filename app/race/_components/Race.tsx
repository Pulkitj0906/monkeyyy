"use client";
import TempTypingSpeed from "@/app/_hooks/useTempWords";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import "@/app/_styles/monkey.css";
import OppTempWords from "@/app/_hooks/useOppTempWords";

const Race = () => {
  const { NoOfWords } = TempTypingSpeed();
  const OppStat = OppTempWords();
  const monkeyRef = useRef<HTMLDivElement>(null);
  const monkey2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (monkeyRef.current) {
      const newPosition = (NoOfWords / 50) * 76 + 8;
      monkeyRef.current.style.left = `${newPosition}%`;
    }
  }, [NoOfWords]);

  useEffect(() => {
    if (monkey2Ref.current) {
      const newPosition = (OppStat.NoOfWords / 50) * 76 + 8;
      monkey2Ref.current.style.left = `${newPosition}%`;
    }
  }, [OppStat.NoOfWords]);

  return (
    <div className=" w-full text-text-color ">
      <div className="w-full h-96 relative ">
        <Image
          src="/branch.png"
          priority
          alt="sdfg"
          className="object-fill h-full w-full"
          width={9999}
          height={9999}
        />
        <div className="absolute w-full top-36 -z-10">
          <div
            className="h-2 bg-[#6c4423] w-full relative"
            style={{ backgroundImage: 'url("/images.jpeg")' }}
          >
            <div
              ref={monkeyRef}
              style={{
                transition: "left 0.1s ease-in-out", // Smooth transition for left and top properties
              }}
              className="w-20 absolute monkeymovement -z-10"
            >
              <Image
                src="/monkeyyellow.png"
                alt=";ljk"
                className="h-16 absolute -top-1 w-10 mix-blend-color-multiply"
                height={999}
                width={999}
              />
            </div>
          </div>
          <div
            className="mt-14 h-2 bg-[#6c4423] w-full relative"
            style={{ backgroundImage: 'url("/images.jpeg")' }}
          >
            <div
              ref={monkey2Ref}
              style={{
                transition: "left 0.1s ease-in-out", // Smooth transition for left and top properties
              }}
              className="w-20 absolute monkeymovement -z-10"
            >
              <Image
                src="/monkey (1).png"
                alt=";ljk"
                className="h-16 absolute -top-1 w-10 mix-blend-color-multiply"
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
