"use client";
import React, { useEffect, useState, useRef } from "react";
import { randomWord } from "./components/useWords";
import "@/app/styles/caret.css";
import Test from "./hooks/useTest";
import useWordLimit from "./hooks/useWordsLimit";
import TypingSpeed from "./hooks/useWpm";
import useLangModal from "./hooks/useLangModal";
import GraphTypingSpeed from "./hooks/useGraphWpm";
import useMode from "./hooks/useMode";
import { randomQoute } from "./components/words/useQuotes";
import useQuoteGroup from "./hooks/useQuoteGroup";
import ResultPage from "./hooks/useShowResult";
import { FaBookAtlas } from "react-icons/fa6";
import useLoading from "./hooks/useLoading";

const Typer = () => {
  const TestCtrl = Test();
  const Wpm = TypingSpeed();
  const WordLimit = useWordLimit();
  const LangModal = useLangModal();
  const GraphWpm = GraphTypingSpeed();
  const showResult = ResultPage();
  const Mode = useMode();
  const { size, setSize } = useQuoteGroup();
  const Loading=useLoading()

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

  //graph WPM
  useEffect(() => {
    setPrevTime(Date.now() - 303);
  }, [TestCtrl.hasStarted]);

  let [AlreadyCounted,SetAlreadyCounted]=useState(false)
  useEffect(() => {
    if (correctWord.length !== 0 && i === correctWord.length) {
      TestCtrl.onClose();
      showResult.onOpen();
    }
    if (correctWord[i] === " " && correctWord) {
      setWords(words + 1);
      let time = (Date.now() - prevTime) / 1000;
      let wpmTestSeconds = ((stats.correct * (60 / time)) / 5).toFixed(2);
      stats.wpm.push(parseInt(wpmTestSeconds));
      let rawTestSeconds = (
        ((stats.correct + stats.incorrect + stats.missed + stats.extra) *
          (60 / time)) /
        5
      ).toFixed(2);
      stats.raw.push(parseInt(rawTestSeconds));
      stats.err.push(stats.incorrect);
      GraphWpm.setErr(stats.err);
      GraphWpm.setWpm(stats.wpm);
      GraphWpm.setRaw(stats.raw);
      setPrvI(i);
      setPrevTime(Date.now());
      setStats((prevStats) => ({ ...prevStats, incorrect: 0, correct: 0 }));
    }
    Wpm.SetNoOfWords(words);
    correct = colors.filter((color) => color === "text-this-white").length;
    incorrect = colors.filter((color) => color === "text-error").length;
    Wpm.setAccuracy((correct / i) * 100);
    Wpm.setChars([correct, incorrect, missed, extra]);
    setPos(i * 14);
    // console.log(test)
  }, [i]);

  useEffect(() => {
    const Limit = WordLimit.words;
    const lang = LangModal.lang;
    Loading.setisLoading(true)
    if (Mode.mode === "quote")
      randomQoute(Limit, lang, size).then((d: string) => {
        setCorrectWord(d);
        WordLimit.setWords(d.split(" ").length);
        setColors(Array(d.length).fill("text-text-color"));
        setI(0);
        Loading.setisLoading(false)
      });
    else
      randomWord(Limit, lang).then((d: string) => {
        setCorrectWord(d);
        setColors(Array(d.length).fill("text-text-color"));
        setI(0);
        Loading.setisLoading(false)
      });
  }, [WordLimit.words, LangModal.lang, Mode.mode, size]);

  const handleChange = () => {
    if (!TestCtrl.hasStarted) {
      TestCtrl.onStart();
    }
  };

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
      }
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
          spanLeftPosition==13 &&
          parseInt(caretRef.current.style.top.slice(0, 2)) !== spanTopPosition
        ) {
          divRef.current?.scrollBy(0, 32);
        }
      }
    }
  }, [i]);
  //cursor logic
if (Loading.isLoading) {
    return (
      <div className=" h-full relative">
            <div className="blur-sm opacity-35">
                <div className="text-2xl text-text-color">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga dolore
          temporibus, est, odio quo voluptatibus nihil animi ex neque iure
          corporis libero culpa sapiente obcaecati, at deserunt accusantium
          delectus? Maxime.
                </div>
                </div>
        <div className=" inset-0 top-10 justify-center animate-pulse flex gap-1 absolute">
          <div className="text-text-color ">
            <FaBookAtlas />
          </div>
          <p className="text-text-color">
            Digging up dictionary! <span className="">...</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        <div ref={divRef} className=" text-2xl h-24 overflow-y-auto">
          {correctWord.split("").map((letter, index) => (
            <span
              ref={(el) => (spanRefs.current[index] = el)}
              key={index}
              className={`inline z-10 w-1 ${colors[index]}`}
            >
              {letter}
            </span>
          ))}
          <br /><br />
          <div
            ref={caretRef}
            className="h-8 custom-caret-color z-20 absolute w-[2px] rounded-full top-0"
            style={{
              transition: 'left 0.1s ease-in-out, top 0.1s ease-out', // Smooth transition for left and top properties
            }}
          ></div>
        </div>
        <textarea
          spellCheck="false"
          autoFocus
          value={input}
          onChange={handleChange}
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

export default Typer;
