import { create } from "zustand"

interface GraphTypingSpeedProps {
    wpm: number[],
    raw: number[],
    err: number[],
    setRaw: (curr: number[]) => void,
    setErr: (curr: number[]) => void,
    setWpm: (curr: number[]) => void
}

const GraphTypingSpeed = create<GraphTypingSpeedProps>((set) => ({
    wpm: [],
    raw: [],
    err: [],
    setWpm: (curr) => (set)({
        wpm: curr
    }),
    setRaw: (curr) => (set)({
        raw: curr
    }),
    setErr: (curr) => (set)({
        err: curr
    }),
}))

export default GraphTypingSpeed;