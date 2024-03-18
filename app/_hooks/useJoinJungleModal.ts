import {create} from 'zustand'

interface JoinJungleProps{
    isOpen: boolean;
    isStarted: boolean;
    time: number;
    OnOpen: () => void;
    OnClose: () => void;
    SetIsStarted: (newBool: boolean) => void;
    SetTime: (newTime: number) => void;
};

const useJoinJungleModal = create<JoinJungleProps>((set) => ({
    isOpen: true,
    isStarted: false,
    time: 0,
    OnOpen: () => set({ isOpen: true }),
    OnClose: () => set({ isOpen: false }),
    SetTime: (newTime) => set({time: newTime}),
    SetIsStarted: (newBool) => set({isStarted: newBool}) 
}));

export default useJoinJungleModal;