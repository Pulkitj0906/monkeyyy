import React, { useEffect, useState } from "react";
import { FaGlobeAmericas } from "react-icons/fa";
import Test from "../hooks/useTest";
import TimeLimit from "../hooks/useTimer";
import useLangModal from "../hooks/useLanguageModal";
import ResultPage from "../hooks/useShowResult";

const Timer = () => {
    const TestCtrl = Test();
    const LangModal = useLangModal();
    const { seconds } = TimeLimit();
    const [time, setTime] = useState(seconds);
    const resultpage = ResultPage();

    useEffect(() => {
        setTime(seconds);
    }, [seconds]);

    useEffect(() => {
        let intervalId: string | number | NodeJS.Timeout | undefined;

        if (TestCtrl.hasStarted && time > 0) {
            intervalId = setInterval(() => {
                setTime(prevTime => prevTime - 1); 
            }, 1000);
        }

        if (time === 0) {
            TestCtrl.onClose();
            resultpage.onOpen();
            clearInterval(intervalId);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [TestCtrl.hasStarted, time, TestCtrl.onClose, resultpage.onOpen]);

    if (!TestCtrl.hasStarted) {
        return (
            <div onClick={LangModal.onOpen} className="self-center mt-40 mb-2 items-center h-4 flex group hover:cursor-pointer">
                <FaGlobeAmericas className="text-text-color group-hover:text-this-white" />
                <p className="pl-2 text-text-color group-hover:text-this-white text-m">{LangModal.lang}</p>
            </div>
        );
    }

    return (
        <div className="mt-40 mb-2 items-center flex group h-4 text-yellow-400 text-2xl font-medium">
            <div>{time}</div>
        </div>
    );
};

export default Timer;
