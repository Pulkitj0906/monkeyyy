'use client'
import { useEffect, useState } from "react"
import { FaGlobeAmericas } from "react-icons/fa";
import Test from "../hooks/useTest";
import TimeLimit from "../hooks/useTimer";

const Timer = () => {
    const TestCtrl = Test()
    const { seconds }= TimeLimit()
    const [time, setTime] = useState(seconds);
    useEffect(() => {
        let intervalId: any;
        console.log(time)
        if (TestCtrl.hasStarted && time > 0) {
            intervalId = setInterval(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);
        }

        if (time === 0) {
            TestCtrl.onClose();
            clearInterval(intervalId);
        }

        return () => {
            // Clear the interval when the component unmounts or when TestCtrl.hasStarted becomes false
            clearInterval(intervalId);
        };
    }, [TestCtrl, TestCtrl.hasStarted, time]);

//    if(!TestCtrl.hasStarted)
//     return (
//         <div className="self-center mt-40 mb-2 items-center h-4 flex group hover:cursor-pointer">
//             <FaGlobeAmericas className="text-text-color group-hover:text-this-white" />
//             <p className="pl-2 text-text-color group-hover:text-this-white text-m">english</p>
//         </div>
//     ) 
    return (
        <div className="mt-40 mb-2 items-center flex group h-4 text-yellow-400 text-2xl font-medium">
            <div>{time}</div>
        </div>

    )
}

export default Timer