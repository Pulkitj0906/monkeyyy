import { create } from "zustand";

interface ResultProps {
    isShow: boolean
    onOpen: () => void
    onClose: () => void
}

const ResultPage = create<ResultProps>((set) => ({
    isShow: false,
    onOpen: () => set({
        isShow:true
    }),
    onClose: () => set({
        isShow: false
    })
}))

export default ResultPage;