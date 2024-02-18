import { create } from "zustand";

interface GroupProps {
    size: string,
    setSize: (newSize: string) => void
}

const useQuoteGroup = create<GroupProps>((set) => ({
    size: 'short',
    setSize: (newSize) => set({
        size: newSize
    })
}))

export default useQuoteGroup