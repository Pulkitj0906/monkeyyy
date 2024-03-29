import { FaChevronRight } from "react-icons/fa";
import useLangModal from "../_hooks/useLangModal";
import useMode from "../_hooks/useMode";
import ResultPage from "../_hooks/useShowResult";
import Test from "../_hooks/useTest";
import TimeLimit from "../_hooks/useTimer";
import TypingSpeed from "../_hooks/useWpm";
import Graph from "./Graph";
import ResultElements from "./ResultElements";
import Subfooter from "./subfooter";
import useWordLimit from "../_hooks/useWordsLimit";
import GraphTypingSpeed from "../_hooks/useGraphWpm";

const Result = () => {
  const WordLimit = useWordLimit();
  const Wpm = TypingSpeed();
  const Time = TimeLimit();
  const Mode = useMode();
  const Lang = useLangModal();
  const wordCount = Wpm.chars.reduce((acc, curr) => acc + curr, 0) / 5;
  const WpmStat = GraphTypingSpeed();
  let avgWpm;
  WpmStat.wpm.length
    ? (avgWpm =
        WpmStat.wpm.reduce((prv, curr) => curr + prv) / WpmStat.wpm.length)
    : (avgWpm = 0);
  return (
    <div className="h-full w-full  flex flex-col gap-3">
      <div className="grow flex flex-col items-center ">
        <div className="flex mt-20 w-full space-x-4">
          <div className="flex flex-col ">
            <ResultElements
              title="wpm"
              label={((Wpm.NoOfWords / Time.seconds) * 60).toString()}
            />
            <ResultElements title="acc" label={Wpm.accuracy.toFixed(0) + "%"} />
          </div>
          <div className="flex grow ">
            <Graph />
          </div>
        </div>
        <div className="flex w-full justify-between flex-wrap gap-5">
          <ResultElements
            title="test type"
            label={
              <>
                <span>
                  {Mode.mode}{" "}
                  {Mode.mode === "time" ? Time.seconds : WordLimit.words}
                </span>
                <br />
                <span>{Lang.lang}</span>
              </>
            }
            small
            medium
          />
          <ResultElements
            title="raw"
            label={Math.ceil((wordCount / Time.seconds) * 60).toString()}
            small
          />
          <ResultElements
            title="characters"
            label={
              <>
                {Wpm.chars.map((e, i, arr) => (
                  <span key={i}>
                    {e}
                    {i !== arr.length - 1 && "/"}
                  </span>
                ))}
              </>
            }
            small
          />
          <ResultElements title="consistency" label="-/-" small />
          <ResultElements
            title={`${Mode.mode}`}
            label={
              Mode.mode === "time"
                ? Time.seconds.toString()
                : WordLimit.words.toString()
            }
            small
          />
        </div>
        <div className="flex mt-4 text-text-color">
          <a href="/">
            <FaChevronRight size={24} />
          </a>
        </div>
      </div>
      <Subfooter />
    </div>
  );
};

export default Result;
