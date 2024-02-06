'use client'
import "@/app/styles/caret.css";
import { randomWord } from "@/app/components/useWords";
import React, { useEffect, useRef, useState } from "react";
import TempTypingSpeed from "@/app/hooks/useTempWords";

const RaceTyper = () => {

  let [correctWord, setCorrectWord] = useState<string>("");
  let [input, setInput] = useState("");

  const [pos, setPos] = useState(0);
  const test = `left-[${pos}px]`;

  const [colors, setColors] = useState(
    Array(correctWord.length).fill("text-text-color")
  );
  let [i, setI] = useState(0);
  let [wrongWordLimit, setWrongWordLimit] = useState(0);
  const allowedInput = [
    8, 32, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 186, 188, 190, 191, 219, 221,
    222,
  ];
  let [words, setWords] = useState(0);
  const [stats, setStats] = useState<{
    correct: number;
    incorrect: number;
    missed: number;
    extra: number;
    raw: number[];
    wpm: number[];
    err: number[];
  }>({
    correct: 0,
    incorrect: 0,
    missed: 0,
    extra: 0,
    raw: [],
    wpm: [],
    err: [],
  });
  let correct = 0;
  let incorrect = 0;
  let [missed, setMissed] = useState(0);
  let [extra, setExtra] = useState(0);
  let [wpmArr, setWpmArr] = useState<number[]>([]);
  let [prevTime, setPrevTime] = useState(0);
  let [prvI, setPrvI] = useState(-1);
  
    // word generator
    useEffect(() => {
        const Limit = 50;
        const lang = "english";
        // Loading.setisLoading(true)
          randomWord(Limit, lang).then((d: string) => {
            setCorrectWord(d);
            setColors(Array(d.length).fill("text-text-color"));
            setI(0);
            // Loading.setisLoading(false)
          });
      }, []);
    // word generator

  //handle input
  const handleChange3 = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    let keyPressed = e.key;

    if (e.keyCode === 9) {
      location.reload();
    }

    if (
      (!allowedInput.includes(e.keyCode) && e.keyCode < 65) ||
      (e.keyCode > 90 && !allowedInput.includes(e.keyCode))
    ) {
      return;
    }

    if (keyPressed === " " && correctWord[i - 1] === " ") {
      return;
    } else if (keyPressed === "Backspace") {
      colors[i - 1] = "text-text-color";
      if (correctWord[i - 1] === " ") return;

      i -= 2;
      input = input.substring(0, input.length - 1);
      setInput(input);
    } else if (keyPressed === " " && correctWord[i] !== " ") {
      while (i < correctWord.length) {
        if (correctWord[i] === " ") {
          setMissed(missed++);
          setStats({ ...stats, missed: stats.missed + 1 });
          setStats((prevStats) => ({
            ...prevStats,
            incorrect: prevStats.incorrect + 1,
          }));
          break;
        }
        input += " ";
        i++;
        setStats({ ...stats, missed: stats.missed + 1 });
        setMissed(missed++);
      }setTempWordCount(prev=>prev+1)                                           // added this line for word count
    } else if (keyPressed !== " " && correctWord[i] === " ") {
      setWrongWordLimit(wrongWordLimit + 1);

      setExtra(extra + 1);
      setStats({ ...stats, extra: stats.extra + 1 });
      setStats((prevStats) => ({
        ...prevStats,
        incorrect: prevStats.incorrect + 1,
      }));

      if (wrongWordLimit >= 5) {
        return;
        setWrongWordLimit(0);
      }
      setCorrectWord(
        correctWord.substring(0, i) + keyPressed + correctWord.substring(i)
      );
      colors.push("text-text-color");
    } else if (keyPressed === ' ' && correctWord[i] === ' ') {
        setTempWordCount(prev=>prev+1)                                          // added this line for word count
    }
    setI(i + 1);
    setPos(i * 14);
    setColors(colors);

    if (keyPressed !== "Backspace") {
      setInput(input + keyPressed);
      if (keyPressed === correctWord[i]) {
        colors[i] = "text-this-white";
        setStats({ ...stats, correct: stats.correct + 1 });
      } else {
        colors[i] = "text-error";
        setStats((prevStats) => ({
          ...prevStats,
          incorrect: prevStats.incorrect + 1,
        }));
      }
    }
  };
  //handle input

  //cursor logic
  const caretRef = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const spanRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    if (caretRef.current && spanRefs.current) {
      let spanLeftPosition = spanRefs.current[i]?.offsetLeft;
      let spanTopPosition = spanRefs.current[i]?.offsetTop;
      if (spanLeftPosition && spanTopPosition) {
        caretRef.current.style.left = `${spanLeftPosition}px`;
        if (spanTopPosition <= 34) {
          caretRef.current.style.top = `${spanTopPosition}px`;
        }
        if (
          spanLeftPosition == 13 &&
          parseInt(caretRef.current.style.top.slice(0, 2)) !== spanTopPosition
        ) {
          divRef.current?.scrollBy(0, 32);
        }
      }
    }
  }, [i]);
    //cursor logic
    

    // monkey movement
    let [tempWordcount, setTempWordCount] = useState(0)
    const {NoOfWords,SetNoOfWords}=TempTypingSpeed()
    useEffect(() => {
        SetNoOfWords(tempWordcount)
    },[i])
    // monkey movement
  return (
    <>
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
          autoFocus
          value={input}
        //   onChange={handleChange}
          onKeyDownCapture={handleChange3}
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
                        opacity-0
            "
        />
      </div>
    </>
  );
};

export default RaceTyper;
