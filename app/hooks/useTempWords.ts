import { create } from "zustand"

interface TempTypingSpeedProps {
    NoOfWords: number
    SetNoOfWords: (NewNoOfWords:number) => void;
}

const TempTypingSpeed = create<TempTypingSpeedProps>((set) => ({
    NoOfWords: 0,
    SetNoOfWords: (NewNofWords) => set({
        NoOfWords: NewNofWords
    }),
}))

export default TempTypingSpeed;
