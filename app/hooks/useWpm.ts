import { create } from "zustand"

interface TypingSpeedProps {
    NoOfChars: number
    NoOfWords: number
    accuracy: number
    setAccuracy: (newAccuracy: number) => void;
    SetNoOfChars: (NewNoOfChars:number) => void;
    SetNoOfWords: (NewNoOfWords:number) => void;
}

const TypingSpeed = create<TypingSpeedProps>((set) => ({
    NoOfChars: 0,
    NoOfWords: 0,
    accuracy:0,
    SetNoOfChars: (NewNoOfChars) => set({
        NoOfChars:NewNoOfChars
    }),
    SetNoOfWords: (NewNofWords) => set({
        NoOfWords: NewNofWords
    }),
    setAccuracy: (newAccuracy) => set({
        accuracy: newAccuracy
    })
}))

export default TypingSpeed;
