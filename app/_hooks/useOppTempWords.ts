import { create } from "zustand"

interface OppTempWordsProps {
    NoOfWords: number
    Username: string
    SetNoOfWords: (NewNoOfWords:number) => void
    SetUsername: (newName: string) => void
}

const OppTempWords = create<OppTempWordsProps>((set) => ({
    NoOfWords: 0,
    SetNoOfWords: (NewNofWords) => set({
        NoOfWords: NewNofWords
    }),
    Username: '',
    SetUsername:(newName) => set({
        Username: newName
    })
}))

export default OppTempWords;
