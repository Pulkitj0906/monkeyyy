import {create} from 'zustand'

interface LeaderModalStore{
    isOpen: boolean;
    OnOpen: () => void;
    OnClose: () => void;

};

const useLeaderModal = create<LeaderModalStore>((set) => ({
    isOpen: false,
    OnOpen: () => set({ isOpen: true }),
    OnClose: () => set({ isOpen: false })
}));

export default useLeaderModal;