import {create} from 'zustand'

interface TestProps {
    hasStarted: boolean
    onStart: () => void
    onClose: () => void
}

const Test = create<TestProps>((set) => ({
    hasStarted: false,
    onStart: () => set({
        hasStarted: true
    }),
    onClose: () => set({
        hasStarted: false
    })
}))

export default Test