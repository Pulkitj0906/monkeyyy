import { create } from "zustand";

interface WordLimitProps {
    words: number
    setWords: (newWordLimit: number) => void
}

const useWordLimit = create<WordLimitProps>((set) => ({
    words: 50,
    setWords: (newWordLimit) => set({
        words: newWordLimit
    })
}))

export default useWordLimit;