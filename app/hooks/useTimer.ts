import { create } from "zustand";

interface TimerProps {
    seconds: number
    setSeconds: (time: number) => void
}

const TimeLimit = create<TimerProps>((set) => ({
    seconds: 30,
    setSeconds: (time) => set({
        seconds: time
    })
}))

export default TimeLimit;