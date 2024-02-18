import {create} from 'zustand'

interface JoinJungleProps{
    isOpen: boolean;
    time: number;
    OnOpen: () => void;
    OnClose: () => void;
    SetTime: (newTime: number) => void;
};

const useJoinJungleModal = create<JoinJungleProps>((set) => ({
    isOpen: true,
    time: 0,
    OnOpen: () => set({ isOpen: true }),
    OnClose: () => set({ isOpen: false }),
    SetTime: (newTime) => set({time: newTime})
}));

export default useJoinJungleModal;