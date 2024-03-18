"use client";
import "@/app/_styles/caret.css";
import { randomWord } from "@/app/_words/useWords";
import React, { use, useEffect, useRef, useState } from "react";
import socket from "../socket";
import useJoinJungleModal from "@/app/_hooks/useJoinJungleModal";
import useFinishModal from "@/app/_hooks/useFinishModal";
import OppTempWords from "@/app/_hooks/useOppTempWords";
import TempTypingSpeed from "@/app/_hooks/useTempWords";

const RaceTyper = () => {
  const [correctWord, setCorrectWord] = useState<string>("");
  const [currWpm, setCurrWpm] = useState(0);
  const [oppWpm, setOppWpm] = useState(0);
  const [tempWordcount, setTempWordCount] = useState(0);
  const [colors, setColors] = useState(
    Array(correctWord.length).fill("text-text-color")
  );
  let [i, setI] = useState(0);

  let OppStat = OppTempWords();
  const CurrStat = TempTypingSpeed();
  const FinishModal = useFinishModal();
  const JoinJungleModal = useJoinJungleModal();

  const textRef = useRef<HTMLTextAreaElement>(null);

  const allowedInput = [
    8, 32, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 186, 188, 190, 191, 219, 221,
    222,
  ];

  // word generator
  const Limit = 50;
  const lang = "english";
  useEffect(() => {
    randomWord(Limit, lang).then((d: string) => {
      setCorrectWord(d);
      setColors(Array(d.length).fill("text-text-color"));
      setI(0);
    });
  }, []);

  const handleChange = () => {};
  //handle input
  const handleChange3 = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    let keyPressed = e.key;
    if (
      (!allowedInput.includes(e.keyCode) && e.keyCode < 65) ||
      (e.keyCode > 90 && !allowedInput.includes(e.keyCode))
    )
      return;

    if (keyPressed === " " && correctWord[i - 1] === " ") return;
    else if (keyPressed === "Backspace") {
      if (i <= 0 || correctWord[i - 1] === " ") return;
      colors[i - 1] = "text-text-color";
      i -= 2;
    } else if (keyPressed === " " && correctWord[i] !== " ") {
      while (i >= 0) {
        if (correctWord[i] === " " || i === 0) {
          if (i === 0) {
            i = -1;
          }
          break;
        }
        colors[i - 1] = "text-text-color";
        i--;
      }
    } else if (keyPressed !== " " && correctWord[i] === " ") {
      return;
    } else if (keyPressed === " " && correctWord[i] === " ") {
      if (colors.some((c) => c === "text-error")) {
        while (i >= 0) {
          i--;
          if (correctWord[i] === " " || i === -1) {
            break;
          }
          colors[i] = "text-text-color";
        }
      } else setTempWordCount((prev) => prev + 1); // added this line for word count
    }
    setI(i + 1);
    setColors(colors);

    if (keyPressed !== "Backspace") {
      if (keyPressed === correctWord[i]) {
        colors[i] = "text-this-white";
      } else {
        colors[i] = "text-error";
      }
    }
  };

  //cursor logic
  const caretRef = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const spanRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const firstElement = spanRefs.current[1]?.offsetLeft;
  useEffect(() => {
    if (caretRef.current && spanRefs.current) {
      if (i === correctWord.length) {
        if (spanRefs.current[i - 1]) {
          const leftPosition = spanRefs.current[i - 1]?.offsetLeft;
          if (leftPosition !== undefined) {
            caretRef.current.style.left = `${leftPosition + 14.29}px`;
          }
        }
      }
      let spanLeftPosition = spanRefs.current[i]?.offsetLeft;
      let spanTopPosition = spanRefs.current[i]?.offsetTop;
      if ((spanLeftPosition && spanTopPosition) || spanLeftPosition === 0) {
        //first char caret pos
        caretRef.current.style.left = `${spanLeftPosition}px`;
        if (spanTopPosition && spanTopPosition <= 34) {
          caretRef.current.style.top = `${spanTopPosition}px`;
        }
        if (
          spanLeftPosition === firstElement &&
          parseInt(caretRef.current.style.top.slice(0, 2)) !== spanTopPosition
        ) {
          divRef.current?.scrollBy({ top: 32, behavior: "smooth" });
        }
      }
    }
    if (correctWord && i === correctWord.length) {
      FinishModal.OnOpen();
      socket.emit("gameOver");
    }
  }, [i]);

  useEffect(() => {
    if (textRef.current && JoinJungleModal.isStarted) {
      textRef.current.focus();
    }
  }, [JoinJungleModal.isStarted]);

  const handleGameEnd = () => {
    FinishModal.setLoser();
    FinishModal.OnOpen();
    JoinJungleModal.SetIsStarted(false);
  }
  
  useEffect(() => {
    socket.emit("type", tempWordcount);
    let timeTaken = (Date.now() - JoinJungleModal.time) / 1000;
    setCurrWpm(parseInt((tempWordcount * (60 / timeTaken)).toFixed(2)));
    setOppWpm(parseInt((OppStat.NoOfWords * (60 / timeTaken)).toFixed(2)));
    CurrStat.SetNoOfWords(tempWordcount);
  }, [tempWordcount, OppStat.NoOfWords]);
  
  useEffect(() => {
    socket.on("userLeft", () => { FinishModal.OnOpen()});
    socket.on("gameEnd", handleGameEnd);
    socket.on("update", (d) => { OppStat.SetNoOfWords(d) });
    
    return () => {
      socket.off("userLeft", () => {FinishModal.OnOpen()});
      socket.off("gameEnd", handleGameEnd);
      socket.off("update", (d) => { OppStat.SetNoOfWords(d) });
    }
  }, [socket, handleGameEnd])

  return (
    <>
      <div className="flex w-full justify-between text-text-color">
        <div className="flex flex-col items-center">
          <p className="text-sm">Your Monkey </p>
          <p className="text-this-yellow">
            {currWpm}
            <span className="text-text-color text-[10px]"> wpm</span>
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm">{`${OppStat.Username}'s Monkey`}</p>
          <p className="text-this-white">
            {oppWpm}
            <span className="text-text-color text-[10px]"> wpm</span>
          </p>
        </div>
      </div>
      <div className="relative">
        <div ref={divRef} className=" text-2xl h-24 overflow-y-hidden">
          {correctWord.split("").map((letter, index) => (
            <span
              ref={(el) => (spanRefs.current[index] = el)}
              key={index}
              className={`inline z-10 w-1 ${colors[index]}`}
            >
              {letter}
            </span>
          ))}
          <br />
          <br />
          <div
            ref={caretRef}
            className="h-8 custom-caret-color z-20 absolute w-[2px] rounded-full top-0"
            style={{
              transition: "left 0.1s ease-in-out, top 0.1s ease-out", // Smooth transition for left and top properties
            }}
          ></div>
        </div>
        <textarea
          spellCheck="false"
          ref={textRef}
          onChange={handleChange}
          onKeyDown={handleChange3}
          className="
            absolute
            top-0
            bg-transparent
            w-full
            h-full
            text-2xl
            outline-none
            text-transparent
            resize-none
            opacity-1
            overflow-y-hidden
          "
        />
      </div>
    </>
  );
};

export default RaceTyper;
