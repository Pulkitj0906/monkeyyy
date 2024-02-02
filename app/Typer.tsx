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

const Typer = () => {
  const TestCtrl = Test();
  const Wpm = TypingSpeed();
  const WordLimit = useWordLimit();
  const LangModal = useLangModal();
  const GraphWpm = GraphTypingSpeed();
  const showResult = ResultPage();
  const Mode = useMode();
  const { size, setSize } = useQuoteGroup();

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
    if (Mode.mode === "quote")
      randomQoute(Limit, lang, size).then((d: string) => {
        setCorrectWord(d);
        WordLimit.setWords(d.split(" ").length);
        setColors(Array(d.length).fill("text-text-color"));
        setI(0);
      });
    else
      randomWord(Limit, lang).then((d: string) => {
        setCorrectWord(d);
        setColors(Array(d.length).fill("text-text-color"));
        setI(0);
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


  return (
    <>
      <div className="relative">
        <div className=" text-2xl h-24 overflow-y-auto">
          {correctWord.split("").map((letter, index) => (
            <span
              key={index}
              className={`inline z-10 w-1 ${colors[index]}`}
            >
              {letter}
            </span>
          ))}
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
                        caret-this-yellow
            "
        />
      </div>
    </>
  );
};

export default Typer;
