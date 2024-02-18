import {
  FaAt,
  FaClock,
  FaFont,
  FaHashtag,
  FaMountain,
  FaQuoteLeft,
  FaSearch,
  FaTools,
  FaWrench,
} from "react-icons/fa";
import Item from "./Item";
import TimeLimit from "../_hooks/useTimer";
import useMode from "../_hooks/useMode";
import useWordLimit from "../_hooks/useWordsLimit";
import useQuoteGroup from "../_hooks/useQuoteGroup";

const Controlbar = () => {
  const { seconds, setSeconds } = TimeLimit();
  const { mode, setmode } = useMode();
  const { words, setWords } = useWordLimit();
  const { size, setSize } = useQuoteGroup();
  const items1 = [
    {
      label: "punctuation",
      href: "/settings",
      icon: FaAt,
      size: 12,
    },
    {
      label: "numbers",
      href: "/settings",
      icon: FaHashtag,
      size: 12,
    },
  ];
  const items2 = [
    {
      label: "time",
      highlight: mode === "time",
      onclick: () => setmode("time"),
      icon: FaClock,
      size: 12,
    },
    {
      label: "words",
      highlight: mode === "words",
      onclick: () => setmode("words"),
      icon: FaFont,
      size: 12,
    },
    {
      label: "quote",
      highlight: mode === "quote",
      onclick: () => setmode("quote"),
      icon: FaQuoteLeft,
      size: 12,
    },
    /* { //Beta Access
      label: "zen",
      highlight: mode === "zen",
      onclick: () => setmode("zen"),
      icon: FaMountain,
      size: 14,
    }, 
    {
      label: "custom",
      highlight: mode === "custom",
      onclick: () => setmode("custom"),
      icon: FaWrench,
      size: 14,
    }, */
  ];
  const items3_time = [
    {
      label: "15",
      onclick: () => setSeconds(15),
      highlight: seconds === 15,
      size: 12,
    },
    {
      label: "30",
      onclick: () => setSeconds(30),
      highlight: seconds === 30,
      size: 12,
    },
    {
      label: "60",
      onclick: () => setSeconds(60),
      highlight: seconds === 60,
      size: 20,
    },
    {
      label: "120",
      onclick: () => setSeconds(120),
      highlight: seconds === 120,
      size: 20,
    },
    {
      icon: FaTools,
      href: "/settings",
      size: 13,
    },
  ];
  const items3_words = [
    {
      label: "10",
      onclick: () => setWords(10),
      highlight: words === 10,
      size: 12,
    },
    {
      label: "25",
      onclick: () => setWords(25),
      highlight: words === 25,
      size: 12,
    },
    {
      label: "50",
      onclick: () => setWords(50),
      highlight: words === 50,
      size: 20,
    },
    {
      label: "100",
      onclick: () => setWords(100),
      highlight: words === 100,
      size: 20,
    },
    {
      icon: FaTools,
      href: "/settings",
      size: 13,
    },
  ];
  const items3_quote = [
    {
      label: "all",
      onclick: () => setSize("all"),
      highlight: size === "all",
      size: 12,
    },
    {
      label: "short",
      onclick: () => setSize("short"),
      highlight: size === "short",
      size: 12,
    },
    {
      label: "medium",
      onclick: () => setSize("medium"),
      highlight: size === "medium",
      size: 20,
    },
    {
      label: "long",
      onclick: () => setSize("long"),
      highlight: size === "long",
      size: 20,
    },
    {
      label: "thicc",
      onclick: () => setSize("thicc"),
      highlight: size === "thicc",
      size: 20,
    },
    {
      icon: FaSearch,
      href: "",
      size: 13,
    },
  ];
  return (
    <>
      <div
        className={`flex justify-between mt-5 flex-col p-2 md:flex-row bg-sub-alt rounded-lg`}
      >
        {mode !== "quote" && mode !== "zen" && (
          <>
            <div className="flex flex-row items-center justify-center">
              {items1.map((item, idx) => (
                <Item
                  key={idx}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  size={item.size}
                />
              ))}
            </div>
            <div className="h-6 mx-1 w-1 self-center bg-text-color/20 rounded-lg md:block hidden"></div>
          </>
        )}
        <div className="flex flex-row items-center justify-center">
          {items2.map((item, idx) => (
            <Item
              key={idx}
              onClick={item.onclick}
              label={item.label}
              icon={item.icon}
              size={item.size}
              highlight={item.highlight}
            />
          ))}
        </div>

        {mode === "time" && (
          <>
            <div className="h-6 w-1 mx-1 self-center bg-text-color/20 rounded-lg md:block hidden"></div>
            <div className="flex flex-row items-center justify-center">
              {items3_time.map((item, idx) => (
                <Item
                  key={idx}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  size={item.size}
                  onClick={item.onclick}
                  highlight={item.highlight}
                />
              ))}
            </div>
          </>
        )}
        {mode === "words" && (
          <>
            <div className="h-6 w-1 mx-1 self-center bg-text-color/20 rounded-lg md:block hidden"></div>
            <div className="flex flex-row items-center justify-center">
              {items3_words.map((item, idx) => (
                <Item
                  key={idx}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  size={item.size}
                  onClick={item.onclick}
                  highlight={item.highlight}
                />
              ))}
            </div>
          </>
        )}
        {mode === "quote" && (
          <>
            <div className="h-6 w-1 mx-1 self-center bg-text-color/20 rounded-lg md:block hidden"></div>
            <div className="flex flex-row items-center justify-center">
              {items3_quote.map((item, idx) => (
                <Item
                  key={idx}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  size={item.size}
                  onClick={item.onclick}
                  highlight={item.highlight}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Controlbar;
