import {create} from 'zustand'

interface finishModalProps {
    isOpen: boolean;
    OnOpen: () => void;
    OnClose: () => void;
    loser: boolean;
    setLoser: () => void;
};

const useFinishModal = create<finishModalProps >((set) => ({
    isOpen: false,
    loser: true,
    setLoser: () => set({loser: false}),
    OnOpen: () => set({ isOpen: true }),
    OnClose: () => set({ isOpen: false }),
}));

export default useFinishModal;